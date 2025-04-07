import app from './app';
import { connectDB } from './config/database';

const PORT = process.env.PORT || 3001;

// Iniciar la conexión a DB y luego el servidor
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error al iniciar la aplicación:', error);
    });