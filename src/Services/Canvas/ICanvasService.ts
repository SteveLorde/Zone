export interface ICanvasService {
    Draw() : Promise<void>
    GetNotes() : Promise<void>
    SaveNotes() : Promise<boolean>
    DeleteNote() : Promise<boolean>
}