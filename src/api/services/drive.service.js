/* eslint-disable @typescript-eslint/no-non-null-assertion */
import 'dotenv/config';
import { google } from 'googleapis';
import { Stream } from 'stream';
import OAuth2Client from '../../configs/googleapis.config';
import createHttpError from 'http-errors';

/**
 * @typedef {import('express').Express} Express
 */

export default class GoogleDriveService {
	static drive = google.drive({
		version: 'v3',
		auth: OAuth2Client
	});
	/**
	 * Creates a permission for a file or shared drive.
	 * @param {string} fileId
	 */
	static setFilePublic = async (fileId) => {
		await this.drive.permissions.create({
			fileId,
			requestBody: {
				role: 'reader',
				type: 'anyone'
			}
		});
		return this.drive.files.get({
			fileId,
			fields: 'webViewLink, webContentLink'
		});
	};

	/**
	 * Upload file to google drive
	 * @param {Express.Multer.File} file
	 * @param {string} dir
	 * @return {GaxiosResponse<drive_v3.Schema$File>}
	 */
	static uploadFile = async (file, dir) => {
		try {
			/* tạo nơi lưu trữ file tạm thời (buffer) -> file sẽ được upload qua stream */
			const bufferStream = new Stream.PassThrough();
			bufferStream.end(file.buffer);
			const createdFile = await this.drive.files.create({
				requestBody: {
					name: file.originalname,
					parents: [dir]
				},
				media: {
					body: bufferStream
					/* file được upload lấy từ buffer đã được lưu trữ tạm thời trước đó */
				},
				fields: 'id, size'
			});
			await this.setFilePublic(createdFile.data.id);
			return createdFile;
		} catch (error) {
			throw createHttpError.UnprocessableEntity('Failed to upload file');
		}
	};

	/**
	 * Permanently delete file on google drive
	 * @param {string} fileId
	 * @returns {GaxiosPromise<void>}
	 */
	static deleteFile = async (fileId) => {
		try {
			return await this.drive.files.delete({ fileId });
		} catch (error) {
			return Promise.resolve(error); // inore error after delete file on google drive successfully
		}
	};
}
