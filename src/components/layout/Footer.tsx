import { Link } from "react-router";
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
			<h2 className="text-[14px] font-medium text-ink">{title}</h2>
			<ul className="mt-4 flex flex-col gap-2.5 text-[14px] text-muted">
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
		<footer className="border-t border-line">
			<div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
				<div className="sm:col-span-2 lg:col-span-1">
					<Link to="/" className="inline-flex items-center gap-2.5">
						<img
							src="/favicon.svg"
							alt=""
							width={28}
							height={28}
							className="h-7 w-7 rounded-lg"
						/>
						<span className="font-display text-[18px] font-semibold tracking-tight">
							AniKehai
						</span>
					</Link>
					<p className="mt-4 max-w-xs text-[14px] leading-relaxed text-muted">
						Your current anime episode as a Discord Rich Presence. Free and open
						source.
					</p>
				</div>
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
					title="Help and info"
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
			<div className="border-t border-line">
				<div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-6 text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between">
					<p>© 2026 AniKehai. Version {VERSION}, MIT licensed.</p>
					<p>Not affiliated with Discord Inc. or any listed anime site.</p>
				</div>
			</div>
		</footer>
	);
}
