import type { ComponentProps } from "react";
import { Link } from "react-router";

export const EXTERNAL_REL = "noopener noreferrer";

type SmartLinkProps = Omit<ComponentProps<"a">, "href"> & { href: string };

export function SmartLink({ href, rel, children, ...props }: SmartLinkProps) {
	if (href.startsWith("/")) {
		return (
			<Link to={href} {...props}>
				{children}
			</Link>
		);
	}
	return (
		<a href={href} target="_blank" rel={rel ?? EXTERNAL_REL} {...props}>
			{children}
		</a>
	);
}
