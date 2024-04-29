import "./NavbarStyle.scss";
import {useContext} from "react";
import {MainContext} from "../../../Services/State/MainContext.tsx";
import {backendUrl} from "../../../Services/API.ts";

export function Navbar() {
    const {setSelectedTab, authService} = useContext(MainContext);
    //const [mobileMenuLeftCSSProperty, setMobileMenuLeftCSSProperty] = useState('-1000px');
    //const navMenu = useRef<HTMLDivElement>(null);

    /*
        function ToggleMenu() {
        if (navMenu.current?.style.left === '0px') {
            setMobileMenuLeftCSSProperty('-1000px');
            document.body.style.overflow = 'visible';
        }
        else {
            setMobileMenuLeftCSSProperty('0px');
            document.body.style.overflow = 'hidden';
        }
    }
     */


    function SelectTab(tabNumber : number) {
        setSelectedTab(tabNumber);
    }

    return <>
        {/*Desktop Navbar*/}
        <div className="navbar hidden sm:flex">
            <ul className={"navcontainer"}>
                    <li>
                        <button id="ProfileBtn" className={"navbarbtn"}
                                onClick={() => SelectTab(0)}>{authService.isLoggedIn ?
                            <img className={"navicon"}
                                 src={`${backendUrl}/storage/users/${authService.activeUser.id}/profilepic.png`}
                                 alt={"profileicon"}/> :
                            <img className={"navicon"} src="UI/ProfileNavIcon.svg" alt={"profile"}/>}
                            <p className={"buttontitle"}>Profile</p>
                        </button>
                    </li>
                    <li>
                        <button id="ZoneBtn" className={"navbarbtn"} onClick={() => SelectTab(1)}>
                            <img className={"navicon"} src="UI/ChatNavIcon.svg" alt={"zone"}/>
                            <p className={"buttontitle"}>Zone</p>
                        </button>
                    </li>
                    <li>
                        <button id="SettingsNavBtn" className={"navbarbtn"} onClick={() => SelectTab(2)}>
                            <img className={"navicon"} src="UI/SettingsNavIcon.svg" alt={"settings"}/>
                            <p className={"buttontitle"}>Settings</p>
                        </button>
                    </li>
            </ul>
        </div>
    </>;
}