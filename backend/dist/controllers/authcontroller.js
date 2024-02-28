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
exports.login = void 0;
const user_1 = require("../services/user");
const jwtutil_1 = require("../util/jwtutil");
function login(userDetail) {
    return __awaiter(this, void 0, void 0, function* () {
        //console.log(userCheck, "usercheck\n\n\n");
        console.log("\n\n\n\n userDetails:----", userDetail);
        if (userDetail.Response == false) {
            console.log("Authentication Failed in login \n");
            return null;
        }
        else {
            const empid = userDetail.Id;
            const userCheck = yield (0, user_1.getemail)(userDetail.email);
            if (userCheck != null) {
                const role = yield (0, user_1.getUserpassword)(userDetail.email);
                console.log(role, "role");
                userDetail.RoleName = role;
                const jwtToken = (0, jwtutil_1.generateJWTTokenUsingPrisma)(userDetail);
                return { token: jwtToken, userDetail };
            }
            else {
                console.log("user not found");
                return null;
            }
        }
    });
}
exports.login = login;
