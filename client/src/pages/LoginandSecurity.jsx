import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "./userContext";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
export default function LoginSecurity() {
    const navigate = useNavigate();
    const [isOpen, setisOpen] = useState(false);
    const [visible, setVisible] = useState(false);
    const [currPass, setCurrPass] = useState('');
    const [showcurpass, setshowcurpass] = useState(false);
    const [newPass, setnewPass] = useState('');
    const [shownewpass, setshownewpass] = useState(false);
    const [confirmPass, setConfirmPass] = useState('');
    const [showconfirmpass, setshowconfirmpass] = useState(false);
    const [User, setUser] = useState('');
    const [failure, setFailure] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { user } = useContext(UserContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const newLogin = () => toast('Your Password changed successfully, Please Login with your new password');
    const glLogout = () => toast('Successfully Logged out of your google Account');
    const login = () => toast('Login is required');
    function classDecider() {
        let classes = 'flex flex-col sm:flex-row justify-between items-center mt-5';
        if (!visible) {
            classes = 'flex flex-col sm:flex-row justify-between items-center mt-8 border-b'
        }
        return classes;
    }
    useEffect(()=>{
        if(!user){
           axios.get('/profile').then(({data})=>{
           setUser(data);
        })
    }else{
        setUser(user);
    }
}, []);

    if(!user){
        login();
        return navigate('/login');
    }

    async function GoogleLogOut() {
        try {
            await axios.post('/logout');
            setRedirect(true);
        } catch (e) {
            console.log('Oh error while logging out');
        }
    };
    function togglePopup(){
        setisOpen(!isOpen);
    }


    

    async function handleSubmits() {
        if (newPass === confirmPass) {
            const { data } = await axios.post(`/password/change/${user._id}`, { currPass, newPass });
            if (newPass === confirmPass && data === false) {
                alert('Invalid Current Password');
            }
            else {
                newLogin();
                navigate('/login');
            }
        }
        else {
            alert('New and Confirm Password doesnt match')
            setnewPass('');
            setConfirmPass('');
        }
    }

    if (redirect) {
        glLogout();
        return navigate('/login');
    }

    

    function getTimeSinceUpdate(lastUpdate) {
        const now = new Date();
        const updateDate = new Date(lastUpdate);
        const timeDifference = now - updateDate;
        const secondsDifference = Math.floor(timeDifference / 1000);
        const minutesDifference = Math.floor(secondsDifference / 60);
        const hoursDifference = Math.floor(minutesDifference / 60);
        const daysDifference = Math.floor(hoursDifference / 24);
        const monthsDifference = Math.floor(daysDifference / 30);
      
        if (monthsDifference >= 1) {
          return `${monthsDifference} month${monthsDifference > 1 ? 's' : ''} ago`;
        } else if (daysDifference >= 2) {
          return `${daysDifference} days ago`;
        } else if (daysDifference === 1) {
          return `1 day ago`;
        } else if(minutesDifference <=5){
          return `Less than 5 minutes ago`;
        }
        else if(minutesDifference <=10){
            return `10 minutes ago`
        }
        else if(minutesDifference <=30){
            return `30 minutes ago`
        }
        else if(minutesDifference <=45){
            return `45 minutes ago`
        }
        else if(hoursDifference < 5){
            return `1 hour ago`
        }
        else if(hoursDifference === 5){
            return `5 hour ago`
        }
        else{
            return `Less than a day ago`
        }
      };



    return (
        <div className="px-20 xl:mx-48 mb-14">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-20">
                <div className="p-10 w-full">
                    <h1><Link to={'/account/profile/navigations'}>Account</Link> &gt; <b>Login & Security</b></h1>
                    <h1 className="text-2xl font-bold mt-4 min-w-2/3">Login & Security</h1>
                    <div className={classDecider()}>
                        <p className="font-md mb-4">Password</p>
                        <button onClick={() => setVisible(!visible)}><p className="hover:underline text-green-600 font-semibold mb-4">{visible ? 'Cancel' : 'Update'}</p></button>
                    </div>
                    <p className={visible ? 'hidden' : 'block mt-3'}>Password changed <b>{getTimeSinceUpdate(User.updatedAt)}</b></p>
                    {visible && (
                        <form onSubmit={handleSubmit(handleSubmits)}>
                            <p>Current Password</p>
                            <div className="border mt-4 relative">
                                <input type={showcurpass ? 'text' : 'password'} value={currPass} onChange={(ev) => setCurrPass(ev.target.value)} className="border-none outline-none" />
                                <Link onClick={() => setshowcurpass(!showcurpass)}>{showcurpass ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute right-5 bottom-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute right-5 bottom-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                </svg>
                                }
                                </Link>

                            </div>
                            <p className="mt-4">New Password</p>
                            <div className="border mt-4 relative">
                                <input type={shownewpass ? 'text' : 'password'} name='newpass' value={newPass} {...register('newpass', { pattern: /(?=.*[@])(?=.*[$])(?=.*[a-zA-Z0-9@$]{8,})/ })} onChange={(ev) => setnewPass(ev.target.value)} className="border-none outline-none" />
                                <Link onClick={() => setshownewpass(!shownewpass)}>{shownewpass ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute right-5 bottom-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute right-5 bottom-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                </svg>
                                }
                                </Link>
                            </div>
                            {errors.newpass && <p className="text-red-500 mt-5">Password should contain atleast 8 characters and should contain atleast one '@' and one '$'.</p>}
                            <p className="mt-4">Confirm Password</p>
                            <div className="border mt-4 relative">
                                <input type={showconfirmpass ? 'text' : 'password'} value={confirmPass} onChange={(ev) => setConfirmPass(ev.target.value)} className="border-none outline-none" />
                                <Link onClick={() => setshowconfirmpass(!showconfirmpass)}>{showconfirmpass ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute right-5 bottom-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute right-5 bottom-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                </svg>
                                }
                                </Link>
                            </div>
                            <button className="mt-5 border p-4 rounded-lg bg-newest text-white"><b>Update Password</b></button>
                        </form>
                    )}
                    <div className="mt-10">
                        <h1 className="text-xl font-semibold">Social Accounts</h1>
                        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 border-b">
                            <div>
                                <p className="font-md mb-4">Google</p>
                                <p className="-mt-2 text-gray-500">Connected</p>
                            </div>
                            <button onClick={GoogleLogOut}><p className="hover:underline text-green-600 font-semibold mb-4">Disconnect</p></button>
                        </div>
                    </div>

                </div>
                <div className="border hidden xl:block p-5 rounded-xl w-[300px] h-[400px] mt-10">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mt-6 text-primary mb-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                    </svg>

                    <h1 className="text-lg font-semibold">Lets' make your account more secure</h1>
                    <p className="mt-6 text-gray-500">We’re always working on ways to increase safety in our community. Regular updation of password facilitate to the overall safety of your account.</p>
                </div>
            </div>
            <div className="mt-10 xl:w-4/6">
                <h1 className="text-xl font-semibold">Account</h1>
                <div className="w-full flex flex-col sm:flex-row justify-between mt-4">
                    <p className="mt-1">Deactivate Your Account</p>
                    <button onClick={togglePopup} className="hover:underline text-red-600 font-semibold mb-4"><p>Deactivate Account</p></button>
                    {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <div className='relative sticky top-0'>
                            <button onClick={togglePopup} className="absolute -top-1 right-2 text-gray-600 hover:text-gray-800">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        {/* Your comment content goes here */}
                        <div className="mt-4">
                            <h1 className='text-lg font-medium text-yellow-400 mb-6'>Warning</h1>
                            {/* Display comments */}
                            <p className='mb-5'>Are You Sure You want to Delete your Account? Every data including your personal details will be Deleted.</p>
                            <div className='flex justify-between p-2'>
                                <Link to={'/account/deactivation'}  className='border bg-primary p-2 px-4 text-white rounded-xl'>Yes</Link>
                                <button onClick={togglePopup} className='border bg-green-300 p-2 px-4 text-white rounded-xl mx-5'>No</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
                </div>
            </div>
        </div>
    )
}