export default {
    viewModel: function(params) {
        // Usa o viewModel principal passado como root
        return params.root;
    },
    template: `
    <section class="add-task-section">
        <h2>Adicionar Nova Tarefa</h2>
        <div class="input-group">
            <input type="text" id="newTaskInput"
                placeholder="Digite sua tarefa aqui..."
                data-bind="value: newTaskText, event: { keyup: addTaskOnEnter }"
                maxlength="100">
            <button type="button"
                data-bind="click: addTask, enable: newTaskText().trim().length > 0"
                class="btn btn-primary">
                ➕ Adicionar
            </button>
        </div>
    </section>
    `
}; 