import { FAQ, GUIDES, LINKS, PLATFORMS, SITES, VERSION } from "../config/data";
import { PAGES, type PageMeta, TROUBLESHOOTING_PATH } from "../config/pages";
import {
	CHROME_STORE_URL,
	PLAUSIBLE_DOMAIN,
	SITE_URL,
	UPDATED,
} from "../config/site";
import { abs, headModel, OG_IMAGE } from "./head";

const esc = (s: string) =>
	s
		.replace(/&/g, "&amp;")
		.replace(/"/g, "&quot;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;");

export function headHtml(page: PageMeta): string {
	const { tags, jsonLd } = headModel(page);
	const html = tags.map((t) => {
		const attrs = Object.entries(t.attrs)
			.map(([k, v]) => `${k}="${esc(v)}"`)
			.join(" ");
		return `<${t.tag} ${attrs} />`;
	});
	html.push(`<script type="application/ld+json">${jsonLd}</script>`);
	if (PLAUSIBLE_DOMAIN) {
		html.push(
			`<script defer data-domain="${esc(PLAUSIBLE_DOMAIN)}" src="https://plausible.io/js/script.outbound-links.js"></script>`,
		);
	}
	return html.join("\n\t\t");
}

export function sitemapXml(): string {
	const urls = PAGES.map((p) => {
		const image =
			p.kind === "home"
				? `\n\t\t<image:image>\n\t\t\t<image:loc>${OG_IMAGE}</image:loc>\n\t\t\t<image:title>AniKehai — anime Discord Rich Presence extension</image:title>\n\t\t</image:image>`
				: "";
		return `\t<url>\n\t\t<loc>${abs(p.path)}</loc>\n\t\t<lastmod>${p.updated}</lastmod>${image}\n\t</url>`;
	});
	return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls.join("\n")}\n</urlset>\n`;
}

export function robotsTxt(): string {
	const bots = [
		"GPTBot",
		"OAI-SearchBot",
		"ChatGPT-User",
		"ClaudeBot",
		"Claude-SearchBot",
		"Claude-User",
		"PerplexityBot",
		"Perplexity-User",
		"Google-Extended",
		"Applebot-Extended",
	];
	return `User-agent: *\nAllow: /\n\n# AI / answer-engine crawlers are welcome\n${bots.map((b) => `User-agent: ${b}\nAllow: /`).join("\n")}\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
}

const DEFINITION =
	"AniKehai is a free, open-source, standalone browser extension that shows the anime you are watching as a Discord Rich Presence (title, episode, cover art, live progress bar). It works on Firefox (desktop and Android), Chromium browsers (Chrome, Edge, Brave, Opera, Vivaldi) and Android browsers with extension support such as Kiwi. No desktop app or background middleware is required.";

export function llmsTxt(): string {
	const pages = PAGES.map(
		(p) => `- [${p.title}](${abs(p.path)}): ${p.description}`,
	).join("\n");
	return `# AniKehai\n\n> ${DEFINITION}\n\n## Pages\n${pages}\n\n## Links\n- [Firefox Add-ons](${LINKS.firefox}): one-click install for Firefox\n- [GitHub releases](${LINKS.releases}): Chrome / Chromium / Android ZIP downloads\n- [Source code](${LINKS.github})\n- [Support Discord server](${LINKS.discord})\n${CHROME_STORE_URL ? `- [Chrome Web Store](${CHROME_STORE_URL})\n` : ""}\n## Supported sites\n${SITES.map((s) => s.name).join(", ")}\n\n## Full content\n- [llms-full.txt](${SITE_URL}/llms-full.txt): the whole site as plain Markdown\n`;
}

export function llmsFullTxt(): string {
	const install = PLATFORMS.map((p) => {
		const g = GUIDES[p];
		return `### ${g.label}\n${g.subtitle}\n\n${g.steps.map((s, i) => `${i + 1}. ${s.title} — ${s.body}`).join("\n")}`;
	}).join("\n\n");
	const sites = SITES.map((s) => `- ${s.name}: ${s.domains.join(", ")}`).join(
		"\n",
	);
	const faq = FAQ.map((f) => `### ${f.q}\n${f.a}`).join("\n\n");
	return `# AniKehai — full content\n\nVersion ${VERSION}. Last updated ${UPDATED}.\n\n${DEFINITION}\n\n"AniKehai" comes from 気配 (kehai), Japanese for presence or sign of someone being there.\n\n## Install\n\n${install}\n\n## Supported sites\n\n${sites}\n\n## FAQ\n\n${faq}\n\n## Links\n\n- Website: ${SITE_URL}/\n- Firefox Add-ons: ${LINKS.firefox}\n- Releases: ${LINKS.releases}\n- Source: ${LINKS.github}\n- Troubleshooting: ${abs(TROUBLESHOOTING_PATH)}\n`;
}
