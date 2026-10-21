import { ButtonLink, PageShell, Section } from "../components/ui/PageShell";
import { SmartLink } from "../components/ui/SmartLink";
import { LINKS, VERSION } from "../config/data";

export function Changelog() {
	return (
		<PageShell
			title="AniKehai changelog and release notes"
			lead={`The current AniKehai release is v${VERSION}. Release notes and downloads for every version are published on GitHub.`}
		>
			<Section title={`Latest release: v${VERSION}`}>
				<p>
					Firefox users get updates automatically from Firefox Add-ons. For
					Chrome and other Chromium browsers, download the release ZIP from
					GitHub and load it unpacked.
				</p>
				<div className="flex flex-wrap gap-3">
					<ButtonLink href={LINKS.releases}>
						View v{VERSION} release notes
					</ButtonLink>
				</div>
			</Section>
			<Section title="Older versions">
				<p>
					Every earlier release, with its notes and ZIP downloads, is listed on
					the{" "}
					<SmartLink href={LINKS.allReleases}>GitHub releases page</SmartLink>.
				</p>
			</Section>
		</PageShell>
	);
}
