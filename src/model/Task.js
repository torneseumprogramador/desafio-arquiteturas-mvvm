// Model: Task
export default function Task(text, completed = false, createdAt = new Date()) {
    this.text = text;
    this.completed = ko.observable(completed);
    this.createdAt = createdAt;
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