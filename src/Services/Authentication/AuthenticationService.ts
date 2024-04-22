import {AuthRequest} from "../../Data/Models/AuthRequest.ts";
import {IAuthenticationService} from "./IAuthenticationService.ts";
import axios from "axios";
import {AccessToken} from "../../Data/Models/AccessToken.ts";
import {User} from "../../Data/Models/User.ts";

export class AuthenticationService implements IAuthenticationService {

    backendUrl = process.env.BACKENDURL as string;

    isLoggedIn: boolean = false;
    activeUser: User = {} as User;

    async Login(authRequest: AuthRequest) : Promise<boolean>{
        return await axios.post<string>(`${this.backendUrl}/Login`, authRequest).then(tokenres => {
            if (tokenres.data !== "") {
                this.isLoggedIn = true;
                localStorage.setItem('useraccesstoken', tokenres.data);
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

    async GetLoggedUser() {
        return await axios.get<User>(`${this.backendUrl}/authentication/getloggeduser`).then(res => this.activeUser = res.data);
    }

    SetCookie(accessToken : AccessToken) {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + accessToken.expirationDate);
        document.cookie = encodeURIComponent("token") + "=" + encodeURIComponent(accessToken.accessToken) + "; expires=" + expirationDate.toUTCString() + "; path=/";
    }

    IsAuthorized() {
        return this.isLoggedIn;
    }


}