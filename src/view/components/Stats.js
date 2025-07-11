export default {
    viewModel: function(params) {
        return params.root;
    },
    template: `
    <section class="stats-section">
        <div class="stats-grid">
            <div class="stat-card">
                <span class="stat-number" data-bind="text: totalTasks"></span>
                <span class="stat-label">Total</span>
            </div>
            <div class="stat-card">
                <span class="stat-number" data-bind="text: completedTasks"></span>
                <span class="stat-label">Concluídas</span>
            </div>
            <div class="stat-card">
                <span class="stat-number" data-bind="text: pendingTasks"></span>
                <span class="stat-label">Pendentes</span>
            </div>
        </div>
    </section>
    `
}; 