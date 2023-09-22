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
		const { limit, page, ...rest } = req.query;
		const equipments = await equipmentService.getAll({
			page,
			filter: rest
		});
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
	/**
	 * @endpoint /equipments/search
	 * @method PUT
	 */
	update: AsyncFn(async (req, res) => {
		console.log('req.body :>> ', req.body);
		const result = await equipmentService.update(req.body);
		const response = new HttpResponse(result, 'Saved successfully');
		return res.status(HttpStatusCode.CREATED).json(response);
	}),
	/**
	 * @endpoint /equipment/delete
	 * @method DELETE
	 */
	delete: AsyncFn(async (req, res) => {
		console.log(req.query._ids);
		if (!req.query._ids) throw createHttpError.BadRequest('"_ids" query param must be provided');
		const ids = req.query._ids.split(',');
		const result = await equipmentService.delete(ids);
		const response = new HttpResponse(result, 'Deleted successfully');
		return res.status(HttpStatusCode.OK).json(response);
	})
};
