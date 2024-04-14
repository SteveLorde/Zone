import {User} from "./User.ts";
import {AutoMap} from "@automapper/classes";

export class Zone {
    @AutoMap()
    id : string = "";
    @AutoMap()
    title : string = "";
    @AutoMap()
    createdOn : Date = new Date();
    @AutoMap()
    userId : string = "";
    @AutoMap(() => User)
    userOwner : User = {} as User;
    @AutoMap(() => User)
    joinedUsers : User[] = [];
}