const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importar módulos da nova arquitetura
const databaseConnection = require('./src/database/connection');
const DatabaseMigrations = require('./src/database/migrations');
const taskRoutes = require('./src/routes/taskRoutes');
const errorHandler = require('./src/middleware/errorHandler');
const requestLogger = require('./src/middleware/requestLogger');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Rotas
app.use('/api/tasks', taskRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Rota raiz
app.get('/', (req, res) => {
  res.json({
    message: 'ToDo API - Backend com MySQL',
    version: '1.0.0',
    endpoints: {
      tasks: '/api/tasks',
      health: '/health'
    }
  });
});

// Middleware de tratamento de erros (deve ser o último)
app.use(errorHandler);

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Rota não encontrada',
    message: `A rota ${req.originalUrl} não existe`
  });
});

// Inicializar servidor
async function startServer() {
  try {
    // Conectar ao banco de dados
    await databaseConnection.connect();
    
    // Executar migrações
    await DatabaseMigrations.runMigrations();
    
    // Iniciar servidor HTTP
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
      console.log(`📚 API disponível em: http://localhost:${PORT}`);
      console.log(`🏥 Health check: http://localhost:${PORT}/health`);
      console.log(`📋 Endpoints de tarefas: http://localhost:${PORT}/api/tasks`);
    });
    
  } catch (error) {
    console.error('❌ Erro ao inicializar servidor:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('🛑 Recebido SIGTERM, encerrando servidor...');
  await databaseConnection.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('🛑 Recebido SIGINT, encerrando servidor...');
  await databaseConnection.close();
  process.exit(0);
});

// Iniciar aplicação
startServer().catch(console.error); 