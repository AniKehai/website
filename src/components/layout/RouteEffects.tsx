import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router";
import type { PageMeta } from "../../config/pages";
import { usePage } from "../../hooks/usePage";
import { type HeadTag, headModel } from "../../lib/head";

const selectorFor = (t: HeadTag) => {
	const { name, property, rel, hreflang } = t.attrs;
	if (name) return `meta[name="${name}"]`;
	if (property) return `meta[property="${property}"]`;
	return hreflang
		? `link[rel="${rel}"][hreflang="${hreflang}"]`
		: `link[rel="${rel}"]`;
};

/** Keeps <title>, meta, canonical and JSON-LD in step with the current route. */
function applyHead(page: PageMeta) {
	const { title, tags, jsonLd } = headModel(page);
	const head = document.head;
	document.title = title;

	const keep = new Set<Element>();
	for (const t of tags) {
		let el = head.querySelector(selectorFor(t));
		if (!el) {
			el = document.createElement(t.tag);
			head.append(el);
		}
		for (const [k, v] of Object.entries(t.attrs)) {
			if (el.getAttribute(k) !== v) el.setAttribute(k, v);
		}
		keep.add(el);
	}
	// e.g. the noindex 404 page has no canonical/hreflang: drop the previous page's.
	head
		.querySelectorAll('link[rel="canonical"], link[rel="alternate"][hreflang]')
		.forEach((el) => {
			if (!keep.has(el)) el.remove();
		});

	let ld = head.querySelector('script[type="application/ld+json"]');
	if (!ld) {
		ld = document.createElement("script");
		ld.setAttribute("type", "application/ld+json");
		head.append(ld);
	}
	if (ld.textContent !== jsonLd) ld.textContent = jsonLd;
}

function targetFor(hash: string): HTMLElement | null {
	try {
		return hash
			? document.getElementById(decodeURIComponent(hash.slice(1)))
			: null;
	} catch {
		return null; // malformed %-escape in the URL
	}
}

/**
 * Everything a full page load used to do for free:
 * head tags, scroll position (top, or the #section) and keyboard focus.
 * Renders nothing.
 */
export function RouteEffects() {
	const page = usePage();
	const loc = useLocation();
	const navType = useNavigationType();
	const firstRun = useRef(true);

	useEffect(() => {
		applyHead(page);
	}, [page]);

	useEffect(() => {
		const initial = firstRun.current;
		firstRun.current = false;

		const target = targetFor(loc.hash);
		if (target) {
			// First load: the browser already jumped to the hash itself.
			if (!initial) target.scrollIntoView();
			return;
		}
		// Back/forward: let the browser restore its own scroll position.
		if (initial || navType === "POP") return;
		window.scrollTo({ top: 0, left: 0, behavior: "instant" });
		document.getElementById("main")?.focus({ preventScroll: true });
	}, [loc, navType]);

	return null;
}
