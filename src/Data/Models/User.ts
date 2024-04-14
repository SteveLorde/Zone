import {AutoMap} from "@automapper/classes";
import {Zone} from "./Zone.ts";

export class User {
    @AutoMap()
    id : string = "";
    @AutoMap()
    userName : string = "";
    @AutoMap()
    password : string = "";
    @AutoMap()
    email : string = "";
    @AutoMap( () => Zone)
    createdZones : Zone[] = [];
    @AutoMap( () => Zone)
    joinedZones : Zone[] = [];
}