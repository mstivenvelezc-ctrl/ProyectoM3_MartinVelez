// vista de home

import { getFirstCharacterByName } from "../services/rmApi.js";
import { toCharacterProfile } from "../transform/characters.js";
import { renderCharacterCard } from "../ui/characterCard.js";
import { getUserMessage } from "../ui/messages.js";

const state = {
    status: "idle",
    profile: null,
    errorMessage: null,
    currentName: "Rick",
};

let isHomeActive = false;
let lastLoadedCharacter = null;

export function disableHome() {
    isHomeActive = false;
}

export function renderHome() {
    isHomeActive = true;
    const app = document.querySelector("#app");
    app.innerHTML = `
    <section class="view view--home">
        <h1>Chatea con tu personaje favorito</h1>
        <p>Una experiencia conversacional con IA, con tus personajes favoritos de Rick and Morty.</p>

        <form class="characterForm" id="characterForm">
            <div class="characterForm__wrapper">
                <input class="characterForm__input"
                id="characterInput"
                type="text"
                value="${state.currentName}"
                placeholder="Nombre del personaje"
                aria-label="Nombre del personaje"
                ${state.status === "loading" ? "disabled" : ""}/>
                <ul class="characterForm__suggestions" id="characterSuggestions" style="display: none;"></ul>
            </div>
            <button class="characterForm__button" type="submit"
                ${state.status === "loading" ? "disabled" : ""}>
            Cambiar personaje </button>
        </form>    

        <div id="characterContainer">${renderContainer()}</div>

        <p style="text-align:center; margin-top: 2rem;">
            <a class="btn btn--primary" href="/chat">Empezar a chatear</a>
        </p>
    </section>
    `;

    setupHome();

    if (state.status === "idle" && lastLoadedCharacter !== state.currentName) {
        lastLoadedCharacter = state.currentName;
        loadCharacterByName(state.currentName);
    }
}

function renderContainer() {
    if (state.status === "loading") {
        return `<p class="homeStatus homeStatus--loading">Cargando personaje...</p>`;
    }
    if (state.status === "error") {
        return `<p class="homeStatus homeStatus--error">${state.errorMessage}</p>`;
    }
    if (state.profile) {
        const { name, image, status, species, originName, locationName } = state.profile;
        return `
        <article class="characterCard">
            <div class="characterCard__image-wrapper">
                <img class="characterCard__image" src="${image}" alt="${name}" />
            </div>
            <div class="characterCard__body">
                <h2 class="characterCard__name">${name}</h2>
                <p class="characterCard__meta">${status} - ${species}<br/><strong>Origen:</strong> ${originName}</p>
                <p class="characterCard__detail"><strong>Ubicación:</strong> ${locationName}</p>
            </div>
        </article>
        `;
    }
    return "";
}

function setState(updates) {
    if (!isHomeActive) return;
    Object.assign(state, updates)
    renderHome();
}

function setupHome() {
    const $form = document.querySelector("#characterForm");
    const $input = document.querySelector("#characterInput");
    const $suggestions = document.querySelector("#characterSuggestions");

    // Sugerencias de personajes a mostrar
    const suggestionsList = ["Rick", "Morty", "Summer"];

    // Mostrar sugerencias al hacer click en el input
    $input.addEventListener("click", () => {
        $suggestions.innerHTML = suggestionsList.map(character => `
            <li class="characterForm__suggestion" data-character="${character}">
                ${character}
            </li>
        `).join("");
        $suggestions.style.display = "block";

        // Agregar listeners a cada sugerencia
        $suggestions.querySelectorAll(".characterForm__suggestion").forEach(item => {
            item.addEventListener("click", (e) => {
                const characterName = e.target.getAttribute("data-character");
                $input.value = characterName;
                $suggestions.style.display = "none";
                setState({ currentName: characterName });
                loadCharacterByName(characterName);
            });
        });
    });

    // Ocultar sugerencias al hacer click fuera
    document.addEventListener("click", (e) => {
        if (!e.target.closest("#characterForm")) {
            $suggestions.style.display = "none";
        }
    });

    $form.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = $input.value.trim();

        if (!name) {
            setState({
                status: "error",
                errorMessage: "Escribir un nombre para buscar.",
            });
            return;
        }

        setState({ currentName: name });
        loadCharacterByName(name);
        $suggestions.style.display = "none";
    });
}

async function loadCharacterByName(name) {
    setState({ status: "loading", errorMessage: null });

    try {
        const raw = await getFirstCharacterByName(name);
        const profile = toCharacterProfile(raw);
        setState({ status: "idle", profile });
    } catch (err) {
        setState({
            status: "error",
            errorMessage: getUserMessage(err),
        });
    }
}