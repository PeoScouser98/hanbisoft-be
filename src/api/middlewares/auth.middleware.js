import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import _configs from '../../configs/app.config';
import { UserRoleEnum } from '../../constants/enum';
import { AsyncFn } from '../../helpers/http';

export default {
	/**
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {import('express').NextFunction} next
	 */
	checkAuthenticated: AsyncFn(async (req, res, next) => {
		const { authorization } = req.headers;
		if (!authorization) throw createHttpError.Unauthorized('Access token must be provided');
		const accessToken = authorization.replace('Bearer', '').trim();
		const payload = jwt.verify(accessToken, _configs.JWT_SECRET);
		req.auth = payload.email;
		req.role = payload.role;
		next();
	}) ,
	/**
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {import('express').NextFunction} next
	 */
	checkIsAdmin: AsyncFn(async (req, res, next) => {
		if (req.role !== UserRoleEnum.ADMIN) throw createHttpError.Forbidden(`You don't have permission to access`);
		next();
	}) 
};
