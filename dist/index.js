"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_routes_1 = __importDefault(require("./src/routes/api-routes"));
const app = (0, express_1.default)();
// Middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use("/", api_routes_1.default);
// App listen
app.listen(8000, () => {
    console.log("Server started on port: " + 5000);
});
