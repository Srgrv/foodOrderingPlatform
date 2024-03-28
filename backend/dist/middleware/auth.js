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
exports.jwtParse = exports.jwtCheck = void 0;
const express_oauth2_jwt_bearer_1 = require("express-oauth2-jwt-bearer");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//models
const user_1 = __importDefault(require("../models/user"));
// используется для проверки действительности и подлинности JWT на основе заданных параметров. Он не извлекает информацию о пользователе, а только проверяет, соответствует ли предоставленный JWT заданным параметрам
// когда приходит запрос, содержащий JWT, middleware jwtCheck проверяет, соответствует ли предоставленный JWT этим параметрам.
// если JWT проходит проверку, то управление передается следующему middleware или обработчику маршрута. Если нет, то возвращается код состояния 401 (Unauthorized), и запрос дальше не обрабатывается.
exports.jwtCheck = (0, express_oauth2_jwt_bearer_1.auth)({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    tokenSigningAlg: "RS256",
});
// используется для извлечения и проверки JWT, а также для аутентификации пользователей и добавления информации о пользователе к запросу
const jwtParse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // достаем токет хранящийся в headers в виде Bearer adjf;adjf;ajdfa;dfj
    const { authorization } = req.headers;
    // проверяется, передается ли в запросе заголовок Authorization, и начинается ли токен с "Bearer ".
    // если заголовок Authorization отсутствует или не начинается с "Bearer ", то возвращается код состояния 401 (Unauthorized).
    if (!authorization || !authorization.startsWith("Bearer ")) {
        return res.sendStatus(401);
    }
    // Извлекаем из токена все кроме Bearer
    const token = authorization.split(" ")[1];
    try {
        // декодируется с использованием библиотеки jwt.
        const decoded = jsonwebtoken_1.default.decode(token);
        // затем из декодированного токена извлекается идентификатор пользователя (auth0Id)
        const auth0Id = decoded.sub;
        // на основе этого идентификатора auth0 выполняется поиск пользователя в базе данных.
        const user = yield user_1.default.findOne({ auth0Id });
        console.log(user);
        // если пользователь не найден, возвращается код состояния 401 (Unauthorized)
        if (!user) {
            return res.sendStatus(401);
        }
        // если пользователь найден, то его идентификатор (auth0Id) и идентификатор MongoDB (userId) добавляются к объекту запроса (req) для последующего использования другими middleware и обработчиками маршрутов.
        req.auth0Id = auth0Id;
        req.userId = user._id.toString();
        // затем управление передается следующему middleware или обработчику маршрута с помощью функции next()
        next();
    }
    catch (error) {
        return res.sendStatus(401);
    }
});
exports.jwtParse = jwtParse;
