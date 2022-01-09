import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";

import { NoteScreen } from '../../../components/notes/NoteScreen';
import { activeNote } from '../../../actions/notes';

jest.mock('../../../actions/notes', () => ({
    activeNote: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: '123',
        name: 'Test User'
    },
    ui: {
        isLoading: false,
        msgError: null
    },
    notes: {
        notes: [],
        active: {
            id: '12345',
            title: 'Test Note',
            body: 'This is a test note',
            date: new Date().getTime()
        }
    }
};

let store = mockStore(initState);

store.dispatch = jest.fn();

const wrapper = mount( 
    <Provider store={ store }>
        <NoteScreen />
    </Provider>
);

describe('Tests in <NotesScreen />', () => {
    test('should show correctly', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('should call the active note', () => {
        wrapper.find('input[name="title"]').simulate('change', { 
            target: { 
                name: 'title', 
                value: 'Wenas' 
            } 
        });

        const id = initState.notes.active.id;
        const body = initState.notes.active.body;
        const date = initState.notes.active.date;

        expect( activeNote ).toHaveBeenCalledWith( id, {
            title: 'Wenas',
            body,
            date,
            id
        });
    });
    
    
});
