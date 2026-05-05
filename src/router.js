

import { renderHome } from "./views/home.js";
import { renderChat } from "./views/chat.js";
import { renderAbout } from "./views/about.js";
import { renderNotFound } from "./views/notFound.js";
import { renderCharacters } from "./views/characters.js";


const routes = {
    "/src": renderHome,
    "/characters": renderCharacters,
    "/chat": renderChat,
    "/about": renderAbout,
    
};


export function router() {
    const path = window.location.pathname;
    const render = routes[path] || renderNotFound;
    render();
}

