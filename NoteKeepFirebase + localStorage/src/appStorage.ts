import {Note} from "./note"

export interface AppStorage {
    addNote(note: Note) : Promise<string>;
    deleteNote(id: string) : void;
    getNotes(): Promise<Note[]>;
}