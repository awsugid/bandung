import { mkdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const OUTPUT_DIR = "public/og";
const LOGO_PATH = "public/images/awsug-bandung-logo.png";
const WIDTH = 1200;
const HEIGHT = 630;

const colors = {
	ink: "#182230",
	softInk: "#344054",
	muted: "#667085",
	line: "#d0d5dd",
	paper: "#fbfcfd",
	frost: "#f2f4f7",
	orange: "#ff9900",
};

const pages = [
	{
		slug: "home",
		title: ["Learn AWS Cloud", "with builders in Bandung."],
		footer: "Community meetups, technical talks, and cloud learning.",
	},
	{
		slug: "events",
		title: ["Meetups for AWS builders", "in Bandung."],
		footer: "Upcoming and past sessions from the Bandung community.",
	},
];

function escapeXml(value) {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}

function buildTitle(lines) {
	return lines
		.map(
			(line, index) =>
				`<text x="96" y="${282 + index * 84}" fill="${colors.ink}" font-family="Amazon Ember, Arial, sans-serif" font-size="74" font-weight="800">${escapeXml(line)}</text>`,
		)
		.join("\n");
}

function buildSvg(page, logoDataUrl) {
	return `<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
		<defs>
			<linearGradient id="paper" x1="0%" y1="0%" x2="100%" y2="100%">
				<stop offset="0%" stop-color="${colors.paper}" />
				<stop offset="100%" stop-color="${colors.frost}" />
			</linearGradient>
		</defs>

		<rect width="${WIDTH}" height="${HEIGHT}" fill="url(#paper)" />
		<rect x="0" y="0" width="18" height="${HEIGHT}" fill="${colors.orange}" />

		<g transform="translate(96 84)">
			<image href="${logoDataUrl}" x="0" y="0" width="48" height="48" preserveAspectRatio="xMidYMid meet" />
			<text x="68" y="31" fill="${colors.ink}" font-family="Amazon Ember, Arial, sans-serif" font-size="24" font-weight="800">AWS User Group Bandung</text>
		</g>

		<line x1="96" y1="172" x2="1104" y2="172" stroke="${colors.line}" stroke-width="1" />

		${buildTitle(page.title)}

		<line x1="96" y1="484" x2="232" y2="484" stroke="${colors.orange}" stroke-width="4" />
		<text x="96" y="542" fill="${colors.softInk}" font-family="Amazon Ember, Arial, sans-serif" font-size="24" font-weight="700">${escapeXml(page.footer)}</text>
		<text x="96" y="578" fill="${colors.muted}" font-family="Amazon Ember, Arial, sans-serif" font-size="17" font-weight="700">bandung.awscommunity.id</text>
	</svg>`;
}

async function main() {
	await mkdir(OUTPUT_DIR, { recursive: true });
	const logo = await readFile(LOGO_PATH);
	const logoDataUrl = `data:image/png;base64,${logo.toString("base64")}`;

	for (const page of pages) {
		await sharp(Buffer.from(buildSvg(page, logoDataUrl)))
			.png()
			.toFile(join(OUTPUT_DIR, `${page.slug}.png`));

		console.log(`Generated ${OUTPUT_DIR}/${page.slug}.png`);
	}
}

main().catch((error) => {
	console.error("Failed to generate OG images:", error);
	process.exit(1);
});
