import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";

import { RegisterScreen } from '../../../components/auth/RegisterScreen';
import { types } from '../../../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {},
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

//store.dispatch = jest.fn();

const wrapper = mount( 
    <Provider store={ store }>
        <MemoryRouter>
            <RegisterScreen />
        </MemoryRouter>
    </Provider>
);

describe('Tests in <RegisterScreen />', () => {
    test('should show correctly', () => {
        expect ( wrapper ).toMatchSnapshot();
    });

    test('should make the dispatch of the respective action', () => {
        /* const emailField = wrapper.find('input[name="email"]');

        emailField.simulate('change', {
            target: {
                name: 'email',
                value: '',
            }
        }); */

        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        const actions = store.getActions();
        
        expect( actions[0] ).toEqual({
            type: types.uiSetError,
            payload: 'El nombre es obligatorio'
        });
    });

    test('should show the error message', () => {
        const initState = {
            auth: {},
            ui: {
                isLoading: false,
                msgError: 'Email no es correcto'
            },
            notes: {
                notes: [],
                active: null
            }
        };
        
        let store = mockStore(initState);
        
        const wrapper = mount( 
            <Provider store={ store }>
                <MemoryRouter>
                    <RegisterScreen />
                </MemoryRouter>
            </Provider>
        );
        
        expect( wrapper.find('.auth__alert-error').exists() ).toBe(true);
        expect( wrapper.find('.auth__alert-error').text().trim() ).toBe(initState.ui.msgError);
    });
});
