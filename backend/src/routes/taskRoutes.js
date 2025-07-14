const express = require('express');
const TaskController = require('../controllers/TaskController');

const router = express.Router();
const taskController = new TaskController();

// GET /api/tasks - Listar todas as tarefas
router.get('/', taskController.getAllTasks.bind(taskController));

// GET /api/tasks/:id - Buscar tarefa por ID
router.get('/:id', taskController.getTaskById.bind(taskController));

// POST /api/tasks - Criar nova tarefa
router.post('/', taskController.createTask.bind(taskController));

// PUT /api/tasks/:id - Atualizar tarefa
router.put('/:id', taskController.updateTask.bind(taskController));

// DELETE /api/tasks/:id - Remover tarefa específica
router.delete('/:id', taskController.deleteTask.bind(taskController));

// DELETE /api/tasks - Remover tarefas (concluídas ou todas)
router.delete('/', taskController.deleteTasks.bind(taskController));

// PUT /api/tasks/bulk - Ações em massa
router.put('/bulk', taskController.bulkAction.bind(taskController));

module.exports = router; 