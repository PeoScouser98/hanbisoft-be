import createHttpError from 'http-errors';
import HttpStatusCode from '../../constants/httpStatus';
import { AsyncFn, HttpResponse } from '../../helpers/http';
import equipmentService from '../services/equipment.service';

export default {
	/**
	 * @endpoint /equipments
	 * @method GET
	 */
	getAll: AsyncFn(async (req, res) => {
		const skip = req.query.skip;
		const limit = req.query.limit;
		const equipments = await equipmentService.getAll({ skip, limit });
		const response = new HttpResponse(equipments, 'Ok');
		return res.status(HttpStatusCode.OK).json(response);
	}),
	/**
	 * @endpoint /equipments/lookup-values
	 * @method GET
	 */
	getLookupValues: AsyncFn(async (req, res) => {
		const lookupFieldValues = await equipmentService.getLookupValues();
		const response = new HttpResponse(lookupFieldValues, 'Ok');
		return res.status(HttpStatusCode.OK).json(response);
	}),
	search: AsyncFn(async (req, res) => {
		const searchResult = await equipmentService.search(req.body);
		const response = new HttpResponse(searchResult, 'Ok');
		return res.status(HttpStatusCode.OK).json(response);
	}),
	/**
	 * @endpoint /equipments/search
	 * @method PUT
	 */
	update: AsyncFn(async (req, res) => {
		const result = await equipmentService.update(req.body);
		const response = new HttpResponse(result, 'Saved successfully');
		return res.status(HttpStatusCode.CREATED).json(response);
	}),
	delete: AsyncFn(async (req, res) => {
		console.log(req.query._ids);
		if (!req.query._ids) throw createHttpError.BadRequest('"_ids" query param must be provided');
		const ids = JSON.parse(req.query._ids);
		const result = await equipmentService.delete(ids);
		const response = new HttpResponse(result, 'Deleted successfully');
		return res.status(HttpStatusCode.OK).json(response);
	})
};
