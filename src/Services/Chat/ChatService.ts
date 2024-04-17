import * as signalr from "@microsoft/signalr";
import axios from "axios"
import {Message} from "../../Data/Models/Message.ts";
import {IChatService} from "./IChatService.ts";
import {IAuthenticationService} from "../Authentication/IAuthenticationService.ts";
import {Zone} from "../../Data/Models/Zone.ts";

export class ChatService implements IChatService{

    _authService : IAuthenticationService = {} as IAuthenticationService;

    constructor(authService : IAuthenticationService) {
        this._authService = authService;
    }

    backendUrl : string = process.env.BACKENDURL as string;
    chatConnection : signalr.HubConnection = {} as signalr.HubConnection;
    isChatServiceConnected : boolean = false;


     Initialize() {
        this.chatConnection = new signalr.HubConnectionBuilder().withUrl(`${this.backendUrl}/chathub`, {transport: signalr.HttpTransportType.WebSockets, accessTokenFactory: () => this._authService.GetToken()}).build();
        this.chatConnection.start().then(() => this.isChatServiceConnected = true);
    }

    CloseConnection() {
         this.chatConnection.stop().then(() => this.isChatServiceConnected = false);
    }

     ListenToChat() : Message {
        let messageToReturn : Message = {} as Message;
        this.chatConnection.on('ReceiveMessage', (incomingMessage : Message) => {
            messageToReturn = incomingMessage;
        });
        return messageToReturn;
    }

     SendMessage(chatMessage : Message) {
        this.chatConnection.invoke('SendMessage', chatMessage);
    }

    async CreateZone(newZone : Zone): Promise<boolean> {
        return await axios.post<boolean>(`${this.backendUrl}/createzone`, newZone).then(res => res.data);
    }

    async DeleteZone(zoneId : string) : Promise<boolean> {
        return await axios.get<boolean>(`${this.backendUrl}/deletezone/${zoneId}`).then(res => res.data);
    }

    JoinZone(zoneId: string): void {
        this.chatConnection.invoke('JoinZone', zoneId);
    }

     LeaveZone(zoneId: string): void {
        this.chatConnection.invoke('LeaveZone', zoneId);
    }



}