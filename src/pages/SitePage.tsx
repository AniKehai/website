import { SiteIcon } from "../components/sections/Sites";
import { ButtonLink, PageShell, Section } from "../components/ui/PageShell";
import { EXTERNAL_REL, SmartLink } from "../components/ui/SmartLink";
import { LINKS, SITES, siteSlug } from "../config/data";
import { TROUBLESHOOTING_PATH } from "../config/pages";
import { usePage } from "../hooks/usePage";

export function SitePage() {
	const page = usePage();
	const site = SITES.find((s) => s.name === page.siteName);
	if (!site) return null;
	const others = SITES.filter((s) => s.name !== site.name);

	return (
		<PageShell
			title={`${site.name} Discord Rich Presence`}
			lead={`Show the anime you're watching on ${site.name} on your Discord profile. AniKehai is a free browser extension for Firefox, Chrome and Android that updates your Rich Presence with the title, episode, cover art and progress.`}
		>
			<Section title={`Supported ${site.name} domains`}>
				<div className="flex items-center gap-3">
					<SiteIcon src={site.favicon} name={site.name} />
					<p>
						AniKehai recognises {site.name} on{" "}
						{site.domains.length === 1 ? "this domain" : "these domains"}:
					</p>
				</div>
				<ul className="list-disc pl-5">
					{site.domains.map((d) => (
						<li key={d}>
							<SmartLink href={`https://${d}`} rel={`nofollow ${EXTERNAL_REL}`}>
								{d}
							</SmartLink>
						</li>
					))}
				</ul>
				<p>
					Streaming sites change domains often. If your {site.name} address
					isn't listed,{" "}
					<SmartLink href={LINKS.issues}>
						open a site request on GitHub
					</SmartLink>
					.
				</p>
			</Section>

			<Section title={`How to show ${site.name} on Discord`}>
				<ol className="list-decimal pl-5">
					<li>
						<SmartLink href="/#install">Install AniKehai</SmartLink> in Firefox,
						Chrome or an Android browser that supports extensions.
					</li>
					<li>
						Open the extension popup, press <strong>Link with Discord</strong>{" "}
						and approve the request.
					</li>
					<li>Open an episode on {site.name}.</li>
					<li>
						Your Discord profile now shows what you're watching and updates as
						you play or pause.
					</li>
				</ol>
				<div className="mt-2">
					<ButtonLink href="/#install">Install AniKehai</ButtonLink>
				</div>
			</Section>

			<Section title={`${site.name} on Discord not showing?`}>
				<p>
					Check that the popup says you're connected, an episode is playing on a
					supported domain, and Discord's “Share your activity” setting is on.
					The{" "}
					<SmartLink href={TROUBLESHOOTING_PATH}>
						full troubleshooting checklist
					</SmartLink>{" "}
					covers the rest.
				</p>
			</Section>

			<Section title="Other supported sites">
				<p className="flex flex-wrap gap-x-4 gap-y-1">
					{others.map((s) => (
						<SmartLink key={s.name} href={`/sites/${siteSlug(s.name)}`}>
							{s.name}
						</SmartLink>
					))}
				</p>
				<p className="text-[13px]">
					AniKehai is not affiliated with {site.name} or Discord Inc.
				</p>
			</Section>
		</PageShell>
	);
}
