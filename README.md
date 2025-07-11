# 📝 ToDo List com Knockout.js - Padrão MVVM

Um projeto demonstrativo completo implementando uma **ToDo List** usando **Knockout.js** e seguindo o padrão arquitetural **MVVM** (Model-View-ViewModel).

## 🎯 Objetivo

Este projeto demonstra como implementar o padrão **MVVM** usando **Knockout.js**, criando uma aplicação web moderna e responsiva para gerenciamento de tarefas.

## 🏗️ Arquitetura MVVM

### 📋 Model (Modelo)
- **`Task`**: Representa uma tarefa individual
  - Propriedades: `text`, `completed`, `createdAt`
  - Responsável pelos dados e sua estrutura

### 🎮 ViewModel
- **`TodoViewModel`**: Gerencia a lógica de negócio e estado
  - Observables: `tasks`, `newTaskText`, `currentFilter`
  - Computed Properties: `filteredTasks`, `totalTasks`, `completedTasks`, `pendingTasks`
  - Métodos: `addTask()`, `removeTask()`, `markAllCompleted()`, etc.

### 🖥️ View (Visualização)
- **HTML** com atributos `data-bind` do Knockout.js
- Responsável pela apresentação e interação com o usuário

## ✨ Funcionalidades

- ✅ **Adicionar tarefas** com validação
- ✅ **Marcar como concluída** com checkbox
- ✅ **Remover tarefas** com confirmação
- ✅ **Filtros** (Todas, Pendentes, Concluídas)
- ✅ **Estatísticas** em tempo real
- ✅ **Ações em massa** (marcar todas, limpar concluídas)
- ✅ **Persistência** no localStorage
- ✅ **Design responsivo** e moderno
- ✅ **Animações** suaves
- ✅ **Tema escuro** automático

## 🚀 Como Executar

### Opção 1: Docker Compose (Recomendado)

```bash
# 1. Clonar ou baixar o projeto
# 2. Navegar para o diretório
cd knockout-mvvm-todo

# 3. Executar com Docker Compose
docker-compose up

# 4. Acessar no navegador
# http://localhost:8080
```

### Opção 2: Docker Direto

```bash
# 1. Construir a imagem
docker build -t knockout-mvvm-todo .

# 2. Executar o container
docker run -p 8080:8080 knockout-mvvm-todo

# 3. Acessar no navegador
# http://localhost:8080
```

### Opção 3: Servidor Local

```bash
# 1. Instalar http-server globalmente
npm install -g http-server

# 2. Executar o servidor
http-server -p 8080

# 3. Acessar no navegador
# http://localhost:8080
```

## 📁 Estrutura do Projeto

```
knockout-mvvm-todo/
├── index.html          # View - Interface do usuário
├── app.js             # ViewModel - Lógica de negócio
├── style.css          # Estilos CSS responsivos
├── Dockerfile         # Configuração do container Docker
├── docker-compose.yml # Orquestração com Docker Compose
└── README.md          # Documentação do projeto
```

## 🔧 Comandos Docker Úteis

```bash
# Iniciar em background
docker-compose up -d

# Parar a aplicação
docker-compose down

# Reconstruir após mudanças
docker-compose up --build

# Ver logs
docker-compose logs -f

# Executar em modo de desenvolvimento (com volumes)
docker-compose -f docker-compose.dev.yml up
```

## 🎨 Características do Design

- **Design Moderno**: Gradientes, sombras e bordas arredondadas
- **Responsivo**: Funciona em desktop, tablet e mobile
- **Animações**: Transições suaves e efeitos hover
- **Acessibilidade**: Foco visível e navegação por teclado
- **Tema Escuro**: Suporte automático ao modo escuro do sistema

## 📚 Conceitos MVVM Demonstrados

### 1. **Observables**
```javascript
this.tasks = ko.observableArray([]);
this.newTaskText = ko.observable('');
```

### 2. **Computed Properties**
```javascript
this.filteredTasks = ko.computed(() => {
    // Lógica de filtro baseada no estado atual
});
```

### 3. **Data Binding**
```html
<input data-bind="value: newTaskText, event: { keypress: addTaskOnEnter }">
```

### 4. **Separação de Responsabilidades**
- **Model**: Estrutura de dados (`Task`)
- **ViewModel**: Lógica de negócio (`TodoViewModel`)
- **View**: Apresentação (HTML + CSS)

## 🔍 Debug e Desenvolvimento

### Console do Navegador
O projeto inclui logs detalhados no console para facilitar o debug:

```javascript
console.log('✅ Tarefa adicionada:', text);
console.log('🗑️ Tarefa removida:', task.text);
```

### Acesso Global
Para debug, o ViewModel é exposto globalmente:

```javascript
// No console do navegador
window.TodoViewModel  // Construtor do ViewModel
window.Task          // Construtor do Model
```

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilos modernos e responsivos
- **JavaScript ES6+**: Lógica da aplicação
- **Knockout.js 3.5.1**: Framework MVVM (via unpkg CDN)
- **Docker**: Containerização
- **http-server**: Servidor de desenvolvimento

## 📖 Aprendizados

Este projeto demonstra:

1. **Padrão MVVM** na prática
2. **Observables** e **Computed Properties** do Knockout.js
3. **Data Binding** bidirecional
4. **Separação de responsabilidades**
5. **Containerização** com Docker
6. **Design responsivo** moderno
7. **Persistência** de dados no cliente

## 🤝 Contribuições

Sinta-se à vontade para contribuir com melhorias:

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

## 🎓 Recursos para Aprender Mais

- [Documentação oficial do Knockout.js](https://knockoutjs.com/)
- [Padrão MVVM - Microsoft](https://docs.microsoft.com/en-us/xamarin/xamarin-forms/enterprise-application-patterns/mvvm)
- [Docker Documentation](https://docs.docker.com/)
- [CSS Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)

---

**Desenvolvido com ❤️ para demonstrar o padrão MVVM com Knockout.js** 