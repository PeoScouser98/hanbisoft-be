import express from 'express';

import authRouter from './auth.route';
import equipmentRouter from './equipment.route';
import siteSettingRouter from './site_setting.route';
import userRouter from './user.route';
import userRoleRouter from './user_roles.route';

const rootRouter = express.Router();

rootRouter.use(authRouter);
rootRouter.use(equipmentRouter);
rootRouter.use(siteSettingRouter);
rootRouter.use(userRouter);
rootRouter.use(userRoleRouter);

export default rootRouter;
