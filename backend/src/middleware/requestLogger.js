// Middleware para log de requisições
const requestLogger = (req, res, next) => {
  const start = Date.now();
  
  // Log da requisição
  console.log(`📥 ${req.method} ${req.originalUrl} - ${new Date().toISOString()}`);
  
  // Interceptar o final da resposta
  res.on('finish', () => {
    const duration = Date.now() - start;
    const statusColor = res.statusCode >= 400 ? '❌' : res.statusCode >= 300 ? '🔄' : '✅';
    
    console.log(`${statusColor} ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
  });
  
  next();
};

module.exports = requestLogger; 