# ✅ Simple Quiz
REST API to provide questionnaires.

This is my playground github repository for applying principles and new technologies.

## 👷‍♂️ Pattern
- **Controller:** management of the REST interface to the business logic
- **Service:** business logic implementations
- **Repository:** storage of the entity in the system
  
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
- Config `.env` with yours credentials
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