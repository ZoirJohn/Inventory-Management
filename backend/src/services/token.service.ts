let cachedToken: { instance_url: string; access_token: string; expires_at: number } | null = null;

async function getAccessToken(): Promise<{ instance_url: string; access_token: string }> {
	if (cachedToken && cachedToken?.expires_at > Date.now()) {
		const { access_token, instance_url } = cachedToken;
		return { access_token, instance_url };
	}
	const res = await fetch(process.env.SALESFORCE_BASE_URL! + "/services/oauth2/token", {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: new URLSearchParams({
			grant_type: "client_credentials",
			client_id: process.env.SALESFORCE_KEY!,
			client_secret: process.env.SALESFORCE_SECRET!,
		}),
	});

	const data = await res.json();
	if (!res.ok) {
		return data;
	}
	const { instance_url, access_token } = data;
	cachedToken = { instance_url, access_token, expires_at: Date.now() + 60 * 60 * 1000 };
	return { instance_url, access_token };
}
