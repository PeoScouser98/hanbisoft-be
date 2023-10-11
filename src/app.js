import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUI from 'swagger-ui-express';
import rootRouter from './api/routers';
import __configs from './configs/app.config';
import swaggerOptions from './configs/swagger.config';
import HttpStatusCode from './constants/httpStatus';
import Database from './database/mongo.db';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
	compression({
		threshold: 1024,
		level: 6
	})
);
app.use(helmet());
app.use(morgan('tiny'));
app.use(
	cors({
		origin: [__configs.LOCAL_ORIGIN, __configs.LOCAL_ORIGIN_PREVIEW, __configs.REMOTE_ORIGIN],
		credentials: true,
		methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTION']
	})
);
app.use('/api', rootRouter);
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerOptions));
app.get('/', (_, res) =>
	res.status(HttpStatusCode.OK).json({
		message: 'Server now is ready !',
		status: 200
	})
);
app.listen(__configs.PORT, () => {
	console.log(`[SUCCESS]: Server is listening on: http://localhost:${__configs.PORT}`);
});

Database.getInstance();

export { app };
