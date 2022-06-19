export default {
    port: process.env.PORT || 5000,
    mongoUrl: process.env.MONGO_URL,
    secretJWT: process.env.SECRET_JWT,
    clientUrl: process.env.CLIENT_URL,
    emailHost: process.env.EMAIL_HOST,
    emailUserName: process.env.EMAIL_USERNAME,
    emailPort: process.env.EMAIL_PORT,
    emailPassword: process.env.EMAIL_PASSWORD,
    fromEmail: process.env.FROM_EMAIL
};
