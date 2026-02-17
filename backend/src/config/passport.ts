import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { db } from "./database.ts";
import { users } from "./schema.ts";
import { eq } from "drizzle-orm";

passport.serializeUser((user: any, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
	try {
		const [user] = await db.select().from(users).where(eq(users.id, id));

		done(null, user ?? false);
	} catch (error) {
		done(error, false);
	}
});

passport.use(
	new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
		try {
			const [user] = await db.select().from(users).where(eq(users.email, email));

			if (!user) {
				return done(null, false, { message: "No account found with this email" });
			}

			if (!user.password) {
				return done(null, false, { message: "Please login with Google or Facebook" });
			}

			if (user.blocked) {
				return done(null, false, { message: "Your account has been blocked" });
			}

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				return done(null, false, { message: "Incorrect password" });
			}

			return done(null, user);
		} catch (error) {
			return done(error);
		}
	}),
);

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				const email = profile.emails?.[0]?.value;

				if (!email) {
					return done(new Error("No email provided from Google"), false);
				}

				const [existingByGoogleId] = await db.select().from(users).where(eq(users.googleId, profile.id));

				if (existingByGoogleId) {
					if (existingByGoogleId.blocked) {
						return done(null, false);
					}
					return done(null, existingByGoogleId);
				}

				const [existingByEmail] = await db.select().from(users).where(eq(users.email, email));

				if (existingByEmail) {
					const [updated] = await db.update(users).set({ googleId: profile.id }).where(eq(users.id, existingByEmail.id)).returning();

					return done(null, updated);
				}

				const [newUser] = await db
					.insert(users)
					.values({
						email,
						name: profile.displayName,
						image: profile.photos?.[0]?.value,
						googleId: profile.id,
					})
					.returning();

				return done(null, newUser);
			} catch (error) {
				return done(error as Error, false);
			}
		},
	),
);

passport.use(
	new FacebookStrategy(
		{
			clientID: process.env.FACEBOOK_APP_ID!,
			clientSecret: process.env.FACEBOOK_APP_SECRET!,
			callbackURL: process.env.FACEBOOK_CALLBACK_URL!,
			profileFields: ["id", "emails", "name", "photos"],
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				const email = profile.emails?.[0]?.value;

				if (!email) {
					return done(new Error("No email provided from Facebook"), false);
				}

				const [existingByFacebookId] = await db.select().from(users).where(eq(users.facebookId, profile.id));

				if (existingByFacebookId) {
					if (existingByFacebookId.blocked) {
						return done(null, false);
					}
					return done(null, existingByFacebookId);
				}

				const [existingByEmail] = await db.select().from(users).where(eq(users.email, email));

				if (existingByEmail) {
					const [updated] = await db.update(users).set({ facebookId: profile.id }).where(eq(users.id, existingByEmail.id)).returning();

					return done(null, updated);
				}

				const [newUser] = await db
					.insert(users)
					.values({
						email,
						name: `${profile.name?.givenName} ${profile.name?.familyName}`.trim(),
						image: profile.photos?.[0]?.value,
						facebookId: profile.id,
					})
					.returning();

				return done(null, newUser);
			} catch (error) {
				return done(error as Error, false);
			}
		},
	),
);

export default passport;
