import Swal from 'sweetalert2';

import { types } from "../types/types"


export const setError = ( err ) => {
    Swal.fire({
        title: 'Error',
        text: err,
        icon: 'error'
    });

    return {
        type: types.uiSetError,
        payload: err
    }
};

export const removeError = () => ({
    type: types.uiRemoveError
});

export const startLoading = () => ({
    type: types.uiStartLoading
});

export const finishLoading = () => ({
    type: types.uiFinishLoading
});