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
			className="mt-3 inline-flex items-center gap-2 rounded-full border border-mauve bg-void px-3.5 py-1.5 font-mono text-[12px] text-ink transition-colors hover:bg-wine active:scale-95"
		>
			{text}
			{done ? <Check size={13} /> : <Copy size={13} />}
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
				<li key={s.title} className="relative flex gap-4 pb-7 last:pb-0">
					{i < steps.length - 1 && (
						<span className="absolute left-3.75 top-9 h-[calc(100%-2.25rem)] w-px bg-mauve/50" />
					)}
					<span className="relative grid h-8 w-8 shrink-0 place-items-center rounded-full border border-mauve font-display text-[14px] font-semibold text-ink">
						{i + 1}
					</span>
					<div className="pt-1">
						<h3 className="text-[16px] font-semibold text-ink">{s.title}</h3>
						<p className="mt-1 text-[14.5px] leading-relaxed text-muted">
							{s.body}
						</p>
						{s.copy && <CopyChip text={copyOverride ?? s.copy} />}
					</div>
				</li>
			))}
		</ol>
	);
}
