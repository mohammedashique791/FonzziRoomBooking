import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import axios from "axios";
export default function Profilenavigations() {
    
    const [user, setUser] = useState('');
    
    useEffect(()=>{
        if(!user){
            const {data} = axios.get('/profile').then(({data})=>{
            setUser(data);
         })}
    }, []);
    

    return (
        <div className="mb-20">
            <div className="mt-16 mx-4">
            <Link to={`/userProfile/${user._id}`} className="border p-3 bg-primary text-white rounded-xl">Go Back</Link>
            </div>
            <h1 className="text-3xl font-semibold text-center mb-10 mt-28">Account</h1>
            <div className="flex justify-center mb-10">
                <br></br>
                <h3><b>{user.username}</b>, {user.email}. <Link to={'/account/profile'} className="underline"><b>Go to profile</b></Link></h3>
            </div>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-20">
                <div className="border w-1/5 py-8 px-5 flex flex-col gap-4 font-semibold text-md rounded-xl">
                    <Link to={'/account/profile/navigations/profileInfo'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                        </svg>
                    </Link>
                    <p>Personal Info</p>
                </div>
                <div className="border w-1/5 py-8 px-5 flex flex-col gap-4 font-semibold text-md rounded-xl">
                    <Link to={'/account/profile/navigations/loginandSecurity'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                        </svg>
                    </Link>
                    <p>Login & Security</p>
                </div>
                <div className="border w-1/5 py-8 px-5 flex flex-col gap-4 font-semibold text-md rounded-xl">
                    <Link to={'/about'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                        </svg>
                    </Link>

                    <p>About</p>
                </div>
            </div>
            <div className="mt-auto h-full text-center">
                <p className="text-sm">Need to deactivate your account</p>
                <Link to={'/account/profile/navigations/loginandSecurity'} className="text-sm underline">Deactivate your Account</Link>
            </div>
        </div>
    )
};