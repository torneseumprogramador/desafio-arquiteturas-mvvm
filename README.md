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

### Opção 1: Vite (Desenvolvimento Local - Recomendado)

```bash
# 1. Clonar ou baixar o projeto
# 2. Navegar para o diretório
cd knockout-mvvm-todo

# 3. Instalar dependências
npm install

# 4. Executar com Vite
npm run dev

# 5. Acessar no navegador
# http://localhost:3000
```

### Opção 2: Script de Gerenciamento

```bash
# Usar o script run.sh para facilitar o gerenciamento
./run.sh vite           # Iniciar com Vite
./run.sh vite-build     # Build para produção
./run.sh start          # Iniciar com Docker
./run.sh dev            # Modo desenvolvimento Docker
```

### Opção 3: Docker Compose (Produção)

O Docker agora faz o build do projeto e serve os arquivos estáticos com Nginx:

```bash
# 1. Clonar ou baixar o projeto
# 2. Navegar para o diretório
cd knockout-mvvm-todo

# 3. Build e subir o container
# (O build do Vite é feito automaticamente no Dockerfile)
docker-compose up --build

# 4. Acessar no navegador
# http://localhost:8080
```

## 📁 Estrutura do Projeto

```
knockout-mvvm-todo/
├── index.html                # View - Interface do usuário
├── app.js                   # Bootstrap - Inicialização Knockout
├── package.json             # Dependências e scripts
├── vite.config.js           # Configuração do Vite
├── src/
│   ├── model/Task.js        # Model
│   ├── viewmodel/TodoViewModel.js  # ViewModel
│   └── view/style.css       # Estilos (View)
├── Dockerfile
├── docker-compose.yml
├── docker-compose.dev.yml
├── run.sh                   # Script de gerenciamento
└── README.md
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
- **Vite**: Build tool e servidor de desenvolvimento
- **Docker**: Containerização
- **http-server**: Servidor de desenvolvimento (alternativo)

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