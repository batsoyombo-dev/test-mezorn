"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
const taskController = new controllers_1.TaskController();
router.get("/", taskController.index);
exports.default = router;
