import {
	ArrowRightOutlined,
	CreditCardOutlined,
	FolderOutlined,
	LineChartOutlined,
	LogoutOutlined,
	SettingOutlined,
} from "@ant-design/icons";

import { CanyonLayoutBase } from "canyon-ui-old";
import { useTranslation } from "react-i18next";

function Index() {
	const { t } = useTranslation();
	useEffect(() => {
		if (localStorage.getItem("token") === null) {
			localStorage.clear();
			localStorage.setItem("callback", window.location.href);
			nav("/login");
		}
	}, []);

	const loc = useLocation();
	const nav = useNavigate();

	useEffect(() => {
		if (loc.pathname === "/") {
			nav("/projects");
		}
	}, [loc.pathname]);

	useEffect(() => {
		setMenuSelectedKey(loc.pathname.replace("/", ""));
	}, [loc.pathname]);
	const meData = {
		me: {
			username: "tzhangm123",
		},
	};
	const [menuSelectedKey, setMenuSelectedKey] = useState<string>("projects");
	return (
		<>
			<CanyonLayoutBase
				breadcrumb={
					<div>
						{/*榜单mark*/}
						{/*<Breadcrumb className={'py-3'} items={genBreadcrumbItems(loc.pathname)} />*/}
					</div>
				}
				itemsDropdown={[
					{
						label: (
							<div className={"text-red-500"}>
								<LogoutOutlined className={"mr-2"} />
								Logout
							</div>
						),
						onClick: () => {
							localStorage.clear();
							window.location.href = "/login";
						},
					},
				]}
				MeData={{
					me: {
						username: "tzhangm123",
					},
				}}
				onClickGlobalSearch={() => {}}
				title={"Canyon"}
				logo={
					<div>{/*<img src='/logo.svg' alt='' className={'w-[28px]'} />*/}</div>
				}
				mainTitleRightNode={
					<div>
						<Tooltip
							title={
								<div>
									<span>{t("menus.docs")}</span>
									<ArrowRightOutlined />
								</div>
							}
						>
							hi
						</Tooltip>
					</div>
				}
				menuSelectedKey={menuSelectedKey}
				onSelectMenu={(selectInfo) => {
					setMenuSelectedKey(selectInfo.key);
					nav(`/${selectInfo.key}`);
				}}
				menuItems={[
					{
						label: t("menus.projects"),
						key: "projects",
						icon: <FolderOutlined />,
					},
					{
						label: t("menus.settings"),
						key: "settings",
						icon: <SettingOutlined />,
					},
				]}
				renderMainContent={<Outlet />}
				search={false}
				account={false}
			/>
		</>
	);
}

export default Index;
