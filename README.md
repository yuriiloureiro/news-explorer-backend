# News Explorer — Back-end

API do projeto final News Explorer da TripleTen. O back-end oferece cadastro e autenticação de usuários, acesso protegido por JWT, validação de dados, logs e conexão com MongoDB Atlas.

## Tecnologias

- Node.js
- Express
- MongoDB Atlas e Mongoose
- JSON Web Token (JWT)
- bcryptjs
- Celebrate/Joi
- Winston e express-winston
- CORS

## Funcionalidades

- Cadastro de usuários com senha armazenada em hash.
- Login com emissão de token JWT.
- Rota protegida para obter os dados do usuário autenticado.
- Validação dos dados de cadastro e login.
- Tratamento centralizado de erros.
- Registro de requisições e erros.
- CORS configurado para o front-end local e o domínio publicado.

## API em produção

- URL base: https://news-explorer-backend-tzeq.onrender.com
- Verificação: `GET /` retorna uma mensagem indicando que a API está no ar.
- Login: `POST /signin`
- Cadastro: `POST /signup`
- Usuário autenticado: `GET /users/me` (requer token Bearer)

## Executar localmente

### Pré-requisitos

- Node.js e npm instalados.
- Uma instância do MongoDB Atlas acessível.

### Instalação

```bash
git clone https://github.com/yuriiloureiro/news-explorer-backend.git
cd news-explorer-backend
npm install
```

Crie um arquivo `.env` na raiz do projeto e configure as variáveis:

```env
MONGODB_URI=mongodb://<usuario>:<senha>@<hosts-do-cluster>/<nome-do-banco>?<parametros>
JWT_SECRET=<seu-segredo-jwt>
```

Use sua URI válida do MongoDB Atlas e um segredo JWT próprio. Não compartilhe nem envie esses valores ao GitHub.

### Comandos

```bash
npm run dev
```

Inicia o servidor local em modo de desenvolvimento.

```bash
npm start
```

Inicia o servidor.

```bash
npm run lint
```

Executa o ESLint.

## Endpoints

### `POST /signup`

Cria um usuário. O corpo deve incluir `name`, `email` e `password`.

Exemplo:

```json
{
  "name": "Seu Nome",
  "email": "seu-email@example.com",
  "password": "sua-senha"
}
```

### `POST /signin`

Autentica um usuário. O corpo deve incluir `email` e `password`. Em caso de sucesso, a API retorna um token JWT.

```json
{
  "email": "seu-email@example.com",
  "password": "sua-senha"
}
```

### `GET /users/me`

Retorna os dados do usuário autenticado. Envie o token no cabeçalho:

```text
Authorization: Bearer <token>
```

Sem token válido, a API responde com `401 Unauthorized`.

## Logs

As requisições e os erros são registrados em `request.log` e `error.log`. Esses arquivos são locais e não devem ser enviados ao repositório.

## Deploy

O back-end está hospedado no Render e usa o MongoDB Atlas. As variáveis `MONGODB_URI` e `JWT_SECRET` são configuradas no ambiente de produção, não no código-fonte.

## Front-end

O front-end do projeto está publicado em https://news-explorer-frontend-gamma.vercel.app/. A integração do front-end com esta API própria está pendente.

## Autor

Yuri Loureiro
