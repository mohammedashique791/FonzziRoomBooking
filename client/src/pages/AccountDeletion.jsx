import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from "./userContext";
import { useContext } from "react";

export default function AccountDeletion() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);
    const removedAccount = () => toast('All files associated with this account is been removed');
    const loginAlert = () => toast(`You cant' deactivate a account without logging in`);
    async function LogOut() {
        try {
            await axios.post('/logout')
        } catch (e) {
            console.log('Oh error while logging out');
        }
    }


    async function checkAuthentication() {
        if (user) {
            const { data } = await axios.post('/password/validation', { password, user });
            if (data === true) {
                const { data } = await axios.post('/account/remove', {user});
                LogOut();
                removedAccount();
                navigate('/login');
            }
            else {
                alert('Incorrect Password');
            }
        } else {
            loginAlert();
            return navigate('/');
        }
    }



    return (
        <div className="mb-10">
            <Link to={'/account/profile/navigations/loginandSecurity'} className="border p-3 bg-primary text-white rounded-xl mx-8 -mt-5">Go Back</Link>
            <h1 className="text-center text-xl mb-8">Enter your current Password</h1>
            <div className="max-w-md mx-auto relative mb-10">
                <input value={password} onChange={(ev) => setPassword(ev.target.value)} type={visible ? 'text' : 'password'} />
                <button onClick={() => setVisible(!visible)}>
                    {visible ?
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute bottom-4 right-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute bottom-4 right-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                    }
                </button>
            </div>
            <div className="flex gap-6 justify-center">
                <p className="text-center text-xs max-w-md"><span className="text-primary">*</span>As you click the deactivate button, everything associated with your account including your personal details will be gone forever and can't be retrieved.</p>
                <button onClick={checkAuthentication} className="border p-3 bg-sixth rounded-xl text-white">Deactivate</button>
            </div>

        </div>
    )
};