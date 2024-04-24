import "./NavbarStyle.scss";
import {useContext} from "react";
import {MainContext} from "../../../Services/State/MainContext.tsx";

export function Navbar() {
    const {setSelectedTab} = useContext(MainContext);
    const navMenu = document.getElementById("NavMenu") as HTMLElement;


    function ToggleMenu() {
        if (navMenu.style.left === "0") {
            navMenu.style.left = "-1000px";
        }
        else {
            navMenu.style.left = "0";
        }
    }

    function SelectTab(tabNumber : number) {
        setSelectedTab(tabNumber);
    }

    return <>
        <div className="navbar">
            <img className="sidemenubtn" onClick={() => ToggleMenu()} id="MenuButton" src="public/UI/SideMenuButton.svg" alt="navmenu"/>
            <div id="NavMenu" className="navbarmenu">
                <ul className={"navlinks"}>
                    <li>
                        <button id="ProfileBtn" className={"navbarbtn navbarbtn1"} onClick={() => SelectTab(0)}>Profile</button>
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
                        <button id="ZoneBtn" className={"navbarbtn navbarbtn2"} onClick={() => SelectTab(1)}>Zone</button>
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