import { SmartLink } from "../ui/SmartLink";

const STEPS = [
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
		<section className="mx-auto max-w-6xl px-5 pb-20">
			<div className="grid gap-12 lg:grid-cols-2">
				<div>
					<h2 className="font-display text-3xl font-extrabold tracking-tight">
						What is AniKehai?
					</h2>
					<p className="mt-4 text-[15px] leading-relaxed text-muted">
						<strong className="text-ink">AniKehai</strong> is a free,
						open-source browser extension that shows the anime you're watching
						as a Discord Rich Presence: the title, episode, cover art and a live
						progress bar. It runs entirely in your browser on Firefox, Chrome
						and other Chromium browsers, and on Android, so there's no desktop
						app to keep open.
					</p>
					<p className="mt-4 text-[15px] leading-relaxed text-muted">
						The name comes from <span lang="ja">気配</span> (<i>kehai</i>),
						Japanese for a presence or the sense that someone is there.{" "}
						<SmartLink href="/about" className="text-cyan hover:underline">
							About the project
						</SmartLink>
						.
					</p>
				</div>
				<div>
					<h2 className="font-display text-3xl font-extrabold tracking-tight">
						How it works
					</h2>
					<ol className="mt-4 flex flex-col gap-4">
						{STEPS.map((s, i) => (
							<li key={s.title} className="flex gap-4">
								<span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 bg-void font-display text-[13px] font-bold text-amber">
									{i + 1}
								</span>
								<div>
									<h3 className="text-[15px] font-semibold">{s.title}</h3>
									<p className="mt-0.5 text-[13.5px] leading-relaxed text-muted">
										{s.body}
									</p>
								</div>
							</li>
						))}
					</ol>
				</div>
			</div>
		</section>
	);
}
