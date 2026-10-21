import { Download } from "lucide-react";
import { useBrowser } from "../../hooks/useBrowser";
import { SmartLink } from "../ui/SmartLink";

export function Closing() {
	const info = useBrowser();

	return (
		<section aria-labelledby="closing-title" className="bg-wine">
			<div className="reveal mx-auto flex max-w-6xl flex-col items-start gap-8 px-5 py-20 md:flex-row md:items-center md:justify-between">
				<div>
					<h2
						id="closing-title"
						className="max-w-xl font-display text-3xl font-semibold tracking-tight sm:text-4xl"
					>
						Put your next episode on your profile.
					</h2>
					<p className="mt-4 text-[16px] text-muted">
						Free, open source and runs in your browser.
					</p>
				</div>
				<SmartLink
					href={info.ctaHref}
					className="inline-flex shrink-0 items-center gap-2.5 rounded-full bg-ink px-6 py-3.5 text-[15px] font-semibold text-void transition-colors hover:bg-ink/85 active:scale-[0.98]"
				>
					<Download size={18} strokeWidth={2.4} />
					{info.ctaLabel}
				</SmartLink>
			</div>
		</section>
	);
}
