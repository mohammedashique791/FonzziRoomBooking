import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from "./userContext";
export default function TheProfile() {
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [isOpen, setisOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const loginAlert = () => toast('Preferred Name set successfully, Do a Login');
    const requiredLogin = () => toast('You Must Login First');
    const { pictures, profilepic, setprofilepic, name, setname, confirm, setConfirm } = useContext(UserContext);
    
    const [open, setopen] = useState(false);
    const [track, setTrack] = useState(false);
    const [temppic, setTemppic] = useState('');



    useEffect(() => {
        setIsAnimating(true);
        return () => setIsAnimating(false);
    }, []);

    useEffect(() => {
        async function FetchUser() {
            const { data } = await axios.get('/profile');
            setUser(data);
            setTrack(!track);
        };
        FetchUser();
    }, [confirm]);


    


    useEffect(()=>{
        async function imageLoader(){
            if(user.profilepic){
                setprofilepic(user.profilepic);
            }
        };
        imageLoader();
    }, [track]);


    function togglePopup() {
        setisOpen(!isOpen);
    }

    async function setPreferred() {
        const { data } = await axios.post(`/new/preferred/${user._id}`, { name });
        setConfirm(!confirm);
        setname('');
        setisOpen(!isOpen);
    }



    function changeProfilePic(ev) {
        if(ev.target.files){
        const file = ev.target.files[0];
        const data = new FormData();
        data.append('avatar', file);
        axios.post('/procture', data, {
            headers: { "Content-type": "multipart/form-data" }
        }).then((response) => {
            const { data } = response;
            setTemppic(data);
            setopen(!open)
        }
        )
            .catch(error => {
                console.log('Oh no error', error);
            });
        }

    }

    function togglePopup2() {
        setopen(!open);
    }

    async function handleSubmit() {
        const { data } = await axios.post('/user/profilepic/updation', {temppic, user });
        setprofilepic(data.profilepic);
        setopen(!open);
    }

    

    

    return (
        <div>
            <Link to={'/'} className="p-2 border bg-primary text-white rounded-xl mx-4">Go Back</Link>
            {open && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto z-50">
                    <div className="bg-sixth rounded-xl shadow-lg p-6 w-full max-w-2xl">
                        <div className='relative sticky top-0'>
                            <button onClick={togglePopup2} className="absolute -top-1 right-2 text-gray-600 hover:text-gray-800">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        {/* Your comment content goes here */}
                        <div className="mt-6">
                            <h1 className='text-lg font-medium text-primary mb-8'>Changing Your Profile Picture</h1>
                            {/* Display comments */}
                            <div className="w-full flex justify-center">
                            <img className="rounded-full aspect-square max-w-[300px] object-cover" src={'http://localhost:3000/uploads/' + temppic} alt="" />
                            </div>
                            <p className='mt-10 text-xs mb-5 text-gray-400 mb-8'><span className="text-primary">*</span>Proceed With Profile Pic updation?</p>
                            <div className='flex justify-between'>
                                <button onClick={handleSubmit} className='border bg-primary p-2 px-4 text-white'>Yes</button>
                                <button onClick={togglePopup2} className='border bg-green-300 p-2 px-4 text-white'>No</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="px-16 mb-20">
                <div className="grid grid-cols-[2fr_1fr] gap-20 mt-10 mx-28">
                    <div>
                        <div className="flex gap-10 items-center">
                            <div className="relative border p-2 rounded-full bg-primary text-white">
                                <img className="rounded-full aspect-square object-cover max-w-[220px]" src={user.profilepic ? 'http://localhost:3000/uploads/' + profilepic : pictures[4]} alt="" />
                                <label className="absolute bottom-2 -right-2  cursor-pointer bg-blue-300 mx-3 border-8 border-sixth rounded-full p-3 mt-5">
                                    <input type="file" className="hidden" onChange={changeProfilePic} />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </label>
                            </div>
                            <div >
                                <p className="text-2xl font-semibold mx-8">{user.preferredname ? user.preferredname : user.username}</p>
                                <p className="mt-2 text-lg mx-4">{user.email}</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center mt-16 mx-3">
                            <h1 className="text-xl font-semibold">Preferred Name</h1>
                            <button onClick={togglePopup} className="underline">Edit</button>
                        </div>
                        {user ? <p className="mt-3 mx-3">{user.preferredname ? user.preferredname : user.username}</p> : <p className="mt-3 mx-2">Loading . . .</p>}

                        {isOpen && (
                            <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto z-50 transition-opacity duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'}}`}>
                                <div className={`bg-sixth rounded-lg shadow-lg p-6 w-full max-w-3xl transition-transform duration-300 transform ${isAnimating ? 'scale-100' : 'scale-95'}`}>
                                    <div className='relative sticky top-0'>
                                        <button onClick={togglePopup} className="absolute -top-1 right-2 text-gray-600 hover:text-gray-800 text-primary">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                    {/* Your comment content goes here */}
                                    <div className="mt-4 w-full">
                                        <h1 className='text-lg font-medium text-primary mb-4'>Set Your Preferred Name</h1>
                                        {/* Display comments */}
                                        <div className="mb-6 border rounded-xl bg-white">
                                            <input value={name} onChange={(ev) => setname(ev.target.value)} className="border-none outline-none" type="text" placeholder="Preferred Name" />
                                        </div>
                                        <div className="flex justify-end">
                                            <button onClick={setPreferred} className="border bg-primary px-10 py-2 text-white rounded-xl mx-1">Set</button>
                                        </div>
                                    </div>
                                    <p className="text-gray-400 mx-3 text-xs"><span className="text-primary">*</span>You will be required to do a log in after a successful setting of preferred Name.</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="border rounded-xl p-5 min-h-[400px] max-w-[500px]">
                        <div className="flex gap-4 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-yellow-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" />
                            </svg>
                            <h1 className="text-xl font-semibold">Customize Yourself</h1>
                        </div>
                        <p className="mt-7 mx-5 text-gray-600">You can add preferred name by which the next time the system will call you by your preffered name.</p>
                        <div className="mt-5 border-b border-gray-300"></div>
                        <div className="mt-8 flex gap-4 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                            <h1 className="text-lg font-semibold">Add Profile Image for People to know you.</h1>
                        </div>
                        <p className="mt-7 mx-5 text-gray-600">You Can change your Profile Picture by Tapping the <span className="text-primary text-lg">+</span> button next to your default profile picture and selecting an image of your choice.</p>
                    </div>
                </div>
            </div>
        </div>
    )

}