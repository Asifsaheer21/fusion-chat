"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
const dotenv_1 = __importDefault(require("dotenv"));
// Load .env variables
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const server = app.listen(3000, () => {
    console.log("Server started");
});
const wss = new ws_1.WebSocketServer({ server });
wss.on("connection", (socket) => {
    console.log("User connected");
    socket.on("message", (message) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        try {
            const data = JSON.parse(message);
            const { chatMessage, model } = data;
            console.log("model :", model, chatMessage);
            if (model === "gemini") {
                const geminiResponse = yield axios_1.default.post("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent", {
                    contents: [{ parts: [{ text: chatMessage }] }],
                }, {
                    headers: {
                        "x-goog-api-key": process.env.GEMINI_API_KEY,
                        "Content-Type": "application/json",
                    },
                });
                const reply = ((_f = (_e = (_d = (_c = (_b = (_a = geminiResponse.data) === null || _a === void 0 ? void 0 : _a.candidates) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.content) === null || _d === void 0 ? void 0 : _d.parts) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.text) ||
                    "No response from Gemini";
                socket.send(JSON.stringify({ reply }));
            }
            else if (model === "groq") {
                const groqResponse = yield axios_1.default.post("https://api.groq.com/openai/v1/chat/completions", {
                    model: "llama-3.3-70b-versatile",
                    messages: [{ role: "user", content: chatMessage }],
                }, {
                    headers: {
                        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
                        "Content-Type": "application/json",
                    },
                });
                const reply = ((_k = (_j = (_h = (_g = groqResponse.data) === null || _g === void 0 ? void 0 : _g.choices) === null || _h === void 0 ? void 0 : _h[0]) === null || _j === void 0 ? void 0 : _j.message) === null || _k === void 0 ? void 0 : _k.content) ||
                    "No response from GROQ";
                socket.send(JSON.stringify({ reply }));
            }
            else {
                socket.send(JSON.stringify({ reply: "Invalid model selected" }));
            }
        }
        catch (error) {
            console.error("Error:", error.message);
            socket.send(JSON.stringify({ reply: "An error occurred" }));
        }
    }));
    socket.on("close", () => {
        console.log("User disconnected");
    });
});
