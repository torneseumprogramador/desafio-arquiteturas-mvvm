#!/bin/bash

# ========================================
# 📝 Script de Gerenciamento - ToDo List Knockout.js
# Comandos úteis para Docker, Docker Compose e Vite
# ========================================

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Função para exibir mensagens coloridas
print_message() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}  $1${NC}"
    echo -e "${BLUE}================================${NC}"
}

# Função para verificar se Docker está instalado
check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker não está instalado!"
        echo "Instale o Docker em: https://docs.docker.com/get-docker/"
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose não está instalado!"
        echo "Instale o Docker Compose em: https://docs.docker.com/compose/install/"
        exit 1
    fi
    
    print_message "Docker e Docker Compose encontrados ✓"
}

# Função para verificar se os arquivos necessários existem
check_files() {
    local required_files=("index.html" "app.js" "src/view/style.css" "Dockerfile" "docker-compose.yml")
    
    for file in "${required_files[@]}"; do
        if [ ! -f "$file" ]; then
            print_error "Arquivo $file não encontrado!"
            exit 1
        fi
    done
    
    print_message "Todos os arquivos necessários encontrados ✓"
}

# Função para mostrar ajuda
show_help() {
    print_header "COMANDOS DISPONÍVEIS"
    echo ""
    echo -e "${CYAN}Iniciar aplicação:${NC}"
    echo "  $0 start          - Iniciar em modo produção (Docker)"
    echo "  $0 dev            - Iniciar em modo desenvolvimento (Docker)"
    echo "  $0 start-bg       - Iniciar em background (Docker)"
    echo "  $0 dev-bg         - Iniciar dev em background (Docker)"
    echo "  $0 vite           - Iniciar com Vite (desenvolvimento local)"
    echo "  $0 vite-build     - Build para produção com Vite"
    echo ""
    echo -e "${CYAN}Gerenciar aplicação:${NC}"
    echo "  $0 stop           - Parar aplicação"
    echo "  $0 restart        - Reiniciar aplicação"
    echo "  $0 status         - Ver status dos containers"
    echo ""
    echo -e "${CYAN}Logs e Debug:${NC}"
    echo "  $0 logs           - Ver logs em tempo real"
    echo "  $0 logs-follow    - Ver logs com follow"
    echo "  $0 shell          - Acessar shell do container"
    echo ""
    echo -e "${CYAN}Build e Manutenção:${NC}"
    echo "  $0 build          - Construir imagem"
    echo "  $0 rebuild        - Reconstruir imagem"
    echo "  $0 clean          - Limpar containers e imagens"
    echo "  $0 clean-all      - Limpar tudo (cuidado!)"
    echo ""
    echo -e "${CYAN}Informações:${NC}"
    echo "  $0 info           - Informações do projeto"
    echo "  $0 help           - Mostrar esta ajuda"
    echo ""
    echo -e "${YELLOW}Exemplos:${NC}"
    echo "  $0 start          # Iniciar aplicação"
    echo "  $0 dev            # Modo desenvolvimento"
    echo "  $0 logs           # Ver logs"
    echo "  $0 stop           # Parar aplicação"
}

# Função para mostrar informações do projeto
show_info() {
    print_header "INFORMAÇÕES DO PROJETO"
    echo ""
    echo -e "${CYAN}Nome:${NC} ToDo List com Knockout.js - Padrão MVVM"
    echo -e "${CYAN}Porta:${NC} http://localhost:8080"
    echo -e "${CYAN}Framework:${NC} Knockout.js 3.5.1"
    echo -e "${CYAN}Padrão:${NC} MVVM (Model-View-ViewModel)"
    echo ""
    echo -e "${CYAN}Arquivos principais:${NC}"
    echo "  - index.html (View)"
    echo "  - app.js (Bootstrap)"
    echo "  - src/model/Task.js (Model)"
    echo "  - src/viewmodel/TodoViewModel.js (ViewModel)"
    echo "  - src/view/style.css (Estilos)"
    echo ""
    echo -e "${CYAN}Comandos úteis:${NC}"
    echo "  $0 start          # Iniciar aplicação"
    echo "  $0 dev            # Modo desenvolvimento"
    echo "  $0 logs           # Ver logs"
    echo ""
    echo -e "${GREEN}Acesse: http://localhost:8080${NC}"
}

# Função para iniciar aplicação
start_app() {
    print_header "INICIANDO APLICAÇÃO"
    check_docker
    check_files
    
    print_message "Iniciando ToDo List com Docker Compose..."
    docker-compose up
}

