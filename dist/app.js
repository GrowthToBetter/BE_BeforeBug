"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("./routes/user")); // Pastikan file ini ada dan sesuai dengan struktur Anda
// Inisialisasi server Express
const app = (0, express_1.default)();
// Konfigurasi opsi CORS
const corsOptions = {
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Access-Control-Allow-Origin',
        'Access-Control-Allow-Headers',
    ],
    credentials: true, // Jika Anda menggunakan cookie atau header otorisasi
};
// Middleware CORS
app.use((0, cors_1.default)(corsOptions));
app.options('*', (0, cors_1.default)(corsOptions)); // Menangani preflight request untuk semua rute
// Middleware untuk parsing JSON
app.use(express_1.default.json());
// Logging request untuk debugging
app.use((req, res, next) => {
    console.log(`Request Received: ${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    next();
});
// Rute untuk user
app.use('/api/users', user_1.default);
// Menangani rute tidak ditemukan
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});
app.get("/", (req, res) => {
    res.send("Hello, world!");
});
// Menangani error
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
});
// Jalankan server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
