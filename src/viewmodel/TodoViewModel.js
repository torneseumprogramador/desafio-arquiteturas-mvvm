// ViewModel: TodoViewModel
export default function TodoViewModel(Task) {
    const self = this;
    // PROPRIEDADES OBSERVÁVEIS
    this.tasks = ko.observableArray([]);
    this.newTaskText = ko.observable('');
    this.currentFilter = ko.observable('all');

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
    this.addTask = function() {
        const text = self.newTaskText().trim();
        if (text.length > 0) {
            const newTask = new Task(text);
            self.tasks.push(newTask);
            self.newTaskText('');
            self.saveToLocalStorage();
        }
    };
    this.addTaskOnEnter = function(data, event) {
        if (event.keyCode === 13) self.addTask();
        return true;
    };
    this.removeTask = function(task) {
        if (confirm('Tem certeza que deseja remover esta tarefa?')) {
            self.tasks.remove(task);
            self.saveToLocalStorage();
        }
    };
    this.markAllCompleted = function() {
        self.tasks().forEach(task => task.completed(true));
        self.saveToLocalStorage();
    };
    this.markAllPending = function() {
        self.tasks().forEach(task => task.completed(false));
        self.saveToLocalStorage();
    };
    this.clearCompleted = function() {
        if (confirm('Tem certeza que deseja remover todas as tarefas concluídas?')) {
            const completedTasks = self.tasks().filter(task => task.completed());
            completedTasks.forEach(task => self.tasks.remove(task));
            self.saveToLocalStorage();
        }
    };
    this.clearAll = function() {
        if (confirm('Tem certeza que deseja remover TODAS as tarefas?')) {
            self.tasks.removeAll();
            self.saveToLocalStorage();
        }
    };

    // PERSISTÊNCIA
    this.saveToLocalStorage = function() {
        try {
            const tasksData = self.tasks().map(task => ({
                text: task.text,
                completed: task.completed(),
                createdAt: task.createdAt.toISOString()
            }));
            localStorage.setItem('knockout-todo-tasks', JSON.stringify(tasksData));
        } catch (error) {}
    };
    this.loadFromLocalStorage = function() {
        try {
            const savedData = localStorage.getItem('knockout-todo-tasks');
            if (savedData) {
                const tasksData = JSON.parse(savedData);
                const loadedTasks = tasksData.map(taskData => new Task(taskData.text, taskData.completed, new Date(taskData.createdAt)));
                self.tasks(loadedTasks);
            }
        } catch (error) {}
    };
    this.init = function() {
        self.loadFromLocalStorage();
        if (self.tasks().length === 0) self.addSampleTasks();
        self.tasks.subscribe(() => self.saveToLocalStorage());
    };
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
    };
} 