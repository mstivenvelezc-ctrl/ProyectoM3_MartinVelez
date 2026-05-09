import { getCharacterReply } from "../services/aiClient.js";
import { debounce, wait } from "../services/debounce.js";
import { appendUserMessage, appendAssistantMessage } from "../transform/chatPayload.js";
import { getUserMessage } from "../ui/messages.js";

// Almacenamiento de estados independientes por personaje
const characterStates = {};

// Estado actual en uso
let chatState = null;
let currentCharacterId = null;
let isChatActive = false;

// Función para obtener o crear el estado de un personaje
function getChatState(characterId) {
    if (!characterStates[characterId]) {
        characterStates[characterId] = {
            character: null,
            messages: [],
            status: "idle",
            error: null,
            lastUserMessage: null,
            retryCountdown: null,
            isRetrying: false,
        };
    }
    return characterStates[characterId];
}

export function disableChat() {
    isChatActive = false;
}

export function renderCharacterChat(character) {
    isChatActive = true;
    currentCharacterId = character.id;
    
    // Obtener o crear el estado para este personaje
    chatState = getChatState(character.id);
    chatState.character = character;
    
    // Inicializar mensajes con el saludo del personaje si es la primera vez
    if (chatState.messages.length === 0) {
        chatState.messages = [
            { role: "character", text: character.greeting }
        ];
    }

    const app = document.querySelector("#app");
    app.innerHTML = `
    <div class="chatApp">
        <header class="chatHeader">
            <img src="${character.avatar}" alt="${character.name}" class="chat-avatar" />
            <div class="chatHeader__info">    
                <h1 class="chatHeader__title"><strong>Chat</strong></h1>
                <h2 class="chatHeader__subtitle"><strong>${character.name}</strong></h2>
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
                ${chatState.status === "loading" ? "disabled" : ""}
            />
            <button class="chatComposer__send" type="submit" ${chatState.status === "loading" ? "disabled" : ""}>
                <strong>>>></strong>
            </button>
        </form>
    </div>
    `;

    setupChat();
    scrollToBottom();
}

function renderMessages() {
    return chatState.messages
        .map(msg => `<div class="message message--${msg.role}">${escapeHtml(msg.text)}</div>`)
        .join("");
}

function renderStatus() {
    if (chatState.status === "loading" && chatState.retryCountdown != null) {
        return `
            <div class="message message--character message--typing">
                Esperando para reintentar (${chatState.retryCountdown} segundos)...
            </div>
        `;
    }

    if (chatState.status === "loading") {
        return `<div class="message message--character message--typing">escribiendo...</div>`;
    }

    if (chatState.status === "error") {
        return `<div class="message message--error">${chatState.error}
            <button onclick class="message__retry" id="retryBtn" type="button">Reintentar</button>
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
    if (!isChatActive || !chatState) return;
    Object.assign(chatState, updates);
    renderCharacterChat(chatState.character);
}

function scrollToBottom() {
    const chatMessages = document.querySelector("#chatMessages");
    if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

function setupChat() {
    const $form = document.querySelector("#chatComposer");
    const $input = document.querySelector("#chatInput");
    const $retry = document.querySelector("#retryBtn");

    // Evento para enviar nuevo mensaje
    $form.addEventListener("submit", async (event) => {
        event.preventDefault();
        
        // Solo procesar si no está en reintentos
        if (chatState.isRetrying) {
            return;
        }

        const userMessage = $input.value.trim();

        if (!userMessage) {
            return;
        }

        // Agregar mensaje del usuario solo si es nuevo (no es reintentar)
        setState({
            messages: [...chatState.messages, { role: "user", text: userMessage }],
            lastUserMessage: userMessage,
            status: "loading",
            error: null,
        });

        $input.value = "";

        // Solicitar respuesta de la IA
        await handleChatRequest();
    });

    // Evento para reintentar (no agrega nuevo mensaje, solo reintenta la IA)
    if ($retry) {
        $retry.addEventListener("click", async (event) => {
            event.preventDefault();
            
            // Evitar múltiples clics
            if (chatState.isRetrying || chatState.status === "loading") {
                return;
            }

            // Marcar como en reintentos
            setState({
                status: "loading",
                error: null,
                isRetrying: true,
            });

            // Llamar a handleChatRequest sin agregar el mensaje de nuevo
            await handleChatRequest();
        });
    }
}

async function handleChatRequest() {
    try {
        const reply = await getCharacterReply(
            chatState.messages,
            chatState.character.systemPrompt
        );

        const updatedMessages = appendAssistantMessage(chatState.messages, reply);
        setState({
            messages: updatedMessages,
            status: "idle",
            isRetrying: false,
        });
    } catch (error) {
        setState({
            status: "error",
            error: getUserMessage(error),
            isRetrying: false,
        });

        // Reintentar automático después de 5 segundos
        for (let i = 5; i > 0; i--) {
            await wait(1000);
            if (!isChatActive) return;
            setState({ retryCountdown: i - 1 });
        }

        // Reintento automático sin hacer click
        if (isChatActive && chatState.status === "error") {
            setState({
                status: "loading",
                error: null,
                isRetrying: true,
            });
            await handleChatRequest();
        }
    }
}
