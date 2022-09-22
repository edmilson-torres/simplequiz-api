# [WIP] 🚧 Simple Quiz
Making REST API to provide quizzes

## ⚙️ Technologies
- Core: Typescript, Node.js and Expressjs  
- Database: MongoDB with mongoose
- Authentication: JWT, nodemailer and handlebars 
- Validation: Yup
- Security: CORS, helmet and rate-limit 
- Hash: bcrypt
- Documentation: Swagger  
- Log: Morgan
- Code analysis: ESlint  
- Code formatter: Prettier  
- E-mail tests with Mailtrap.io or ethereal.email

## 🖼️ API docs
![localhost_3000_api-docs](https://user-images.githubusercontent.com/64763336/174910658-d74e0c1c-f852-46cf-b716-fcd6d576bba8.png)


## 🚀 Running
- Config `.env` with yours credentials or rename `.env.example`
- `docker-compose up`  
or  
- Install dependencies: `yarn`
- Development use `yarn dev`
- Build use `yarn build`
- Start user `yarn start`

## 📑 TODO
✔️ get all quizzes  
✔️ get quiz by id  
✔️ create user  
✔️ get user  
✔️ get user list  
✔️ delete user  
✔️ user register  
✔️ user login  
✔️ user edit  
✔️ admin role  
✔️ create quiz  
✔️ edit quiz  
✔️ delete quiz  
✔️ auth middleware  
✔️ rate-limit middleware  
✔️ register validator  
⬜ quiz validator  
✔️ admin middleware  
✔️ strip logic from controllers and create services  
✔️ swagger docs  
✔️ password reset e-mail  
⬜ jest tests
