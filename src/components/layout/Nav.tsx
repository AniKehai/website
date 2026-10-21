import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { LINKS } from "../../config/data";
import { TROUBLESHOOTING_PATH } from "../../config/pages";
import { SmartLink } from "../ui/SmartLink";

const items = [
	{ href: "/#features", label: "Features" },
	{ href: "/#install", label: "Install" },
	{ href: "/#sites", label: "Sites" },
	{ href: "/#faq", label: "FAQ" },
	{ href: TROUBLESHOOTING_PATH, label: "Help" },
];

export function Nav() {
	const [open, setOpen] = useState(false);

	return (
		<nav
			aria-label="Main"
			className="relative border-b border-white/5 bg-void/80 backdrop-blur-md"
		>
			<div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
				<Link
					to="/"
					onClick={() => setOpen(false)}
					className="group flex items-center gap-2.5"
				>
					<img
						src="/favicon.svg"
						alt=""
						width={28}
						height={28}
						className="h-7 w-7 rounded-lg transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
					/>
					<span className="font-display text-[17px] font-extrabold tracking-tight">
						AniKehai
					</span>
				</Link>
				<div className="flex items-center gap-1 text-[13px] font-medium text-muted">
					{items.map((i) => (
						<SmartLink
							key={i.href}
							href={i.href}
							className="hidden rounded-lg px-3 py-1.5 transition-colors hover:text-ink md:block"
						>
							{i.label}
						</SmartLink>
					))}
					<SmartLink
						href={LINKS.github}
						className="hidden rounded-lg px-3 py-1.5 transition-colors hover:text-ink sm:block"
					>
						GitHub
					</SmartLink>
					<SmartLink
						href={LINKS.discord}
						className="ml-1 rounded-lg bg-dusk px-3.5 py-1.5 text-white transition-colors hover:bg-dusk/85 active:scale-95"
					>
						Discord
					</SmartLink>
					<button
						type="button"
						aria-label={open ? "Close menu" : "Open menu"}
						aria-expanded={open}
						onClick={() => setOpen((v) => !v)}
						className="ml-1 grid h-9 w-9 place-items-center rounded-lg text-ink md:hidden"
					>
						{open ? <X size={20} /> : <Menu size={20} />}
					</button>
				</div>
			</div>
			{open && (
				<div className="absolute inset-x-0 top-full border-b border-white/5 bg-void/95 backdrop-blur-md md:hidden">
					<div className="mx-auto flex max-w-6xl flex-col px-5 py-3 text-[15px]">
						{[...items, { href: LINKS.github, label: "GitHub" }].map((i) => (
							<SmartLink
								key={i.href}
								href={i.href}
								onClick={() => setOpen(false)}
								className="rounded-lg px-2 py-3 text-ink transition-colors hover:bg-white/5"
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
