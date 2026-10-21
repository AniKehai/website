import { Compass, Flame, Smartphone } from "lucide-react";
import { GUIDES, PLATFORMS, type Platform } from "../../config/data";
import { useBrowser } from "../../hooks/useBrowser";
import { SmartLink } from "../ui/SmartLink";

const icons: Record<Platform, typeof Flame> = {
	firefox: Flame,
	chrome: Compass,
	android: Smartphone,
};

export function Install() {
	const { platform } = useBrowser();

	return (
		<section id="install" className="border-y border-line bg-panel">
			<div className="mx-auto max-w-6xl px-5 py-24">
				<h2 className="max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
					Install AniKehai on Firefox, Chrome or Android
				</h2>
				<p className="mt-5 max-w-xl text-[16px] leading-relaxed text-muted">
					Pick your browser for a step-by-step guide.
				</p>

				<ul className="mt-10 grid gap-4 md:grid-cols-3">
					{PLATFORMS.map((p) => {
						const Icon = icons[p];
						const guide = GUIDES[p];
						const mine = p === platform;
						return (
							<li key={p} className="reveal">
								<SmartLink
									href={`/install/${p}`}
									className={`group flex h-full flex-col gap-3 rounded-2xl border p-6 transition-colors ${
										mine
											? "border-ink/50 bg-wine"
											: "border-line bg-void/50 hover:border-mauve hover:bg-void"
									}`}
								>
									<span className="flex items-center gap-3">
										<Icon
											size={20}
											className={mine ? "text-ink" : "text-muted"}
										/>
										<h3 className="font-display text-xl font-semibold">
											{guide.label}
										</h3>
										{mine && (
											<span className="ml-auto rounded-full bg-ink px-2.5 py-0.5 text-[12px] font-semibold text-void">
												For you
											</span>
										)}
									</span>
									<span className="text-[14.5px] leading-relaxed text-muted">
										{guide.subtitle}
									</span>
									<span className="mt-auto pt-3 text-[14px] font-medium text-ink underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-ink">
										{guide.steps.length}-step install guide
									</span>
								</SmartLink>
							</li>
						);
					})}
				</ul>
			</div>
		</section>
	);
}
