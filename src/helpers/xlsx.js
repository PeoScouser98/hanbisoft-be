import xlsx from 'xlsx';
/**
 * @typedef {import('express').Express} Express
 *
 */

export class XLSX {
	defaultFileName = new Date().toLocaleDateString();

	constructor() {
		this.mapExcelData();
	}

	/**
	 * @param {Array<{[key: string]: string|number}>} data
	 */
	mapExcelData(data) {
		return data.slice(1).map((array, index) =>
			array.reduce((object, value, i) => {
				object[keys[i]] = value;
				return object;
			}, {})
		);
	}

	/**
	 * @param {Express.Multer.File} file
	 * @param {(...params) => unknown } callback
	 */
	static readFile = (file, callback) => {
		// const bufferStream = new Stream.PassThrough();
		// bufferStream.end(file.buffer);
		const workbook = xlsx.readFile(file.filename, { type: 'buffer', dense: false });
		const worksheet = workbook.Sheets[workbook.SheetNames[0]];
		let data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
		data = this.mapExcelData(importedData);
		if (callback) callback(data);
	};

	/**
	 * @param {Array<{[key: string]: any}>} data
	 * @param {string} filename
	 */
	static writeFile = (data, filename) => {
		const worksheet = xlsx.utils.json_to_sheet(data, { cellStyles: true });
		const workbook = xlsx.utils.book_new();
		xlsx.utils.book_append_sheet(workbook, worksheet, 'SheetJS');
		/* Generate XLSX file and send to client */
		filename ??= this.defaultFileName;
		return xlsx.writeFile(workbook, filename + '.xlsx');
	};
}
