import compression from 'compression';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import rootRouter from './api/routers';
import _configs from './configs/app.config';
import './database/mongo.db';

const app = express();

app.use(express.json());

app.use(
	compression({
		threshold: 1024,
		level: 6
	})
);
app.use(morgan('tiny'));

app.use(
	cors({
		origin: '*',
		methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTION']
	})
);

app.use('/api', rootRouter);

app.listen(_configs.PORT, () => {
	console.log(`[SUCCESS]: Server is listening on: http://localhost:${_configs.PORT}`);
});
