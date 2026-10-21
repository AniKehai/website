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
							{!last && (
								<span aria-hidden="true" className="text-mauve">
									/
								</span>
							)}
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
		<article className="mx-auto max-w-3xl px-5 pb-28 pt-12">
			<Breadcrumbs crumbs={page.crumbs} />
			<h1 className="mt-8 font-display text-4xl font-semibold leading-[1.06] tracking-tight sm:text-5xl">
				{title}
			</h1>
			<p className="richtext mt-6 text-[18px] leading-relaxed text-muted">
				{lead}
			</p>
			<div className="mt-12 flex flex-col gap-12 border-t border-line pt-12">
				{children}
			</div>
			{page.kind !== "notfound" && (
				<p className="mt-16 text-[13px] text-muted">
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
			<h2 className="font-display text-2xl font-semibold tracking-tight">
				{title}
			</h2>
			<div className="richtext mt-4 flex flex-col gap-4 text-[16px] leading-relaxed text-muted">
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
			data-button=""
			className="inline-flex w-fit items-center rounded-full bg-ink px-5 py-2.5 text-[14px] font-semibold text-void transition-colors hover:bg-ink/85 active:scale-[0.98]"
		>
			{children}
		</SmartLink>
	);
}
