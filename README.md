# 📝 ToDo List com Knockout.js - Padrão MVVM

Um projeto demonstrativo completo implementando uma **ToDo List** usando **Knockout.js** e seguindo o padrão arquitetural **MVVM** (Model-View-ViewModel).

## 🎯 Objetivo

Este projeto demonstra como implementar o padrão **MVVM** usando **Knockout.js**, criando uma aplicação web moderna e responsiva para gerenciamento de tarefas.

## 🏗️ Arquitetura MVVM + API

### 📋 Model (Modelo)
- **`Task`**: Representa uma tarefa individual
  - Propriedades: `text`, `completed`, `createdAt`, `id`
  - Responsável pelos dados e sua estrutura

### 🎮 ViewModel
- **`TodoViewModel`**: Gerencia a lógica de negócio e estado
  - Observables: `tasks`, `newTaskText`, `currentFilter`, `loading`, `error`
  - Computed Properties: `filteredTasks`, `totalTasks`, `completedTasks`, `pendingTasks`
  - Métodos: `addTask()`, `removeTask()`, `toggleTask()`, `markAllCompleted()`, etc.
  - Comunicação com API através do `ApiService`

### 🖥️ View (Visualização)
- **HTML** com atributos `data-bind` do Knockout.js
- Responsável pela apresentação e interação com o usuário
- Indicadores de loading e erro

### 🔗 API Backend
- **Express.js** com MySQL
- Rotas RESTful para CRUD de tarefas
- Persistência em banco de dados MySQL

## ✨ Funcionalidades

- ✅ **Adicionar tarefas** com validação
- ✅ **Marcar como concluída** com checkbox
- ✅ **Remover tarefas** com confirmação
- ✅ **Filtros** (Todas, Pendentes, Concluídas)
- ✅ **Estatísticas** em tempo real
- ✅ **Ações em massa** (marcar todas, limpar concluídas)
- ✅ **Persistência** no MySQL via API
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

# 4. Configurar variáveis de ambiente (opcional)
# Criar arquivo .env na raiz do projeto:
# VITE_API_URL=http://localhost:3001

# 5. Executar com Vite
npm run dev

# 6. Acessar no navegador
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

# 3. Configurar variáveis de ambiente (opcional)
# Criar arquivo .env na raiz:
# VITE_API_URL=http://localhost:3001
# MYSQL_ROOT_PASSWORD=minha_senha_segura
# MYSQL_PASSWORD=senha_do_banco

# 4. Build e subir o container
docker-compose up --build

# 5. Acessar no navegador
# http://localhost:8080
```

## ⚙️ Configuração de Ambiente

### Variáveis de Ambiente

O projeto usa variáveis de ambiente para configuração. Todas têm valores padrão e são opcionais:

#### Frontend (Vite)
- `VITE_API_URL`: URL da API backend (padrão: `http://localhost:3001`)

#### Backend (Node.js)
- `DB_HOST`: Host do MySQL (padrão: `mysql`)
- `DB_USER`: Usuário do MySQL (padrão: `todo_user`)
- `DB_PASSWORD`: Senha do MySQL (padrão: `todo_password`)
- `DB_NAME`: Nome do banco (padrão: `todo_db`)
- `DB_PORT`: Porta do MySQL (padrão: `3306`)
- `PORT`: Porta da API (padrão: `3001`)
- `NODE_ENV`: Ambiente (development/production)

#### MySQL
- `MYSQL_ROOT_PASSWORD`: Senha root do MySQL (padrão: `root_password`)
- `MYSQL_DATABASE`: Nome do banco (padrão: `todo_db`)
- `MYSQL_USER`: Usuário do banco (padrão: `todo_user`)
- `MYSQL_PASSWORD`: Senha do usuário (padrão: `todo_password`)

### Arquivo .env (Opcional)

Crie um arquivo `.env` na raiz do projeto para personalizar as configurações:

```env
# Frontend
VITE_API_URL=http://localhost:3001

# Backend
DB_HOST=mysql
DB_USER=todo_user
DB_PASSWORD=minha_senha_segura
DB_NAME=todo_db
DB_PORT=3306
PORT=3001
NODE_ENV=production

# MySQL
MYSQL_ROOT_PASSWORD=root_senha_segura
MYSQL_DATABASE=todo_db
MYSQL_USER=todo_user
MYSQL_PASSWORD=senha_do_banco
```

**Nota**: Se o arquivo `.env` não existir, o projeto usará os valores padrão.

### ⚠️ Importante: Arquitetura SPA

Este projeto usa uma **arquitetura SPA (Single Page Application)**:

- **Frontend**: Aplicação Knockout.js compilada pelo Vite
- **Backend**: API REST separada com Express + MySQL
- **Comunicação**: HTTP direto do navegador para a API

**Por isso:**
- A URL da API deve ser acessível pelo navegador do cliente
- Em produção, ambos (frontend e API) devem estar no mesmo domínio ou com CORS configurado
- A URL `http://localhost:3001` não funciona porque o navegador não resolve esse hostname

## 📁 Estrutura do Projeto

```
knockout-mvvm-todo/
├── index.html                # View - Interface do usuário
├── app.js                   # Bootstrap - Inicialização Knockout
├── package.json             # Dependências e scripts (Frontend)
├── vite.config.js           # Configuração do Vite
├── src/
│   ├── model/Task.js        # Model
│   ├── viewmodel/TodoViewModel.js  # ViewModel
│   ├── services/api.js      # Serviço de comunicação com API
│   └── view/style.css       # Estilos (View)
├── backend/
│   ├── package.json         # Dependências da API
│   ├── server.js            # Servidor Express
│   └── Dockerfile           # Dockerfile da API
├── Dockerfile               # Dockerfile do Frontend
├── docker-compose.yml       # Orquestração completa
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