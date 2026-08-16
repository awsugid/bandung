export const site = {
	name: "AWS User Group Bandung",
	shortName: "AWS UG Bandung",
	url: "https://bandung.awscommunity.id",
	description:
		"Join AWS User Group Bandung to learn AWS Cloud, meet local builders, and grow with the Bandung tech community.",
	locale: "en_US",
	language: "en",
	themeColor: "#ffffff",
	logoPath: "/images/awsug-bandung-logo.png",
	ogImagePath: "/og/home.png",
	keywords: [
		"AWS User Group Bandung",
		"AWS Bandung",
		"AWS community Indonesia",
		"cloud computing Bandung",
		"Amazon Web Services meetup",
		"AWS meetup Bandung",
		"Bandung developers",
	],
} as const;

export const siteUrl = new URL(site.url);

export const absoluteUrl = (path = "/") => new URL(path, siteUrl).toString();

// Bump when page content or event data changes; consumed by sitemap.xml.
export const contentLastModified = "2026-08-16";

export const publicRoutes = [
	{
		path: "/",
		title: "AWS User Group Bandung",
		description: site.description,
		changefreq: "weekly",
		priority: "1.0",
		lastmod: contentLastModified,
	},
	{
		path: "/events",
		title: "Events | AWS User Group Bandung",
		description:
			"Upcoming, current, and past AWS User Group Bandung meetups, speakers, topics, and venue details.",
		changefreq: "daily",
		priority: "0.9",
		lastmod: contentLastModified,
	},
] as const;

export const organizationJsonLd = {
	"@context": "https://schema.org",
	"@type": "Organization",
	name: site.name,
	alternateName: site.shortName,
	url: absoluteUrl("/"),
	logo: absoluteUrl(site.logoPath),
	sameAs: [
		"https://www.meetup.com/aws-user-group-bandung/",
		"https://www.instagram.com/awsugbandung/",
	],
	description: site.description,
	areaServed: {
		"@type": "City",
		name: "Bandung",
		address: {
			"@type": "PostalAddress",
			addressLocality: "Bandung",
			addressRegion: "West Java",
			addressCountry: "ID",
		},
	},
} as const;

export const websiteJsonLd = {
	"@context": "https://schema.org",
	"@type": "WebSite",
	name: site.name,
	url: absoluteUrl("/"),
	description: site.description,
	inLanguage: site.language,
	publisher: {
		"@id": `${absoluteUrl("/")}#organization`,
	},
} as const;
