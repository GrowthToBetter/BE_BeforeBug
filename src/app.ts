import express from 'express';
import userRoutes from './routes/user'; // Rute untuk user

const app = express();

// Middleware untuk parsing JSON
app.use(express.json());

// Menggunakan rute user
app.use('/api/users', userRoutes);

// Menjalankan server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
