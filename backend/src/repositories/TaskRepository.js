const databaseConnection = require('../database/connection');
const Task = require('../entities/Task');

class TaskRepository {
  // Buscar todas as tarefas
  async findAll() {
    try {
      const [rows] = await databaseConnection.execute(
        'SELECT * FROM tasks ORDER BY created_at DESC'
      );
      
      return rows.map(row => Task.fromDatabase(row));
    } catch (error) {
      console.error('❌ Erro ao buscar tarefas:', error);
      throw new Error('Erro ao buscar tarefas no banco de dados');
    }
  }

  // Buscar tarefa por ID
  async findById(id) {
    try {
      const [rows] = await databaseConnection.execute(
        'SELECT * FROM tasks WHERE id = ?',
        [id]
      );
      
      if (rows.length === 0) {
        return null;
      }
      
      return Task.fromDatabase(rows[0]);
    } catch (error) {
      console.error('❌ Erro ao buscar tarefa por ID:', error);
      throw new Error('Erro ao buscar tarefa no banco de dados');
    }
  }

  // Criar nova tarefa
  async create(taskData) {
    try {
      const task = Task.create(taskData);
      const validation = task.validate();
      
      if (!validation.isValid) {
        throw new Error(validation.errors.join(', '));
      }

      const [result] = await databaseConnection.execute(
        'INSERT INTO tasks (text, completed) VALUES (?, ?)',
        [task.text, task.completed]
      );

      // Buscar a tarefa criada
      const createdTask = await this.findById(result.insertId);
      console.log('✅ Tarefa criada no repositório:', task.text);
      
      return createdTask;
    } catch (error) {
      console.error('❌ Erro ao criar tarefa:', error);
      throw error;
    }
  }

  // Atualizar tarefa
  async update(id, updates) {
    try {
      // Verificar se a tarefa existe
      const existingTask = await this.findById(id);
      if (!existingTask) {
        throw new Error('Tarefa não encontrada');
      }

      // Construir query de atualização dinamicamente
      const updateFields = [];
      const updateValues = [];

      if (updates.text !== undefined) {
        updateFields.push('text = ?');
        updateValues.push(updates.text);
      }

      if (updates.completed !== undefined) {
        updateFields.push('completed = ?');
        updateValues.push(updates.completed);
      }

      if (updateFields.length === 0) {
        throw new Error('Nenhum campo para atualizar');
      }

      updateValues.push(id);

      const updateSQL = `UPDATE tasks SET ${updateFields.join(', ')} WHERE id = ?`;
      await databaseConnection.execute(updateSQL, updateValues);

      // Buscar a tarefa atualizada
      const updatedTask = await this.findById(id);
      console.log('✅ Tarefa atualizada no repositório:', id);
      
      return updatedTask;
    } catch (error) {
      console.error('❌ Erro ao atualizar tarefa:', error);
      throw error;
    }
  }

  // Remover tarefa
  async delete(id) {
    try {
      const [result] = await databaseConnection.execute(
        'DELETE FROM tasks WHERE id = ?',
        [id]
      );

      if (result.affectedRows === 0) {
        throw new Error('Tarefa não encontrada');
      }

      console.log('🗑️ Tarefa removida do repositório:', id);
      return true;
    } catch (error) {
      console.error('❌ Erro ao remover tarefa:', error);
      throw error;
    }
  }

  // Remover tarefas concluídas
  async deleteCompleted() {
    try {
      const [result] = await databaseConnection.execute(
        'DELETE FROM tasks WHERE completed = TRUE'
      );

      console.log('🗑️ Tarefas concluídas removidas do repositório:', result.affectedRows);
      return result.affectedRows;
    } catch (error) {
      console.error('❌ Erro ao remover tarefas concluídas:', error);
      throw new Error('Erro ao remover tarefas concluídas');
    }
  }

  // Remover todas as tarefas
  async deleteAll() {
    try {
      const [result] = await databaseConnection.execute('DELETE FROM tasks');
      
      console.log('🗑️ Todas as tarefas removidas do repositório:', result.affectedRows);
      return result.affectedRows;
    } catch (error) {
      console.error('❌ Erro ao remover todas as tarefas:', error);
      throw new Error('Erro ao remover todas as tarefas');
    }
  }

  // Marcar todas como concluídas
  async markAllCompleted() {
    try {
      const [result] = await databaseConnection.execute(
        'UPDATE tasks SET completed = TRUE'
      );

      console.log('✅ Todas as tarefas marcadas como concluídas no repositório:', result.affectedRows);
      return result.affectedRows;
    } catch (error) {
      console.error('❌ Erro ao marcar todas como concluídas:', error);
      throw new Error('Erro ao marcar todas as tarefas como concluídas');
    }
  }

  // Marcar todas como pendentes
  async markAllPending() {
    try {
      const [result] = await databaseConnection.execute(
        'UPDATE tasks SET completed = FALSE'
      );

      console.log('🔄 Todas as tarefas marcadas como pendentes no repositório:', result.affectedRows);
      return result.affectedRows;
    } catch (error) {
      console.error('❌ Erro ao marcar todas como pendentes:', error);
      throw new Error('Erro ao marcar todas as tarefas como pendentes');
    }
  }
}

module.exports = TaskRepository; 