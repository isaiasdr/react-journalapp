import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/firebase-config";


export const loadNotes = async ( uid ) => {

    const notesRef = collection(db, `${ uid }/journal/notes`);
    const queryNotes = query( notesRef, orderBy('date', 'desc') );
    const notesSnap = await getDocs(queryNotes);

    const notes = [];

    notesSnap.forEach( snapHijo => {
        notes.push({
            id: snapHijo.id,
            ...snapHijo.data()
        });
    }); 

    return notes;
};