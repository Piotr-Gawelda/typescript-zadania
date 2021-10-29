import { AppStorage } from "./appStorage";
import { Note } from "./note";

export class AppLocalStorage implements AppStorage {
    
    constructor() {
        
    }
    
    async addNote(note: any) : Promise<string> {
        var notesStorage = localStorage.getItem("notes");
        var notes: Note[] = [];
        var id = 1;
        if (notesStorage) {
            notes = JSON.parse(notesStorage) as Note[];
            let max = 1;
            notes.forEach(note => {
            if (parseInt(note.id) > max) {
                max = parseInt(note.id);
                }
            });
            id = max + 1;
        }
        note.id = id;
        notes.push(note);
        localStorage.setItem("notes", JSON.stringify(notes));
        return Promise.resolve(id + "");
    }
    
    async deleteNote(id: string) {
        var notesStorage = localStorage.getItem("notes");
        var notes: Note[] = [];
        if (notesStorage) {
            notes = JSON.parse(notesStorage) as Note[];
            var ind = notes.findIndex(x => x.id === id);
            notes.splice(ind, 1);
            localStorage.setItem("notes", JSON.stringify(notes));
        }
    }

    async getNotes(): Promise<Note[]> {
        var notesStorage = localStorage.getItem("notes");
        var notes: Note[] = [];
        if (notesStorage) {
            notes = JSON.parse(notesStorage) as Note[];
            notes.forEach(x => {
                x.created = new Date(x.created);
            })
            return Promise.resolve(notes);
        }
        return [];
    }

   
}