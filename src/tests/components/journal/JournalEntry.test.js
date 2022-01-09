import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";

import { JournalEntry } from '../../../components/journal/JournalEntry';
import { activeNote } from '../../../actions/notes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

const note = {
    id: '12345',
    title: 'Test Note',
    body: 'This is a test note',
    date: new Date().getTime()
};

let store = mockStore(initState);

store.dispatch = jest.fn();

const wrapper = mount( 
    <Provider store={ store }>
        <JournalEntry {...note} />
    </Provider>
);

describe('Tests in <JournalEntry />', () => {
    test('should show correctly', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('should call the activeNote action', () => {
        wrapper.find('.journal__entry').simulate('click');

        expect( store.dispatch ).toHaveBeenCalledWith( activeNote(note.id,  note) );
    });
});
