import "./NavbarStyle.module.scss";
import {useContext} from "react";
import {MainContext} from "../../Services/State/MainContext.tsx";

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
                <button onClick={() => SelectTab(0)}>Profile</button>
                <button onClick={() => SelectTab(1)}>Zone</button>
            </div>
        </div>
    </>;
}