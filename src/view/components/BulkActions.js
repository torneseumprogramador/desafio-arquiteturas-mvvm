export default {
    viewModel: function(params) {
        return params.root;
    },
    template: `
    <section class="bulk-actions" data-bind="visible: tasks().length > 0">
        <h2>Ações em Massa</h2>
        <div class="bulk-buttons">
            <button 
                class="btn btn-secondary" 
                data-bind="click: markAllCompleted, visible: pendingTasks() > 0"
            >
                ✅ Marcar Todas como Concluídas
            </button>
            <button 
                class="btn btn-secondary" 
                data-bind="click: markAllPending, visible: completedTasks() > 0"
            >
                🔄 Marcar Todas como Pendentes
            </button>
            <button 
                class="btn btn-danger" 
                data-bind="click: clearCompleted, visible: completedTasks() > 0"
            >
                🗑️ Limpar Concluídas
            </button>
            <button 
                class="btn btn-danger" 
                data-bind="click: clearAll"
            >
                🗑️ Limpar Todas
            </button>
        </div>
    </section>
    `
}; 