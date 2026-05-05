import { renderChat1 } from "./chat1.js";
import { renderChat2 } from "./chat2.js";
import { renderChat3 } from "./chat3.js";

// Datos de personajes
const characters = [
    {
        id: 1,
        name: "María González",
        image: "/src/img/perfil.jpg",
        render: renderChat1
    },
    {
        id: 2,
        name: "Carolina Ruiz",
        image: "/src/img/perfil2.jpg",
        render: renderChat2
    },
    {
        id: 3,
        name: "Adriana Trujillo",
        image: "/src/img/perfil3.jpg",
        render: renderChat3
    }
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
