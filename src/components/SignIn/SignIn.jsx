import React, { useEffect, useState } from 'react'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../Firebase/config';

const SignIn = () => {

    const [value, setValue] = useState("");

    const handleClick = () => {
        signInWithPopup(auth, provider).then(data => {
            setValue(data.user.email);
            localStorage.setItem("email", data.user.email)
        });
    }
    console.log(value);

    useEffect(() => {
        setValue(localStorage.getItem("email"));
    }, [])

    return (
        <span
            onClick={handleClick}
            className="hover:text-indigo-300 text-indigo-500 font-bold transition duration-200 hover:underline bg-transparent cursor-pointer "
        >
            Sign In
        </span>
    )
}

export default SignIn
