import {useForm} from "react-hook-form";
import {AuthRequest} from "../../Data/Models/AuthRequest.ts";
import {IAuthenticationService} from "../../Services/Authentication/IAuthenticationService.ts";


export function LoginPage({authService} : {authService : IAuthenticationService}) {

    const {register : loginInput, handleSubmit : loginFormSubmit, watch, formState: { errors }} = useForm<AuthRequest>();
    const {register : registerInput, handleSubmit : registerFormSubmit, watch, formState: { errors }} = useForm<AuthRequest>();


    async function SubmitLogin(newLoginRequest : AuthRequest) {
        const res = await authService.Login(newLoginRequest);
        if (res) {

        }
        else {

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
            <div className={"flex flex-row gap-4 items-center"}>
                {/*Image*/}
                <img src={""} alt={"loginpage"} />
                {/*Login Form*/}
                <div>
                    <form onSubmit={loginFormSubmit(SubmitLogin)}>
                        <input type={"text"} {...loginInput("username")} />
                        <input type={"text"} {...loginInput("password")} />
                        <input type={"submit"}/>
                    </form>

                    <form onSubmit={registerFormSubmit(SubmitRegister)}>
                        <input type={"text"} {...registerInput("username")} />
                        <input type={"text"} {...registerInput("password")} />
                        <input type={"submit"}/>
                    </form>
                </div>
            </div>
        </>
    );
}