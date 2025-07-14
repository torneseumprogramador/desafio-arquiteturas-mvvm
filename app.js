/**
 * 📝 ToDo List com Knockout.js - Padrão MVVM v2.0
 * 
 * ESTRUTURA MVVM:
 * - MODEL: Task (representação dos dados)
 * - VIEWMODEL: TodoViewModel (lógica de negócio e estado)
 * - VIEW: HTML com data-bind (apresentação)
 */

// ========================================
// IMPORTS ES6
// ========================================

import Task from './src/model/Task.js';
import TodoViewModel from './src/viewmodel/TodoViewModel.js';
import AddTask from './src/view/components/AddTask.js';
import Stats from './src/view/components/Stats.js';
import Filters from './src/view/components/Filters.js';
import TaskList from './src/view/components/TaskList.js';
import BulkActions from './src/view/components/BulkActions.js';

// ========================================
// REGISTRO DE COMPONENTES KNOCKOUT
// ========================================

ko.components.register('add-task', AddTask);
ko.components.register('stats', Stats);
ko.components.register('filters', Filters);
ko.components.register('task-list', TaskList);
ko.components.register('bulk-actions', BulkActions);

// ========================================
// INICIALIZAÇÃO DA APLICAÇÃO
// ========================================

document.addEventListener('DOMContentLoaded', async function() {
    console.log('🎯 Iniciando aplicação Knockout.js MVVM com API...');
    
    // Criar instância do ViewModel
    const todoViewModel = new TodoViewModel(Task);
    
    // Aplicar o binding do Knockout
    ko.applyBindings(todoViewModel);
    
    // Inicializar o ViewModel (async)
    await todoViewModel.init();
    
    console.log('✅ Aplicação iniciada com sucesso!');
    console.log('📚 Padrão MVVM implementado:');
    console.log('   - Model: Task (dados)');
    console.log('   - ViewModel: TodoViewModel (lógica)');
    console.log('   - View: HTML com data-bind (apresentação)');
    console.log('🔗 API: Backend com MySQL');
});

// ========================================
// UTILITÁRIOS PARA DESENVOLVIMENTO
// ========================================

// Expor o ViewModel globalmente para debug (apenas em desenvolvimento)
if (typeof window !== 'undefined') {
    window.TodoViewModel = TodoViewModel;
    window.Task = Task;
} 