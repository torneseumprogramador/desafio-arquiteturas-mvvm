const TaskRepository = require('../repositories/TaskRepository');

class TaskService {
  constructor() {
    this.taskRepository = new TaskRepository();
  }

  // Buscar todas as tarefas
  async getAllTasks() {
    try {
      const tasks = await this.taskRepository.findAll();
      console.log('📂 Tarefas carregadas do serviço:', tasks.length);
      return tasks;
    } catch (error) {
      console.error('❌ Erro no serviço ao buscar tarefas:', error);
      throw error;
    }
  }

  // Buscar tarefa por ID
  async getTaskById(id) {
    try {
      const task = await this.taskRepository.findById(id);
      if (!task) {
        throw new Error('Tarefa não encontrada');
      }
      return task;
    } catch (error) {
      console.error('❌ Erro no serviço ao buscar tarefa:', error);
      throw error;
    }
  }

  // Criar nova tarefa
  async createTask(taskData) {
    try {
      // Validações de negócio
      if (!taskData.text || taskData.text.trim().length === 0) {
        throw new Error('Texto da tarefa é obrigatório');
      }

      if (taskData.text.length > 255) {
        throw new Error('Texto da tarefa deve ter no máximo 255 caracteres');
      }

      const task = await this.taskRepository.create({
        text: taskData.text.trim(),
        completed: taskData.completed || false
      });

      console.log('✅ Tarefa criada no serviço:', task.text);
      return task;
    } catch (error) {
      console.error('❌ Erro no serviço ao criar tarefa:', error);
      throw error;
    }
  }

  // Atualizar tarefa
  async updateTask(id, updates) {
    try {
      // Validações de negócio
      if (updates.text !== undefined && (!updates.text || updates.text.trim().length === 0)) {
        throw new Error('Texto da tarefa não pode estar vazio');
      }

      if (updates.text !== undefined && updates.text.length > 255) {
        throw new Error('Texto da tarefa deve ter no máximo 255 caracteres');
      }

      if (updates.text !== undefined) {
        updates.text = updates.text.trim();
      }

      const task = await this.taskRepository.update(id, updates);
      console.log('✅ Tarefa atualizada no serviço:', id);
      return task;
    } catch (error) {
      console.error('❌ Erro no serviço ao atualizar tarefa:', error);
      throw error;
    }
  }

  // Remover tarefa
  async deleteTask(id) {
    try {
      await this.taskRepository.delete(id);
      console.log('🗑️ Tarefa removida do serviço:', id);
      return { message: 'Tarefa removida com sucesso' };
    } catch (error) {
      console.error('❌ Erro no serviço ao remover tarefa:', error);
      throw error;
    }
  }

  // Remover tarefas concluídas
  async deleteCompletedTasks() {
    try {
      const deletedCount = await this.taskRepository.deleteCompleted();
      console.log('🗑️ Tarefas concluídas removidas do serviço:', deletedCount);
      return { 
        message: 'Tarefas concluídas removidas com sucesso',
        deletedCount 
      };
    } catch (error) {
      console.error('❌ Erro no serviço ao remover tarefas concluídas:', error);
      throw error;
    }
  }

  // Remover todas as tarefas
  async deleteAllTasks() {
    try {
      const deletedCount = await this.taskRepository.deleteAll();
      console.log('🗑️ Todas as tarefas removidas do serviço:', deletedCount);
      return { 
        message: 'Todas as tarefas removidas com sucesso',
        deletedCount 
      };
    } catch (error) {
      console.error('❌ Erro no serviço ao remover todas as tarefas:', error);
      throw error;
    }
  }

  // Marcar todas como concluídas
  async markAllCompleted() {
    try {
      const updatedCount = await this.taskRepository.markAllCompleted();
      console.log('✅ Todas as tarefas marcadas como concluídas no serviço:', updatedCount);
      return { 
        message: 'Todas as tarefas marcadas como concluídas',
        updatedCount 
      };
    } catch (error) {
      console.error('❌ Erro no serviço ao marcar todas como concluídas:', error);
      throw error;
    }
  }

  // Marcar todas como pendentes
  async markAllPending() {
    try {
      const updatedCount = await this.taskRepository.markAllPending();
      console.log('🔄 Todas as tarefas marcadas como pendentes no serviço:', updatedCount);
      return { 
        message: 'Todas as tarefas marcadas como pendentes',
        updatedCount 
      };
    } catch (error) {
      console.error('❌ Erro no serviço ao marcar todas como pendentes:', error);
      throw error;
    }
  }

  // Executar ação em massa
  async executeBulkAction(action) {
    try {
      switch (action) {
        case 'markAllCompleted':
          return await this.markAllCompleted();
        case 'markAllPending':
          return await this.markAllPending();
        default:
          throw new Error('Ação inválida');
      }
    } catch (error) {
      console.error('❌ Erro no serviço na ação em massa:', error);
      throw error;
    }
  }
}

module.exports = TaskService; 