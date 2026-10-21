import type { Step } from "../../config/data";
import { GuideSteps } from "../ui/GuideSteps";
import { SmartLink } from "../ui/SmartLink";

const STEPS: Step[] = [
	{
		title: "Install the extension",
		body: "Add it to Firefox in one click, or load the release ZIP in a Chromium browser or Kiwi on Android.",
	},
	{
		title: "Link your Discord account",
		body: "Press “Link with Discord” in the popup and approve the request on Discord's own authorization page.",
	},
	{
		title: "Watch anime",
		body: "Open an episode on a supported site. AniKehai reads the title and episode and updates your Rich Presence, including progress and pauses.",
	},
];

export function Overview() {
	return (
		<section className="border-t border-line">
			<div className="mx-auto grid max-w-6xl gap-14 px-5 py-24 lg:grid-cols-2 lg:gap-20">
				<div className="reveal richtext">
					<h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
						What is AniKehai?
					</h2>
					<p className="mt-5 text-[16px] leading-relaxed text-muted">
						<strong>AniKehai</strong> is a free, open-source browser extension
						that shows the anime you're watching as a Discord Rich Presence: the
						title, episode, cover art and a live progress bar. It runs entirely
						in your browser on Firefox, Chrome and other Chromium browsers, and
						on Android, so there's no desktop app to keep open.
					</p>
					<p className="mt-4 text-[16px] leading-relaxed text-muted">
						The name comes from <span lang="ja">気配</span> (<i>kehai</i>),
						Japanese for a presence or the sense that someone is there.{" "}
						<SmartLink href="/about">About the project</SmartLink>.
					</p>
				</div>
				<div className="reveal">
					<h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
						How it works
					</h2>
					<div className="mt-8">
						<GuideSteps steps={STEPS} />
					</div>
				</div>
			</div>
		</section>
	);
}
