import "./main.scss"
import firebase from 'firebase';
import {firebaseConfig} from "./config"
import { AppStorage } from "./appStorage";
import { Note } from "./note";

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export class AppFirestoreStorage implements AppStorage {
    
    constructor() {
        
    }

    async addNote(note: any): Promise<string> {
        const res = await db.collection('notes').add(Object.assign({}, note))
        return res.id;
    }
    
    async deleteNote(id: string) {
        await db.collection('notes').doc(id).delete();
    }

    async getNotes(): Promise<Note[]> {
        const snapshot = await firebase.firestore().collection('notes').get()
        return snapshot.docs.map(doc => {
            var date = new Date(doc.data().created?.seconds * 1000);
            return { id: doc.id, title: doc.data().title, created: date, content: doc.data().content }
         });
    }
}