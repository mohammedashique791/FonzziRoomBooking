import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Resetting() {
    const location = useLocation();
    const navigate = useNavigate();
    const [newPass, setnewPass] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [confirmPass, setConfirmPass] = useState('');
    const [visible1, setvisible1] = useState(false);
    const [visible2, setvisible2] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const DetailsNotFound = () => toast('Network Error, Try Again');
    const passwordReset = () => toast('Your Password updated successfully');

    if(location.state === null){
        DetailsNotFound();
        return navigate('/forgotPass');
    }
    
    async function handleForm() {
        if(newPass.length > 0 && confirmPass.length > 0){
        if (newPass === confirmPass) {
            const { data } = await axios.post(`/password/reset/validate/${location.state.data._id}`, {newPass});
            if(data === null){
                alert(`You can't change your password to previous password. Try a different Password.`);
            }
            else{
            setRedirect(true);
            }
        }
        else {
            alert('New and Confirm Password doesnt match')
            setnewPass('');
            setConfirmPass('');
        }
    }
    }

    if(redirect){
        passwordReset();
        return navigate('/login');
    }
    return (
        <div className="mb-20">
            <form onSubmit={handleSubmit(handleForm)}>
            <div className="max-w-lg mx-auto mt-20">       
                    <div className="relative">
                        <p>New Password</p>
                        <input value={newPass}  {...register('newPass', { pattern: /(?=.*[@])(?=.*[$])(?=.*[a-zA-Z0-9@$]{8,})/ })} onChange={(ev) => setnewPass(ev.target.value)} type={visible1 ? 'text' : 'password'} />
                        {visible1 ? <button onClick={() => setvisible1(!visible1)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute bottom-4 right-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg></button>
                            : <button onClick={() => setvisible1(!visible1)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute bottom-4 right-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                            </svg></button>
                        }
                    </div>
                    {errors.newPass && <p className="text-red-500 ml-3 text-sm">Password should contain atleast 8 characters and should contain atleast one '@' and one '$'.</p>}
                    <div className="mt-4 relative">
                        <p>Confirm New Password</p>
                        <input value={confirmPass} {...register('confirmPass', { pattern: /(?=.*[@])(?=.*[$])(?=.*[a-zA-Z0-9@$]{8,})/ })} onChange={(ev) => setConfirmPass(ev.target.value)} type={visible2 ? 'text' : 'password'} />
                        {visible2 ? <button onClick={() => setvisible2(!visible2)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute bottom-4 right-6">
                            <path strokeLinbutton="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg></button>
                            : <button onClick={() => setvisible2(!visible2)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute bottom-4 right-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                            </svg></button>
                        }
                    </div>
                    {errors.confirmPass && <p className="text-red-500 ml-3 text-sm">Password should contain atleast 8 characters and should contain atleast one '@' and one '$'.</p>}    
            </div>
            <div className="flex justify-center mt-5">
                <button onClick={handleForm} className="border p-3 text-white bg-sixth rounded-xl">Update Password</button>
            </div>
            </form>
            <div className="mt-5 flex justify-center">
                <p className="text-gray-500 text-xs"><span className="text-primary">*</span>You will be redirected back to the login page after successful password resetting.</p>
            </div>
        </div>
    )
};