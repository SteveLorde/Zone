import * as signalr from "@microsoft/signalr";
import axios from "axios";
import {Message} from "../../Data/Models/Message.ts";
import {IChatService} from "./IChatService.ts";
import {IAuthenticationService} from "../Authentication/IAuthenticationService.ts";
import {Zone} from "../../Data/Models/Zone.ts";
import {NewZoneRequest} from "../../Data/Models/Requests/NewZoneRequest.ts";
import {backendUrl} from "../API.ts";

export class ChatService implements IChatService{

    _authService : IAuthenticationService = {} as IAuthenticationService;

    constructor(authService : IAuthenticationService) {
        this._authService = authService;
    }

    backendUrl = backendUrl;
    chatConnection = new signalr.HubConnectionBuilder().withUrl('http://localhost:5208/chathub').withAutomaticReconnect().build();
    isChatServiceConnected : boolean = false;
    joinedZoneId : string = "";


     Initialize() {
         this.chatConnection.start().catch(err => console.log(err));
         this.chatConnection.on("connected", () => {
             console.log("Backend Reporting Over :)");
             this.isChatServiceConnected = true;
         });
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

    async CreateZone(newZone : NewZoneRequest): Promise<string> {
        return await axios.post<string>(`${this.backendUrl}/createzone`, newZone).then(res => res.data);
    }

    async DeleteZone(zoneId : string) : Promise<boolean> {
        return await axios.get<boolean>(`${this.backendUrl}/deletezone/${zoneId}`).then(res => res.data);
    }

    JoinZone(zoneId: string): Zone {
        this.chatConnection.invoke('JoinZone', zoneId);
        let zone : Zone = {} as Zone;
        this.chatConnection.on("ZoneJoined", (joinedZone : Zone) => {
            zone = joinedZone;
        });
        if (zone.id !== "" && zone.id == zoneId) {
            this.SetJoinedZone(zone.id);
            return zone;
        } else {
            return zone;
        }
    }

    SetJoinedZone(zoneId: string): void {
         this.joinedZoneId = zoneId;
    }

    IsJoinedZone() {
         return this.joinedZoneId;
    }

    LeaveZone(zoneId: string): void {
        this.chatConnection.invoke('LeaveZone', zoneId);
    }



}