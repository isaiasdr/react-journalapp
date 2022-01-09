import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
import { MemoryRouter } from 'react-router-dom';

import { LoginScreen } from '../../../components/auth/LoginScreen';
import { startGoogleLogin, startLoginEmailPassword } from '../../../actions/auth';


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../../../actions/auth', () => ({
    startGoogleLogin: jest.fn(),
    startLoginEmailPassword: jest.fn()
}));

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

store.dispatch = jest.fn();

const wrapper = mount( 
    <Provider store={ store }>
        <MemoryRouter>
            <LoginScreen />
        </MemoryRouter>
    </Provider>
);

describe('tests in <LoginScreen />', () => {

    beforeEach(() => {
        store = mockStore(initState);
        jest.clearAllMocks();
    });  
    
    test('should show correctly', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('should shot the startLoginGoogle action', () => {
        wrapper.find('.google-btn').simulate('click');
        
        expect( startGoogleLogin ).toHaveBeenCalled();
    });

    test('should shot the startLoginEmailPassword', () => {

        const email = 'test1@gmail.com';
        const pass = '123456';

        const emailField = wrapper.find('input[name="email"]');
        emailField.simulate('change', {
            target: {
                name: 'email',
                value: email,
            }
        });

        const passField = wrapper.find('input[name="password"]');
        passField.simulate('change', {
            target: {
                name: 'password',
                value: pass,
            }
        });

        wrapper.find('form').prop('onSubmit')({ preventDefault(){} });

        expect( startLoginEmailPassword ).toHaveBeenCalledWith( email, pass );
    });
});
