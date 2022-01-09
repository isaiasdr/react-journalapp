import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';

import { removeError, setError } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';
import { MIN_PASSWORD_LENGTH } from '../../constants/constants';


export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const { msgError } = useSelector( state => state.ui );

    const [ formValues, handleInputChange ] = useForm({
        /* name: 'Isaias Dominguez',
        email: 'test1@gmail.com',
        password: '123456',
        password2: '123456' */
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const {name,  email, password, password2} = formValues;

    const handleRegister = (e) => {
        e.preventDefault();
        
        if( isFormValid() )
            dispatch( startRegisterWithEmailPasswordName(email, password, name) );
    }

    const isFormValid = () => {

        if( validator.isEmpty(name) ) {
            dispatch( setError('El nombre es obligatorio') );
            return false;
        }
        
        else if( !validator.isEmail(email) ) {
            dispatch( setError('El email es inválido') );
            return false;
        }

        else if ( !validator.equals(password, password2) || password.length < MIN_PASSWORD_LENGTH) {
            dispatch( setError(`Las contraseñas no coinciden o son menores de ${MIN_PASSWORD_LENGTH} caracteres`) );
            return false;
        }

        dispatch( removeError() );
        return true;
    }

    return (
        <>
            <h3 className='auth__title'>Register</h3>

            <form 
                onSubmit={ handleRegister }
                className='animate__animated animate__fadeIn animate__faster'
            >

                { msgError && <div className='auth__alert-error'>{ msgError }</div> }

                <input
                    type="text"
                    placeholder="Name"
                    name='name'
                    className='auth__input'
                    autoComplete='off'
                    value={ name }
                    onChange={ handleInputChange }
                />

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

                <input
                    type="password"
                    placeholder="Confirm Password"
                    name='password2'
                    className='auth__input'
                    value={ password2 }
                    onChange={ handleInputChange }
                />

                <button
                    type="submit"
                    className='btn btn-primary btn-block mb-5'
                >
                    Register
                </button>

                <Link
                    className='link'
                    to="/auth/login"
                >
                    Already have an account?
                </Link>
            </form>
        </>
    )
}
