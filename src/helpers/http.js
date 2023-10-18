import { isHttpError } from 'http-errors';
import { JsonWebTokenError } from 'jsonwebtoken';
import HttpStatusCode from '../constants/httpStatus';

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
	metadata;
	status;
	/**
	 * @param {unknown} data
	 * @param {string} message
	 */
	constructor(data, message, status) {
		this.metadata = data;
		this.message = message;
		this.status = status;
	}
}

/**
 * @typedef {import("express").Request} Request
 * @typedef {import("express").Response} Response
 * @typedef {import("express").NextFunction} NextFunction
 * @typedef {(req: Request, res:Response, next: NextFunction) => Promise<e.Response<any, Record<string, any>>>} AsyncFunction
 */

/**

 * @param {AsyncFunction} fn
 * @return {(req: Request, res:Response, next: NextFunction) => Promise<e.Response<any, Record<string, any>>>}
 */
const HttpRequest = (fn) => (req, res, next) =>
	Promise.resolve(fn(req, res, next)).catch((error) => {
		const httpException = new HttpException(error);
		return res.status(httpException.status).json(httpException);
	});

export { HttpException, HttpRequest, HttpResponse };
