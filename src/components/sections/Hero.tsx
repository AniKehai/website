import { Download, Info } from "lucide-react";
import { SITES, VERSION } from "../../config/data";
import { useBrowser } from "../../hooks/useBrowser";
import { PresenceCard } from "../presence/PresenceCard";
import { SmartLink } from "../ui/SmartLink";

export function Hero() {
	const info = useBrowser();

	return (
		<section
			aria-labelledby="hero-title"
			className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 py-12 lg:min-h-[calc(100svh-3.5rem)] lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:py-16"
		>
			<div>
				<h1
					id="hero-title"
					className="font-display text-5xl font-semibold leading-[1.04] tracking-tight sm:text-6xl"
				>
					Show the anime you're watching on Discord.
				</h1>

				<p className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted">
					Let Discord see what you're watching. AniKehai is a free browser
					extension that turns your anime episode into a live Discord Rich
					Presence: title, episode, cover art and a real progress bar. No
					desktop app. No setup beyond one click.
				</p>

				<div className="mt-9 flex flex-wrap items-center gap-3">
					<SmartLink
						href={info.ctaHref}
						className="inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3.5 text-[15px] font-semibold text-void transition-colors hover:bg-ink/85 active:scale-[0.98]"
					>
						<Download size={18} strokeWidth={2.4} />
						{info.ctaLabel}
					</SmartLink>
					<SmartLink
						href="/#install"
						className="rounded-full border border-mauve px-5 py-3.5 text-[14px] font-medium text-ink transition-colors hover:bg-wine"
					>
						Install on other browsers
					</SmartLink>
				</div>

				<div className="mt-6 flex min-h-12 flex-col gap-2 text-[13px] text-muted">
					<p className="flex flex-wrap gap-x-5 gap-y-1">
						<span>{info.ctaNote}</span>
						<span>Version {VERSION}</span>
						<span>{SITES.length} sites supported</span>
					</p>
					{info.warn && (
						<p className="flex items-start gap-2 text-ink">
							<Info size={16} className="mt-0.5 shrink-0" />
							{info.recommendation}
						</p>
					)}
				</div>
			</div>

			<div className="relative isolate animate-rise overflow-hidden rounded-3xl bg-wine px-5 py-12 sm:px-10 sm:py-16">
				<span
					aria-hidden="true"
					className="pointer-events-none absolute -right-2 top-1/2 -translate-y-1/2 select-none font-jp text-[9rem] font-black leading-none text-plum/70 [writing-mode:vertical-rl] sm:text-[13rem]"
				>
					気配
				</span>
				<div className="relative flex flex-col items-start">
					<PresenceCard />
				</div>
			</div>
		</section>
	);
}
