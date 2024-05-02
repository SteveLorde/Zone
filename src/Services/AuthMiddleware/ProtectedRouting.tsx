import {useContext} from "react";
import {MainContext} from "../State/MainContext.tsx";
import {Navigate, Outlet} from "react-router-dom";


export function ProtectedRouting() {
    const {authService} = useContext(MainContext);

    return <>
        {authService.isLoggedIn ? <Outlet/>  : <Navigate to={"/"}/>}
    </>;
}