import { ConfigProvider, theme } from "antd";
import { useRoutes } from "react-router-dom";

import routes from "~react-pages";
const { darkAlgorithm } = theme;
const App = () => {
	// const isDark = localStorage.getItem("theme")
	// 	? localStorage.getItem("theme") === "dark"
	// 	: false;
	return (
		<div className={"dark:text-white dark:text-opacity-85"}>
			<div
			>
				{useRoutes(routes)}
			</div>
		</div>
	);
};

export default App;
