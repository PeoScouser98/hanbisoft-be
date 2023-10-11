'use strict';

import createHttpError from 'http-errors';
import HttpStatusCode from '../../constants/httpStatus';
import { useAsync, HttpResponse } from '../../helpers/http';
import EquipmentService from '../services/equipment.service';

export default class EquipmentController {
	/**
	 * @endpoint /equipments
	 * @method GET
	 */
	static getAllEquipments = useAsync(async (req, res) => {
		const { limit, page, ...rest } = req.query;
		const equipments = await EquipmentService.getEquipments({
			page,
			filter: rest
		});
		const response = new HttpResponse(equipments, 'Ok', HttpStatusCode.OK);
		return res.status(HttpStatusCode.OK).json(response);
	});
	/**
	 * @endpoint /equipments/lookup-values
	 * @method GET
	 */
	static getLookupValues = useAsync(async (req, res) => {
		const lookupFieldValues = await EquipmentService.getLookupValues();
		const response = new HttpResponse(lookupFieldValues, 'Ok', HttpStatusCode.OK);
		return res.status(HttpStatusCode.OK).json(response);
	});
	/**
	 * @endpoint /equipments/search
	 * @method PUT
	 */
	static updateEquipments = useAsync(async (req, res) => {
		const result = await EquipmentService.upsertEquipments(req.body);
		const response = new HttpResponse(result, 'Saved successfully', HttpStatusCode.CREATED);
		return res.status(HttpStatusCode.CREATED).json(response);
	});
	/**
	 * @endpoint /equipments/delete
	 * @method DELETE
	 */
	static deleteEquipments = useAsync(async (req, res) => {
		if (!req.query._ids) throw createHttpError.BadRequest('"_ids" query param must be provided');
		const ids = req.query._ids.split(',');
		const result = await EquipmentService.deleteEquipments(ids);
		const response = new HttpResponse(result, 'Deleted successfully', HttpStatusCode.NO_CONTENT);
		return res.status(HttpStatusCode.NO_CONTENT).json(response);
	});
}
