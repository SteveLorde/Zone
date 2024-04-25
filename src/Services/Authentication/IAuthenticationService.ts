import {AuthRequest} from "../../Data/Models/Requests/AuthRequest.ts";
import {User} from "../../Data/Models/User.ts";

export interface IAuthenticationService {
    backendUrl : string
    customHeaders : {Authorization : string}
    isLoggedIn : boolean
    activeUser : User
    Login(authRequest : AuthRequest) : Promise<boolean>
    Register(authRequest : AuthRequest) : Promise<boolean>
    GetToken() : string
}

