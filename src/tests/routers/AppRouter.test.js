import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
import { MemoryRouter } from 'react-router-dom';
import { act } from '@testing-library/react';
/* import Swal from 'sweetalert2'; */

import { login } from '../../actions/auth';
import { AppRouter } from '../../routers/AppRouter';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

/* jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}));
 */
jest.mock('../../actions/auth', () => ({
    login: jest.fn()
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

describe('Tests in <AppRouter />', () => {
    test('should call the login if the user is authenticate', async () => {

        let user;

        await act( async () => {
            const auth = getAuth();
            const userCredential = await signInWithEmailAndPassword( auth, 'test1@test.com', '123456' );
            user = userCredential.user;

            const wrapper = mount( 
                <Provider store={ store }>
                    <MemoryRouter>
                        <AppRouter />
                    </MemoryRouter>
                </Provider>
            );
        });

        expect( login ).toHaveBeenCalledWith( 'v3vFukHnvZWW8e0w8nqaKutITcN2', null );
    });
    
});
