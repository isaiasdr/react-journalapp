import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';

import { startLoginEmailPassword, startGoogleLogin } from '../../actions/auth';
import { setError, removeError } from '../../actions/ui';
import { MIN_PASSWORD_LENGTH } from '../../constants/constants';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {

    const dispatch = useDispatch();
    const { isLoading } = useSelector( state => state.ui );

    const [ formValues, handleInputChange ] = useForm({
        /* email: 'test1@gmail.com',
        password: '123456' */
        email: '',
        password: ''
    });

    const {email, password} = formValues;

    const handleLogin = (e) => {
        e.preventDefault();

        if( isFormValid() )
            dispatch( startLoginEmailPassword(email, password) );
    };

    const isFormValid = () => {
        if ( validator.isEmpty(email) ) {
            dispatch( setError('El email es obligatorio') );
            return false;
        }

        else if ( !validator.isEmail(email) ) {
            dispatch( setError('El email es inválido') );
            return false;
        }

        else if ( validator.isEmpty(password) ) {
            dispatch( setError('La contraseña es obligatoria') );
            return false;
        }

        else if ( password.length < MIN_PASSWORD_LENGTH ) {
            dispatch( setError(`La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres`) );
            return false;
        }

        dispatch( removeError() );
        return true;
    };

    const handleGoogleLogin = () => {
        dispatch( startGoogleLogin() );
    };

    return (
        <>
            <h3 className='auth__title'>Login</h3>

            <form 
                onSubmit={ handleLogin }
                className='animate__animated animate__fadeIn animate__faster'
            >
                <input
                    type="text"
                    placeholder="Email"
                    name='email'
                    className='auth__input'
                    autoComplete='off'
                    value={ email }
                    onChange={ handleInputChange }
                />

                <input
                    type="password"
                    placeholder="Password"
                    name='password'
                    className='auth__input'
                    value={ password }
                    onChange={ handleInputChange }
                />

                <button
                    type="submit"
                    className='btn btn-primary btn-block'
                    disabled={ isLoading }
                >
                    Login
                </button>

                
                <div className='auth__social-networks'>
                    <p>Login with social networks</p>

                    <div 
                        className="google-btn"
                        onClick={ handleGoogleLogin }
                    >
                        <div className="google-icon-wrapper">
                            <img 
                                className="google-icon"
                                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                                alt="google button"
                            />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link
                    className='link'
                    to="/auth/register"
                >
                    Create an account
                </Link>
            </form>
        </>
    )
}
