import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { LINKS } from "../../config/data";
import { TROUBLESHOOTING_PATH } from "../../config/pages";
import { SmartLink } from "../ui/SmartLink";

const items = [
	{ href: "/#features", label: "Features" },
	{ href: "/#sites", label: "Sites" },
	{ href: "/#faq", label: "FAQ" },
	{ href: TROUBLESHOOTING_PATH, label: "Help" },
];

const mobileItems = [
	{ href: "/#install", label: "Install" },
	...items,
	{ href: LINKS.github, label: "GitHub" },
	{ href: LINKS.discord, label: "Discord" },
];

export function Nav() {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setOpen(false);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open]);

	return (
		<nav
			aria-label="Main"
			className="relative border-b border-line bg-void/85 backdrop-blur-md"
		>
			<div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
				<Link
					to="/"
					onClick={() => setOpen(false)}
					className="flex items-center gap-2.5"
				>
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

				<div className="flex items-center gap-1 text-[14px] font-medium text-muted">
					{items.map((i) => (
						<SmartLink
							key={i.href}
							href={i.href}
							className="hidden rounded-full px-3.5 py-1.5 transition-colors hover:text-ink md:block"
						>
							{i.label}
						</SmartLink>
					))}
					<SmartLink
						href={LINKS.github}
						className="hidden rounded-full px-3.5 py-1.5 transition-colors hover:text-ink md:block"
					>
						GitHub
					</SmartLink>
					<SmartLink
						href="/#install"
						onClick={() => setOpen(false)}
						className="ml-2 rounded-full bg-ink px-4 py-1.5 font-semibold text-void transition-colors hover:bg-ink/85 active:scale-[0.97]"
					>
						Install
					</SmartLink>
					<button
						type="button"
						aria-label={open ? "Close menu" : "Open menu"}
						aria-expanded={open}
						aria-controls="mobile-menu"
						onClick={() => setOpen((v) => !v)}
						className="ml-1 grid h-9 w-9 place-items-center rounded-full text-ink md:hidden"
					>
						{open ? <X size={20} /> : <Menu size={20} />}
					</button>
				</div>
			</div>

			{open && (
				<div
					id="mobile-menu"
					className="absolute inset-x-0 top-full animate-drop border-b border-line bg-void/95 backdrop-blur-md md:hidden"
				>
					<div className="mx-auto flex max-w-6xl flex-col px-5 py-3 text-[16px]">
						{mobileItems.map((i) => (
							<SmartLink
								key={i.href}
								href={i.href}
								onClick={() => setOpen(false)}
								className="rounded-xl px-2 py-3.5 text-ink transition-colors hover:bg-panel"
							>
								{i.label}
							</SmartLink>
						))}
					</div>
				</div>
			)}
		</nav>
	);
}
