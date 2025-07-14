class Task {
  constructor(data = {}) {
    this.id = data.id || null;
    this.text = data.text || '';
    this.completed = data.completed || false;
    this.created_at = data.created_at || new Date();
    this.updated_at = data.updated_at || new Date();
  }

  // Validações
  validate() {
    const errors = [];

    if (!this.text || this.text.trim().length === 0) {
      errors.push('Texto da tarefa é obrigatório');
    }

    if (this.text && this.text.length > 255) {
      errors.push('Texto da tarefa deve ter no máximo 255 caracteres');
    }

    if (typeof this.completed !== 'boolean') {
      errors.push('Status de conclusão deve ser um booleano');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Converter para objeto simples
  toJSON() {
    return {
      id: this.id,
      text: this.text,
      completed: this.completed,
      created_at: this.created_at,
      updated_at: this.updated_at
    };
  }

  // Criar instância a partir de dados do banco
  static fromDatabase(data) {
    return new Task({
      id: data.id,
      text: data.text,
      completed: Boolean(data.completed),
      created_at: data.created_at,
      updated_at: data.updated_at
    });
  }

  // Criar instância para inserção
  static create(data) {
    return new Task({
      text: data.text,
      completed: data.completed || false
    });
  }
}

module.exports = Task; 