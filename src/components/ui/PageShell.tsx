import type { ReactNode } from "react";
import type { Crumb } from "../../config/pages";
import { usePage } from "../../hooks/usePage";
import { SmartLink } from "./SmartLink";

export function formatDate(iso: string) {
	return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
		timeZone: "UTC",
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
	if (crumbs.length < 2) return null;
	return (
		<nav aria-label="Breadcrumb" className="text-[13px] text-muted">
			<ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
				{crumbs.map((c, i) => {
					const last = i === crumbs.length - 1;
					return (
						<li key={c.path} className="flex items-center gap-2">
							{last ? (
								<span aria-current="page" className="text-ink">
									{c.name}
								</span>
							) : (
								<SmartLink
									href={c.path}
									className="transition-colors hover:text-ink"
								>
									{c.name}
								</SmartLink>
							)}
							{!last && <span aria-hidden="true">/</span>}
						</li>
					);
				})}
			</ol>
		</nav>
	);
}

export function PageShell({
	title,
	lead,
	children,
}: {
	title: string;
	lead: ReactNode;
	children: ReactNode;
}) {
	const page = usePage();
	return (
		<article className="mx-auto max-w-3xl px-5 pb-24 pt-10">
			<Breadcrumbs crumbs={page.crumbs} />
			<h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
				{title}
			</h1>
			<p className="mt-5 text-[17px] leading-relaxed text-muted">{lead}</p>
			<div className="mt-10 flex flex-col gap-10">{children}</div>
			{page.kind !== "notfound" && (
				<p className="mt-14 text-xs text-muted">
					Last updated{" "}
					<time dateTime={page.updated}>{formatDate(page.updated)}</time>
				</p>
			)}
		</article>
	);
}

export function Section({
	title,
	children,
}: {
	title: string;
	children: ReactNode;
}) {
	return (
		<section>
			<h2 className="font-display text-2xl font-extrabold tracking-tight">
				{title}
			</h2>
			<div className="mt-3 flex flex-col gap-3 text-[15px] leading-relaxed text-muted [&_a]:text-cyan [&_a:hover]:underline [&_strong]:text-ink">
				{children}
			</div>
		</section>
	);
}

export function ButtonLink({
	href,
	children,
}: {
	href: string;
	children: ReactNode;
}) {
	return (
		<SmartLink
			href={href}
			className="inline-flex w-fit items-center rounded-lg bg-dusk px-4 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-dusk/85"
		>
			{children}
		</SmartLink>
	);
}
