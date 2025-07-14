// Middleware para tratamento de erros
const errorHandler = (err, req, res, next) => {
  console.error('❌ Erro não tratado:', err);

  // Erro de validação
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Erro de validação',
      message: err.message
    });
  }

  // Erro de sintaxe JSON
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      error: 'JSON inválido',
      message: 'O corpo da requisição deve ser um JSON válido'
    });
  }

  // Erro de rota não encontrada
  if (err.status === 404) {
    return res.status(404).json({
      error: 'Rota não encontrada',
      message: 'A rota solicitada não existe'
    });
  }

  // Erro interno do servidor (padrão)
  res.status(500).json({
    error: 'Erro interno do servidor',
    message: process.env.NODE_ENV === 'production' 
      ? 'Algo deu errado' 
      : err.message
  });
};

module.exports = errorHandler; 