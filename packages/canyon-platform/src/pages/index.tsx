import {
  ArrowRightOutlined,
  // CreditCardOutlined,
  FolderOutlined,
  // LineChartOutlined,
  LogoutOutlined, ReadOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import { CanyonLayoutBase } from "canyon-ui-old";
import { useTranslation } from "react-i18next";
import GlobalTshi from "../components/GlobalTshi.tsx";
import {GlobalContext} from "../components/GlobalContext.tsx";

function Index() {
  const { state } = useContext(GlobalContext);
  const { theme } = state;
  console.log(theme,'theme')
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
	const [menuSelectedKey, setMenuSelectedKey] = useState<string>("projects");
	return (
		<>
      <GlobalTshi/>
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
						nickname: "tzhangm123tzhangmtzhangm",
            email:'tzhangmtzhangmtzhangm@trip.com'
					},
				}}
				onClickGlobalSearch={() => {}}
				title={"Canyon"}
				logo={
          <img src={
            `/${theme}-logo.svg?a=1`
          } alt='' className={'w-[28px]'}/>
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
              <a href="https://ant.design/" target={'_blank'} rel="noreferrer" style={{color:'unset'}}>
                <ReadOutlined />
              </a>
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
