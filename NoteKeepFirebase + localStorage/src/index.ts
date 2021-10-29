import { AppFirestoreStorage } from './appFirestoreStorage';
import { AppStorage } from './appStorage';
import './main.scss';
import { appConfig } from "./config"
import { AppLocalStorage } from './appLocalStorage';
import { Note } from './note';


class App {
    storage: AppStorage = null;

    constructor() {
        if (appConfig.useFireBase) {
            this.storage = new AppFirestoreStorage();

        } else {
            this.storage = new AppLocalStorage();
        }

        var addNoteButton = document.querySelector("#addNote");
        addNoteButton.addEventListener("click", () => this.addNote());

        this.getNotes();
    }

    private getNotes() {
        this.storage.getNotes().then(notes => {
            notes.forEach(x => {
                this.addNoteToDom(x);
            })
        });
    }

    private addNote() {
        var title = document.querySelector("#note-title") as HTMLInputElement
        var content = document.querySelector("#note-content") as HTMLInputElement;
        var note = new Note();
        note.content = content.value;
        note.title = title.value;
        note.created = new Date();

        var id = this.storage.addNote(note).then(x => {
            note.id = x;
            this.addNoteToDom(note);
        })
    }

    private addNoteToDom(note: Note) {
        var noteHtml = `
        <div class="note-title">
         <strong>Tytuł:</strong> ${note.title}
        </div>
        <div class="note-description">
        <strong>Treść:</strong><br>
        ${note.content}
        </div>
        <div class="note-create-date">
        <strong>Data dodania:</strong> ${note.created.getFullYear()}-${note.created.getMonth() + 1}-${note.created.getDate() }
        </div>
        <div>
            <button id="delete-${note.id}">Usuń</button>
        </div>
        `
        var notes = document.querySelector("#note-container");
        var div = document.createElement("div");
        div.id = "note-" + note.id;
        div.innerHTML = noteHtml.trim();
        div.classList.add("note-box");

        var bttn = div.querySelector("#delete-" + note.id);
        bttn.addEventListener("click", () => this.deleteNote(note.id));
        notes.prepend(div);
    }

    private deleteNote(id: string) {
        this.storage.deleteNote(id);
        var note = document.querySelector("#note-" + id);
        note.remove();
    }

}

const app = new App();

