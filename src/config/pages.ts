import { GUIDES, PLATFORMS, type Platform, SITES, siteSlug } from "./data";
import { UPDATED } from "./site";

export type PageKind =
	| "home"
	| "install"
	| "site"
	| "troubleshooting"
	| "changelog"
	| "privacy"
	| "about"
	| "compare"
	| "notfound";

export interface Crumb {
	name: string;
	path: string;
}

export interface PageMeta {
	path: string;
	kind: PageKind;
	title: string;
	description: string;
	updated: string;
	crumbs: Crumb[];
	platform?: Platform;
	siteName?: string;
	noindex?: boolean;
}

const HOME: Crumb = { name: "Home", path: "/" };

export const TROUBLESHOOTING_PATH =
	"/troubleshooting/discord-rich-presence-not-showing";

const INSTALL_META: Record<
	Platform,
	{ title: string; description: string; name: string }
> = {
	firefox: {
		name: "Firefox",
		title: "Install AniKehai on Firefox — Anime Discord Rich Presence",
		description:
			"Add AniKehai to Firefox (desktop or Android) in one click and show the anime you're watching on Discord. Free, no desktop app needed.",
	},
	chrome: {
		name: "Chrome, Edge & Brave",
		title: "Install AniKehai on Chrome, Edge & Brave — Discord Anime RPC",
		description:
			"Step-by-step guide to load the AniKehai Discord Rich Presence extension in Chrome, Edge, Brave, Opera or Vivaldi using the release ZIP.",
	},
	android: {
		name: "Android",
		title: "AniKehai on Android — Discord Anime Rich Presence (Kiwi)",
		description:
			"Show your anime on Discord from your phone: install AniKehai in Firefox for Android, or sideload it in Kiwi or Lemur Browser.",
	},
};

export const installName = (p: Platform) => INSTALL_META[p].name;

function build(): PageMeta[] {
	const pages: PageMeta[] = [
		{
			path: "/",
			kind: "home",
			title: "Anime Discord Rich Presence Extension — AniKehai",
			description:
				"Show the anime you're watching on your Discord profile. AniKehai is a free, standalone Rich Presence extension for Firefox, Chrome and Android — no desktop app.",
			updated: UPDATED,
			crumbs: [HOME],
		},
	];

	for (const p of PLATFORMS) {
		pages.push({
			path: `/install/${p}`,
			kind: "install",
			platform: p,
			title: INSTALL_META[p].title,
			description: INSTALL_META[p].description,
			updated: UPDATED,
			crumbs: [
				HOME,
				{ name: "Install", path: "/#install" },
				{ name: GUIDES[p].label, path: `/install/${p}` },
			],
		});
	}

	for (const s of SITES) {
		pages.push({
			path: `/sites/${siteSlug(s.name)}`,
			kind: "site",
			siteName: s.name,
			title: `${s.name} Discord Rich Presence — AniKehai`,
			description: `Show the episode you're watching on ${s.name} (${s.domains[0]}) as a live Discord Rich Presence. Free AniKehai extension for Firefox, Chrome and Android.`,
			updated: UPDATED,
			crumbs: [
				HOME,
				{ name: "Supported sites", path: "/#sites" },
				{ name: s.name, path: `/sites/${siteSlug(s.name)}` },
			],
		});
	}

	pages.push(
		{
			path: TROUBLESHOOTING_PATH,
			kind: "troubleshooting",
			title: "Discord Rich Presence Not Showing? Fixes — AniKehai",
			description:
				"AniKehai anime status not showing on Discord? Work through these checks: connection, supported site, Discord activity settings, privacy toggle and browser.",
			updated: UPDATED,
			crumbs: [
				HOME,
				{ name: "Help", path: "/#faq" },
				{ name: "Rich Presence not showing", path: TROUBLESHOOTING_PATH },
			],
		},
		{
			path: "/changelog",
			kind: "changelog",
			title: "AniKehai Changelog & Release Notes",
			description:
				"The current AniKehai release and where to find release notes and downloads for every version of the Discord anime Rich Presence extension.",
			updated: UPDATED,
			crumbs: [HOME, { name: "Changelog", path: "/changelog" }],
		},
		{
			path: "/privacy",
			kind: "privacy",
			title: "Privacy & Permissions — AniKehai",
			description:
				"How the AniKehai extension handles your Discord sign-in, what it reads from supported anime sites, and the controls you have over your Rich Presence.",
			updated: UPDATED,
			crumbs: [HOME, { name: "Privacy", path: "/privacy" }],
		},
		{
			path: "/about",
			kind: "about",
			title: "About AniKehai — What 気配 (Kehai) Means",
			description:
				"AniKehai is a free, open-source Discord Rich Presence extension for anime by Minkxx. Learn what the name 気配 means and how the project works.",
			updated: UPDATED,
			crumbs: [HOME, { name: "About", path: "/about" }],
		},
		{
			path: "/compare/premid-alternative",
			kind: "compare",
			title: "PreMiD Alternative for Anime? AniKehai Compared",
			description:
				"How AniKehai, a standalone anime Discord Rich Presence extension, differs from desktop-app based tools like PreMiD, and who each one suits.",
			updated: UPDATED,
			crumbs: [HOME, { name: "Compare", path: "/compare/premid-alternative" }],
		},
	);
	return pages;
}

export const PAGES: PageMeta[] = build();

export const NOT_FOUND: PageMeta = {
	path: "/404",
	kind: "notfound",
	title: "Page not found — AniKehai",
	description: "This page doesn't exist. Head back to the AniKehai homepage.",
	updated: UPDATED,
	crumbs: [HOME],
	noindex: true,
};

export function normalizePath(path: string): string {
	const p = path
		.split(/[?#]/)[0]
		.replace(/\/+$/, "")
		.replace(/\/index$/, "");
	return p === "" ? "/" : p;
}

export function findPage(path: string): PageMeta {
	const p = normalizePath(path);
	return PAGES.find((x) => x.path === p) ?? NOT_FOUND;
}
