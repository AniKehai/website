import { LINKS, VERSION } from "../../config/data";
import { Reveal } from "../ui/Reveal";

export function Footer() {
	const links = [
		{ label: "GitHub", href: LINKS.github },
		{ label: "Releases", href: LINKS.releases },
		{ label: "Report an issue", href: LINKS.issues },
		{ label: "Discord", href: LINKS.discord },
	];
	return (
		<footer className="border-t border-white/5">
			<Reveal y={12}>
				<div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-[13px] text-muted sm:flex-row">
					<p>© 2026 AniKehai · v{VERSION} · MIT licensed</p>
					<div className="flex gap-5">
						{links.map((l) => (
							<a
								key={l.label}
								href={l.href}
								target="_blank"
								rel="noreferrer"
								className="transition-colors hover:text-ink"
							>
								{l.label}
							</a>
						))}
					</div>
				</div>
				<p className="px-5 pb-8 text-center text-[11px] text-muted/60">
					Not affiliated with Discord Inc. or any listed anime site.
				</p>
			</Reveal>
		</footer>
	);
}
