
const state = {
    messages: [
        { role: "character", text: "Hola, soy Rick. ¿Qué quieres saber? Belch..."},
    ],
    status: "idle", // idle | loading | error
    error: null,
};

export function renderChat1() {
    const app = document.querySelector("#app");
    app.innerHTML = `

    <div class="chatApp">
        <header class="chatHeader">
            <img src="/src/img/perfil.jpg" alt="Rick" class="chat-avatar" />
            <div class="chatHeader__info">    
            <h1 class="chatHeader__title" ><strong>Chat</strong></h1>
            <h2 class="chatHeader__subtitle"><strong>Rick Sanchez</strong></h2>
            </div> 
        </header>
        
        <main class="chatMessages" id="chatMessages" aria-label="mensajes">
            ${renderMessages()}
            ${renderStatus()}
        </main>
        
        <form class="chatComposer" id="chatComposer">
            <input 
            class="chatComposer__input"
            id="chatInput"
            type="text"
            placeholder="Escribir mensaje..."
            aria-label="escribe tu mensaje"
            ${state.status === "loading" ? "disabled" : ""}
            />
        <button class="chatComposer__send" type="submit" ${state.status === "loading" ? "disabled" : "" }>
            <strong>>>></strong>
        </button>
        </form>
    </div>
    `;

    // luego de cada render: engancha listeners y bajar el scroll.
    setupChat1();
    scrollToBottom();
}

function renderMessages() {
    return state.messages.map(msg => `
        <div class="message message--${msg.role}">${escapeHtml(msg.text)}</div>`)
        .join(``);
}

function renderStatus() {
    if (state.status === "loading") {
        return `<div class="message message--character message--typing">escribiendo...</div>`;
    }
    if (state.status === "error") {
        return `<div class="message message--error">${state.error}</div>`;
    }
    return "";
}

function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
}

function setState(updates) {
    Object.assign(state, updates);
    renderChat1();
}

function setupChat1() {
    const $form = document.querySelector("#chatComposer");
    const $input = document.querySelector("#chatInput");
    const $retry = document.querySelector("#retryBtn");

    $form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const text = $input.value.trim();
        if (!text) return;

        await sendMessage(text);
        $input.value = "";
    });

    $retry?.addEventListener("click", () => {
        if (state.lastUserMessage) {
            sendMessage(state.lastUserMessage, true);
        }
    });

    document.querySelector("#chatInput")?.focus();
}

async function sendMessage(text, isRtry = false) {
    if (!isRtry) {
        setState({
            messages:[...state.messages, { role: "user", text }],
            status: "loading",
            error: null,
            lastUserMessage: text,
        });
    } else {
        setState({ status: "loading", error: null });
}

try {
    const reply = await getCharacterReply(text);
    setState({
        messages: [...state.messages, {role: "character", text: reply }],
        status: "idle",
        error: null,
        lastUserMessage: null,
    });
} catch (err) {
    setState({
        status: "error",
        error: "Ups, no te pude responder. Reintentalo.",
    });
}

}

function scrollToBottom() {
    const $messages = document.querySelector("#chatMessages");
    if ($messages) {
        $messages.scrollTop = $messages.scrollHeight;
    }
}

// respuesta simulada
function getCharacterReply(userText) {
    return new Promise((resolve, reject) => {
        const delay = 800 + Math.random() * 1200;

        setTimeout(() => {
            resolve(`Recibido: "${userText}", (Esta respuesta hoy es simulada,)`);
        }, delay);
    });
}
