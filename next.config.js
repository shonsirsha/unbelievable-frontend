const { createSecureHeaders } = require("next-secure-headers");

module.exports = {
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: createSecureHeaders({
					contentSecurityPolicy: {
						directives: {
							frameAncestors: [
								"self",
								"https://checkout-staging.xendit.com",
								"https://checkout.xendit.com",
							],
							styleSrc: ["'self'", "'unsafe-inline'"],
							imgSrc: [
								"'self'",
								"unbelievable-webapp.s3.ap-southeast-1.amazonaws.com",
								"https://vz-b4f1e97e-483.b-cdn.net",
							],
							baseUri: "self",
						},
					},
					forceHTTPSRedirect: [
						true,
						{ maxAge: 63072000, includeSubDomains: true },
					],
					frameGuard: "deny",
					noopen: "noopen",
					nosniff: "nosniff",
					xssProtection: "sanitize",
					referrerPolicy: "strict-origin-when-cross-origin",
				}),
			},
		];
	},
	// images: {
	//  minimumCacheTTL: 1400,
	//  domains: [
	//      "unb-dev.s3.ap-southeast-1.amazonaws.com",
	//      "unbelievable-webapp.s3.ap-southeast-1.amazonaws.com",
	//  ],
	// },
};
