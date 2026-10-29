const env = import.meta.env;

export const SITE_URL: string = (
	env.VITE_SITE_URL || "https://anikehai.vercel.app"
).replace(/\/+$/, "");

export const CHROME_STORE_URL: string = env.VITE_CHROME_STORE_URL || "";

export const PLAUSIBLE_DOMAIN: string = env.VITE_PLAUSIBLE_DOMAIN || "";

export const UPDATED = "2026-10-29";
