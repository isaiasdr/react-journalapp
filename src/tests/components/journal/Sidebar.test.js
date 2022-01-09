import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";


import { Sidebar } from '../../../components/journal/Sidebar';
import { startLogout } from '../../../actions/auth';
import { startNewNote } from '../../../actions/notes';

jest.mock('../../../actions/notes', () => ({
    startNewNote: jest.fn()
}));

jest.mock('../../../actions/auth', () => ({
    startLogout: jest.fn()
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
        active: null
    }
};

let store = mockStore(initState);

store.dispatch = jest.fn();

const wrapper = mount( 
    <Provider store={ store }>
        <Sidebar />
    </Provider>
);

describe('Tests in <Sidebar />', () => {

    beforeEach(() => {
        store = mockStore(initState);
    });

    test('should show correctly', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('should call the logout action', () => {
        wrapper.find('.btn').simulate('click');

        expect( startLogout ).toHaveBeenCalled();
    });

    test('should call the startNewNote action', () => {
        wrapper.find('.journal__new-entry').prop('onClick')();

        expect( startNewNote ).toHaveBeenCalled();
    });
});
