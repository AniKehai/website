import { Plus } from "lucide-react";
import { FAQ } from "../../config/data";
import { TROUBLESHOOTING_PATH } from "../../config/pages";
import { SmartLink } from "../ui/SmartLink";

export function Faq() {
	return (
		<section id="faq" className="border-t border-line">
			<div className="mx-auto grid max-w-6xl gap-10 px-5 py-24 lg:grid-cols-[0.8fr_1.6fr] lg:gap-20">
				<div className="richtext lg:sticky lg:top-28 lg:self-start">
					<h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
						AniKehai questions, answered
					</h2>
					<p className="mt-5 text-[16px] leading-relaxed text-muted">
						Still stuck?{" "}
						<SmartLink href={TROUBLESHOOTING_PATH}>
							Fix Rich Presence not showing on Discord
						</SmartLink>
						.
					</p>
				</div>

				<div className="reveal divide-y divide-line border-y border-line">
					{FAQ.map((f, i) => (
						<details key={f.q} name="faq" open={i === 0} className="group">
							<summary className="flex w-full cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-[16px] font-medium text-ink marker:hidden [&::-webkit-details-marker]:hidden">
								<h3>{f.q}</h3>
								<Plus
									size={18}
									className="shrink-0 text-muted transition-transform duration-200 group-open:rotate-45 group-hover:text-ink"
								/>
							</summary>
							<p className="max-w-2xl pb-6 text-[15px] leading-relaxed text-muted">
								{f.a}
							</p>
						</details>
					))}
				</div>
			</div>
		</section>
	);
}
