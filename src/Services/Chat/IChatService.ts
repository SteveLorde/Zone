import {Message} from "../../Data/Models/Message.ts";
import {Zone} from "../../Data/Models/Zone.ts";
import {NewZoneRequest} from "../../Data/Models/Requests/NewZoneRequest.ts";

export interface IChatService {
    isChatServiceConnected : boolean
    Initialize() : void
    ListenToChat() : Message
    CreateZone(newZone : NewZoneRequest) : Promise<boolean>
    DeleteZone(zoneId : string) : Promise<boolean>
    JoinZone(zoneId: string) : Zone
    LeaveZone(zoneId : string): void
    SendMessage(chatMessage : Message) : void
}