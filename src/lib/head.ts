import { FAQ, GUIDES, LINKS, SITES, siteSlug, VERSION } from "../config/data";
import { type PageMeta, TROUBLESHOOTING_PATH } from "../config/pages";
import { CHROME_STORE_URL, SITE_URL, UPDATED } from "../config/site";

export const abs = (path: string) =>
	path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;

export const OG_IMAGE = `${SITE_URL}/og-image.png`;
const OG_ALT =
	"AniKehai showing an anime episode as a Discord Rich Presence card";

const sameAs = [
	LINKS.github,
	LINKS.firefox,
	LINKS.author,
	CHROME_STORE_URL,
].filter(Boolean);

function jsonLd(page: PageMeta) {
	const url = abs(page.path);
	const website = { "@id": `${SITE_URL}/#website` };
	const software = { "@id": `${SITE_URL}/#software` };
	const graph: Record<string, unknown>[] = [];

	if (page.kind === "home") {
		graph.push(
			{
				"@type": "WebSite",
				"@id": `${SITE_URL}/#website`,
				url: `${SITE_URL}/`,
				name: "AniKehai",
				description:
					"Show the anime you're watching on your Discord profile with a free, standalone Rich Presence browser extension.",
				inLanguage: "en",
				publisher: { "@id": `${SITE_URL}/#author` },
			},
			{
				"@type": "Person",
				"@id": `${SITE_URL}/#author`,
				name: "Minkxx",
				url: LINKS.author,
				sameAs: [LINKS.author],
			},
			{
				"@type": "SoftwareApplication",
				"@id": `${SITE_URL}/#software`,
				name: "AniKehai",
				alternateName: ["Ani Kehai", "AniKehai Discord Rich Presence"],
				description:
					"A lightweight, standalone browser extension that broadcasts the anime you're watching to your Discord Rich Presence, with live progress, cover art and a privacy toggle.",
				url: `${SITE_URL}/`,
				image: OG_IMAGE,
				screenshot: OG_IMAGE,
				applicationCategory: "BrowserApplication",
				operatingSystem: "Windows, macOS, Linux, Android",
				browserRequirements:
					"Requires Firefox, a Chromium-based browser, or an Android browser with extension support such as Kiwi.",
				softwareVersion: VERSION,
				dateModified: UPDATED,
				license: "https://opensource.org/licenses/MIT",
				downloadUrl: LINKS.firefox,
				installUrl: LINKS.firefox,
				softwareHelp: {
					"@type": "CreativeWork",
					url: abs(TROUBLESHOOTING_PATH),
				},
				releaseNotes: abs("/changelog"),
				isAccessibleForFree: true,
				offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
				author: { "@id": `${SITE_URL}/#author` },
				sameAs,
				featureList: [
					"Live Discord Rich Presence with title, episode and progress bar",
					"Watching and paused states using Discord timestamps",
					"No desktop app or middleware required",
					"Works on Firefox, Chrome, Chromium browsers and Android",
					"One-click privacy toggle",
					`Supports ${SITES.map((s) => s.name).join(", ")}`,
				],
				mainEntityOfPage: website,
			},
			{
				"@type": "FAQPage",
				"@id": `${SITE_URL}/#faq`,
				mainEntity: FAQ.map((f) => ({
					"@type": "Question",
					name: f.q,
					acceptedAnswer: { "@type": "Answer", text: f.a },
				})),
			},
			{
				"@type": "ItemList",
				"@id": `${SITE_URL}/#sites`,
				name: "Anime sites supported by AniKehai",
				itemListElement: SITES.map((s, i) => ({
					"@type": "ListItem",
					position: i + 1,
					name: s.name,
					url: abs(`/sites/${siteSlug(s.name)}`),
				})),
			},
		);
	} else {
		graph.push({
			"@type": "WebPage",
			"@id": `${url}#webpage`,
			url,
			name: page.title,
			description: page.description,
			inLanguage: "en",
			dateModified: page.updated,
			isPartOf: website,
			about: software,
			breadcrumb: { "@id": `${url}#breadcrumb` },
		});
		graph.push({
			"@type": "BreadcrumbList",
			"@id": `${url}#breadcrumb`,
			itemListElement: page.crumbs.map((c, i) => ({
				"@type": "ListItem",
				position: i + 1,
				name: c.name,
				item: abs(c.path),
			})),
		});
		if (page.kind === "install" && page.platform) {
			const g = GUIDES[page.platform];
			graph.push({
				"@type": "HowTo",
				name: `How to install AniKehai on ${g.label}`,
				step: g.steps.map((s, i) => ({
					"@type": "HowToStep",
					position: i + 1,
					name: s.title,
					text: s.body,
				})),
			});
		}
	}
	return { "@context": "https://schema.org", "@graph": graph };
}

export interface HeadTag {
	tag: "meta" | "link";
	attrs: Record<string, string>;
}

export interface HeadModel {
	title: string;
	tags: HeadTag[];
	jsonLd: string;
}

const named = (name: string, content: string): HeadTag => ({
	tag: "meta",
	attrs: { name, content },
});
const prop = (property: string, content: string): HeadTag => ({
	tag: "meta",
	attrs: { property, content },
});
const link = (attrs: Record<string, string>): HeadTag => ({
	tag: "link",
	attrs,
});

export function headModel(page: PageMeta): HeadModel {
	const url = abs(page.path);
	const robots = page.noindex
		? "noindex, follow"
		: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
	const tags: HeadTag[] = [
		named("description", page.description),
		named("robots", robots),
	];
	if (!page.noindex) {
		tags.push(
			link({ rel: "canonical", href: url }),
			link({ rel: "alternate", hreflang: "en", href: url }),
			link({ rel: "alternate", hreflang: "x-default", href: url }),
		);
	}
	tags.push(
		prop("og:type", "website"),
		prop("og:site_name", "AniKehai"),
		prop("og:locale", "en_US"),
		prop("og:url", url),
		prop("og:title", page.title),
		prop("og:description", page.description),
		prop("og:image", OG_IMAGE),
		prop("og:image:type", "image/png"),
		prop("og:image:width", "1200"),
		prop("og:image:height", "630"),
		prop("og:image:alt", OG_ALT),
		named("twitter:card", "summary_large_image"),
		named("twitter:title", page.title),
		named("twitter:description", page.description),
		named("twitter:image", OG_IMAGE),
		named("twitter:image:alt", OG_ALT),
	);
	return {
		title: page.title,
		tags,
		jsonLd: JSON.stringify(jsonLd(page)).replace(/</g, "\\u003c"),
	};
}
