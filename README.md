# 🧠 Task Manager

Aplicação fullstack para gerenciamento de tarefas, construída com **ASP.NET Core (API)** e **Vue.js (Web UI)**.  
Este projeto tem como objetivo demonstrar uma arquitetura simples, funcional e extensível para aplicações web modernas.

### WebUi:
<img width="1138" height="997" alt="image" src="https://github.com/user-attachments/assets/386c01a5-24e6-4a5b-980c-fa00201e29f5" />

### API:
<img width="1079" height="999" alt="image" src="https://github.com/user-attachments/assets/6800bb17-78a5-419c-b6ad-e8e68ea5f624" />

---

## 📦 Tecnologias Utilizadas

### 🔧 Backend – ASP.NET Core (`TaskManager.API`)

- `Microsoft.AspNetCore.Mvc` – Estrutura de controllers e rotas REST  
- `Microsoft.EntityFrameworkCore.Sqlite` – ORM com suporte ao SQLite  
- `Microsoft.EntityFrameworkCore.Tools` – Ferramentas para migrations  
- `Swashbuckle.AspNetCore` – Geração automática de documentação Swagger  
- `FluentValidation` – Validação de modelos com regras declarativas  
- `Maspter` – Mapeamento entre DTOs e entidades

### 🎨 Frontend – Vue.js (`TaskManager.WebUi`)

- `vue` – Framework principal para construção da interface  
- `fetch` – Comunicação com a API  
- `bootstrap` – Estilização responsiva e componentes visuais  
- `vue-loader` + `webpack` – Empacotamento e build do projeto  
- `vue-cli-service` – Scripts de desenvolvimento e produção

### 🐳 Docker

- `Dockerfile` – Configuração de build para API e Web UI  
- `docker-compose.yml` – Orquestração dos serviços e rede interna

<img width="1916" height="1030" alt="image" src="https://github.com/user-attachments/assets/f253bcb9-4077-4b7f-a852-4e942d046e72" />

---

## 🚀 Funcionalidades

- Criar, listar, editar e excluir tarefas  
- Marcar tarefas como concluídas  
- Validação de campos obrigatórios  
- Edição inline de título e descrição  
- Interface responsiva com Bootstrap  
- Integração automática entre ambientes local e Docker

---

## 🛠️ Como Executar

### 🔧 Ambiente Local (sem Docker)

1. **API**  
   - Projeto: `TaskManager.API`  
   - Executar via Visual Studio ou CLI  
   - Acessar Swagger: [`https://localhost:7112/swagger/index.html`](https://localhost:7112/swagger/index.html)

2. **Web UI**  
   - Projeto: `TaskManager.WebUi`  
   - Executar via Visual Studio ou CLI  
   - Acessar via navegador: [`https://localhost:7138`](https://localhost:7138)

---

### 🐳 Ambiente com Docker

1. Execute o comando:

   ```bash
   docker-compose up --build
   
   <img width="869" height="390" alt="image" src="https://github.com/user-attachments/assets/f4d512dd-3270-4eab-82fe-e2ae09d8afe9" />

---

- Acesse os serviços:
- API: 
- Web UI: 
O frontend detecta automaticamente o ambiente e se conecta à API correta, seja local ou via Docker.

### Depurar via Visual Studio
<img width="1523" height="838" alt="image" src="https://github.com/user-attachments/assets/9e0674bc-3953-4476-8f8f-725d5af72696" />



## 🧱 Estrutura da Solution (Arquitetura Limpa)
Este projeto segue os princípios da Clean Architecture, proposta por Robert C. Martin (Uncle Bob), com o objetivo de manter o código desacoplado, testável e escalável. A separação em camadas permite que regras de negócio fiquem isoladas de detalhes técnicos como banco de dados, frameworks ou interfaces.

📁 Descrição das Camadas
- **Domain** Contém as entidades centrais (Task, etc.) e contratos (interfaces). Esta camada é totalmente independente de qualquer tecnologia externa.
- **Application** Implementa os casos de uso e regras de negócio. Depende apenas da camada de domínio. Aqui também estão as validações com FluentValidation.
- **Infrastructure** Responsável por persistência de dados, repositórios e serviços auxiliares. Neste projeto, utiliza SQLite como banco de dados por ser leve, embutido e ideal para aplicações simples ou ambientes de desenvolvimento.
A escolha do **SQLite** foi feita por três motivos principais:
- Zero configuração: não exige instalação de servidor ou setup complexo.
- Portabilidade: o banco é armazenado em um único arquivo .db, facilitando testes e deploys rápidos.
- Desempenho suficiente: para aplicações com volume moderado de dados, o SQLite oferece performance adequada sem sobrecarga.
- **API** Camada de apresentação que expõe os endpoints REST via ASP.NET Core. Faz a ponte entre o mundo externo e os casos de uso da aplicação.
- **WebUi** Interface construída com **Vue.js**, responsável pela interação com o usuário. Comunica-se com a API via Fetch e roda em container separado via Docker.




