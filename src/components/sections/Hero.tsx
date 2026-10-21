import { Download } from "lucide-react";
import { SITES, VERSION } from "../../config/data";
import { useBrowser } from "../../hooks/useBrowser";
import { PresenceCard } from "../presence/PresenceCard";
import { SmartLink } from "../ui/SmartLink";

export function Hero() {
	const info = useBrowser();

	return (
		<section
			aria-labelledby="hero-title"
			className="relative flex min-h-[calc(100svh-3.5rem)] flex-col overflow-hidden"
		>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-dusk/20 blur-3xl max-sm:hidden"
			/>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute right-10 top-40 h-80 w-80 rounded-full bg-cyan/10 blur-3xl max-sm:hidden"
			/>
			<span
				aria-hidden="true"
				className="pointer-events-none absolute -right-6 -top-10 select-none font-jp text-[22rem] font-black leading-none text-white/2.5 max-lg:hidden"
			>
				気配
			</span>

			<div className="relative mx-auto grid w-full max-w-6xl flex-1 items-center gap-14 px-5 py-12 lg:grid-cols-[1.15fr_1fr] lg:py-16">
				<div>
					<p className="text-xs font-semibold tracking-[0.22em] text-cyan">
						<span lang="ja">気配</span> · THE PRESENCE OF ANIME
					</p>

					<h1
						id="hero-title"
						className="mt-4 font-display text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl"
					>
						<span className="block">Show the anime</span>
						<span className="block">
							you're watching on{" "}
							<span className="bg-linear-to-r from-amber via-dusk to-cyan bg-clip-text text-transparent">
								Discord.
							</span>
						</span>
					</h1>

					<p className="mt-6 max-w-lg text-[16px] leading-relaxed text-muted">
						Let Discord see what you're watching. AniKehai is a free browser
						extension that turns your anime episode into a live Discord Rich
						Presence — title, episode, cover art and a real progress bar. No
						desktop app. No setup beyond one click.
					</p>

					<div className="mt-8 flex flex-wrap items-center gap-3">
						<SmartLink
							href={info.ctaHref}
							className="inline-flex items-center gap-2.5 rounded-xl bg-dusk px-6 py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-dusk/30 transition hover:-translate-y-0.5 active:scale-[0.97]"
						>
							<Download size={18} strokeWidth={2.4} />
							{info.ctaLabel}
						</SmartLink>
						<SmartLink
							href="/#install"
							className="rounded-xl border border-white/10 px-5 py-3.5 text-[14px] font-medium text-ink transition-colors hover:bg-white/5"
						>
							Install on other browsers
						</SmartLink>
					</div>

					<div className="mt-4 flex min-h-10 flex-col gap-1.5 text-xs text-muted">
						<span>
							{info.ctaNote} · v{VERSION} · {SITES.length} sites supported
						</span>
						{info.warn && (
							<span className="text-amber">{info.recommendation}</span>
						)}
					</div>
				</div>

				<div className="flex flex-col items-center">
					<PresenceCard />
				</div>
			</div>
		</section>
	);
}
