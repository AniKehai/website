import {
	GUIDES,
	LINKS,
	PLATFORMS,
	SITES,
	siteSlug,
	VERSION,
} from "../../config/data";
import { TROUBLESHOOTING_PATH } from "../../config/pages";
import { SmartLink } from "../ui/SmartLink";

function Col({
	title,
	links,
}: {
	title: string;
	links: { label: string; href: string }[];
}) {
	return (
		<div>
			<h2 className="text-[13px] font-semibold text-ink">{title}</h2>
			<ul className="mt-3 flex flex-col gap-2 text-[13px] text-muted">
				{links.map((l) => (
					<li key={l.href}>
						<SmartLink
							href={l.href}
							className="transition-colors hover:text-ink"
						>
							{l.label}
						</SmartLink>
					</li>
				))}
			</ul>
		</div>
	);
}

export function Footer() {
	return (
		<footer className="border-t border-white/5">
			<div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4">
				<Col
					title="Install"
					links={PLATFORMS.map((p) => ({
						label: `AniKehai for ${GUIDES[p].label}`,
						href: `/install/${p}`,
					}))}
				/>
				<Col
					title="Supported sites"
					links={SITES.slice(0, 6).map((s) => ({
						label: s.name,
						href: `/sites/${siteSlug(s.name)}`,
					}))}
				/>
				<Col
					title="Help & info"
					links={[
						{ label: "Rich Presence not showing?", href: TROUBLESHOOTING_PATH },
						{ label: "Changelog", href: "/changelog" },
						{ label: "Privacy & permissions", href: "/privacy" },
						{ label: "About AniKehai", href: "/about" },
						{
							label: "PreMiD alternative",
							href: "/compare/premid-alternative",
						},
					]}
				/>
				<Col
					title="Community"
					links={[
						{ label: "GitHub", href: LINKS.github },
						{ label: "Releases", href: LINKS.releases },
						{ label: "Report an issue", href: LINKS.issues },
						{ label: "Discord server", href: LINKS.discord },
					]}
				/>
			</div>
			<div className="mx-auto max-w-6xl border-t border-white/5 px-5 py-6 text-center text-[12px] text-muted sm:text-left">
				<p>© 2026 AniKehai · v{VERSION} · MIT licensed</p>
				<p className="mt-1 text-[11px] text-muted/70">
					Not affiliated with Discord Inc. or any listed anime site.
				</p>
			</div>
		</footer>
	);
}
