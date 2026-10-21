import { GuideSteps } from "../components/ui/GuideSteps";
import { ButtonLink, PageShell, Section } from "../components/ui/PageShell";
import { SmartLink } from "../components/ui/SmartLink";
import {
	GUIDES,
	LINKS,
	PLATFORMS,
	type Platform,
	SITES,
	siteSlug,
} from "../config/data";
import { installName, TROUBLESHOOTING_PATH } from "../config/pages";
import { CHROME_STORE_URL } from "../config/site";
import { useBrowser } from "../hooks/useBrowser";
import { usePage } from "../hooks/usePage";

const REQUIREMENTS: Record<Platform, string[]> = {
	firefox: [
		"Firefox on Windows, macOS, Linux or Android.",
		"A Discord account to link.",
		"Installing from Firefox Add-ons gives you automatic updates.",
	],
	chrome: [
		"A Chromium browser on a computer: Chrome, Edge, Brave, Opera or Vivaldi.",
		"A Discord account to link.",
		"Developer mode must be on to load the unpacked extension.",
	],
	android: [
		"An Android browser that supports extensions: Kiwi Browser, Lemur Browser or Firefox for Android.",
		"A Discord account to link.",
		"Chrome for Android can't run extensions, and iOS and Safari are not supported.",
	],
};

function primaryAction(p: Platform) {
	if (p === "firefox")
		return { label: "Open Firefox Add-ons", href: LINKS.firefox };
	if (p === "chrome" && CHROME_STORE_URL)
		return { label: "Open Chrome Web Store", href: CHROME_STORE_URL };
	return { label: "Download release ZIP", href: LINKS.releases };
}

export function InstallPage() {
	const p = usePage().platform as Platform;
	const { extensionsUrl } = useBrowser();
	const guide = GUIDES[p];
	const primary = primaryAction(p);
	const others = PLATFORMS.filter((x) => x !== p);

	return (
		<PageShell
			title={`How to install AniKehai on ${installName(p)}`}
			lead={`${guide.subtitle} AniKehai is a free extension that shows the anime you're watching as a Discord Rich Presence, with no desktop app.`}
		>
			<Section title="Before you start">
				<ul className="list-disc pl-5">
					{REQUIREMENTS[p].map((r) => (
						<li key={r}>{r}</li>
					))}
				</ul>
			</Section>

			<section>
				<h2 className="font-display text-2xl font-extrabold tracking-tight">
					{guide.label} install steps
				</h2>
				<div className="mt-5 rounded-2xl border border-white/5 bg-panel/60 p-6">
					<GuideSteps
						steps={guide.steps}
						copyOverride={p === "chrome" ? extensionsUrl : null}
					/>
				</div>
				<div className="mt-5 flex flex-wrap gap-3">
					<ButtonLink href={primary.href}>{primary.label}</ButtonLink>
					{p === "android" && (
						<SmartLink
							href={LINKS.kiwi}
							className="rounded-lg border border-white/10 px-4 py-2.5 text-[14px] font-medium transition-colors hover:bg-white/5"
						>
							Kiwi Browser release
						</SmartLink>
					)}
				</div>
			</section>

			<Section title="After installing: link Discord">
				<p>
					Click the AniKehai icon in your toolbar (or in the browser menu on
					mobile), press <strong>Link with Discord</strong> and approve the
					request on Discord's own authorization page. Then open any episode on
					a <SmartLink href="/#sites">supported anime site</SmartLink> and your
					Rich Presence updates automatically.
				</p>
				<p>
					Nothing showing? Follow the{" "}
					<SmartLink href={TROUBLESHOOTING_PATH}>
						Rich Presence not showing checklist
					</SmartLink>
					.
				</p>
			</Section>

			<Section title="Works with these sites">
				<p className="flex flex-wrap gap-x-4 gap-y-1">
					{SITES.map((s) => (
						<SmartLink key={s.name} href={`/sites/${siteSlug(s.name)}`}>
							{s.name}
						</SmartLink>
					))}
				</p>
			</Section>

			<Section title="Other browsers">
				<p className="flex flex-wrap gap-x-4 gap-y-1">
					{others.map((o) => (
						<SmartLink key={o} href={`/install/${o}`}>
							Install on {installName(o)}
						</SmartLink>
					))}
				</p>
			</Section>
		</PageShell>
	);
}
