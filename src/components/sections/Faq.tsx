import { ChevronDown } from "lucide-react";
import { FAQ } from "../../config/data";
import { TROUBLESHOOTING_PATH } from "../../config/pages";
import { SmartLink } from "../ui/SmartLink";

export function Faq() {
	return (
		<section id="faq" className="mx-auto max-w-3xl px-5 py-20">
			<div>
				<p className="text-xs font-semibold tracking-[0.22em] text-cyan">FAQ</p>
				<h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight">
					AniKehai questions, answered
				</h2>
			</div>
			<div className="mt-8">
				<div className="divide-y divide-white/5 overflow-hidden rounded-2xl border border-white/5 bg-panel/40">
					{FAQ.map((f, i) => (
						<details key={f.q} name="faq" open={i === 0} className="group">
							<summary className="flex w-full cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 text-left text-[15px] font-semibold transition-colors marker:hidden hover:bg-white/2 [&::-webkit-details-marker]:hidden">
								<h3>{f.q}</h3>
								<ChevronDown
									size={18}
									className="shrink-0 text-muted transition-transform duration-200 group-open:rotate-180"
								/>
							</summary>
							<p className="px-6 pb-5 text-[14px] leading-relaxed text-muted">
								{f.a}
							</p>
						</details>
					))}
				</div>
			</div>
			<p className="mt-6 text-[14px] text-muted">
				Still stuck?{" "}
				<SmartLink
					href={TROUBLESHOOTING_PATH}
					className="text-cyan hover:underline"
				>
					Fix Rich Presence not showing on Discord
				</SmartLink>
				.
			</p>
		</section>
	);
}
