"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var express_openid_connect_1 = require("express-openid-connect");
var auth0_1 = require("../config/auth0");
var middlewares = function (app) {
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, cors_1.default)());
    app.use((0, express_openid_connect_1.auth)(auth0_1.config));
};
exports.default = middlewares;
//# sourceMappingURL=index.js.map