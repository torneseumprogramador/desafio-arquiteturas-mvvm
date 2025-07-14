// Configuração da API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Método genérico para fazer requisições
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('❌ Erro na requisição API:', error);
      throw error;
    }
  }

  // Buscar todas as tarefas
  async getTasks() {
    return this.request('/api/tasks');
  }

  // Criar nova tarefa
  async createTask(text) {
    return this.request('/api/tasks', {
      method: 'POST',
      body: JSON.stringify({ text })
    });
  }

  // Atualizar tarefa
  async updateTask(id, updates) {
    return this.request(`/api/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
  }

  // Remover tarefa
  async deleteTask(id) {
    return this.request(`/api/tasks/${id}`, {
      method: 'DELETE'
    });
  }

  // Remover tarefas concluídas
  async deleteCompletedTasks() {
    return this.request('/api/tasks?completed=true', {
      method: 'DELETE'
    });
  }

  // Remover todas as tarefas
  async deleteAllTasks() {
    return this.request('/api/tasks', {
      method: 'DELETE'
    });
  }

  // Ações em massa
  async bulkAction(action) {
    return this.request('/api/tasks/bulk', {
      method: 'PUT',
      body: JSON.stringify({ action })
    });
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

// Instância singleton
const apiService = new ApiService();

export default apiService; 