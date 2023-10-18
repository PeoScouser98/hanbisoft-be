'use strict';

import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import __configs from '../../configs/app.config';
import { UserRoleEnum } from '../../constants/enum';
import { HttpRequest } from '../../helpers/http';

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 */

export default class AuthMiddleware {
	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @param {NextFunction} next
	 */
	static checkAuthenticated = HttpRequest(async (req, res, next) => {
		// const { authorization } = req.headers;
		const accessToken = req.cookies.access_token;
		if (!accessToken) throw createHttpError.Unauthorized('Access token must be provided');
		const payload = jwt.verify(accessToken, __configs.JWT_SECRET);
		req.auth = payload._id;
		req.role = payload.role?.role_cd;
		return next();
	});
	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @param {NextFunction} next
	 */
	static checkIsAdmin = HttpRequest(async (req, res, next) => {
		if (req.role === UserRoleEnum.MEMBER) throw createHttpError.Forbidden(`You don't have permission to access`);
		return next();
	});
	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @param {NextFunction} next
	 */
	static checkIsSuperAdmin = HttpRequest(async (req, res, next) => {
		if (req.role !== UserRoleEnum.SUPER_ADMIN) throw createHttpError.Forbidden(`You don't have permission to access`);
		return next();
	});
}
