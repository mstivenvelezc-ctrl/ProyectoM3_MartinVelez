
import { renderChat1 } from "../views/chat.js";



export function renderCharacterCard(container, profile) {
    container.innerHTML = `

        <article class="characterCard">
            <img class="characterCard__image"
                src="${profile.image}"
                alt="${profile.name}" />
            <div class="characterCard__body">
                <h2 class="characterCard__name">${profile.name}</h2>
                <p class="characterCard__meta">${profile.status} - ${profile.species}
                <strong> Origen: </strong> ${profile.originName}
                </p>
                <p class="characterCard__detail">
                    <strong>Ubicacion: </strong> ${profile.locationName}
                </p>
            </div>
            <button class="btn btn--primary btn-chat" data-chat="1">Empezar a chatear</button>
        </article>

    `;


    // Event listeners para los botones de chat
    document.querySelectorAll(".btn-chat").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const chatNum = e.target.getAttribute("data-chat");
            if (chatNum === "1") {
                renderChat1();
            } else if (chatNum === "2") {
                renderChat2();
            }
        });
    });
}