import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user'; // Pastikan file ini ada dan sesuai dengan struktur Anda

// Inisialisasi server Express
const app = express();

// Konfigurasi opsi CORS
const corsOptions = {
  origin: [
    'http://localhost:3000',  // URL frontend Anda
    'http://127.0.0.1:3000', // Alternatif
  ],
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
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Menangani preflight request untuk semua rute

// Middleware untuk parsing JSON
app.use(express.json());

// Logging request untuk debugging
app.use((req, res, next) => {
  console.log(`Request Received: ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

// Rute untuk user
app.use('/api/users', userRoutes);

// Menangani rute tidak ditemukan
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Menangani error
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Internal server error' });
});


// Jalankan server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
