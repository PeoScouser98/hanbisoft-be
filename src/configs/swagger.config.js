import swaggerJSDoc from 'swagger-jsdoc';

/**
 * Swagger configurations
 */
const swaggerOptions = swaggerJSDoc({
	definition: {
		openapi: '3.0.0',
		basePath: '/api',
		servers: [
			{
				url: 'http://localhost:3004/api',
				description: 'Development API'
			}
		],
		info: {
			title: 'APIs Documentation',
			version: '1.0.0',
			description: 'Documentation for all endpoints'
		}
	},
	apis: ['src/docs/*.json']
});

export default swaggerOptions;
