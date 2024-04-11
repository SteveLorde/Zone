import {Message} from "../../Data/Models/Message.ts";
import {Zone} from "../../Data/Models/Zone.ts";

export interface IChatService {
    Initialize() : void
    ListenToChat() : Message
    CreateZone(newZone : Zone) : Promise<boolean>
    DeleteZone(zoneId : string) : Promise<boolean>
    JoinZone(zoneId : string) : void
    LeaveZone(zoneId : string): void
    SendMessage(chatMessage : Message) : void
}