import { renderHome, disableHome } from "./views/home.js";
import { renderCharacterChat, disableChat } from "./views/characterChat.js";
import { renderCharacterList } from "./views/characterList.js";
import { renderAbout } from "./views/about.js";
import { renderNotFound } from "./views/notFound.js";
import { getCharacterById } from "./data/charactersData.js";

export function router() {
    const path = window.location.pathname;
    
    // Desactivar vistas previas
    disableHome();
    disableChat();

    // Rutas estáticas
    if (path === "/") {
        renderHome();
        return;
    }
    
    if (path === "/about") {
        renderAbout();
        return;
    }

    // Ruta para la lista de personajes
    if (path === "/chat") {
        renderCharacterList();
        return;
    }

    // Rutas dinámicas para chats individuales: /chat/:characterId
    const chatMatch = path.match(/^\/chat\/([a-z-]+)$/);
    if (chatMatch) {
        const characterId = chatMatch[1];
        const character = getCharacterById(characterId);
        
        if (character) {
            renderCharacterChat(character);
            return;
        }
    }

    // Si no coincide ninguna ruta
    renderNotFound();
}
