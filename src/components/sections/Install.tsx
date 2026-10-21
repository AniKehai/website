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
		<section id="install" className="mx-auto max-w-6xl px-5 py-20">
			<p className="text-xs font-semibold tracking-[0.22em] text-cyan">
				INSTALLATION
			</p>
			<h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
				Install AniKehai on Firefox, Chrome or Android
			</h2>

			<ul className="mt-8 grid gap-4 md:grid-cols-3">
				{PLATFORMS.map((p) => {
					const Icon = icons[p];
					const guide = GUIDES[p];
					const mine = p === platform;
					return (
						<li key={p}>
							<SmartLink
								href={`/install/${p}`}
								className={`flex h-full flex-col gap-3 rounded-2xl border p-6 transition-colors ${
									mine
										? "border-dusk/60 bg-dusk/10"
										: "border-white/5 bg-panel/60 hover:border-dusk/40"
								}`}
							>
								<span className="flex items-center gap-3">
									<Icon
										size={20}
										className={mine ? "text-dusk" : "text-muted"}
									/>
									<h3 className="font-display text-lg font-bold">
										{guide.label}
									</h3>
									{mine && (
										<span className="ml-auto rounded-full bg-cyan/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-cyan">
											For you
										</span>
									)}
								</span>
								<span className="text-[14px] leading-relaxed text-muted">
									{guide.subtitle}
								</span>
								<span className="mt-auto pt-2 text-[13px] font-medium text-cyan">
									{guide.steps.length}-step install guide
								</span>
							</SmartLink>
						</li>
					);
				})}
			</ul>
		</section>
	);
}
