import {Navbar} from "../../Components/Navbar/Navbar.tsx";
import {MainContext,} from "../../Services/State/MainContext.tsx";
import {ProfilePage} from "../Tabs/Profile/ProfilePage.tsx";
import {ZonePage} from "../Tabs/Zone/ZonePage.tsx";
import {SettingsPage} from "../Tabs/Settings/SettingsPage.tsx";
import {useContext} from "react";

export function Dashboard() {
    const {selectedTabNumber, chatService, authService} = useContext(MainContext);
    let componentToRender;

    switch (selectedTabNumber) {
        case 0:
            componentToRender = <ProfilePage />;
            break;
        case 1:
            componentToRender = <ZonePage />;
            break;
        case 2:
            componentToRender = <SettingsPage/>;
            break;
        default:
            componentToRender = <ProfilePage />;
    }

    function StartBackEndConnection() {
        if (authService.isLoggedIn) {
            chatService.Initialize();
        }
    }

    /*
        const [loadedTab, setLoadedTab] = useState<number>(0);

        function ViewTab(tabNumberToView: number) {
        setLoadedTab(tabNumberToView);
        }

        useEffect(() => {
        ViewTab(selectedTabNumber);
        }, [selectedTabNumber]);
     */



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