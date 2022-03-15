import express from 'express';
import MongoConnection from './database/mongo';
import helmet from 'helmet';
import cors from 'cors';
import router from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

const app = express();

const database = new MongoConnection();
database.connect();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', router);

export default app;
