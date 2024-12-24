import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';

import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createNewUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const userLogin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    const updateUserProfile = updatedData => {
        return updateProfile(auth.currentUser, updatedData);
    };

    const authInfo = {
        user,
        setUser,
        createNewUser,
        userLogin,
        logOut,
        loading,
        updateUserProfile,
        auth
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async currentUser => {
            setUser(currentUser);

            if (currentUser?.email) {
                await axios.post(
                    `${import.meta.env.VITE_API_URL}/jwt`,
                    {
                        email: currentUser?.email
                    },
                    { withCredentials: true }
                );
            } else {
                await axios.get(`${import.meta.env.VITE_API_URL}/logout`, { withCredentials: true });
            }
            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
