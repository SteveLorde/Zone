import './App.css';
import {LoginPage} from "./Pages/Login/LoginPage.tsx";
import {useContext} from "react";
import {MainContext} from "./Services/State/MainContext.tsx";

function App() {

  const {authService} = useContext(MainContext);

  return (
    <>
        <LoginPage authService={authService}/>
    </>
  );
}

export default App;
