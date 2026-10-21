import {
	Activity,
	HatGlasses,
	Image,
	Shield,
	Smartphone,
	Zap,
} from "lucide-react";
import type { ReactNode } from "react";

const items: { icon: ReactNode; title: string; body: string }[] = [
	{
		icon: <Activity size={20} strokeWidth={1.75} />,
		title: "Live progress",
		body: "Watching / Paused states, elapsed time and time remaining using Discord timestamps.",
	},
	{
		icon: <Image size={20} strokeWidth={1.75} />,
		title: "Real cover art",
		body: "Pulls high-quality covers, with an AniList fallback for sites that protect their assets.",
	},
	{
		icon: <Zap size={20} strokeWidth={1.75} />,
		title: "Zero overhead",
		body: "Lives entirely in your browser. No Electron app, no background middleware.",
	},
	{
		icon: <Smartphone size={20} strokeWidth={1.75} />,
		title: "Works on mobile",
		body: "Runs on Android browsers with extension support, with a custom mobile sign-in flow.",
	},
	{
		icon: <HatGlasses size={20} strokeWidth={1.75} />,
		title: "Privacy toggle",
		body: "Hides which anime you watch. Discord only shows 'Anime — Private Session'.",
	},
	{
		icon: <Shield size={20} strokeWidth={1.75} />,
		title: "Broadcast toggle",
		body: "Switch broadcasting off from the popup without ever logging out of Discord.",
	},
];

export function Features() {
	return (
		<section id="features" className="border-t border-line">
			<div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 lg:grid-cols-[0.8fr_1.6fr] lg:gap-20">
				<div className="lg:sticky lg:top-28 lg:self-start">
					<h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
						What the AniKehai Discord extension does
					</h2>
					<p className="mt-5 max-w-sm text-[16px] leading-relaxed text-muted">
						Everything runs in your browser, and you decide what Discord shows.
					</p>
				</div>
				<ul className="grid gap-x-10 sm:grid-cols-2">
					{items.map((f) => (
						<li
							key={f.title}
							className="reveal flex gap-4 border-t border-line py-7"
						>
							<span className="mt-0.5 shrink-0 text-ink">{f.icon}</span>
							<div>
								<h3 className="text-[16px] font-semibold text-ink">
									{f.title}
								</h3>
								<p className="mt-1.5 text-[14.5px] leading-relaxed text-muted">
									{f.body}
								</p>
							</div>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
