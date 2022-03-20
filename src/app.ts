import express from 'express';
import 'express-async-errors';
import MongoConnection from './database/mongo';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import errorHandler from './middlewares/errorHandler';

const app = express();

const database = new MongoConnection();
database.connect();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', routes);

app.use(morgan('dev'));

app.use(errorHandler);

export default app;
