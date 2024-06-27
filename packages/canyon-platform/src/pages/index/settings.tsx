import { SettingOutlined } from "@ant-design/icons";
import { TextTypography } from "canyon-ui";
import { CanyonCardPrimary } from "canyon-ui-old";
// import copy from 'copy-to-clipboard';
import { useTranslation } from "react-i18next";

// import languages from '../../../../languages.json';
// import Faa from './components/BindGitProvider.tsx';
import { Table } from "antd";
import {useQuery} from "@apollo/client";
import {ListGitProviderDocument, ListUserDocument} from "../../helpers/backend/gen/graphql.ts";
const TextArea = Input.TextArea;
const gridStyle = {
	width: "100%",
};

const dataSource = [
	{
		key: "1",
		name: "http://git.com",
		clientID: "clientID",
		clientSecret: "clientSecret",
		providerType: "Provider类型",
		privateToken: "PRIVATE_TOKEN",
	},
];

const columns = [
	{
		title: "路径",
		dataIndex: "name",
		key: "name",
	},
	{
		title: "CLIENT_ID",
		dataIndex: "clientID",
		key: "clientID",
	},
	{
		title: "CLIENT_SECRET",
		dataIndex: "clientSecret",
		key: "clientSecret",
	},
	{
		title: "Provider类型",
		dataIndex: "providerType",
		key: "providerType",
	},
	{
		title: "PRIVATE_TOKEN(有的话优先)",
		dataIndex: "privateToken",
		key: "privateToken",
	},
];

const Settings = () => {
	const { t } = useTranslation();
  const {data} = useQuery(ListGitProviderDocument)
	return (
		<>
			<TextTypography title={t("menus.settings")} icon={<SettingOutlined />} />

			<CanyonCardPrimary>
				<Card title={"系统设置"} bordered={false}>
					<Card.Grid hoverable={false} style={gridStyle}>
						<Table dataSource={data?.listGitProvider||[]} columns={columns} />
					</Card.Grid>
				</Card>
			</CanyonCardPrimary>
			<div className={"h-5"} />
		</>
	);
};

export default Settings;
