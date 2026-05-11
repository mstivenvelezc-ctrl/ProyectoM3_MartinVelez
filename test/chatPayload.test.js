

import { describe, it, expect } from "vitest"
import {
    buildPayload,
    normalizeAIResponse,
    getTrimmedHistory,
} from "../src/transform/chatPayload.js"
import { send as mockGeminiSend } from "../src/services/mockGeminiApi.js"


describe("normalizeAIResponse", () => {
    it("deberia traer el texto de una respuesta valida de gemini", async () => {


        const fakePayload = {
    sytemInstruccion: { partes: [{ text: "sos Rick"}] },
    contents: [{ role: "user", parts: [{ text: "hola"}] }],
    };
    const geminiResponse = await mockGeminiSend(fakePayload);
    const text = normalizeAIResponse(geminiResponse);

    expect(typeof text).toBe("string");
    expect(text.length).toBeGreaterThan(0);
    });

    it("deberia devolver string vacio cuando la respuesta es invalida", () => {

    expect(normalizeAIResponse(null)).toBe("");

    expect(normalizeAIResponse({})).toBe("");

    expect(normalizeAIResponse({ candidates: [] })).toBe("");

    expect(
        normalizeAIResponse({
            candidates: [{ content: { parts: [] }}],
        }),
    ).toBe("");

    expect(
        normalizeAIResponse({
            candidates: [{ content: { parts: [{ notText: "x" }, null, { text: 123}] } }],
        }),
    ).toBe("")
    });
});


describe("buildPayload", () => {
    it("deberia construir el shape correcto para Gemini", () => {
    
        const systemPrompt = "Sos Rick Sanchez";
        const uiMessages = [
            { role: "user", text: "hola" },
            { role: "character", text: "*urp* hola Morty" },
        ];
        
        const payload = buildPayload({ systemPrompt, uiMessages });

    expect(payload).toEqual({
        model: "gemini-3.1-flash-lite",
        systemInstruction: { parts: [{ text: "Sos Rick Sanchez" }] },
        contents: [
            { role: "user", parts: [{ text: "hola" }] },
            { role: "model", parts: [{ text: "*urp* hola Morty" }] },
        ],
        generationConfig: {
            maxOutputTokens: 200,
            temperature: 0.9,
        },
        });
    });
});

describe("getTrimmed History", () => {
    it("deberia devolver los ultimos N mensajes cuando hay mas que el limite", () => {
    
        const messages = Array.from({ length: 15 }, (_, i) => ({
            role: "user",
            text: `mensaje ${i + 1}`,
        }));
    
        const trimmed = getTrimmedHistory(messages, 12);
    
        expect(trimmed).toHaveLength(12);
        expect(trimmed[0].text).toBe("mensaje 4");
        expect(trimmed [11].text).toBe("mensaje 15");
    });

    it("deberia devolver el historial completo si tiene menos que el limite", () => {
        const messages = [
        { role: "user", text: "a" },
        { role: "character", text: "b" },
        { role: "user", text: "c" },
        ];
        const trimmed = getTrimmedHistory (messages, 12);
        expect(trimmed).toHaveLength(3);
        expect(trimmed).toEqual(messages);
    });
});