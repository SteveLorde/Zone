import {useForm} from "react-hook-form";
import {AuthRequest} from "../../../Data/Models/Requests/AuthRequest.ts";
import {IAuthenticationService} from "../../../Services/Authentication/IAuthenticationService.ts";
import "./LoginPageStyle.scss";
import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {CustomErrorModal} from "../../Components/Modals/CustomErrorModal.tsx";
import {MainContext} from "../../../Services/State/MainContext.tsx";


export function LoginPage({authService} : {authService : IAuthenticationService}) {
    const {isErrorModalVisible , setErrorModalVisible} = useContext(MainContext);
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
            setErrorModalVisible(true);
        }
    }

    return (
        <>
            {isErrorModalVisible && <CustomErrorModal Type={isErrorLogin} Message={"Wrong Username Or Password"}/>}

            <div className={"loginpage"}>
                <div className={"loginpanel"}>
                    {/*Image*/}
                    <img className={"loginimage"} src={"UI/LoginForm.svg"} alt={"loginpage"} />
                    {/*Login Form*/}
                    <div className={"formarea"}>
                        <button className={"appbtn togglebtn"} onClick={() => ToggleForm()}>Not Registered?</button>
                        {didRegister && <p className={"text-green-500"}>register successful please login</p>}
                        {toggledLoginForm && <form className="form" onSubmit={loginFormSubmit(SubmitLogin)}>
                            <input className={"forminput2"} type={"text"} placeholder={"Username..."} {...loginInput("userName", {required: true})}
                                   aria-invalid={loginErrors.userName ? "true" : "false"}/>
                            {loginErrors.userName?.type === "required" &&
                                <p className={"text-red-500"}>username is required</p>}
                            <input className={"forminput2"} type={"text"} placeholder={"Password..."} {...loginInput("password", {required: true})}
                                   aria-invalid={loginErrors.password ? "true" : "false"}/>
                            {loginErrors.password?.type === "required" &&
                                <p className={"text-red-500"}>password is required</p>}
                            <input className={"appbtn"} type={"submit"} value="Login"/>
                        </form>}

                        {!toggledLoginForm && <form className={"form"} onSubmit={registerFormSubmit(SubmitRegister)}>
                            <input className={"forminput2"} type={"text"} placeholder={"Username..."} {...registerInput("userName", {required: true})}
                                   aria-invalid={registerErrors.userName ? "true" : "false"}/>
                            {registerErrors.userName?.type === "required" && (
                                <p className={"text-red-500"}>username is required</p>)}
                            <input className={"forminput2"} type={"text"} placeholder={"Password..."} {...registerInput("password", {required: true})}
                                   aria-invalid={registerErrors.password ? "true" : "false"}/>
                            {registerErrors.password?.type === "required" && (
                                <p className={"text-red-500"}>password is required</p>)}
                            <input className={"forminput2"} type={"text"} placeholder={"Email..."} {...registerInput("email", {required: true})}
                                   aria-invalid={registerErrors.email ? "true" : "false"}/>
                            {registerErrors.email?.type === "required" && (
                                <p className={"text-red-500"}>email is required</p>)}
                            <input className={"appbtn"} type={"submit"} value={"Register"}/>
                        </form>}
                    </div>
                </div>
                <div className={"loginpagefooter"}>
                    {/*Footer Logo*/}
                    <img className={"logo"} src={"UI/Logo.svg"} alt={"Zone"}/>
                </div>
            </div>
        </>
    );
}