import { ButtonLink, PageShell, Section } from "../components/ui/PageShell";
import { SmartLink } from "../components/ui/SmartLink";
import { LINKS, SITES } from "../config/data";

export function About() {
	return (
		<PageShell
			title="About AniKehai"
			lead="AniKehai is a free, open-source browser extension that shows the anime you're watching as a Discord Rich Presence."
		>
			<Section title="What does 気配 (kehai) mean?">
				<p>
					<span lang="ja">気配</span> (<i>kehai</i>) is Japanese for a presence,
					a sign or the feeling that someone is there. That's the idea: your
					friends can sense what you're watching, right on your Discord profile.
				</p>
			</Section>
			<Section title="What it does">
				<p>
					AniKehai turns the episode you're watching into a live Rich Presence
					with the title, episode, cover art and a progress bar that reflects
					playing and paused states. It runs entirely in your browser on
					Firefox, Chromium browsers and Android, with no desktop app. It
					currently supports {SITES.length} anime sites.
				</p>
				<div className="flex flex-wrap gap-3">
					<ButtonLink href="/#install">Install AniKehai</ButtonLink>
				</div>
			</Section>
			<Section title="Who makes it">
				<p>
					AniKehai is built by <SmartLink href={LINKS.author}>Minkxx</SmartLink>{" "}
					and released under the MIT license. Contributions, including new site
					support, are welcome on{" "}
					<SmartLink href={LINKS.github}>GitHub</SmartLink>.
				</p>
			</Section>
			<Section title="More">
				<p className="flex flex-wrap gap-x-4 gap-y-1">
					<SmartLink href="/privacy">Privacy & permissions</SmartLink>
					<SmartLink href="/changelog">Changelog</SmartLink>
					<SmartLink href="/compare/premid-alternative">
						PreMiD alternative
					</SmartLink>
				</p>
				<p className="text-[13px]">
					AniKehai is not affiliated with Discord Inc. or any listed anime site.
				</p>
			</Section>
		</PageShell>
	);
}
