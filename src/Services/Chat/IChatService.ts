import {Message} from "../../Data/Models/Message.ts";

export interface IChatService {
    Initialize() : void
    ListenToChat() : Promise<Message>
    JoinZone(zoneId : string) : Promise<boolean>
    LeaveZone(zoneId : string): Promise<boolean>
    SendMessage(chatMessage : Message) : void
}