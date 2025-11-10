// src/provider/AuthProvider.jsx

import React, { createContext, useEffect, useState } from "react";
import {
    getAuth,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
} from "firebase/auth";
import { app } from "../firebase/firebase.config";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Register new user (এই ফাংশনে আপাতত পরিবর্তন না করলেও চলবে, কারণ Login.jsx এটি ব্যবহার করছে না)
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // ⭐ পরিবর্তন #১: Login existing user
    const login = async (email, password) => { // async যোগ করা হলো
        setLoading(true);
        try {
            // লগইন সফল হলে
            await signInWithEmailAndPassword(auth, email, password);
            return { success: true }; // 👈 এই ফরম্যাটে রিটার্ন করবে
        } catch (error) {
            // লগইন ব্যর্থ হলে
            setLoading(false);
            // Friendly error message 
            let message = error.message.replace("Firebase: Error (", "").replace(").", "");
            return { success: false, message: message }; // 👈 এই ফরম্যাটে রিটার্ন করবে
        }
    };

    // ⭐ পরিবর্তন #২: Google login
    const googleProvider = new GoogleAuthProvider();
    const googleLogin = async () => { // async যোগ করা হলো
        setLoading(true);
        try {
            // লগইন সফল হলে
            await signInWithPopup(auth, googleProvider);
            return { success: true }; // 👈 এই ফরম্যাটে রিটার্ন করবে
        } catch (error) {
            // লগইন ব্যর্থ হলে
            setLoading(false);
            return { success: false, message: error.message }; // 👈 এই ফরম্যাটে রিটার্ন করবে
        }
    };

    // Logout
    const logout = () => {
        setLoading(true);
        return signOut(auth);
    };

    // Observe user state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        loading,
        createUser,
        login,
        googleLogin,
        logout,
        updateProfile
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;