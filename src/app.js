import compression from 'compression';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import rootRouter from './api/routers';
import _configs from './configs/app.config';
import HttpStatusCode from './constants/httpStatus';
import cookieParser from 'cookie-parser';
import Mongodb from './database/mongo.db';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
	compression({
		threshold: 1024,
		level: 6
	})
);
app.use(morgan('tiny'));

app.use(
	cors({
		origin: [_configs.LOCAL_ORIGIN, _configs.LOCAL_ORIGIN_PREVIEW, _configs.REMOTE_ORIGIN],
		credentials: true,
		preflightContinue: true,
		methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTION']
	})
);

app.use('/api', rootRouter);

app.get('/', (_, res) =>
	res.status(HttpStatusCode.OK).json({
		message: 'Server now is running',
		status: 200
	})
);

app.listen(_configs.PORT, () => {
	console.log(`[SUCCESS]: Server is listening on: http://localhost:${_configs.PORT}`);
});

Mongodb.connect();
