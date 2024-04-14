import {AuthRequest} from "../../Data/Models/AuthRequest.ts";
import {IAuthenticationService} from "./IAuthenticationService.ts";
import axios from "axios";

export class AuthenticationService implements IAuthenticationService {

    backendUrl = process.env.BACKENDURL as string;

    isLoggedIn: boolean = false;

    async Login(authRequest: AuthRequest) : Promise<boolean>{
        return await axios.post<string>(`${this.backendUrl}/Login`, authRequest).then(tokenres => {
            if (tokenres.data !== "") {
                this.isLoggedIn = true;
                localStorage.setItem('usertoken', tokenres.data);
                return true;
            }
            else {
                return false;
            }
        } );
    }

    async Register(authRequest: AuthRequest): Promise<boolean> {
        return await axios.post<boolean>(`${this.backendUrl}/Register`, authRequest).then(res => res.data);
    }

    GetToken(): string {
        const token = localStorage.getItem('usertoken');
        if (token !== null) {
            return token;
        }
        else {
            return "null";
        }
    }


}