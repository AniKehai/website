import { LINKS, type Platform } from "../config/data";

export type BrowserId =
	| "firefox"
	| "chrome"
	| "edge"
	| "brave"
	| "opera"
	| "vivaldi"
	| "samsung"
	| "safari"
	| "other";

export type OsId =
	| "windows"
	| "macos"
	| "linux"
	| "android"
	| "ios"
	| "chromeos"
	| "unknown";

export interface BrowserInfo {
	detected: boolean;
	id: BrowserId;
	name: string;
	os: OsId;
	osName: string;
	platform: Platform | null;
	warn: boolean;
	extensionsUrl: string | null;
	ctaLabel: string;
	ctaHref: string;
	ctaNote: string;
	recommendation: string;
}

const NAMES: Record<BrowserId, string> = {
	firefox: "Firefox",
	chrome: "Chrome",
	edge: "Edge",
	brave: "Brave",
	opera: "Opera",
	vivaldi: "Vivaldi",
	samsung: "Samsung Internet",
	safari: "Safari",
	other: "your browser",
};

const OS_NAMES: Record<OsId, string> = {
	windows: "Windows",
	macos: "macOS",
	linux: "Linux",
	android: "Android",
	ios: "iOS",
	chromeos: "ChromeOS",
	unknown: "your device",
};

const EXT_URLS: Partial<Record<BrowserId, string>> = {
	chrome: "chrome://extensions",
	edge: "edge://extensions",
	brave: "brave://extensions",
	opera: "opera://extensions",
	vivaldi: "vivaldi://extensions",
};

function detectOs(ua: string): OsId {
	if (/android/i.test(ua)) return "android";
	if (/iphone|ipad|ipod/i.test(ua)) return "ios";
	if (/macintosh/i.test(ua) && navigator.maxTouchPoints > 1) return "ios";
	if (/cros/i.test(ua)) return "chromeos";
	if (/windows/i.test(ua)) return "windows";
	if (/mac os/i.test(ua)) return "macos";
	if (/linux/i.test(ua)) return "linux";
	return "unknown";
}

function detectBrowserId(ua: string): BrowserId {
	if (/firefox|fxios/i.test(ua)) return "firefox";
	if (/edg\/|edga|edgios/i.test(ua)) return "edge";
	if (/opr\/|opera/i.test(ua)) return "opera";
	if (/samsungbrowser/i.test(ua)) return "samsung";
	if (/vivaldi/i.test(ua)) return "vivaldi";
	if (/chrome|crios|chromium/i.test(ua)) return "chrome";
	if (/safari/i.test(ua)) return "safari";
	return "other";
}

export function resolve(id: BrowserId, os: OsId): BrowserInfo {
	const base = {
		detected: true,
		id,
		name: NAMES[id],
		os,
		osName: OS_NAMES[os],
	};

	if (id === "firefox" && os !== "ios") {
		return {
			...base,
			platform: "firefox",
			warn: false,
			extensionsUrl: null,
			ctaLabel: "Add to Firefox",
			ctaHref: LINKS.firefox,
			ctaNote: "Free · Firefox Add-ons",
			recommendation:
				"Install straight from the Firefox Add-ons store — one click, automatic updates.",
		};
	}

	if (os === "ios" || id === "safari") {
		return {
			...base,
			platform: null,
			warn: true,
			extensionsUrl: null,
			ctaLabel: "See install options",
			ctaHref: "/#install",
			ctaNote: "Not available on Safari or iOS",
			recommendation: `AniKehai can't run on ${id === "safari" ? "Safari" : "iOS"}. Open this page in Firefox or a Chromium browser on a computer, or use Firefox / Kiwi on Android.`,
		};
	}

	if (os === "android") {
		return {
			...base,
			platform: "android",
			warn: true,
			extensionsUrl: null,
			ctaLabel: "Get it for Android",
			ctaHref: "/#install",
			ctaNote: "Kiwi, Lemur or Firefox · see the guide",
			recommendation: `${NAMES[id]} on Android can't run extensions. Use Kiwi Browser (sideload the ZIP) or switch to Firefox for Android.`,
		};
	}

	return {
		...base,
		platform: "chrome",
		warn: false,
		extensionsUrl: EXT_URLS[id] ?? "chrome://extensions",
		ctaLabel:
			id === "other" ? "Download for Chromium" : `Download for ${NAMES[id]}`,
		ctaHref: LINKS.releases,
		ctaNote: "Free · load unpacked, takes a minute",
		recommendation: `${NAMES[id]} uses the Chromium build: download the ZIP, extract it and load it unpacked. We'll walk you through it.`,
	};
}

export function detectBrowser(): BrowserInfo {
	if (typeof navigator === "undefined") return resolve("chrome", "unknown");
	const ua = navigator.userAgent;
	return resolve(detectBrowserId(ua), detectOs(ua));
}

export const DEFAULT_INFO: BrowserInfo = {
	...resolve("other", "unknown"),
	detected: false,
	warn: false,
	ctaLabel: "Install AniKehai",
	ctaHref: "/#install",
	ctaNote: "Free · Firefox, Chrome & Android",
	recommendation: "",
};
