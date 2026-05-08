import { router } from "./router.js";
import { setupLinkInterception } from "./navigation.js";

// Interceptar clics en links para navegación SPA
setupLinkInterception();

// Manejar el botón atrás del navegador
window.addEventListener("popstate", router);

// Renderizar la vista inicial
router();