# Função para iniciar aplicação em background
start_app_bg() {
    print_header "INICIANDO APLICAÇÃO EM BACKGROUND"
    check_docker
    check_files
    
    print_message "Iniciando ToDo List em background..."
    docker-compose up -d
    
    if [ $? -eq 0 ]; then
        print_message "Aplicação iniciada com sucesso! ✓"
        echo -e "${GREEN}Acesse: http://localhost:8080${NC}"
    else
        print_error "Erro ao iniciar aplicação!"
        exit 1
    fi
}

# Função para iniciar modo desenvolvimento
start_dev() {
    print_header "INICIANDO MODO DESENVOLVIMENTO"
    check_docker
    check_files
    
    if [ ! -f "docker-compose.dev.yml" ]; then
        print_error "Arquivo docker-compose.dev.yml não encontrado!"
        exit 1
    fi
    
    print_message "Iniciando modo desenvolvimento com volumes..."
    docker-compose -f docker-compose.dev.yml up
}

# Função para iniciar modo desenvolvimento em background
start_dev_bg() {
    print_header "INICIANDO MODO DESENVOLVIMENTO EM BACKGROUND"
    check_docker
    check_files
    
    if [ ! -f "docker-compose.dev.yml" ]; then
        print_error "Arquivo docker-compose.dev.yml não encontrado!"
        exit 1
    fi
    
    print_message "Iniciando modo desenvolvimento em background..."
    docker-compose -f docker-compose.dev.yml up -d
    
    if [ $? -eq 0 ]; then
        print_message "Modo desenvolvimento iniciado com sucesso! ✓"
        echo -e "${GREEN}Acesse: http://localhost:8080${NC}"
        echo -e "${YELLOW}Alterações nos arquivos são refletidas automaticamente${NC}"
    else
        print_error "Erro ao iniciar modo desenvolvimento!"
        exit 1
    fi
}

# Função para parar aplicação
stop_app() {
    print_header "PARANDO APLICAÇÃO"
    check_docker
    
    print_message "Parando containers..."
    docker-compose down
    
    # Tentar parar também o modo desenvolvimento
    if [ -f "docker-compose.dev.yml" ]; then
        docker-compose -f docker-compose.dev.yml down
    fi
    
    print_message "Aplicação parada com sucesso! ✓"
}

# Função para reiniciar aplicação
restart_app() {
    print_header "REINICIANDO APLICAÇÃO"
    check_docker
    
    print_message "Parando aplicação..."
    docker-compose down
    
    print_message "Iniciando aplicação..."
    docker-compose up -d
    
    if [ $? -eq 0 ]; then
        print_message "Aplicação reiniciada com sucesso! ✓"
        echo -e "${GREEN}Acesse: http://localhost:8080${NC}"
    else
        print_error "Erro ao reiniciar aplicação!"
        exit 1
    fi
}

# Função para ver status
show_status() {
    print_header "STATUS DOS CONTAINERS"
    check_docker
    
    echo ""
    print_message "Containers em execução:"
    docker-compose ps
    
    echo ""
    print_message "Uso de recursos:"
    docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}\t{{.BlockIO}}"
}

# Função para ver logs
show_logs() {
    print_header "LOGS DA APLICAÇÃO"
    check_docker
    
    print_message "Mostrando logs..."
    docker-compose logs
}

# Função para ver logs com follow
show_logs_follow() {
    print_header "LOGS EM TEMPO REAL"
    check_docker
    
    print_message "Mostrando logs em tempo real (Ctrl+C para sair)..."
    docker-compose logs -f
}

# Função para acessar shell do container
access_shell() {
    print_header "ACESSANDO SHELL DO CONTAINER"
    check_docker
    
    print_message "Acessando shell do container..."
    docker-compose exec todo-app sh
}

# Função para construir imagem
build_image() {
    print_header "CONSTRUINDO IMAGEM"
    check_docker
    check_files
    
    print_message "Construindo imagem Docker..."
    docker-compose build
    
    if [ $? -eq 0 ]; then
        print_message "Imagem construída com sucesso! ✓"
    else
        print_error "Erro ao construir imagem!"
        exit 1
    fi
}

# Função para reconstruir imagem
rebuild_image() {
    print_header "RECONSTRUINDO IMAGEM"
    check_docker
    check_files
    
    print_message "Parando containers..."
    docker-compose down
    
    print_message "Reconstruindo imagem (sem cache)..."
    docker-compose build --no-cache
    
    if [ $? -eq 0 ]; then
        print_message "Imagem reconstruída com sucesso! ✓"
        print_message "Para iniciar: $0 start"
    else
        print_error "Erro ao reconstruir imagem!"
        exit 1
    fi
}

