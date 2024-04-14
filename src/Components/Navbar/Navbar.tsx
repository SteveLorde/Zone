import "./NavbarStyle.module.scss";

export function Navbar() {
    const navMenu = document.getElementById("NavMenu") as HTMLElement;


    function ToggleMenu() {
        if (navMenu.style.left === "0") {
            navMenu.style.left = "-1000px";
        }
        else {
            navMenu.style.left = "0";
        }
    }


    return <>
        <div id="NavMenu" className="navbarmenu bg-blue-500">
            <link></link>
        </div>

        <div className="grid grid-cols-3 gap-4 place-items-center bg-blue-500">
            <img className="" onClick={() => ToggleMenu()} id="MenuButton" src="" alt="navmenu" />
            <h2>Zone</h2>
        </div>
    </>;
}