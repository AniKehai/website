import { Check, Copy } from "lucide-react";
import { useState } from "react";
import type { Step } from "../../config/data";

function CopyChip({ text }: { text: string }) {
	const [done, setDone] = useState(false);
	return (
		<button
			type="button"
			onClick={async () => {
				try {
					await navigator.clipboard.writeText(text);
					setDone(true);
					setTimeout(() => setDone(false), 1500);
				} catch {
					/* clipboard unavailable */
				}
			}}
			className="mt-2 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-void px-3 py-1.5 font-mono text-[12px] text-ink transition-colors hover:border-dusk/50 active:scale-95"
		>
			{text}
			{done ? <Check size={13} className="text-cyan" /> : <Copy size={13} />}
		</button>
	);
}

export function GuideSteps({
	steps,
	copyOverride,
}: {
	steps: Step[];
	copyOverride?: string | null;
}) {
	return (
		<ol className="flex flex-col">
			{steps.map((s, i) => (
				<li key={s.title} className="relative flex gap-4 pb-6 last:pb-0">
					{i < steps.length - 1 && (
						<span className="absolute left-3.75 top-8 h-[calc(100%-2rem)] w-px bg-white/10" />
					)}
					<span className="relative grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 bg-void font-display text-[13px] font-bold text-amber">
						{i + 1}
					</span>
					<div className="pt-0.5">
						<h3 className="text-[15px] font-semibold">{s.title}</h3>
						<p className="mt-0.5 text-[13.5px] leading-relaxed text-muted">
							{s.body}
						</p>
						{s.copy && <CopyChip text={copyOverride ?? s.copy} />}
					</div>
				</li>
			))}
		</ol>
	);
}
