
const MODEL_NAME = "gemini-3.1-flash-lite";
const MAX_OUTPUT_TOKENS = 70;
const TEMPERATURE = 0.3;
const MAX_TURNS_HISTORY = 4;

export function toApiMessages(uiMessages) {
    return uiMessages.map((msg) => ({
        role: msg.role === "character" ? "model" : "user",
        parts: [{ text: msg.text }],
    }));
}


export function buildPayload({ systemPrompt, uiMessages }) {
    return {
        model: MODEL_NAME,
        systemInstruction: {
            parts: [{ text: systemPrompt }],
        },
        contents: toApiMessages(uiMessages),
        generationConfig: {
            maxOutputTokens: MAX_OUTPUT_TOKENS,
            temperature: TEMPERATURE,
        },
    };
}


export function normalizeAIResponse(raw) {
    const parts = raw?.candidates?.[0]?.content?.parts;
    if (!Array.isArray(parts)) return "";

    const text = parts 
    .filter((p) => p && typeof p.text === "string")
    .map((p) => p.text)
    .join("")
    .trim();

    // Limitar a 3 líneas máximo
    const lines = text.split('\n');
    const maxLines = 3;
    
    if (lines.length > maxLines) {
        return lines.slice(0, maxLines).join('\n').trim();
    }
    
    return text;
}


export function appendUserMessage(messages, text) {
    return [...messages, { role: "user", text }];
}

export function appendAssistantMessage(messages, text) {
    return [...messages, { role: "character", text }];
}

export function getTrimmedHistory(messages, maxTurns = MAX_TURNS_HISTORY) {
    return messages.slice(-maxTurns);
}