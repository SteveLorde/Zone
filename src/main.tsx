import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './Styles/Global.scss';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import {Dashboard} from "./Views/Pages/Dashboard/Dashboard.tsx";
import {MainContextProvider} from "./Services/State/MainContextProvider.tsx";
import {AuthMiddleware} from "./Services/AuthMiddleware/AuthMiddleware.tsx";


const router = createBrowserRouter([
    {path: "/", element: <App/>},
    {path: "dashboard", element : <Dashboard/>}
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <MainContextProvider>
            <AuthMiddleware>
                <RouterProvider router={router}/>
            </AuthMiddleware>
        </MainContextProvider>
    </React.StrictMode>
);
