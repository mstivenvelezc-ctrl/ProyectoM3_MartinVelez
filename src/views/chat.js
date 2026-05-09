
import { getCharacterReply } from "../services/aiClient.js";
import { debounce, wait } from "../services/debounce.js";
import { appendUserMessage, appendAssistantMessage } from "../transform/chatPayload.js";
import { getUserMessage } from "../ui/messages.js";


const state = {
    messages: [
        { role: "character", text: "Hola, soy Rick. ¿Qué quieres saber? Belch..."},
    ],
    status: "idle", // idle | loading | error
    error: null,
    lastUserMessage: null,
    retryCountdown: null,
};

export function renderChat1() {
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
    if (state.status === "loading" && state.retryCountdown != null) {
        return `
            <div class="message message--character message--typing">
                Esperando para reintentar (${state.retryCountdown} segundos)...
            </div>
        `;
    }

    if (state.status === "loading") {
        return `<div class="message message--character message--typing">escribiendo...</div>`;
    }

    if (state.status === "error") {
        return `<div class="message message--error">${state.error}
        <button class="message__retry" id="retryBtn" type="button">Reintentar</button>
        </div>`;
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
        
        if (state.status === "loading") return;

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


async function sendMessage(text, isRetry = false) {
    const nextMessages = isRetry
        ? state.messages
        : [...state.messages, { role: 'user', text}];
    setState({
        messages: nextMessages,
        status: 'loading',
        error: null,
        retryCountdown: null,
        lastUserMessage: isRetry? state.lastUserMessage: text,
    });


try {
    const reply = await getCharacterReply(nextMessages);
    setState({
        messages: [...nextMessages, {role: "character", text: reply }],
        status: "idle",
        error: null,
        lastUserMessage: null,
    });
} catch (err) {
    if (err.status === 429) {
        const seconds = err.retryAfterSeconds ?? 5;
        for (let s = seconds; s > 0; s--) {
            setState({ status: "loading", retryCountdown: s });
            await wait(1000);
        }

        try {
            setState({ status: "loading", retryCountdown: null });
            const reply = await getCharacterReply(nextMessages);
            setState({
                messages: [...nextMessages, { role: "character", text: reply }],
                status: "idle",
                error: null,
                lastUserMessage: null,
            });
            return;
            } catch (errRetry) {
            setState({
                status: "error",
                error: getUserMessage(errRetry),
            });
            return;
        }
    }

    setState({
        status: "error",
        error: getUserMessage(err),
    });
    }
}

function scrollToBottom() {
    const $messages = document.querySelector("#chatMessages");
    if ($messages) {
        $messages.scrollTop = $messages.scrollHeight;
    }
}
