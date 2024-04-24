import {ICanvasService} from "./ICanvasService.ts";

export class CanvasService implements ICanvasService{

    constructor() {
    }

    async Draw(): Promise<void> {
        return;
    }
    async GetNotes(): Promise<void> {
        return;
    }
    async SaveNotes(): Promise<boolean> {
        return true;
    }
    async DeleteNote(): Promise<boolean> {
        return true;
    }


}