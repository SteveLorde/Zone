import "./NavbarStyle.scss";
import {useContext, useRef, useState} from "react";
import {MainContext} from "../../../Services/State/MainContext.tsx";

export function Navbar() {
    const {setSelectedTab} = useContext(MainContext);
    const [mobileMenuLeftCSSProperty, setMobileMenuLeftCSSProperty] = useState('-1000px');
    const navMenu = useRef<HTMLDivElement>(null);

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

    function SelectTab(tabNumber : number) {
        setSelectedTab(tabNumber);
    }

    return <>
        {/*Mobile Navbar*/}
        <div className="navbar">
            <button onClick={() => SelectTab(0)}>
                <img className={"w-[60px]"} src={"UI/Logo.svg"} alt={"Zone"}/>
            </button>
            <div className={"flex flex-row items-center gap-4"}>
                <li><button id="ProfileBtn" className={"navbardesktopbtn"} onClick={() => SelectTab(0)}>Profile</button></li>
                <li><button id="ZoneBtn" className={"navbardesktopbtn"} onClick={() => SelectTab(1)}>Zone</button>
                </li>
            </div>
        </div>

        {/*Mobile Navbar*/}
        <div className={"md:hidden relative"}>
            <div className={"flex flex-row items-center"}>
            <img className="sidemenubtn" onClick={() => ToggleMenu()} id="MenuButton" src="UI/SideMenuButton.svg" alt="navmenu"/>
            </div>
            {/*Mobile Menu*/}
            <div id="NavMenu" style={{left: mobileMenuLeftCSSProperty}} ref={navMenu} className="navbarmenu">
                <ul className={"navlinks"}>
                    <li>
                        <button id="ProfileBtn" className={"navbarbtn navbarbtn1"}
                                onClick={() => SelectTab(0)}>Profile
                        </button>
                        <ul className={"dropdownlist dropdown1"}>
                            <li>
                                <button onClick={() => SelectTab(0)}>Dropdown button</button>
                            </li>
                            <li>
                                <button onClick={() => SelectTab(0)}>Dropdown button</button>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <button id="ZoneBtn" className={"navbarbtn navbarbtn2"} onClick={() => SelectTab(1)}>Zone
                        </button>
                        <ul className={"dropdownlist dropdown2"}>
                            <li>
                                <button onClick={() => SelectTab(0)}>Dropdown button</button>
                            </li>
                            <li>
                                <button onClick={() => SelectTab(0)}>Dropdown button</button>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>



    </>;
}