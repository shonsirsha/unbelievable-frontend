import cookie from "cookie";
import { API_URL, RECAPTCHA_SECRET_KEY } from "config/index";
import validateHuman from "utils/validateHuman";

export default async function login(req, res) {
	if (req.method === "POST") {
		const { identifier, password, recaptchaToken } = req.body;
		const human = await validateHuman(recaptchaToken);

		if (!human) {
			return res
				.status(400)
				.json({ message: "ReCaptcha gagal. Mohon coba lagi!" });
		}

		const strapiRes = await fetch(`${API_URL}/auth/local`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				identifier,
				password,
			}),
		});

		const data = await strapiRes.json();

		if (strapiRes.ok) {
			res.setHeader(
				"Set-Cookie",
				cookie.serialize("token", data.jwt, {
					httpOnly: true,
					secure: process.env.NODE_ENV === "development" ? false : true,
					maxAge: 900,
					sameSite: "strict",
					path: "/",
				})
			);
			res.status(200).json({
				user: data.user,
			});
		} else {
			res
				.status(data.statusCode)
				.json({ message: data.message[0].messages[0].id });
		}
	} else {
		res.setHeader("Allow", ["POST"]);
		res.status(405).json({ message: `Method ${req.method} not allowed` });
	}
}
