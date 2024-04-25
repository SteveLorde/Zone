import "../../../Styles/Global.scss";
import {Navbar} from "../../Components/Navbar/Navbar.tsx";
import {MainContext,} from "../../../Services/State/MainContext.tsx";
import {ProfileTabPage} from "../Tabs/Profile/ProfileTabPage.tsx";
import {ZoneTabPage} from "../Tabs/Zone/ZoneTabPage.tsx";
import {SettingsPage} from "../Tabs/Settings/SettingsPage.tsx";
import {useContext} from "react";
import {CreateZonePanel} from "../../Components/CreateZonePanel/CreateZonePanel.tsx";

export function Dashboard() {
    const {selectedTabNumber, chatService, authService} = useContext(MainContext);
    //const [componentToRender, setComponentToRender] = useState<ReactElement>();
    let componentToRender;

    switch (selectedTabNumber) {
        case 0:
            componentToRender = <ProfileTabPage />;
            //setComponentToRender(<ProfileTabPage />);
            break;
        case 1:
            componentToRender = <ZoneTabPage />;
            //setComponentToRender(<ZoneTabPage />);
            break;
        case 2:
            componentToRender = <SettingsPage />;
            //setComponentToRender(<SettingsPage />);
            break;
        case 3:
            componentToRender = <CreateZonePanel />;
            //setComponentToRender(<CreateZonePanel />);
            break;
        default:
            componentToRender = <ProfileTabPage />;
            //setComponentToRender(<ProfileTabPage />);
    }

    function StartBackEndConnection() {
        if (authService.isLoggedIn) {
            chatService.Initialize();
        }
    }

    /*
    useEffect(() => {
        StartBackEndConnection;
    }, []);

     */

    return (
        <>
            <div className={"flex flex-col"}>
                <Navbar/>
                <div className={"p-5"}>
                    {/*Dashboard Tab Component to View*/}
                    {componentToRender}
                </div>
            </div>
        </>
    );
}