# Função para limpar containers e imagens
clean_containers() {
    print_header "LIMPANDO CONTAINERS E IMAGENS"
    check_docker
    
    print_warning "Esta operação irá parar e remover todos os containers relacionados ao projeto."
    read -p "Continuar? (y/N): " -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_message "Parando containers..."
        docker-compose down
        
        if [ -f "docker-compose.dev.yml" ]; then
            docker-compose -f docker-compose.dev.yml down
        fi
        
        print_message "Removendo imagens..."
        docker rmi knockout-mvvm-todo_todo-app 2>/dev/null || true
        docker rmi knockout-mvvm-todo_todo-app-dev 2>/dev/null || true
        
        print_message "Limpeza concluída! ✓"
    else
        print_message "Operação cancelada."
    fi
}

# Função para limpeza completa
clean_all() {
    print_header "LIMPEZA COMPLETA"
    check_docker
    
    print_error "ATENÇÃO: Esta operação irá remover TODOS os containers, imagens e volumes não utilizados!"
    print_error "Isso pode afetar outros projetos Docker!"
    read -p "Tem certeza? Digite 'SIM' para confirmar: " -r
    
    if [[ $REPLY == "SIM" ]]; then
        print_message "Executando limpeza completa..."
        
        # Parar containers do projeto
        docker-compose down 2>/dev/null || true
        docker-compose -f docker-compose.dev.yml down 2>/dev/null || true
        
        # Remover containers parados
        docker container prune -f
        
        # Remover imagens não utilizadas
        docker image prune -a -f
        
        # Remover volumes não utilizados
        docker volume prune -f
        
        # Remover redes não utilizadas
        docker network prune -f
        
        print_message "Limpeza completa concluída! ✓"
    else
        print_message "Operação cancelada."
    fi
}

# Função para iniciar com Vite
start_vite() {
    print_header "INICIANDO COM VITE"
    
    if [ ! -f "package.json" ]; then
        print_error "package.json não encontrado!"
        exit 1
    fi
    
    if [ ! -f "vite.config.js" ]; then
        print_error "vite.config.js não encontrado!"
        exit 1
    fi
    
    print_message "Verificando dependências..."
    if [ ! -d "node_modules" ]; then
        print_message "Instalando dependências..."
        npm install
    fi
    
    print_message "Iniciando servidor de desenvolvimento Vite..."
    echo -e "${GREEN}Acesse: http://localhost:3000${NC}"
    echo -e "${YELLOW}Alterações nos arquivos são refletidas automaticamente${NC}"
    npm run dev
}

# Função para build com Vite
build_vite() {
    print_header "BUILD PARA PRODUÇÃO COM VITE"
    
    if [ ! -f "package.json" ]; then
        print_error "package.json não encontrado!"
        exit 1
    fi
    
    if [ ! -f "vite.config.js" ]; then
        print_error "vite.config.js não encontrado!"
        exit 1
    fi
    
    print_message "Verificando dependências..."
    if [ ! -d "node_modules" ]; then
        print_message "Instalando dependências..."
        npm install
    fi
    
    print_message "Construindo para produção..."
    npm run build
    
    if [ $? -eq 0 ]; then
        print_message "Build concluído com sucesso! ✓"
        echo -e "${GREEN}Arquivos gerados em: ./dist${NC}"
        echo -e "${YELLOW}Para testar: npm run preview${NC}"
    else
        print_error "Erro no build!"
        exit 1
    fi
}

# ========================================
# SCRIPT PRINCIPAL
# ========================================

# Verificar se foi passado algum comando
if [ $# -eq 0 ]; then
    show_help
    exit 0
fi

# Processar comandos
case "$1" in
    "start")
        start_app
        ;;
    "start-bg")
        start_app_bg
        ;;
    "dev")
        start_dev
        ;;
    "dev-bg")
        start_dev_bg
        ;;
    "stop")
        stop_app
        ;;
    "restart")
        restart_app
        ;;
    "status")
        show_status
        ;;
    "logs")
        show_logs
        ;;
    "logs-follow")
        show_logs_follow
        ;;
    "shell")
        access_shell
        ;;
    "build")
        build_image
        ;;
    "rebuild")
        rebuild_image
        start_dev
        ;;
    "clean")
        clean_containers
        ;;
    "clean-all")
        clean_all
        ;;
    "vite")
        start_vite
        ;;
    "vite-build")
        build_vite
        ;;
    "info")
        show_info
        ;;
    "help"|"-h"|"--help")
        show_help
        ;;
    *)
        print_error "Comando '$1' não reconhecido!"
        echo ""
        show_help
        exit 1
        ;;
esac 