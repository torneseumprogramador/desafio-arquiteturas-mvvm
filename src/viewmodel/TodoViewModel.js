import apiService from '../services/api.js';

// ViewModel: TodoViewModel
export default function TodoViewModel(Task) {
    const self = this;
    
    // PROPRIEDADES OBSERVÁVEIS
    this.tasks = ko.observableArray([]);
    this.newTaskText = ko.observable('');
    this.currentFilter = ko.observable('all');
    this.loading = ko.observable(false);
    this.error = ko.observable('');

    // COMPUTED PROPERTIES
    this.filteredTasks = ko.computed(() => {
        const filter = self.currentFilter();
        const tasks = self.tasks();
        switch (filter) {
            case 'completed': return tasks.filter(task => task.completed());
            case 'pending': return tasks.filter(task => !task.completed());
            default: return tasks;
        }
    });
    this.totalTasks = ko.computed(() => self.tasks().length);
    this.completedTasks = ko.computed(() => self.tasks().filter(task => task.completed()).length);
    this.pendingTasks = ko.computed(() => self.tasks().filter(task => !task.completed()).length);

    // MÉTODOS
    this.addTask = async function() {
        const text = self.newTaskText().trim();
        if (text.length > 0) {
            try {
                self.loading(true);
                self.error('');
                
                const taskData = await apiService.createTask(text);
                const newTask = new Task(taskData.text, taskData.completed, new Date(taskData.created_at));
                newTask.id = taskData.id; // Adicionar ID da API
                
                self.tasks.unshift(newTask); // Adicionar no início
                self.newTaskText('');
                
                console.log('✅ Tarefa adicionada via API:', text);
            } catch (error) {
                self.error('Erro ao adicionar tarefa: ' + error.message);
                console.error('❌ Erro ao adicionar tarefa:', error);
            } finally {
                self.loading(false);
            }
        }
    };
    
    this.addTaskOnEnter = function(data, event) {
        if (event.keyCode === 13) self.addTask();
        return true;
    };
    
    this.removeTask = async function(task) {
        if (confirm('Tem certeza que deseja remover esta tarefa?')) {
            try {
                self.loading(true);
                self.error('');
                
                await apiService.deleteTask(task.id);
                self.tasks.remove(task);
                
                console.log('🗑️ Tarefa removida via API:', task.text);
            } catch (error) {
                self.error('Erro ao remover tarefa: ' + error.message);
                console.error('❌ Erro ao remover tarefa:', error);
            } finally {
                self.loading(false);
            }
        }
    };
    
    this.toggleTask = async function(task) {
        try {
            self.loading(true);
            self.error('');
            
            const newStatus = !task.completed();
            await apiService.updateTask(task.id, { completed: newStatus });
            task.completed(newStatus);
            
            console.log('✅ Status da tarefa atualizado via API:', task.text);
        } catch (error) {
            self.error('Erro ao atualizar tarefa: ' + error.message);
            console.error('❌ Erro ao atualizar tarefa:', error);
            // Reverter mudança em caso de erro
            task.completed(!task.completed());
        } finally {
            self.loading(false);
        }
    };
    
    this.markAllCompleted = async function() {
        try {
            self.loading(true);
            self.error('');
            
            await apiService.bulkAction('markAllCompleted');
            self.tasks().forEach(task => task.completed(true));
            
            console.log('✅ Todas as tarefas marcadas como concluídas via API');
        } catch (error) {
            self.error('Erro ao marcar todas como concluídas: ' + error.message);
            console.error('❌ Erro na ação em massa:', error);
        } finally {
            self.loading(false);
        }
    };
    
    this.markAllPending = async function() {
        try {
            self.loading(true);
            self.error('');
            
            await apiService.bulkAction('markAllPending');
            self.tasks().forEach(task => task.completed(false));
            
            console.log('🔄 Todas as tarefas marcadas como pendentes via API');
        } catch (error) {
            self.error('Erro ao marcar todas como pendentes: ' + error.message);
            console.error('❌ Erro na ação em massa:', error);
        } finally {
            self.loading(false);
        }
    };
    
    this.clearCompleted = async function() {
        if (confirm('Tem certeza que deseja remover todas as tarefas concluídas?')) {
            try {
                self.loading(true);
                self.error('');
                
                await apiService.deleteCompletedTasks();
                const completedTasks = self.tasks().filter(task => task.completed());
                completedTasks.forEach(task => self.tasks.remove(task));
                
                console.log('🗑️ Tarefas concluídas removidas via API');
            } catch (error) {
                self.error('Erro ao remover tarefas concluídas: ' + error.message);
                console.error('❌ Erro ao remover tarefas concluídas:', error);
            } finally {
                self.loading(false);
            }
        }
    };
    
    this.clearAll = async function() {
        if (confirm('Tem certeza que deseja remover TODAS as tarefas?')) {
            try {
                self.loading(true);
                self.error('');
                
                await apiService.deleteAllTasks();
                self.tasks.removeAll();
                
                console.log('🗑️ Todas as tarefas removidas via API');
            } catch (error) {
                self.error('Erro ao remover todas as tarefas: ' + error.message);
                console.error('❌ Erro ao remover todas as tarefas:', error);
            } finally {
                self.loading(false);
            }
        }
    };

    // CARREGAMENTO DE DADOS
    this.loadTasks = async function() {
        try {
            self.loading(true);
            self.error('');
            
            const tasksData = await apiService.getTasks();
            const loadedTasks = tasksData.map(taskData => {
                const task = new Task(taskData.text, taskData.completed, new Date(taskData.created_at));
                task.id = taskData.id; // Adicionar ID da API
                return task;
            });
            
            self.tasks(loadedTasks);
            console.log('📂 Tarefas carregadas da API:', loadedTasks.length);
        } catch (error) {
            self.error('Erro ao carregar tarefas: ' + error.message);
            console.error('❌ Erro ao carregar tarefas:', error);
        } finally {
            self.loading(false);
        }
    };
    
    this.init = async function() {
        console.log('🚀 Iniciando TodoViewModel com API...');
        await self.loadTasks();
        
        // Se não houver tarefas, adicionar algumas de exemplo
        if (self.tasks().length === 0) {
            await self.addSampleTasks();
        }
    };
    
    this.addSampleTasks = async function() {
        const sampleTasks = [
            'Aprender Knockout.js',
            'Implementar padrão MVVM',
            'Criar ToDo List funcional',
            'Estudar observables e computed properties'
        ];
        
        for (const text of sampleTasks) {
            try {
                const taskData = await apiService.createTask(text);
                const task = new Task(taskData.text, taskData.completed, new Date(taskData.created_at));
                task.id = taskData.id;
                self.tasks.push(task);
            } catch (error) {
                console.error('❌ Erro ao adicionar tarefa de exemplo:', error);
            }
        }
        
        console.log('📝 Tarefas de exemplo adicionadas via API');
    };
} 