import { router } from "./router.js";

export function setupLinkInterception() {
    document.addEventListener("click", (event) => {
        const $link = event.target.closest("a");

        if (!$link) return;

        const href = $link.getAttribute("href");

        // Ignorar links externos o especiales
        if (!href || href.startsWith("http") || href.startsWith("mailto") || href.startsWith("#")) {
            return;
        }

        event.preventDefault();

        // Si la ruta es diferente, actualizar el historial y renderizar
        if (window.location.pathname !== href) {
            window.history.pushState(null, "", href);
            router();
        }
    });
}
