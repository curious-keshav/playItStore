import React, { useEffect, useState } from 'react';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from '../Firebase/config';

const SignIn = () => {
    const [email, setEmail] = useState(null);

    // Check localStorage for email on component mount
    useEffect(() => {
        const storedEmail = localStorage.getItem("email");
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);

    // Sign in with Google
    const handleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const userEmail = result.user.email;
            setEmail(userEmail);
            localStorage.setItem("email", userEmail);
        } catch (error) {
            console.error("Sign in error:", error);
        }
    };

    // Sign out
    const handleSignOut = async () => {
        try {
            await signOut(auth);
            setEmail(null);
            localStorage.removeItem("email");
        } catch (error) {
            console.error("Sign out error:", error);
        }
    };

    return (
        <span
            onClick={email ? handleSignOut : handleSignIn}
            className="hover:text-indigo-300 text-indigo-500 font-bold transition duration-200 hover:underline bg-transparent cursor-pointer"
        >
            {email ? 'Sign Out' : 'Sign In'}
        </span>
    );
};

export default SignIn;
