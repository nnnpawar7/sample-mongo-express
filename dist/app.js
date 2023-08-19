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
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const passportConfig_1 = require("./passportConfig");
const db_1 = require("./db");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
db_1.db.then((data) => {
}).catch((e) => {
});
(0, passportConfig_1.initializePassport)(passport_1.default);
app.use((0, express_session_1.default)({ secret: "secret", resave: false, saveUninitialized: false }));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.get("/user", (req, res, next) => {
    res.send("regular");
});
app.post("/register", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUsr = yield db_1.usr.findOne({ userName: req.body.userName });
        if (existingUsr) {
            res.status(400).send("email already taken");
        }
        const user = yield db_1.usr.create(req.body);
        res.status(201).send(user);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
}));
app.post("/login", passport_1.default.authenticate("local"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("success");
}));
app.listen(3000, () => {
    console.log("Server listening on port 3000");
});
//# sourceMappingURL=app.js.map