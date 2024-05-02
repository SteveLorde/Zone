import {AuthRequest} from "../../Data/Models/Requests/AuthRequest.ts";
import {IAuthenticationService} from "./IAuthenticationService.ts";
import axios from "axios";
import {AccessToken} from "../../Data/Models/AccessToken.ts";
import {User} from "../../Data/Models/User.ts";
import {backendUrl} from "../API.ts";

export class AuthenticationService implements IAuthenticationService {

    backendUrl = backendUrl;

    isLoggedIn: boolean = false;
    activeUser: User = {} as User;
    customHeaders = {
      'Authorization': `Bearer ${localStorage.getItem('usertoken')}`
    };

    async Login(authRequest: AuthRequest) : Promise<boolean>{
        return await axios.post<string>(`${this.backendUrl}/authentication/login`, authRequest).then(tokenres => {
            if (tokenres.data !== "") {
                this.setSessionLoggedIn();
                localStorage.setItem('useraccesstoken', tokenres.data);
                this.GetLoggedUser();
                return true;
            }
            else {
                return false;
            }
        } );
    }

    async Register(authRequest: AuthRequest): Promise<boolean> {
        return await axios.post<boolean>(`${this.backendUrl}/authentication/register`, authRequest).then(res => res.data);
    }

    setSessionLoggedIn() {
        localStorage.setItem('isloggedin', JSON.stringify("true"));
    }

    getSessionLoggedIn() {
        const isloggedin = localStorage.getItem('isloggedin');
        return isloggedin ? Boolean(isloggedin) : null;
    }

    LogOut() {
        localStorage.removeItem('isloggedin');
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
        return await axios.get<User>(`${this.backendUrl}/authentication/getloggeduser`, {headers: this.customHeaders}).then(res => this.activeUser = res.data);
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