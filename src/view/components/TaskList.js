export default {
    viewModel: function(params) {
        return params.root;
    },
    template: `
    <section class="tasks-section">
        <h2>Lista de Tarefas</h2>
        <div class="empty-state" data-bind="visible: filteredTasks().length === 0">
            <p>Nenhuma tarefa encontrada.</p>
            <p data-bind="visible: tasks().length === 0">Adicione sua primeira tarefa acima! 🚀</p>
        </div>
        <ul class="tasks-list" data-bind="foreach: filteredTasks">
            <li class="task-item">
                <div class="task-content">
                    <input type="checkbox" data-bind="checked: completed" class="task-checkbox">
                    <span class="task-text" data-bind="text: text, css: { completed: completed }"></span>
                    <span class="task-date" data-bind="text: formattedDate"></span>
                </div>
                <button class="btn btn-danger btn-small" data-bind="click: $parent.removeTask" title="Remover tarefa">
                    🗑️
                </button>
            </li>
        </ul>
    </section>
    `
}; 