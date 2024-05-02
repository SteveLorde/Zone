import React, {useContext} from "react";
import {MainContext} from "../State/MainContext.tsx";
import {redirect} from "react-router-dom";


export function AuthMiddleware({children}: { children: React.ReactElement }) {
    const {authService} = useContext(MainContext);
    if (!authService.isLoggedIn) {
        redirect("/login");
    } else {
        return <>
            {children}
        </>;
    }
}