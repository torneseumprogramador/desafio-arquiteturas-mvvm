export default {
    viewModel: function(params) {
        return params.root;
    },
    template: `
    <section class="filters-section">
        <h2>Filtros</h2>
        <div class="filter-buttons">
            <button 
                class="btn btn-filter" 
                data-bind="css: { active: currentFilter() === 'all' }, click: function() { currentFilter('all') }"
            >
                Todas
            </button>
            <button 
                class="btn btn-filter" 
                data-bind="css: { active: currentFilter() === 'pending' }, click: function() { currentFilter('pending') }"
            >
                Pendentes
            </button>
            <button 
                class="btn btn-filter" 
                data-bind="css: { active: currentFilter() === 'completed' }, click: function() { currentFilter('completed') }"
            >
                Concluídas
            </button>
        </div>
    </section>
    `
}; 