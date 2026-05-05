

import { router } from "./router.js";

export function navigateTo(path) {

    history.pushState(null, "", path);

    router();
}

// despues de navigateTo 


export function setupLinkInterception() {
    document.addEventListener('click', (event) => {
    // buscar el <a> mas cercano 

    const link = event.target.closest("a");
    if (!link) return;

    // obtener el href

    const href = link.getAttribute("href");
    if (!href) return;

    // filtros de exclusion: si alguno aplica, no interceptamos

    // click con modificadores (ctrl, cmd, shift, alt) 

const isModified = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    if (isModified) return;

    // Target blank
    if (link.target === '_blank') return;

    // Link externo
    if (link.origin !== window.location.origin) return;

    // Protocolos especiales
    if (href.startsWith('#')) return;
    if (href.startsWith('mailto:')) return;
    if (href.startsWith('tel:')) return;

    // Solo rutas internas absolutas (empiezan con /)
    if (!href.startsWith('/')) return;

    // 4. Si llegamos acá, interceptar
    event.preventDefault();
    navigateTo(href);
    });
}

