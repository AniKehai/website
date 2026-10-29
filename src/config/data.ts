export const VERSION = "2.6.25";

export const LINKS = {
	firefox: "https://addons.mozilla.org/en-US/firefox/addon/anikehai/",
	releases: `https://github.com/minkxx/AniKehai/releases/download/v${VERSION}/anikehai-${VERSION}-chrome.zip`,
	github: "https://github.com/minkxx/AniKehai",
	allReleases: "https://github.com/minkxx/AniKehai/releases",
	author: "https://github.com/minkxx",
	issues: "https://github.com/minkxx/AniKehai/issues",
	contributing:
		"https://github.com/minkxx/AniKehai/blob/main/.github/CONTRIBUTING.md",
	discord: "https://discord.gg/w9Q7YUrzpn",
	kiwi: "https://github.com/kiwibrowser/src.next/releases/tag/14310011181",
} as const;

export interface SiteMeta {
	name: string;
	domains: string[];
	favicon: string;
}

export const SITES: SiteMeta[] = [
	{
		name: "Anikoto",
		domains: [
			"anikototv.to",
			"anikoto.cz",
			"anikoto.me",
			"anikoto.net",
			"anikototv.se",
		],
		favicon: "https://www.google.com/s2/favicons?sz=64&domain=anikototv.to",
	},
	{
		name: "Aniwave",
		domains: ["aniwaves.ru"],
		favicon: "https://www.google.com/s2/favicons?sz=64&domain=aniwaves.ru",
	},
	{
		name: "AnimePahe",
		domains: ["animepahe.pw"],
		favicon: "https://www.google.com/s2/favicons?sz=64&domain=animepahe.pw",
	},
	{
		name: "HiAnime",
		domains: ["hianime.at"],
		favicon: "https://www.google.com/s2/favicons?sz=64&domain=hianime.at",
	},
	{
		name: "Aniwatch",
		domains: ["aniwatch.cx"],
		favicon: "https://www.google.com/s2/favicons?sz=64&domain=aniwatch.cx",
	},
	{
		name: "ReAnime",
		domains: ["reanime.to", "reanime.cz", "reanime.wtf"],
		favicon: "https://www.google.com/s2/favicons?sz=64&domain=reanime.to",
	},
	{
		name: "Miruro",
		domains: ["miruro.cx", "www.miruro.cx"],
		favicon: "https://www.google.com/s2/favicons?sz=64&domain=miruro.cx",
	},
	{
		name: "KissAssAnime",
		domains: ["kaa.lt"],
		favicon: "https://www.google.com/s2/favicons?sz=64&domain=kaa.lt",
	},
	{
		name: "AnimeX",
		domains: ["www.myanimex.com", "myanimex.com"],
		favicon: "https://www.google.com/s2/favicons?sz=64&domain=myanimex.com",
	},
];

export const siteSlug = (name: string) =>
	name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export type Platform = "firefox" | "chrome" | "android";

export interface Step {
	title: string;
	body: string;
	copy?: string;
}

export const GUIDES: Record<
	Platform,
	{ label: string; subtitle: string; steps: Step[] }
> = {
	firefox: {
		label: "Firefox",
		subtitle: "Desktop & Android — one click, auto-updates.",
		steps: [
			{
				title: "Open the Firefox Add-ons page",
				body: "Head to AniKehai on addons.mozilla.org.",
			},
			{
				title: "Click “Add to Firefox”",
				body: "Confirm the permission prompt. That's the whole install.",
			},
		],
	},
	chrome: {
		label: "Chrome",
		subtitle:
			"Chrome, Edge, Brave, Opera, Vivaldi — loaded unpacked until we reach the Web Store.",
		steps: [
			{
				title: "Download the release ZIP",
				body: `Grab anikehai-${VERSION}-chrome.zip from the GitHub Releases page.`,
			},
			{
				title: "Extract the ZIP",
				body: "Unzip it into a normal folder you won't delete.",
			},
			{
				title: "Open the extensions page",
				body: "Paste this into the address bar and press Enter.",
				copy: "chrome://extensions",
			},
			{
				title: "Turn on Developer mode",
				body: "The switch is in the top-right corner.",
			},
			{
				title: "Click “Load unpacked”",
				body: "Select the folder you extracted. Done.",
			},
		],
	},
	android: {
		label: "Android",
		subtitle: "Kiwi or Lemur browser — sideload the ZIP.",
		steps: [
			{
				title: "Install Kiwi Browser",
				body: "Use the official GitHub release of Kiwi (or any Chrome-extension-capable browser like Lemur).",
			},
			{
				title: "Download the ZIP to your phone",
				body: `Get anikehai-${VERSION}-chrome.zip from the Releases page.`,
			},
			{
				title: "Open Extensions",
				body: "In Kiwi, tap the ⋮ menu and choose Extensions.",
			},
			{
				title: "Enable Developer mode",
				body: "Use the toggle at the top right.",
			},
			{
				title: "Load the ZIP",
				body: "Tap “+ (from .zip/.crx/.user.js)” and pick the file. Open AniKehai from the bottom of the ⋮ menu.",
			},
		],
	},
};

export const PLATFORMS = Object.keys(GUIDES) as Platform[];

export const FAQ = [
	{
		q: "Do I need a desktop app running?",
		a: "No. Since v2, AniKehai is fully standalone. The extension signs in with Discord OAuth2 and talks to Discord's gateway over WebSockets straight from your browser — no Electron app or middleware.",
	},
	{
		q: "How do I link my Discord account?",
		a: "Open the extension popup from your toolbar and click “Link with Discord”. You'll be sent to Discord's own authorization page to approve it.",
	},
	{
		q: "Can I hide my activity without logging out?",
		a: "Yes. The popup has a privacy toggle that pauses broadcasting instantly while keeping your Discord account linked.",
	},
	{
		q: "It's not showing anything on my profile.",
		a: "Make sure the popup says you're connected, you're on a supported site with an episode playing, and Discord's “Share your activity” setting is on. Still stuck? Ask in our Discord server or open a GitHub issue.",
	},
	{
		q: "My favourite site isn't supported.",
		a: "Open a site request on GitHub, or add it yourself — each site is a small scraper strategy and the contributing guide walks you through it.",
	},
	{
		q: "Why isn't it on the Chrome Web Store?",
		a: "Not yet. Until then, Chrome installs via “Load unpacked” using the release ZIP. Firefox users get the normal store install.",
	},
	{
		q: "Is AniKehai free and open source?",
		a: "Yes. AniKehai is free to use and its source code is published on GitHub under the MIT license.",
	},
	{
		q: "Which browsers and devices does AniKehai support?",
		a: "Firefox on desktop and Android, Chromium browsers such as Chrome, Edge, Brave, Opera and Vivaldi, and Android browsers that support extensions, like Kiwi. Safari and iOS are not supported.",
	},
	{
		q: "Does AniKehai work on Android?",
		a: "Yes. Install it from Firefox Add-ons in Firefox for Android, or sideload the release ZIP in Kiwi or Lemur Browser. Chrome for Android can't run extensions.",
	},
];
