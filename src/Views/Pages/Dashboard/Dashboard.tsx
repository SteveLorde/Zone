import {Navbar} from "../../Components/Navbar/Navbar.tsx";
import {MainContext,} from "../../Services/State/MainContext.tsx";
import {ProfileTabPage} from "../Tabs/Profile/ProfileTabPage.tsx";
import {ZoneTabPage} from "../Tabs/Zone/ZoneTabPage.tsx";
import {SettingsPage} from "../Tabs/Settings/SettingsPage.tsx";
import {ReactElement, useContext, useEffect, useState} from "react";
import {CreateZonePanel} from "../../Components/CreateZonePanel/CreateZonePanel.tsx";

export function Dashboard() {
    const {selectedTabNumber, chatService, authService} = useContext(MainContext);
    const [componentToRender, setComponentToRender] = useState<ReactElement>();

    switch (selectedTabNumber) {
        case 0:
            setComponentToRender(<ProfileTabPage />);
            break;
        case 1:
            setComponentToRender(<ZoneTabPage />);
            break;
        case 2:
            setComponentToRender(<SettingsPage />);
            break;
        case 3:
            setComponentToRender(<CreateZonePanel />);
            break;
        default:
            setComponentToRender(<ProfileTabPage />);
    }

    function StartBackEndConnection() {
        if (authService.isLoggedIn) {
            chatService.Initialize();
        }
    }

    useEffect(() => {
        StartBackEndConnection;
    }, []);

    return (
        <>
            <div className={"flex flex-col"}>
                <Navbar/>
                {/*Dashboard Tab Component to View*/}
                {componentToRender}
            </div>
        </>
    );
}