import createHttpError from 'http-errors';
import HttpStatusCode from '../../constants/httpStatus';
import { HttpResponse, useAsync } from '../../helpers/http';
import MenuNavigationService from '../services/navigation.service';

export default class MenuNavigationController {
	/**
	 * @endpoint /navigations
	 * @method GET
	 */
	static getNavigation = useAsync(async (req, res) => {
		const navigations = await MenuNavigationService.getNavigation();
		const response = new HttpResponse(navigations, 'Ok', HttpStatusCode.OK);
		return res.status(HttpStatusCode.OK).json(response);
	});

	/**
	 * @endpoint /navigations
	 * @method PATCH
	 */
	static upsertNavigation = useAsync(async (req, res) => {
		const upsertedNavigations = await MenuNavigationService.upsertNavigation(req.body);
		const response = new HttpResponse(
			upsertedNavigations,
			'Upserted navigation successfully',
			HttpStatusCode.CREATED
		);
		return res.status(HttpStatusCode.CREATED).json(response);
	});

	/**
	 * @endpoint /navigations
	 * @method DELETE
	 */
	static deleteNavigation = useAsync(async (req, res) => {
		if (!req.query.keys) throw createHttpError.BadRequest('Delete keys must be provided');
		const deletedKeys = req.query.keys.split(',');
		const result = await MenuNavigationService.deleteNavigation(deletedKeys);
		const response = new HttpResponse(result, 'Deleted', HttpStatusCode.NO_CONTENT);
		return res.status(HttpStatusCode.NO_CONTENT).json(response);
	});
}
