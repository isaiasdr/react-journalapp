import { finishLoading, removeError, setError, startLoading } from '../../actions/ui';
import { types } from '../../types/types';


describe('Tests in ui actions', () => {
    test('the setError action should work', () => {
        const action = setError('Error');

        expect( action ).toEqual({
            type: types.uiSetError,
            payload: 'Error'
        }); 
    });

    test('the removeError action should work', () => {
        const action = removeError();

        expect( action ).toEqual({
            type: types.uiRemoveError
        });
    });
    
    test('the startLoading action should work', () => {
        const action = startLoading();

        expect( action ).toEqual({
            type: types.uiStartLoading
        });
    });
    
    test('the finishLoading action should work', () => {
        const action = finishLoading();

        expect( action ).toEqual({
            type: types.uiFinishLoading
        });
    });
});
