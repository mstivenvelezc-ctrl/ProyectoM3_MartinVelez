
import { toCharacterProfile } from "../transform/characters.js";
import { renderChat1 } from "./chat1.js";


// Datos de personajes
const characters = [
    {
        id: 1,
        name: "Rick Sanchez",
        image: "/src/img/perfil.jpg",
        render: renderChat1
    },
];

export function renderChat() {
    const app = document.querySelector("#app");
    app.innerHTML = `
    <div class="chat-list-container">
        <h1 class="chat-list-title">Selecciona un personaje</h1>
        <div class="chat-list">
            ${characters.map(char => `
                <div class="chat-card">
                    <img src="${char.image}" alt="${char.name}" class="chat-card__image" />
                    <div class="chat-card__content">
                        <h2 class="chat-card__name">${char.name}</h2>
                    </div>
                    <button class="chat-card__btn" data-id="${char.id}">
                        💬 Mensaje
                    </button>
                </div>
            `).join('')}
        </div>
    </div>
    `;

    // Agregar event listeners a los botones
    document.querySelectorAll(".chat-card__btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = parseInt(e.target.getAttribute("data-id"));
            const character = characters.find(c => c.id === id);
            if (character) {
                character.render();
            }
        });
    });
}
