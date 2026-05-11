
import  { fetchJson} from "./fetchJson.js";
import  { buildPayload, normalizeAIResponse, getTrimmedHistory } from "../transform/chatPayload.js";


const CHAT_ENDPOINT = "/api/chat";


export async function getCharacterReply(uiMessages, systemPrompt) {
    const trimmed = getTrimmedHistory(uiMessages)

    const payload = buildPayload({
        systemPrompt: systemPrompt,
        uiMessages: trimmed,
    });

    let rawResponse;
    try {
        rawResponse = await fetchJson(CHAT_ENDPOINT,{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
    } catch (err) {
        if (err.status === 429 && err.body?.retryAfterSeconds) {
            err.retryAfterSeconds = err.body.retryAfterSeconds;
        }
        throw err;
    }


    const text = normalizeAIResponse(rawResponse);
    const usage = rawResponse?.usageMetadata;

    if (usage) {
        console.log(`[Tokens] input: ${usage.promptTokenCount}, output: ${usage.candidatesTokenCount}`);
    }

    return text;
}