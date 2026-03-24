import express from "express";
import { getAccessToken } from "../services/token.service";

const router = express.Router();

router.post("/contact", async (req, res) => {
	try {
		const { FirstName, LastName, Title } = req.body;
		if (!FirstName || !LastName || !Title) {
			return res.status(400).json({ message: "Required fields are missing" });
		}
		const { access_token, instance_url } = await getAccessToken();
		const result = await fetch(instance_url + "/services/data/v66.0/sobjects/contact", {
			method: "POST",
			headers: { "Content-Type": "application/json", Authorization: `Bearer ${access_token}` },
			body: JSON.stringify({ FirstName, LastName, Title }),
		});

		const data = await result.json();

		if (!result.ok) {
			return res.status(result.status).json(data);
		}

		return res.status(result.status).send(data);
	} catch (error) {
		return res.status(500).json({ message: "Error creating contact" });
	}
});

export default router;
