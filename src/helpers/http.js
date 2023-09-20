import { isHttpError } from 'http-errors';
import HttpStatusCode from '../constants/httpStatus';
import { JsonWebTokenError } from 'jsonwebtoken';

class HttpException extends Error {
	message;
	status;
	constructor(error) {
		super(error);
		this.message = error.message;
		this.status = isHttpError(error)
			? error.status
			: error instanceof JsonWebTokenError
			? HttpStatusCode.UNAUTHORIZED
			: HttpStatusCode.INTERNAL_SERVER_ERROR;
	}
}

class HttpResponse {
	message;
	data;
	/**
	 * @param {unknown} data
	 * @param {string} message
	 */
	constructor(data, message) {
		this.data = data;
		this.message = message;
	}
}

/**
 * @param {(req: import("express").Request, res:import("express").Response, next: import('express').NextFunction) =>  Promise<any>} fn
 * @return {(req: import("express").Request, res:import("express").Response, next: import('express').NextFunction)}
 */
const AsyncFn = (fn) => (req, res, next) =>
	Promise.resolve(fn(req, res, next)).catch((error) => {
		const httpException = new HttpException(error);
		return res.status(httpException.status).json(httpException);
	});

export { AsyncFn, HttpException, HttpResponse };
