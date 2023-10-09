import SiteSettingModel from '../models/site_setting.model';

export default class SiteSettingService {
	static updateSiteSettings = async (payload) => {
		const result = await SiteSettingModel.findOneAndUpdate({ _id: payload._id }, payload, {
			new: true,
			upsert: true
		});
		return result;
	};
}
