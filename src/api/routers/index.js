import express from 'express';

const rootRouter = express.Router();

rootRouter.use(require('./auth.route').default);
rootRouter.use(require('./equipment.route').default);
rootRouter.use(require('./site_setting.route').default);
rootRouter.use(require('./user.route').default);
rootRouter.use(require('./user_roles.route').default);

export default rootRouter;
