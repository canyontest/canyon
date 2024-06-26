import react from "@vitejs/plugin-react-swc";
// import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import AntdResolver from "unplugin-auto-import-antd";
import { defineConfig } from "vite";
import Pages from "vite-plugin-pages";
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		AutoImport({
			imports: ["react", "react-i18next", "react-router-dom"],
			dts: "./src/auto-imports.d.ts",
			resolvers: [AntdResolver()],
		}),
		Pages({
			exclude: ["**/helper/**", "**/components/**"],
		}),
	],
});
