import { useLocation } from "react-router";
import { findPage, type PageMeta } from "../config/pages";

export function usePage(): PageMeta {
	return findPage(useLocation().pathname);
}
