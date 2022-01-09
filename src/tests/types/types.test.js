import { types } from '../../types/types';


describe('Test in types', () => {
    test('types should content the actions', () => {

        expect(types).toEqual({
            //login
            login: '[Auth] Login',
            logout: '[Auth] Logout',
        
            //errors ui
            uiSetError: '[UI] Set Error',
            uiRemoveError: '[UI] Remove Error',
        
            //loading
            uiStartLoading: '[UI] Start Loading',
            uiFinishLoading: '[UI] Finish Loading',
        
            //notes
            notesAddNew: '[Notes] New Note',
            notesActive: '[Notes] Set Active Note',
            notesLoad: '[Notes] Load Notes',
            notesUpdated: '[Notes] Updated Note',
            notesFileUrl: '[Notes] Updated image Url',
            notesDelete: '[Notes] Delete Note',
            notesLogoutCleaning: '[Notes] Logout Cleaning',
        });
    }); 
});
