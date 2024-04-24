import {Message} from "../../Data/Models/Message.ts";
import {Zone} from "../../Data/Models/Zone.ts";
import {NewZoneRequest} from "../../Data/Models/Requests/NewZoneRequest.ts";

export interface IChatService {
    isChatServiceConnected : boolean
    Initialize() : void
    ListenToChat() : Message
    CreateZone(newZone : NewZoneRequest) : Promise<string>
    DeleteZone(zoneId : string) : Promise<boolean>
    SetJoinedZone(zoneId: string) : void
    JoinZone(zoneId:string) : Zone
    LeaveZone(zoneId : string): void
    SendMessage(chatMessage : Message) : void
    IsJoinedZone() : string
}