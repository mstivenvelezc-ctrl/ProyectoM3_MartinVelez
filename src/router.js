
import { renderHome, disableHome } from "./views/home.js";
import { renderChat } from "./views/chat.js";
import { renderChat1 } from "./views/chat1.js";
import { renderAbout } from "./views/about.js";
import { renderNotFound } from "./views/notFound.js";


const routes = {
    "/": renderHome,
    "/chat": renderChat,
    "/rick-chat": renderChat1,
    "/about": renderAbout,
};


export function router() {
    const path = window.location.pathname;
    
    // Desactivar home si no estamos en esa ruta
    if (path !== "/src") {
        disableHome();
    }
    
    const render = routes[path] || renderNotFound;
    render();
}

