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
exports.getUserpassword = exports.getemail = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function getemail(input) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(input, "mail id ");
            const user = yield prisma.user.findUnique({
                where: {
                    email: input,
                },
            });
            if (user) {
                const email = user.email;
                console.log(email, "role");
                return email;
            }
            else {
                return null;
            }
        }
        catch (error) {
            throw new Error(" User not found ");
        }
    });
}
exports.getemail = getemail;
function getUserpassword(input) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(input, "password");
            const user = yield prisma.user.findUnique({
                where: {
                    email: input,
                },
            });
            console.log(user, "user\n\n\n");
            if (user) {
                const pass = user.password;
                console.log(user, "user innnn\n\n\n");
                return pass;
            }
            else {
                return null;
            }
        }
        catch (error) {
            throw new Error("User not found");
        }
    });
}
exports.getUserpassword = getUserpassword;
