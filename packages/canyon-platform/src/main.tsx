import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "antd/dist/reset.css";
import { BrowserRouter } from "react-router-dom";

// TODO:系统响应主题
// 多语言响应系统

if (localStorage.getItem("theme") === "dark") {
	document.documentElement.classList.add("dark");
	document.body.style.backgroundColor = "black";
}

// biome-ignore lint/style/noNonNullAssertion: <explanation>
ReactDOM.createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
);
