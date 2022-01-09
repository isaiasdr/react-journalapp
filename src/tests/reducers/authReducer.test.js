import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';


describe('Tests in authReducer', () => {

    test('should make the login', () => {
        const initialState = {};

        const action = {
            type: types.login,
            payload: {
                uid: '12345',
                displayName: 'Paola Carvallo'
            }
        }
        
        const state = authReducer(initialState, action);

        expect( state ).toEqual({
            uid: '12345',
            name: 'Paola Carvallo'
        });
    });

    test('should make the logout', () => {
        const initialState = {
            uid: '12345',
            name: 'Paola Carvallo'
        };

        const action = {
            type: types.logout
        }
        
        const state = authReducer(initialState, action);

        expect( state ).toEqual({});
    });

    test('should return the state', () => {
        const initialState = {
            uid: '12345',
            name: 'Paola Carvallo'
        };

        const action = {
            type: 'cualquier cosa'
        }
        
        const state = authReducer(initialState, action);

        expect( state ).toEqual({
            uid: '12345',
            name: 'Paola Carvallo'
        });
    });
});
