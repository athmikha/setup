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
exports.verifyAccessToken = exports.generateJWTTokenUsingPrisma = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateJWTTokenUsingPrisma(userDetail) {
    const tokenPayload = {
        email: userDetail.email,
        password: userDetail.password
    };
    const secretKey = "foxsens";
    const token = jsonwebtoken_1.default.sign(tokenPayload, secretKey, { expiresIn: "1h" });
    console.log("Generated Token is : ", token);
    return token;
}
exports.generateJWTTokenUsingPrisma = generateJWTTokenUsingPrisma;
const verifyAccessToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bearerToken = req.headers.authorization;
        if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
            throw new Error("You are not authorized to see this page.");
        }
        const token = bearerToken.split(" ")[1];
        if (!token) {
            throw new Error("You are not authorized to see this page.");
        }
        jsonwebtoken_1.default.verify(token, "harbinger", (err, payload) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (!err && payload) {
                    req.user = payload; // Update the type of 'payload'
                    next();
                }
                else {
                    throw new Error("You are not authorized to see this page.");
                }
            }
            catch (err) {
                return res.status(401).json({ message: err.message });
            }
        }));
    }
    catch (err) {
        return res.status(401).json({ message: err.message });
    }
});
exports.verifyAccessToken = verifyAccessToken;
