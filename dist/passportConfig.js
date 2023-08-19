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
exports.initializePassport = void 0;
const passport_local_1 = __importDefault(require("passport-local"));
const db_1 = require("./db");
const aa = passport_local_1.default.Strategy;
const initializePassport = (passport) => {
    passport.use(new aa({ usernameField: 'userName', passwordField: 'password', passReqToCallback: true }, (req, userName, password, done) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("2-----------", { req: req.headers, userName, password });
        try {
            const user = yield db_1.usr.findOne({ userName });
            if (!user) {
                return done('user not found', false);
            }
            if (user.password !== password) {
                return done('password not matching', false);
            }
            return done(null, user);
        }
        catch (error) {
            console.log("error", error);
            return done(error, false);
        }
    })));
    passport.serializeUser((user, done) => {
        console.log('0--------', user);
        done(null, user._id);
    });
    passport.deserializeUser((id, done) => {
        try {
            console.log('1---------', id);
            const user = db_1.usr.findById(id);
            done(null, user);
        }
        catch (error) {
            done(error, false);
        }
    });
};
exports.initializePassport = initializePassport;
//# sourceMappingURL=passportConfig.js.map