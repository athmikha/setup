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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authcontroller_1 = require("../controllers/authcontroller");
const loginRouter = (0, express_1.Router)();
loginRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = yield (0, authcontroller_1.login)(req.body);
        //onst token = req.body;
        console.log(token, "token");
        if (token != null) {
            res.status(200).json(token);
        }
        else {
            res.status(401).json({ err: "Authentication failed" });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(404).json({ err: "Authentication failed" });
    }
}));
exports.default = loginRouter;
