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
exports.validateMyUserRequest = void 0;
// импортируем body, то есть будет проверяться в req.body, также может быть проверка в req.query, req.cookies, req.headers, req.params
// validateionResult возвращает массив ошибок
const express_validator_1 = require("express-validator");
const handleValidationErrors = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // присваиваем перменной error возвращаемый массив ошибок
    const errors = (0, express_validator_1.validationResult)(req);
    // проверка пустой ли массив
    if (!errors.isEmpty()) {
        // возвращаем статус 400, а также объект в json формате
        return res.status(400).json({ errors: errors.array() });
    }
    // передаем управление следующему middleware
    next();
});
// здесь находятся 5 функций, которые при вставке в виде middleware поочередно выполняются
exports.validateMyUserRequest = [
    (0, express_validator_1.body)("name").isString().notEmpty().withMessage("Name must be a string"),
    (0, express_validator_1.body)("addressLine1")
        .isString()
        .notEmpty()
        .withMessage("AddressLine1 must be a string"),
    (0, express_validator_1.body)("city").isString().notEmpty().withMessage("City must be a string"),
    (0, express_validator_1.body)("country").isString().notEmpty().withMessage("Country must be a string"),
    handleValidationErrors,
];
