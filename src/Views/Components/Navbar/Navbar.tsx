import "./NavbarStyle.module.scss";
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
        <div className="grid grid-cols-3 gap-4 place-items-center bg-blue-500">
            <img className="" onClick={() => ToggleMenu()} id="MenuButton" src="" alt="navmenu"/>
            <div id="NavMenu" className="navbarmenu bg-blue-500">
                <ul>
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