import { getAllCharacters } from "../data/charactersData.js";

export function renderCharacterList() {
    const app = document.querySelector("#app");
    const characters = getAllCharacters();

    app.innerHTML = `
    <section class="chat-list-container">
        <h1 class="chat-list-title">Elige tu personaje</h1>
        <div class="chat-list">
            ${characters.map(char => `
                <article class="chat-card">
                    <img src="${char.avatar}" alt="${char.name}" class="chat-card__image" />
                    <div class="chat-card__content">
                        <h2 class="chat-card__name">${char.name}</h2>
                        <p class="chat-card__role">${char.greeting}</p>
                    </div>
                    <a href="${char.route}" class="chat-card__btn">Chatear</a>
                </article>
            `).join("")}
        </div>
    </section>
    `;

    setupCharacterList();
}

function setupCharacterList() {
    // Los links ya tienen href, así que la navegación se maneja con el router
}
