import thunk from "redux-thunk";
import configureStore from 'redux-mock-store';
import { types } from "../../types/types";
import { login, logout, startLoginEmailPassword, startLogout } from "../../actions/auth";


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);

describe('Tests with actions of auth', () => {

    beforeEach(() => {
        store = mockStore(initState);
    });

    test('login and logout should work ', () => {

        const credentialUser = {
            uid: '319231283289371',
            displayName: 'Paola Carvallo'
        };

        const loginAction = login( credentialUser.uid, credentialUser.displayName );

        expect( loginAction ).toEqual({
            type: types.login,
            payload: credentialUser
        });

        const logoutAction = logout();

        expect( logoutAction.type ).toBe(types.logout);
    });

    test('should make the startLogout', async () => {
        
        await store.dispatch( startLogout( ) );

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.logout
        });

        expect( actions[1] ).toEqual({
            type: types.notesLogoutCleaning
        });
    });

    test('should init the startLoginEmailPassword', async () => {
        const credentialUser = {
            email: 'test1@test.com',
            password: '123456'
        };
        
        await store.dispatch( startLoginEmailPassword( credentialUser.email, credentialUser.password ) );

        const actions = store.getActions();

        expect( actions[0].type ).toBe( types.uiStartLoading );

        expect( actions[1].type ).toBe( types.login );

        expect( actions[1].payload ).toMatchObject({
            uid: expect.any(String),
            displayName: null
        });

        expect( actions[2].type ).toBe( types.uiFinishLoading );
    });
});