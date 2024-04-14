import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import {MainContext} from "./Services/State/MainContext.ts";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";
import {SettingsPage} from "./Pages/Settings/SettingsPage.tsx";
import {ZonePage} from "./Pages/Zone/ZonePage.tsx";
import {JoinZonePage} from "./Pages/JoinZone/JoinZonePage.tsx";
import {CreateZonePage} from "./Pages/CreateZone/CreateZonePage.tsx";


const router = createBrowserRouter([
    {path: "/", element: <App/>},
    {path: "settings", element : <SettingsPage/>},
    {path: "joinzone", element : <JoinZonePage/>},
    {path: "zone", element : <ZonePage/>},
    {path: "createzone", element : <CreateZonePage/>}

]);


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <MainContext.Provider value={{shit: ""}}>
            <DevSupport ComponentPreviews={ComponentPreviews}
                        useInitialHook={useInitial}
            >
                <RouterProvider router={router}/>
            </DevSupport>
        </MainContext.Provider>
    </React.StrictMode>,
);
