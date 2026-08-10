// backend/server.js
import 'dotenv/config';                      // ✅ Load .env before any other imports
import path from 'path';
import { fileURLToPath } from 'url';
import app from './src/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Optional: confirm that the variable is now loaded correctly
console.log('🔍 MONGODB_URI from .env:', process.env.MONGODB_URI);

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

const server = app.listen(PORT, () => {
  console.log(`
  🚀 Server running on port ${PORT}
  📡 API URL: http://localhost:${PORT}/api
  🌐 Environment: ${NODE_ENV}
  `);
});

process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});

process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  server.close(() => process.exit(1));
});

export default server;