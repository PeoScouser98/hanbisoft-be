import path from 'path';
import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';
import VitePluginRestart from 'vite-plugin-restart';

export default defineConfig({
	root: 'src',
	build: {
		outDir: 'dist',
		minify: true
	},
	server: {
		port: 3004,
		middlewareMode: true,
		watch: {
			cwd: path.resolve(__dirname, 'src')
		}
	},
	resolve: {
		alias: [
			{
				find: '@',
				replacement: path.resolve(__dirname, 'src')
			}
		]
	},
	plugins: [
		VitePluginRestart({
			restart: ['src/**/*.js', 'src/app.js']
		}),
		...VitePluginNode({
			adapter: 'express',
			appPath: 'src/app.js',
			exportName: 'app'
		})
	],
	optimizeDeps: {
		entries: ['src/app.js']
	}
});
