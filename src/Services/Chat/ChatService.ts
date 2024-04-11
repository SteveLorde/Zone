import * as signalr from "@microsoft/signalr";
import {Message} from "../../Data/Models/Message.ts";
import {IChatService} from "./IChatService.ts";

export class ChatService implements IChatService{

    constructor() {}

    backendUrl : string = process.env.BACKENDURL as string;
    chatConnection : signalr.HubConnection = {} as signalr.HubConnection;


    async Initialize() {
        this.chatConnection = new signalr.HubConnectionBuilder().withUrl(`${this.backendUrl}/chathub`).build();
        this.chatConnection.start();
    }

    async ListenToChat() {
        let messageToReturn : Message = {} as Message;
        this.chatConnection.on('ReceiveMessage', (incomingMessage : Message) => {
            messageToReturn = incomingMessage;
        });
        return messageToReturn;
    }


    async SendMessage(chatMessage : Message) {
        await this.chatConnection.invoke('SendMessage', chatMessage);
    }


}