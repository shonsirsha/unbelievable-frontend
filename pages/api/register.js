import cookie from "cookie";
import { API_URL } from "config/index";
import { whitespace } from "utils/whitespace";
import validateHuman from "utils/validateHuman";

export default async function register(req, res) {
	if (req.method === "POST") {
		const {
			email,
			password,
			first_name,
			last_name,
			dob,
			r_c_to_be_checked,
			gender,
			phone_number,
			recaptchaToken,
		} = req.body;

		const human = await validateHuman(recaptchaToken);

		if (!human) {
			return res
				.status(400)
				.json({ message: "ReCaptcha gagal. Mohon coba lagi!" });
		}

		let sanitised = r_c_to_be_checked;
		if (whitespace(r_c_to_be_checked)) {
			sanitised = "";
		}

		const strapiRes = await fetch(`${API_URL}/auth/local/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
				password,
				first_name,
				last_name,
				dob,
				gender,
				phone_number,
				onboarded: false,
				blocked: false,
				r_c_to_be_checked: sanitised,
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
				.json({ message: data.message[0].messages[0].message });
		}
	} else {
		res.setHeader("Allow", ["POST"]);
		res.status(405).json({ message: `Method ${req.method} not allowed` });
	}
}
