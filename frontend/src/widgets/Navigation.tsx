import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { NavLink } from "react-router-dom";
import { User } from "@heroui/user";
import useUser from "@/entities/hooks/useUser";

const links = {
	inventories: "Inventories",
	settings: "Settings",
	users: "Users",
};
type TLinkKeys = keyof typeof links;

export default function Navigation() {
	const { user, loading, error } = useUser();
	return (
		<nav>
			<div className="flex justify-between items-center h-16 container">
				<ul className="flex gap-4">
					{(Object.keys(links) as TLinkKeys[]).map((key, i) => {
						return (
							<NavLink to={key} key={key + i} className="text-lg!">
								{links[key]}
							</NavLink>
						);
					})}
				</ul>
				{loading ? (
					<></>
				) : user ? (
					<User
						description={
							<Link isExternal href={"mailto:"+user.email} size="sm">
								{user.email}
							</Link>
						}
						name={user.name}
					/>
				) : (
					<div>
						<NavLink to="auth">
							<Button>Login</Button>
						</NavLink>
					</div>
				)}
			</div>
		</nav>
	);
}
