import {Navbar} from "../../Components/Navbar/Navbar.tsx";
import {MainContext,} from "../../Services/State/MainContext.tsx";
import {ProfileTabPage} from "../Tabs/Profile/ProfileTabPage.tsx";
import {ZoneTabPage} from "../Tabs/Zone/ZoneTabPage.tsx";
import {SettingsPage} from "../Tabs/Settings/SettingsPage.tsx";
import {useContext, useEffect} from "react";

export function Dashboard() {
    const {selectedTabNumber, chatService, authService} = useContext(MainContext);
    let componentToRender;

    switch (selectedTabNumber) {
        case 0:
            componentToRender = <ProfileTabPage />;
            break;
        case 1:
            componentToRender = <ZoneTabPage />;
            break;
        case 2:
            componentToRender = <SettingsPage/>;
            break;
        default:
            componentToRender = <ProfileTabPage />;
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