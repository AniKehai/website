// Post-build step: renders the React app to static HTML and injects it (plus
// JSON-LD structured data) into dist/index.html so crawlers and link-preview
// bots get real content without running JavaScript.
import { readFile, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const SITE = "https://anikehai.vercel.app";
const root = resolve(import.meta.dirname, "..");
const dist = resolve(root, "dist");
const serverDir = resolve(root, "dist-server");

const { render, FAQ, LINKS, SITES, VERSION } = await import(
	pathToFileURL(resolve(serverDir, "entry-server.js")).href
);

const jsonLd = {
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "WebSite",
			"@id": `${SITE}/#website`,
			url: `${SITE}/`,
			name: "AniKehai",
			description:
				"Show the anime you're watching on your Discord profile with a free, standalone Rich Presence browser extension.",
			inLanguage: "en",
		},
		{
			"@type": "SoftwareApplication",
			"@id": `${SITE}/#software`,
			name: "AniKehai",
			alternateName: ["Ani Kehai", "AniKehai Discord Rich Presence"],
			description:
				"A lightweight, standalone browser extension that broadcasts the anime you're watching to your Discord Rich Presence, with live progress, cover art and a privacy toggle.",
			url: `${SITE}/`,
			image: `${SITE}/og-image.png`,
			applicationCategory: "BrowserApplication",
			operatingSystem: "Windows, macOS, Linux, Android",
			softwareVersion: VERSION,
			downloadUrl: LINKS.firefox,
			installUrl: LINKS.firefox,
			isAccessibleForFree: true,
			offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
			author: {
				"@type": "Person",
				name: "Minkxx",
				url: "https://github.com/minkxx",
			},
			sameAs: [LINKS.github, LINKS.firefox],
			featureList: [
				"Live Discord Rich Presence with title, episode and progress bar",
				"Watching and paused states using Discord timestamps",
				"No desktop app or middleware required",
				"Works on Firefox, Chrome, Chromium browsers and Android",
				"One-click privacy toggle",
				`Supports ${SITES.map((s) => s.name).join(", ")}`,
			],
			mainEntityOfPage: { "@id": `${SITE}/#website` },
		},
		{
			"@type": "FAQPage",
			"@id": `${SITE}/#faq`,
			mainEntity: FAQ.map((f) => ({
				"@type": "Question",
				name: f.q,
				acceptedAnswer: { "@type": "Answer", text: f.a },
			})),
		},
	],
};

// "<" must not appear raw inside an inline <script>.
const ldTag = `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>`;

const htmlPath = resolve(dist, "index.html");
let html = await readFile(htmlPath, "utf8");

if (!html.includes('<div id="root"></div>')) {
	throw new Error(
		"prerender: could not find an empty #root in dist/index.html",
	);
}
html = html.replace(
	'<div id="root"></div>',
	`<div id="root">${render()}</div>`,
);
html = html.includes("<!--prerender-head-->")
	? html.replace("<!--prerender-head-->", ldTag)
	: html.replace("</head>", `${ldTag}</head>`);
await writeFile(htmlPath, html);

// Keep the sitemap's <lastmod> fresh on every build.
const today = new Date().toISOString().slice(0, 10);
const smPath = resolve(dist, "sitemap.xml");
try {
	const sm = await readFile(smPath, "utf8");
	await writeFile(
		smPath,
		sm.replace(/<lastmod>.*?<\/lastmod>/, `<lastmod>${today}</lastmod>`),
	);
} catch {
	/* no sitemap in public/ */
}

await rm(serverDir, { recursive: true, force: true });
console.log(`prerender: wrote ${htmlPath} (+ JSON-LD, lastmod ${today})`);
