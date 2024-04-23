import {useForm} from "react-hook-form";
import {AuthRequest} from "../../../Data/Models/Requests/AuthRequest.ts";
import {IAuthenticationService} from "../../../Services/Authentication/IAuthenticationService.ts";
import "./LoginPageStyle.scss";
import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {CustomErrorModal} from "../../Components/Modals/CustomErrorModal.tsx";
import {MainContext} from "../../../Services/State/MainContext.tsx";


export function LoginPage({authService} : {authService : IAuthenticationService}) {
    const {visibleErrorWindow , setErrorWindowVisible, closeErrorWindow} = useContext(MainContext);
    const {register : loginInput, handleSubmit : loginFormSubmit,  formState: { errors : loginErrors}} = useForm<AuthRequest>();
    const {register : registerInput, handleSubmit : registerFormSubmit,  formState: { errors : registerErrors}} = useForm<AuthRequest>();
    const [didRegister , setDidRegister] = useState<boolean>(false);
    const [isErrorLogin, setIsErrorLogin] = useState<boolean>(false);
    const routerNavigate = useNavigate();

    const [toggledLoginForm, setToggledForm] = useState<boolean>(true);

    function ToggleForm() {
        setToggledForm(!toggledLoginForm);
    }


    async function SubmitLogin(newLoginRequest : AuthRequest) {
        const res = await authService.Login(newLoginRequest);
        if (res) {
            routerNavigate("dashboard");
        }
        else {
            setIsErrorLogin(true);
        }
    }

    async function SubmitRegister(newRegisterRequest : AuthRequest) {
        const res = await authService.Register(newRegisterRequest);
        if (res) {
            setDidRegister(true);
            setToggledForm(true);
        }
        else {
            setIsErrorLogin(true);
            setErrorWindowVisible(true);
        }
    }

    return (
        <>
            {visibleErrorWindow && <CustomErrorModal Type={isErrorLogin} Message={"Wrong Username Or Password"} CloseWindow={closeErrorWindow}/>}

            <div className={"loginpage"}>
                {/*Image*/}
                <img className={"loginimage"} src={"public/UI/LoginForm.svg"} alt={"loginpage"} />
                {/*Login Form*/}
                <div className={"formarea"}>
                    <button className={"toggleform"} onClick={() => ToggleForm()}>Not Registered?</button>
                    {didRegister && <p className={"text-green-500"}>register successful please login</p>}
                    {toggledLoginForm && <form className="form" onSubmit={loginFormSubmit(SubmitLogin)}>
                        <p className={"forminputtitle"}>Username</p>
                        <input className={"forminput"} type={"text"} {...loginInput("username", {required: true})}
                               aria-invalid={loginErrors.username ? "true" : "false"}/>
                        {loginErrors.username?.type === "required" && (
                            <p className={"text-red-500"}>username is required</p>)}
                        <p className={"forminputtitle"}>Password</p>
                        <input className={"forminput"} type={"text"} {...loginInput("password", {required: true})}
                               aria-invalid={loginErrors.password ? "true" : "false"}/>
                        {loginErrors.password?.type === "required" && (
                            <p className={"text-red-500"}>password is required</p>)}
                        <input className={"formsubmitinput"} type={"submit"} value="Login"/>
                    </form>}

                    {!toggledLoginForm && <form className={"form"} onSubmit={registerFormSubmit(SubmitRegister)}>
                        <p className={"forminputtitle"}>Username</p>
                        <input className={"forminput"} type={"text"} {...registerInput("username", {required: true})}
                               aria-invalid={registerErrors.username ? "true" : "false"}/>
                        {registerErrors.username?.type === "required" && (
                            <p className={"text-red-500"}>username is required</p>)}
                        <p className={"forminputtitle"}>Password</p>
                        <input className={"forminput"} type={"text"} {...registerInput("password", {required: true})}
                               aria-invalid={registerErrors.password ? "true" : "false"}/>
                        {registerErrors.password?.type === "required" && (
                            <p className={"text-red-500"}>password is required</p>)}
                        <p className={"forminputtitle"}>Email</p>
                        <input className={"forminput"} type={"text"} {...registerInput("email", {required: true})}
                               aria-invalid={registerErrors.email ? "true" : "false"}/>
                        {registerErrors.email?.type === "required" && (
                            <p className={"text-red-500"}>email is required</p>)}
                        <input className={"formsubmitinput"} type={"submit"} value={"Register"}/>
                    </form>}
                </div>
            </div>
        </>
    );
}