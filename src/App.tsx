import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import {IAuthenticationService} from "./Services/Authentication/IAuthenticationService.ts";
import {AuthenticationService} from "./Services/Authentication/AuthenticationService.ts";
import {LoginPage} from "./Pages/Login/LoginPage.tsx";

function App() {

  const authService : IAuthenticationService = new AuthenticationService();

  return (
    <>
      <LoginPage authService={authService}/>
    </>
  );
}

export default App;
