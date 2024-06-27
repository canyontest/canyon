import "./useWorker.ts";
import "./i18n.ts";
// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "antd/dist/reset.css";
import {
	ApolloClient,
	ApolloProvider,
	InMemoryCache,
	createHttpLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { BrowserRouter } from "react-router-dom";
import { GlobalProvider } from "./components/GlobalContext.tsx";

// TODO:系统响应主题
// 多语言响应系统

// if (localStorage.getItem("theme") === "dark") {
// 	document.documentElement.classList.add("dark");
// 	document.body.style.backgroundColor = "black";
// }

// 创建一个error link来处理错误
const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors) {
		const { message: msg, locations, path } = graphQLErrors[0];
		console.error(
			`[GraphQL error]: msg: ${msg}, Location: ${locations}, Path: ${path}`,
		);
		message.error(`[GraphQL error]: msg: ${msg}, Path: ${path}`);
		if (
			msg === "Unauthorized" &&
			window.location.pathname !== "/oauth" &&
			window.location.pathname !== "/login"
		) {
			localStorage.clear();
			window.location.href = "/login";
		}
	}
	if (networkError) {
		console.error(`[Network error]: ${networkError}`);
		// 在这里你可以执行自定义的操作，比如显示网络错误提示
	}
});

// 创建一个http link来发送GraphQL请求
const httpLink = createHttpLink({
	uri: "/graphql", // 你的GraphQL API的URL

	headers: {
		Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
	},
});

// 创建Apollo Client实例
const client = new ApolloClient({
	link: errorLink.concat(httpLink), // 将error link和http link组合起来
	cache: new InMemoryCache(),
});

// biome-ignore lint/style/noNonNullAssertion: <explanation>
ReactDOM.createRoot(document.getElementById("root")!).render(
	<GlobalProvider>
		<BrowserRouter>
			<ApolloProvider client={client}>
				<App />
			</ApolloProvider>
		</BrowserRouter>
	</GlobalProvider>,
);
