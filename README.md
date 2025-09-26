# Task Manager

Aplicação fullstack para gerenciamento de tarefas, construída com ASP.NET Core (API) e Vue.js (WebUi).

## Funcionalidades

- Adicionar tarefas  
- Listar tarefas  
- Editar título e descrição  
- Marcar como concluída  
- Validação de ID único  
- Integração com SQLite  

## Como rodar

### 🔧 Localmente (sem Docker)

1. Rode a API (`TaskManager.API`) — disponível em [`https://localhost:7112/swagger/index.html`](https://localhost:7112/swagger/index.html)  
2. Rode o WebUi (`TaskManager.WebUi`) — acessível em `https://localhost:7138`  
3. Acesse o sistema via navegador: `https://localhost:7138`

### 🐳 Com Docker

1. Execute `docker-compose up --build`  
2. A API será exposta em: `http://localhost:5000`  
3. O WebUi será acessível em: `http://localhost:5001`

> O frontend detecta automaticamente o ambiente e se conecta à API correta, seja local ou via Docker.

## Autor

**Jéfferson Canalli**
