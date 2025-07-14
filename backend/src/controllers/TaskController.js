const TaskService = require('../services/TaskService');

class TaskController {
  constructor() {
    this.taskService = new TaskService();
  }

  // GET /api/tasks - Listar todas as tarefas
  async getAllTasks(req, res) {
    try {
      const tasks = await this.taskService.getAllTasks();
      res.json(tasks.map(task => task.toJSON()));
    } catch (error) {
      console.error('❌ Erro no controller ao buscar tarefas:', error);
      res.status(500).json({ 
        error: 'Erro interno do servidor',
        message: error.message 
      });
    }
  }

  // GET /api/tasks/:id - Buscar tarefa por ID
  async getTaskById(req, res) {
    try {
      const { id } = req.params;
      const task = await this.taskService.getTaskById(parseInt(id));
      res.json(task.toJSON());
    } catch (error) {
      console.error('❌ Erro no controller ao buscar tarefa:', error);
      if (error.message === 'Tarefa não encontrada') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ 
          error: 'Erro interno do servidor',
          message: error.message 
        });
      }
    }
  }

  // POST /api/tasks - Criar nova tarefa
  async createTask(req, res) {
    try {
      const { text, completed } = req.body;
      
      const task = await this.taskService.createTask({ text, completed });
      res.status(201).json(task.toJSON());
    } catch (error) {
      console.error('❌ Erro no controller ao criar tarefa:', error);
      if (error.message.includes('obrigatório') || error.message.includes('máximo')) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ 
          error: 'Erro interno do servidor',
          message: error.message 
        });
      }
    }
  }

  // PUT /api/tasks/:id - Atualizar tarefa
  async updateTask(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      const task = await this.taskService.updateTask(parseInt(id), updates);
      res.json(task.toJSON());
    } catch (error) {
      console.error('❌ Erro no controller ao atualizar tarefa:', error);
      if (error.message === 'Tarefa não encontrada') {
        res.status(404).json({ error: error.message });
      } else if (error.message.includes('vazio') || error.message.includes('máximo')) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ 
          error: 'Erro interno do servidor',
          message: error.message 
        });
      }
    }
  }

  // DELETE /api/tasks/:id - Remover tarefa
  async deleteTask(req, res) {
    try {
      const { id } = req.params;
      const result = await this.taskService.deleteTask(parseInt(id));
      res.json(result);
    } catch (error) {
      console.error('❌ Erro no controller ao remover tarefa:', error);
      if (error.message === 'Tarefa não encontrada') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ 
          error: 'Erro interno do servidor',
          message: error.message 
        });
      }
    }
  }

  // DELETE /api/tasks - Remover tarefas (concluídas ou todas)
  async deleteTasks(req, res) {
    try {
      const { completed } = req.query;
      
      let result;
      if (completed === 'true') {
        result = await this.taskService.deleteCompletedTasks();
      } else {
        result = await this.taskService.deleteAllTasks();
      }
      
      res.json(result);
    } catch (error) {
      console.error('❌ Erro no controller ao remover tarefas:', error);
      res.status(500).json({ 
        error: 'Erro interno do servidor',
        message: error.message 
      });
    }
  }

  // PUT /api/tasks/bulk - Ações em massa
  async bulkAction(req, res) {
    try {
      const { action } = req.body;
      
      if (!action) {
        return res.status(400).json({ error: 'Ação é obrigatória' });
      }
      
      const result = await this.taskService.executeBulkAction(action);
      res.json(result);
    } catch (error) {
      console.error('❌ Erro no controller na ação em massa:', error);
      if (error.message === 'Ação inválida') {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ 
          error: 'Erro interno do servidor',
          message: error.message 
        });
      }
    }
  }
}

module.exports = TaskController; 