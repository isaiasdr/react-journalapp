import Swal from 'sweetalert2';
import { getAuth, signInWithPopup, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from "firebase/auth";

import { googleAuthProvider } from "../firebase/firebase-config";
import { types } from "../types/types"
import { startLoading, finishLoading } from "./ui";
import { noteLogout } from './notes';

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        dispatch( startLoading() );

        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, password)
            .then( ({user}) => {
                dispatch( login(user.uid, user.displayName) );
                dispatch( finishLoading() );
            })
            .catch( (e) => {
                //console.log(e);
                dispatch( finishLoading() );
                Swal.fire({
                    title: 'Error',
                    text: e.message,
                    icon: 'error'
                });
            });
    }
};

export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {
        dispatch( startLoading() );
        const auth = getAuth();

        createUserWithEmailAndPassword(auth, email, password)
            .then( async ({user}) => {
                await updateProfile(auth.currentUser, { displayName: name });

                dispatch( login(user.uid, user.displayName) );
                dispatch( finishLoading() );
            })
            .catch( (e) => {
                //console.log(e);
                dispatch( finishLoading() );
                Swal.fire({
                    title: 'Error',
                    text: e.message,
                    icon: 'error'
                });
            });
    }
};

export const startGoogleLogin = () => {
    return (dispatch) => {
        const auth = getAuth();

        signInWithPopup(auth, googleAuthProvider)
            .then( ({user}) => {
                dispatch( login(user.uid, user.displayName) );
            });
    }
}

export const startLogout = () => {
    return async (dispatch) => {
        const auth = getAuth();

        await signOut(auth)
            .then( dispatch( logout() ) );

        dispatch( noteLogout() );
    }
}

export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
});

export const logout = () => ({
    type: types.logout
});