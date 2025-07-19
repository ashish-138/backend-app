import dotenv from 'dotenv';
dotenv.config();



import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan'
import routes from './routes';
import './schedulers/userActivationScheduler';
import sequelize from './config/database';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(morgan('combined'))
app.use(express.json());

app.use('/api', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


sequelize.sync().then(() => {
  app.listen(3000, () => console.log(`Server running on port ${PORT}`));
});

export default app;
