import __configs from '../../configs/app.config';
import HttpStatusCode from '../../constants/httpStatus';
import { AsyncFn, HttpResponse } from '../../helpers/http';
import GoogleDriveService from '../services/drive.service';
import SiteSettingService from '../services/site_setting.service';

export default class SiteSettingController {
	static updateSiteSettings = AsyncFn(async (req, res) => {
		console.log(req.files);
		const [file] = req.files;
		if (file) {
			const { data } = await GoogleDriveService.uploadFile(file, __configs.DRIVE_FOLDER_ID);
			const payload = { ...req.body, logo_fileID: data?.id, logo_url: __configs.BASE_DOWLOAD_URL + data?.id };
			const result = await SiteSettingService.updateSiteSettings(payload);
			const response = new HttpResponse(result, 'Success', HttpStatusCode.CREATED);
			return res.status(HttpStatusCode.CREATED).json(response);
		}
		const result = await SiteSettingService.updateSiteSettings(req.body);
		const response = new HttpResponse(result, 'Success', HttpStatusCode.CREATED);
		return res.status(HttpStatusCode.CREATED).json(response);
	});
}
