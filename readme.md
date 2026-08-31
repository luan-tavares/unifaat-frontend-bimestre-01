# Unifaat :: Frontend :: Aula 03 - Vite, Forms e Listeners

---

## 1. Instalação e Execução <a name="instalacao-e-execucao"></a>

### Siga os passos abaixo para rodar o projeto via Docker:

1. Clonar o repositório:

   ```sh
   git clone https://github.com/luan-tavares/unifaat-frontend-bimestre-01
   ```

2. Entrar na pasta do projeto:

   ```sh
   cd unifaat-frontend-bimestre-01
   ```

3. Criar o arquivo `.env` na raiz do projeto copiando o `.env.example`:


   ```sh
   cp .env.example .env
   ```

4. Preencher as variáveis `POSTGRES_USER` e `POSTGRES_PASSWORD` no `.env` (elas vêm vazias no `.env.example`). Exemplo:

   ```env
   POSTGRES_USER=unifaat
   POSTGRES_PASSWORD=123456
   ```

5. Subir a aplicação com Docker Compose:


   ```sh
   docker compose up --build
   ```

6. Com os containers no ar, rodar as migrations do banco de dados:

   ```sh
   node command migrate
   ```

7. Rodar a seed inicial para popular o banco com dados de exemplo:

   ```sh
   node command seed
   ```

---

## 2. 📁 Estrutura de Diretórios (raiz) <a name="estrutura-de-diretorios-raiz"></a>

| Caminho / Pasta      | Descrição                                                                 |
|----------------------|---------------------------------------------------------------------------|
| `docker/`            | Dockerfiles específicos para cada serviço da aplicação.                   |
| `public/`            | Arquivos públicos (como `index.html`) servidos diretamente por HTTP.     |
| `.env`               | Variáveis de ambiente sensíveis carregadas em tempo de execução.          |
| `.env.example`       | Template de `.env` para novos devs copiarem e configurarem.               |
| `.gitignore`         | Lista de arquivos e pastas que o Git deve ignorar.                        |
| `docker-compose.yml` | Orquestração dos containers do projeto.                                   |
| `readme.md`          | Documentação principal do projeto (este arquivo).                         |

---

## 3. 🐳 Containers e Imagens Docker <a name="containers-e-imagens-docker"></a>

### 🗄️ Containers de Infraestrutura

| Container               | Imagem Base          | Função                                                      | Porta Interna |
|-------------------------|-----------------------|--------------------------------------------------------------|---------------|
| `nginx-container`       | `nginx:1.25-alpine`  | Servir arquivos estáticos HTTP (reverse proxy).               | 80            |
| `nodeweb-container`     | `node:25`             | Rodar a API/aplicação Node (servida via `nodemon _web.js`).   | 3000          |
| `nodecommand-container` | `node:25`             | Rodar comandos CLI avulsos (`migrate`, `seed`) via `_command.js`. | —          |
| `nodevitehmr-container` | `node:25`             | Servir o frontend via Vite HMR  | 5172          |
| `postgres-container`    | `postgres:18`         | Banco de dados PostgreSQL da aplicação.                       | 5432          |

### 💾 Volumes Persistentes

| Volume                              | Utilizado por             | Finalidade                                                              |
|--------------------------------------|---------------------------|--------------------------------------------------------------------------|
| `./frontend/public:/var/www`        | `nginx-container`         | Disponibilizar os arquivos estáticos da pasta `frontend/public/` dentro do container. |
| `./logs/nginx:/var/log/nginx`       | `nginx-container`         | Persistir os logs do NGINX fora do container.                          |
| `./backend:/app`                    | `nodeweb-container`, `nodecommand-container` | Disponibilizar o código do backend dentro dos containers Node.        |
| `./frontend/public:/app/public`     | `nodeweb-container`       | Disponibilizar os arquivos estáticos para a aplicação Node servir.     |
| `nodemodules-volume:/app/node_modules` | `nodeweb-container`, `nodecommand-container` | Isolar o `node_modules` instalado em build-time dentro dos containers. |
| `postgres-volume:/var/lib/postgresql` | `postgres-container`    | Persistir os dados do banco entre reinicializações do container.       |
| `./docker/postgres/init:/docker-entrypoint-initdb.d` | `postgres-container` | Scripts executados na inicialização do banco (setup inicial).          |

### 🌐 Redes

Todos os containers estão conectados à rede Docker personalizada:

```text
app_network
```

### 🌍 Portas Expostas Externamente

| Serviço  | Porta Interna | Porta Externa | Acesso Externo        |
|----------|---------------|---------------|-----------------------|
| NGINX    | 80            | **8080**      | http://localhost:8080 |
| VITE HMR | 5172          | **5172**      | http://localhost:5172 |
| POSTGRES | 5432          | **6789**      | localhost:6789        |
