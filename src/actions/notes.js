import Swal from 'sweetalert2';
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";


export const startNewNote = () => {
    return async ( dispatch, getState ) => {
        const uid = getState().auth.uid;
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        };

        const docRef = await addDoc(collection(db, `${ uid }/journal/notes`), newNote);
        dispatch( activeNote( docRef.id, newNote ) );
    }
}

export const activeNote = ( id, note ) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});

export const startLoadingNotes = ( uid ) => {
    return async ( dispatch ) => {
        const notes = await loadNotes( uid );
        dispatch ( setNotes( notes ) );
    }
}

export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
});

export const startSaveNote = ( note ) => {
    return async ( dispatch, getState ) => {
        const { uid } = getState().auth;

        if (!note.url)
            delete note.url;

        const noteToFiretore = { ...note };
        delete noteToFiretore.id;
        
        const docRef = await updateDoc(doc(db, `${ uid }/journal/notes/${ note.id }`), noteToFiretore);
        dispatch ( refreshNote( note.id, note ) );
        Swal.fire('Saved!', note.title, 'success');
    }
}

export const refreshNote = (id, note) => ({
    type: types.notesUpdated,
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }
});