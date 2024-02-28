"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const routers_1 = __importDefault(require("./src/routers"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: '200mb' }));
app.use(express_1.default.urlencoded({ limit: '200mb' }));
app.use((0, cors_1.default)({
    origin: "*",
}));
const port = 8000;
app.use(body_parser_1.default.json());
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server with prisma");
});
app.use("/api", routers_1.default);
app.use((err, req, res, next) => {
    if (err instanceof Error) {
        return res.status(500).json({ _errors: [err.message] });
    }
    return res.status(400).json(Object.assign({}, err));
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
