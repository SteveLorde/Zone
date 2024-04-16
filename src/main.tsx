import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import {MainContextProvider} from "./Services/State/MainContext.tsx";
import {Dashboard} from "./Pages/Dashboard/Dashboard.tsx";


const router = createBrowserRouter([
    {path: "/", element: <App/>},
    {path: "dashboard", element : <Dashboard/>}
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <MainContextProvider>
                <RouterProvider router={router}/>
        </MainContextProvider>
    </React.StrictMode>
);
