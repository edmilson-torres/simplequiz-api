import 'dotenv/config';
import app from './app';
import env from './config/env';

const server = app.listen(env.port, () =>
    console.log(`Server running at http://localhost:${env.port}`)
);

export default server;
