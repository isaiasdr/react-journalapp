/** * @jest-environment node */
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { startNewNote, startLoadingNotes, startSaveNote, startUploadingImage } from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import { types } from '../../types/types';


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: 'testing'
    },
    notes: {
        notes: [],
        active: {
            id: '5ob3P2uWhKIHNOCCxZfD',
            title: 'initial title',
            body: 'initial body',
            date: new Date().getTime()
        }
    }
};

let store = mockStore(initState);

describe('Tests with the actions of notes', () => {

    beforeEach(() => {
        store = mockStore(initState);
    });

    test('should create a new note startNewNote', async () => {
        
        await store.dispatch( startNewNote() );

        const actions = store.getActions();

        const payload ={
            id: expect.any(String),
            title: '',
            body: '',
            date: expect.any(Number)
        };

        expect ( actions[0] ).toEqual({
            type: types.notesActive,
            payload
        });

        expect ( actions[1] ).toEqual({
            type: types.notesAddNew,
            payload
        });

        const docId = actions[1].payload.id;
        const { uid } = store.getState().auth;

        await deleteDoc( doc(db, `${ uid }/journal/notes/${ docId }`) );
    });

    test('startLoadingNotes should load the notes', async () => {
        
        const { uid } = store.getState().auth;
        await store.dispatch( startLoadingNotes( uid ) );

        const actions = store.getActions();

        expect ( actions[0] ).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        });

        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number)
        };

        expect ( actions[0].payload[0] ).toMatchObject(expected);
    });

    test('startSaveNote should save the note', async () => {

        const note = {
            id: '5ob3P2uWhKIHNOCCxZfD',
            title: 'Testing',
            body: 'Testing',
            date: new Date().getTime()
        };

        await store.dispatch( startSaveNote(note) );

        const actions = store.getActions();

        expect( actions[0].type ).toBe( types.notesUpdated );
        expect( actions[0].payload.note.title ).toBe( note.title );

        const { uid } = store.getState().auth;
        const respDoc = await getDoc(doc(db, `${ uid }/journal/notes/${ note.id }`));

        expect( respDoc.data() ).toMatchObject({
            title: note.title,
            body: note.body,
            date: note.date
        });

        expect( actions[0] ).toEqual({
            type: types.notesUpdated,
            payload: {
                id: note.id,
                note
            }
        });
    });
});
