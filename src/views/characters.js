import { renderChat1 } from "./chat1.js";
import { renderChat2 } from "./chat2.js";
import { renderChat3 } from "./chat3.js";

export function renderCharacters() {
    const app = document.querySelector("#app");
    app.innerHTML = `
    
    <div class="characters-container">
        <div class="card">
            <div class="card__image-wrapper">
                <img class="card__avatar" src="/src/img/perfil.jpg" alt="Avatar del usuario">
            </div>
            <div class="card__content">
                <h2 class="card__name">María González</h2>
                <p class="card__role">Desarrolladora Frontend</p>
                <p class="card__bio">
                    Apasionada por crear interfaces accesibles y responsivas.
                    Especializada en CSS moderno y JavaScript.
                </p>
                <div class="card__actions">
                    <button class="btn btn--primary btn-chat" data-chat="1">
                        Empezar a chatear
                    </button>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card__image-wrapper">
                <img class="card__avatar" src="/src/img/perfil2.jpg" alt="Avatar del usuario">
            </div>
            <div class="card__content">
                <h2 class="card__name">Carolina Ruiz</h2>
                <p class="card__role">Desarrolladora Backend</p>
                <p class="card__bio">
                    Apasionada por crear interfaces accesibles y responsivas.
                    Especializada en NodeJS, SQL, PostgreSQL.
                </p>
                <div class="card__actions">
                    <button class="btn btn--primary btn-chat" data-chat="2">
                        Empezar a chatear
                    </button>
                </div>
            </div>
        </div>

    <div class="card">
            <div class="card__image-wrapper">
                <img class="card__avatar" src="/src/img/perfil3.jpg" alt="Avatar del usuario">
            </div>
            <div class="card__content">
                <h2 class="card__name">Adriana Trujillo</h2>
                <p class="card__role">Desarrolladora Backend</p>
                <p class="card__bio">
                    Apasionada por crear interfaces accesibles y responsivas.
                    Especializada en NodeJS, SQL, PostgreSQL.
                </p>
                <div class="card__actions">
                    <button class="btn btn--primary btn-chat" data-chat="3">
                        Empezar a chatear
                    </button>
                </div>
            </div>
        </div>
    `;

    // Event listeners para los botones de chat
    document.querySelectorAll(".btn-chat").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const chatNum = e.target.getAttribute("data-chat");
            if (chatNum === "1") {
                renderChat1();
            } else if (chatNum === "2") {
                renderChat2();
            } else if (chatNum === "3") {
                renderChat3();
            }
        });
    });
}
