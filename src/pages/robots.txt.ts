import type { APIRoute } from "astro";
import { absoluteUrl } from "@/lib/site";

const allowedAiCrawlers = [
	"OAI-SearchBot",
	"ChatGPT-User",
	"GPTBot",
	"Google-Extended",
	"ClaudeBot",
	"Claude-User",
	"anthropic-ai",
	"PerplexityBot",
	"Perplexity-User",
	"CCBot",
];

export const GET: APIRoute = () => {
	const aiCrawlerPolicy = allowedAiCrawlers
		.map((crawler) => `User-agent: ${crawler}\nAllow: /`)
		.join("\n\n");

	return new Response(
		`User-agent: *
Allow: /

${aiCrawlerPolicy}

Sitemap: ${absoluteUrl("/sitemap.xml")}
`,
		{
			headers: {
				"Content-Type": "text/plain; charset=utf-8",
			},
		},
	);
};
