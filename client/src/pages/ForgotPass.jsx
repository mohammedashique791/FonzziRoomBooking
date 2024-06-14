import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ForgotPass(){
    const navigate = useNavigate();
    const [username, setusername] = useState('');
    const [secret, setsecret] = useState('');
    const resetSuccess = () => toast('Secret Code Validation is Successful');
    async function validateReset(){
        if(username.length > 0 && secret.length > 0){
        const {data} = await axios.post(`/password/reset`, {username, secret});
        if(data === null){
            alert(`No matches found for ${username} and ${secret}.`);
        }
        else{
            resetSuccess();
            navigate('/pass/resetting', {state: {data}});
        }
       }
    }
    return(
        <div>
            <h1 className="text-center text-3xl">Password Reset</h1>
            <div className="max-w-lg mx-auto mt-5">
            <input value={username} onChange={(ev)=> setusername(ev.target.value)} type="text" placeholder="username"/>
            <input value={secret} onChange={(ev)=> setsecret(ev.target.value)} type="text" placeholder="secret"/>
            <div className="flex justify-center">
            <button onClick={validateReset} className="border p-3 rounded-xl bg-primary text-white mt-5 justify-center">Password Reset</button>
            </div>
            </div>

        </div>
    )
};