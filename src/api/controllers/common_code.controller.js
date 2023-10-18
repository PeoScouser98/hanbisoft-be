import createHttpError from 'http-errors';
import HttpStatusCode from 'src/constants/httpStatus';
import { HttpRequest, HttpResponse } from 'src/helpers/http';
import { XLSX } from 'src/helpers/xlsx';
import CommonCodeService from '../services/common_code.service';

export default class CommonCodeController {
	static getAllCommonCodes = HttpRequest(async (req, res) => {
		const commonCodes = await CommonCodeService.getCommonCodes();
		const response = new HttpResponse(commonCodes, 'Ok', HttpStatusCode);
		return res.status(HttpStatusCode.OK).json(response);
	});

	static importCommonCodes = HttpRequest(async (req, res) => {
		const [file] = req.files;
		if (!file) throw createHttpError.BadRequest('Import file must be provided');
		const data = XLSX.readFile(file);
		const result = await CommonCodeService.importCommonCodes;
	});
}
