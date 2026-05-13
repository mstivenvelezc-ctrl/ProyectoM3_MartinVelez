
import { describe, it, expect, vi, beforeEach } from "vitest";
import { getCharacterReply } from "../src/services/aiClient.js";

global.fetch = vi.fn();

describe("aiClient.getCharacterReply", () => { 
    beforeEach(() => {

        fetch.mockClear();
    });


it("deberia llamar a /api/chat con POST y devolver el texto normalizado", async () => {
    const fakeGeminiResponse = {
        candidates: [
            {
                content: { parts: [{ text: "Wubba lubba dub dub Morty" }] },
                finishReason: "STOP",
            },
        ],
        usageMetadata: { promptTokenCount: 10, candidatesTokenCount: 5 },
    };
    fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => fakeGeminiResponse,
    });
    const uiMessages = [{ role: 'user', text: 'hola Rick' }];
    const text = await getCharacterReply(uiMessages);

    expect(text).toBe(`Wubba lubba dub dub Morty`);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
        `/api/chat`,
        expect.objectContaining({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            }),
        );
    });

it("deberia adjuntar retryAfterSeconds al error cuando la API responde 429", async() => {
    
    fetch.mockResolvedValueOnce({
        ok: false,
        status: 429,
        statusText: "Too Many Requests",
        json: async() => ({
            error: "Rate limit exceeded",
            retryAfterSeconds: 30,
        }),
    });
    
    const uiMessages = [{ role: "user", text: "spam" }];

    await expect(getCharacterReply(uiMessages)).rejects.toMatchObject({
        status: 429,
        retryAfterSeconds: 30,
        });
    });
});