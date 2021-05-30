import "./main.scss"
import firebase from 'firebase';
import {firebaseConfig} from "./config"

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

const note = {
    title: 'Test note',
    content: 'Test note content'
}

export class AppFirestoreStorage {
    
    constructor() {
        
    }

    async addNote(note: any) {
        const res = await db.collection('notes').add(note)
    }
    
    async deleteNote(id: string) {
        const res = await db.collection('notes').doc(id).delete();
    }

    async updateNote(id: string, note: any) {
        const res = await db.collection('notes').doc(id).update(note);
    }
    
    async getNote(id: string) {
        return db.collection('notes').doc(id).get().then(res => ({id: res.id, data: res.data()}))
    }
    
    // getNotes().then(res => console.log(res));
    // async function getNotes() {
    //     return db.collection('notes').get().then(res => ({size: res.size, docs: res.docs}))
    // }
   
}