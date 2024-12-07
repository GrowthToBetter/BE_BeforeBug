"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = __importDefault(require("../prisma/client"));
const router = express_1.default.Router();
router.get("/", async (req, res) => {
    try {
        const users = await client_1.default.user.findMany();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
});
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const user = await client_1.default.user.findUnique({
            where: {
                id,
            },
            include: {
                teacher_sub: true,
                userAuth: true
            }
        });
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({ error: "User not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch user" });
    }
});
router.post("/", async (req, res) => {
    const { formData } = req.body;
    try {
        const name = formData.get("name");
        const email = formData.get("email");
        const photo_profile = formData.get("photo_profile");
        const classes = formData.get("clasess");
        const absent = formData.get("absent");
        const generation = formData.get("generation");
        const school_origin = formData.get("school_origin");
        const newUser = await client_1.default.user.create({
            data: {
                name,
                email,
                photo_profile,
                absent,
                generation,
                classes,
                school_origin,
            }
        });
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create user" });
    }
});
exports.default = router;
