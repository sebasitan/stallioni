import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function CanonicalManager() {
    const location = useLocation();

    useEffect(() => {
        // Construct the canonical URL using the preferred www domain
        const canonicalUrl = `https://www.stallioni.com${location.pathname}`;

        let link = document.querySelector("link[rel='canonical']");

        if (!link) {
            link = document.createElement("link");
            link.setAttribute("rel", "canonical");
            document.head.appendChild(link);
        }

        link.setAttribute("href", canonicalUrl);
    }, [location.pathname]);

    return null;
}
