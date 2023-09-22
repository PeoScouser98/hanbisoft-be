import express from 'express';

const rootRouter = express.Router();

rootRouter.use(require('./user.route').default);
rootRouter.use(require('./equipment.route').default);

export default rootRouter;
