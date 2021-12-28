"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = require("http");
var createApp = function () {
    var PORT = process.env.PORT || 3000;
    var app = (0, express_1.default)();
    var server = (0, http_1.createServer)(app);
    server.listen(PORT, function () {
        console.log("Server listening on port ".concat(PORT));
    });
    return { app: app, server: server };
};
exports.default = createApp;
//# sourceMappingURL=createApp.js.map