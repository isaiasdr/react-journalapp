import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { 
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';

import { login } from '../actions/auth';
import { startLoadingNotes } from '../actions/notes';
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const auth = getAuth();

    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user?.uid) {
                dispatch( login(user.uid, user.displayName) );
                setIsLoggedIn( true );

                dispatch( startLoadingNotes( user.uid ) );
            }

            else 
                setIsLoggedIn( false );

            setChecking(false);

        });
    }, [setChecking, setIsLoggedIn]);
    
    if (checking) {
        return (
            <div>Wait...</div>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        isLoggedIn={ isLoggedIn }
                        path="/auth"
                        component={ AuthRouter }
                    />
                    
                    <PrivateRoute 
                        exact
                        isLoggedIn={ isLoggedIn } 
                        path="/"
                        component={ JournalScreen }
                    />

                    <Route exact path="/" component={ JournalScreen } />

                    <Redirect to='/auth/login' />
                </Switch>
            </div>
        </Router>
    )
}
