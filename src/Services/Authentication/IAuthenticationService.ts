import {AuthRequest} from "../../Data/Models/AuthRequest.ts";

export interface IAuthenticationService {
    isLoggedIn : boolean
    Login(authRequest : AuthRequest) : Promise<boolean>
    Register(authRequest : AuthRequest) : Promise<boolean>
    GetToken() : string
}

