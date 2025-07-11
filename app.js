/**
 * 📝 ToDo List com Knockout.js - Padrão MVVM
 * 
 * ESTRUTURA MVVM:
 * - MODEL: Task (representação dos dados)
 * - VIEWMODEL: TodoViewModel (lógica de negócio e estado)
 * - VIEW: HTML com data-bind (apresentação)
 */

// ========================================
// MODEL - Representação dos dados
// ========================================

/**
 * Modelo de uma tarefa
 * @param {string} text - Texto da tarefa
 * @param {boolean} completed - Status de conclusão
 * @param {Date} createdAt - Data de criação
 */
function Task(text, completed = false, createdAt = new Date()) {
    this.text = text;
    this.completed = ko.observable(completed);
    this.createdAt = createdAt;
    
    // Formatação da data para exibição
    this.formattedDate = ko.computed(() => {
        return this.createdAt.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    });
}

// ========================================
// VIEWMODEL - Lógica de negócio e estado
// ========================================

/**
 * ViewModel principal da aplicação
 * Gerencia o estado e a lógica de negócio
 */
function TodoViewModel() {
    const self = this;
    
    // ========================================
    // PROPRIEDADES OBSERVÁVEIS (Estado)
    // ========================================
    
    // Lista de tarefas
    this.tasks = ko.observableArray([]);
    
    // Texto da nova tarefa
    this.newTaskText = ko.observable('');
    
    // Filtro atual
    this.currentFilter = ko.observable('all');
    
    // ========================================
    // COMPUTED PROPERTIES (Valores calculados)
    // ========================================
    
    // Tarefas filtradas baseadas no filtro atual
    this.filteredTasks = ko.computed(() => {
        const filter = self.currentFilter();
        const tasks = self.tasks();
        
        switch (filter) {
            case 'completed':
                return tasks.filter(task => task.completed());
            case 'pending':
                return tasks.filter(task => !task.completed());
            default:
                return tasks;
        }
    });
    
    // Estatísticas calculadas
    this.totalTasks = ko.computed(() => self.tasks().length);
    this.completedTasks = ko.computed(() => 
        self.tasks().filter(task => task.completed()).length
    );
    this.pendingTasks = ko.computed(() => 
        self.tasks().filter(task => !task.completed()).length
    );
    
    // ========================================
    // MÉTODOS (Lógica de negócio)
    // ========================================
    
    /**
     * Adiciona uma nova tarefa
     */
    this.addTask = function() {
        const text = self.newTaskText().trim();
        
        if (text.length > 0) {
            // Criar nova instância do Model
            const newTask = new Task(text);
            
            // Adicionar à lista observável
            self.tasks.push(newTask);
            
            // Limpar o campo de entrada
            self.newTaskText('');
            
            // Salvar no localStorage
            self.saveToLocalStorage();
            
            console.log('✅ Tarefa adicionada:', text);
        }
    };
    
    /**
     * Adiciona tarefa ao pressionar Enter
     */
    this.addTaskOnEnter = function(data, event) {
        if (event.keyCode === 13) { // Enter key
            self.addTask();
        }
        return true;
    };
    
    /**
     * Remove uma tarefa específica
     */
    this.removeTask = function(task) {
        if (confirm('Tem certeza que deseja remover esta tarefa?')) {
            self.tasks.remove(task);
            self.saveToLocalStorage();
            console.log('🗑️ Tarefa removida:', task.text);
        }
    };
    
    /**
     * Marca todas as tarefas como concluídas
     */
    this.markAllCompleted = function() {
        self.tasks().forEach(task => {
            task.completed(true);
        });
        self.saveToLocalStorage();
        console.log('✅ Todas as tarefas marcadas como concluídas');
    };
    
    /**
     * Marca todas as tarefas como pendentes
     */
    this.markAllPending = function() {
        self.tasks().forEach(task => {
            task.completed(false);
        });
        self.saveToLocalStorage();
        console.log('🔄 Todas as tarefas marcadas como pendentes');
    };
    
    /**
     * Remove todas as tarefas concluídas
     */
    this.clearCompleted = function() {
        if (confirm('Tem certeza que deseja remover todas as tarefas concluídas?')) {
            const completedTasks = self.tasks().filter(task => task.completed());
            completedTasks.forEach(task => {
                self.tasks.remove(task);
            });
            self.saveToLocalStorage();
            console.log('🗑️ Tarefas concluídas removidas');
        }
    };
    
    /**
     * Remove todas as tarefas
     */
    this.clearAll = function() {
        if (confirm('Tem certeza que deseja remover TODAS as tarefas?')) {
            self.tasks.removeAll();
            self.saveToLocalStorage();
            console.log('🗑️ Todas as tarefas removidas');
        }
    };
    
    // ========================================
    // PERSISTÊNCIA (LocalStorage)
    // ========================================
    
    /**
     * Salva as tarefas no localStorage
     */
    this.saveToLocalStorage = function() {
        try {
            const tasksData = self.tasks().map(task => ({
                text: task.text,
                completed: task.completed(),
                createdAt: task.createdAt.toISOString()
            }));
            
            localStorage.setItem('knockout-todo-tasks', JSON.stringify(tasksData));
            console.log('💾 Tarefas salvas no localStorage');
        } catch (error) {
            console.error('❌ Erro ao salvar no localStorage:', error);
        }
    };
    
    /**
     * Carrega as tarefas do localStorage
     */
    this.loadFromLocalStorage = function() {
        try {
            const savedData = localStorage.getItem('knockout-todo-tasks');
            
            if (savedData) {
                const tasksData = JSON.parse(savedData);
                
                const loadedTasks = tasksData.map(taskData => {
                    const task = new Task(
                        taskData.text,
                        taskData.completed,
                        new Date(taskData.createdAt)
                    );
                    return task;
                });
                
                self.tasks(loadedTasks);
                console.log('📂 Tarefas carregadas do localStorage:', loadedTasks.length);
            }
        } catch (error) {
            console.error('❌ Erro ao carregar do localStorage:', error);
        }
    };
    
    // ========================================
    // INICIALIZAÇÃO
    // ========================================
    
    /**
     * Inicializa o ViewModel
     */
    this.init = function() {
        // Carregar dados salvos
        self.loadFromLocalStorage();
        
        // Adicionar dados de exemplo se não houver tarefas
        if (self.tasks().length === 0) {
            self.addSampleTasks();
        }
        
        // Observar mudanças para salvar automaticamente
        self.tasks.subscribe(() => {
            self.saveToLocalStorage();
        });
        
        console.log('🚀 TodoViewModel inicializado com sucesso!');
    };
    
    /**
     * Adiciona tarefas de exemplo para demonstração
     */
    this.addSampleTasks = function() {
        const sampleTasks = [
            'Aprender Knockout.js',
            'Implementar padrão MVVM',
            'Criar ToDo List funcional',
            'Estudar observables e computed properties'
        ];
        
        sampleTasks.forEach(text => {
            const task = new Task(text, Math.random() > 0.5);
            self.tasks.push(task);
        });
        
        console.log('📝 Tarefas de exemplo adicionadas');
    };
}

// ========================================
// INICIALIZAÇÃO DA APLICAÇÃO
// ========================================

// Aguardar o DOM estar pronto
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 Iniciando aplicação Knockout.js MVVM...');
    
    // Criar instância do ViewModel
    const todoViewModel = new TodoViewModel();
    
    // Inicializar o ViewModel
    todoViewModel.init();
    
    // Aplicar o binding do Knockout
    ko.applyBindings(todoViewModel);
    
    console.log('✅ Aplicação iniciada com sucesso!');
    console.log('📚 Padrão MVVM implementado:');
    console.log('   - Model: Task (dados)');
    console.log('   - ViewModel: TodoViewModel (lógica)');
    console.log('   - View: HTML com data-bind (apresentação)');
});

// ========================================
// UTILITÁRIOS PARA DESENVOLVIMENTO
// ========================================

// Expor o ViewModel globalmente para debug (apenas em desenvolvimento)
if (typeof window !== 'undefined') {
    window.TodoViewModel = TodoViewModel;
    window.Task = Task;
} 