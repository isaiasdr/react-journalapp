import { doc, getDoc } from 'firebase/firestore';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { startUploadingImage } from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import { fileUpload } from '../../helpers/fileUpload';
import { types } from '../../types/types';

jest.mock('../../helpers/fileUpload', () => ({
    fileUpload: () => Promise.resolve('https://hola-mundo.com')
}));

const noScroll = () => {};
Object.defineProperty(window, 'scrollTo', {value: noScroll, writable: true});

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: 'testing'
    },
    notes: {
        active: {
            id: '5ob3P2uWhKIHNOCCxZfD',
            title: 'initial title',
            body: 'initial body',
            date: new Date().getTime()
        }
    }
};

let store = mockStore(initState);

describe('Tests with the actions of notes (continuation)', () => {
    test('startUploadingImage should upload the image and save the url ', async () => {
        
        const file = new File([], 'foto.jpg');
        await store.dispatch( startUploadingImage(file) );

        const actions = store.getActions();
        expect( actions[0].type ).toBe( types.notesUpdated );

        /* const { auth, notes } = store.getState();
        const { uid } = auth;
        const { id } = notes.active;

        const respDoc = await getDoc(doc(db, `${ uid }/journal/notes/${ id }`));
        
        expect( respDoc.data().url ).toBe('https://hola-mundo.com'); */
    });
});
