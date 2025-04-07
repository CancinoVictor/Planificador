import express from 'express';
import cors from 'cors';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/api/status', (req, res) => {
    res.json({ status: 'API funcionando' });
});

export default app; // ¡Esta línea es crucial!