import {useForm} from "react-hook-form";
import {AuthRequest} from "../../Data/Models/AuthRequest.ts";
import {IAuthenticationService} from "../../Services/Authentication/IAuthenticationService.ts";
import "./LoginPageStyle.module.scss";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {CustomModal} from "../../Utilities/Modal/CustomModal.tsx";


export function LoginPage({authService} : {authService : IAuthenticationService}) {
    const {register : loginInput, handleSubmit : loginFormSubmit,  formState: { errors}} = useForm<AuthRequest>();
    const {register : registerInput, handleSubmit : registerFormSubmit,  formState: { errors}} = useForm<AuthRequest>();
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

        }
        else {

        }
    }

    return (
        <>
            {isErrorLogin && <CustomModal Type={isErrorLogin} Message={"Wrong Username Or Password"}/>}


            <div className={"flex flex-row gap-4 items-center"}>
                {/*Image*/}
                <img src={""} alt={"loginpage"} />
                {/*Login Form*/}
                <div className={"formarea"}>
                    <button onClick={() => ToggleForm()}>Not Registered?</button>
                    {toggledLoginForm && <form onSubmit={loginFormSubmit(SubmitLogin)}>
                        <input type={"text"} {...loginInput("username", {required: true})} aria-invalid={errors.username ? "true" : "false"} />
                        {errors.username?.type === "required" && (<p className={"text-red-500"}>username is required</p>)}
                        <input type={"text"} {...loginInput("password", {required: true})} aria-invalid={errors.password ? "true" : "false"} />
                        {errors.password?.type === "required" && (<p className={"text-red-500"}>password is required</p>)}
                        <input type={"submit"}/>
                    </form>}

                    {!toggledLoginForm && <form onSubmit={registerFormSubmit(SubmitRegister)}>
                        <input type={"text"} {...registerInput("username", {required: true})}
                               aria-invalid={errors.username ? "true" : "false"}/>
                        {errors.username?.type === "required" && (<p className={"text-red-500"}>username is required</p>)}
                        <input type={"text"} {...registerInput("password", {required: true})}
                               aria-invalid={errors.password ? "true" : "false"}/>
                        {errors.password?.type === "required" && (<p className={"text-red-500"}>password is required</p>)}
                        <input type={"text"} {...registerInput("email", {required: true})}
                               aria-invalid={errors.email ? "true" : "false"}/>
                        {errors.email?.type === "required" && (<p className={"text-red-500"}>email is required</p>)}
                        <input type={"submit"}/>
                    </form>}
                </div>
            </div>
        </>
    );
}