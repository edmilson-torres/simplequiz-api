<p align="center">
  <img src="https://user-images.githubusercontent.com/64763336/194782429-99df68c8-c988-4f0c-9882-e9c478572959.png" width="800" alt="Nest, GraphQL and PostgreSQL Logos" />

# ✅ Simple Quiz!

REST API to provide questionnaires.

This is my playground github repository for applying principles and new technologies.

## 👷‍♂️ Pattern
- **Controller:** management of the REST interface to the business logic
- **Service:** business logic implementations
- **Repository:** storage of the entity in the system
  
  <p align="center">
  <img src="https://user-images.githubusercontent.com/64763336/194782450-6644b287-94b3-4a97-87ba-94f1fa8e764a.png" width="800" alt="Nest, GraphQL and PostgreSQL Logos" />
  
> Next steps: apply SOLID principles and more Typescript types
  
## ⚙️ Technologies
- Core: Typescript, Node.js and Expressjs  
- Database: MongoDB using mongoose
- Authentication: JWT
- E-mail: nodemailer and handlebars 
- Tests: Jest and supertest
- Validation: Yup
- Security: CORS, helmet and rate-limit 
- Hash: bcrypt
- Documentation: Swagger  
- Log: Morgan
- Code analysis: ESlint  
- Code formatter: Prettier  
- E-mail tests with Mailtrap.io (development use ethereal.email)

## 🚀 Running
- Config `.env` with yours credentials or rename `.env.example`
- `docker-compose up`  
or  
- Install dependencies: `yarn`
- Development `yarn dev`
- Build `yarn build`
- Start `yarn start`

## 🗃️ Docker
```bash
$ docker-compose up -d
```

## 📄 API Docs
```bash
$ http://localhost:3000/api-docs
```

## 🖼️ Swagger
![localhost_3000_api-docs](https://user-images.githubusercontent.com/64763336/174910658-d74e0c1c-f852-46cf-b716-fcd6d576bba8.png)
