import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import React from 'react';
import { UserContext } from "./userContext";
import { useForm } from "react-hook-form";

export default function Register() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const { setUser } = useContext(UserContext);
    const [password, setPassword] = useState('');
    const [secret, setSecret] = useState('');
    const [success, setSuccess] = useState(false);
    const notify = () => toast("Registration Successful!");
    const failure = () => toast("Registration Failed!!");
    const [fonzziVariable, setFonzziVariable] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    async function registerUser() {
        try {
            const { data } = await toast.promise(axios.post('http://localhost:3000/register', {
                username,
                email,
                password,
                secret
            }), {
            });
            notify();
            setUser(data);
            setSuccess(true);
        }
        catch (e) {
            failure();
        }
    };


    if (success) {
        return <Navigate to={'/'} />
    }
    return (
        <div className="mt-16">
            <h1 className="text-4xl text-center my-10">Register</h1>
            <form onSubmit={handleSubmit(registerUser)} className="max-w-md mx-auto mt-5">
                <input value={email} {...register('email', { required: true })} onChange={evt => setEmail(evt.target.value)}
                    type="email" id='email' placeholder="fonzzi@gmail.com" />
                {errors.email && <p className="text-red-500 ml-3">Your Email is Required.</p>}
                <input value={username} {...register('username', { required: true })} onChange={evt => setUsername(evt.target.value)}
                    type="text" id='username' placeholder="username" />
                {errors.username && <p className="text-red-500 ml-3">Your Username is Required.</p>}
                <div className="relative">
                    <input value={password} {...register('password', { pattern: /(?=.*[@])(?=.*[$])(?=.*[a-zA-Z0-9@$]{8,})/ })} onChange={evt => setPassword(evt.target.value)}
                        type={fonzziVariable ? 'text' : 'password'} id='password' placeholder="password" required/>

                    <a onClick={() => setFonzziVariable(!fonzziVariable)} className="absolute bottom-4 right-4 cursor-pointer">
                        {fonzziVariable ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                            <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                        </svg>
                            : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                                <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                                <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                            </svg>

                        }

                    </a>

                </div>
                <div>
                    <input value={secret} onChange={(ev)=> setSecret(ev.target.value)} type="text" placeholder="secret"/>
                </div>
                <p className="text-xs mt-2 mx-2"><span className="text-primary">*</span>This secret is used to reset your password if lost or forgotten.</p>
                {errors.password && <p className="text-red-500 ml-3">Password should contain atleast 8 characters and should contain atleast one '@' and one '$'.</p>}
                <button className="bg-primary border border-gray-400 rounded-full w-full mt-4 text-white">
                    Register</button>
                <div className="text-center py-2">Already a user? <Link className="underline text-black" to={'/login'}>Login Now</Link></div>
            </form>
        </div>
    )
}