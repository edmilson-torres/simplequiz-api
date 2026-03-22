import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import MongoConnection from './database/mongo';
import errorHandler from './middlewares/errorHandler-middleware';
import routes from './routes';
import swaggerDocument from './swagger.json';

import mongoose from 'mongoose';
import server from './server';

const app = express();

const database = new MongoConnection();
database.connect();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    morgan('dev', { skip: (_req, _res) => process.env.NODE_ENV === 'test' })
);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', routes);
app.use('*', (_req, res) => res.redirect('/api-docs'));

app.use(errorHandler);

function gracefulShutdown(_code: any) {
    return (event: any) => {
        console.info(`${event} signal received with code ${event}`);
        console.log('Closing http server...');
        server.close(async () => {
            console.log('Http server closed.');

            console.log('Closing DB connection...');
            await mongoose.connection.close();
            console.log('Mongo connection closed.');
            process.exit(0);
        });
    };
}

process.on('SIGINT', gracefulShutdown('SIGINT'));

process.on('SIGTERM', gracefulShutdown('SIGTERM'));

process.on('exit', (code) => {
    console.info('exit signal received.', code);
});

process.on('uncaughtException', (error, origin) => {
    console.info(`\n${origin} signal received.`, error);
});

process.on('unhandledRejection', (error, _origin) => {
    console.info('\nunhandledRejection signal received.', error);
});

export default app;
