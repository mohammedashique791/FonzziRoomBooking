import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "./userContext";
import { Link } from "react-router-dom";

export default function User() {
    const { id } = useParams();
    const [redirect, setredirect] = useState(false);
    const navigate = useNavigate();
    const [posts, setPosts] = useState('');
    const { pictures, user } = useContext(UserContext);
    let MagicNumber = Math.floor(Math.random() * pictures.length) + 1;


    useEffect(()=>{
        if(!user){
            setredirect(true);
        }
    });


    useEffect(() => {
        async function fetchMyPosts() {
            try {
                const { data } = await axios.get(`/fetch/myPosts/${user._id}`);
                setPosts(data);
            }
            catch (e) {
                console.log('Something went wrong', e);
            };
        };
        fetchMyPosts();
    }, []);


    if(redirect){
        return <Navigate to={'/'}/>
    }

    return (
        <>
        {user && (
        <div className="mt-10">
            <Link className="border p-2 bg-primary text-white rounded-xl mx-10" to={'/'}>Go Back</Link>
            <div className="grid grid-cols-1 2xl:grid-cols-2 mx-20">
                <div className="mt-8 flex flex-cols gap-10 lg:translate-x-20 mb-20 xl:translate-x-40 2xl:translate-x-0 xl:translate-y-16 2xl:traslate-y-0">
                    <div className="flex gap-64 2xl:mx-20 sm:mx-64  font-semibold">
                        <div className="hidden">
                            {MagicNumber = Math.floor(Math.random() * pictures.length) + 1};
                        </div>
                        <div>
                            <div className="border px-20 lg:px-36 py-8 rounded-xl shadow shadow-md">
                                <div className="relative">
                                    <img className="rounded-full aspect-square object-cover max-w-[220px]" src={user && user.profilepic ? 'http://localhost:3000/uploads/' + user.profilepic : pictures[4]} alt="" />
                                    <div className="absolute bottom-5 -right-2">
                                        <Link to={'/'}>

                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-white bg-green-500 rounded-3xl">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                                            </svg>
                                        </Link>

                                    </div>
                                </div>
                                <div>
                                    <h1 className="mt-5 text-center text-3xl font-bold">{user && user.username.toUpperCase()}</h1>
                                    <h3>{user.email}</h3>
                                </div>
                            </div>
                            <div className="mt-5 border p-8 rounded-2xl shadow shadow-md text-primary">
                                <Link to={'/account/profile/navigations'}>
                                <h1>Profile Navigations</h1>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="w-full px-4 py-3 mt-7">
                    <h1 className="text-3xl font-bold">About {user.username.toUpperCase()}</h1>
                    <h2 className="mt-4 mb-4 font-semibold">Bio</h2>
                    <h4>i am a discreet person,  and warm . I am well organized and tidy,
                        i like to spend evenings with friends, on weekends I like to go out to lunch or dinner, alone or accompanied.</h4>
                    <div className="mt-12 mb-12">
                        <hr />
                    </div>
                    <div className="mt-4">
                        <h1 className="font-semibold text-xl">Guests some saying about {user.username.toUpperCase()}</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-6 mb-2 text-gray-600">
                            <div className="border p-5 rounded-2xl mb-5">
                                <p className="mb-3">“...Instructions were very clear and easy to checkin. Entire place was very clean and tidy. There was only 1 thing I missed in description that host also resides in same house.”</p>
                                <div className="flex items-center gap-6 mt-auto">
                                    <img src={pictures[3]} className="w-16 h-16 object-cover rounded-full mt-7 " alt="" />
                                    <div className="mt-3">
                                        <p className="font-semibold">Fonzzi</p>
                                        <p>October 2023</p>
                                    </div>
                                </div>
                            </div>
                            <div className="border p-5 rounded-2xl mb-5">
                                <p>“...He was very considerate, he didn’t mind opening the door for me in the middle of the night.”</p>
                                <div className="flex items-center gap-6 md:h-full mt-8 md:mt-auto">
                                    <img src={pictures[0]} className="w-16 h-16 object-cover rounded-full mt-2 " alt="" />
                                    <div className="mt-4">
                                        <p className="font-semibold">Samad</p>
                                        <p>November 2023</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-12 mb-12">
                            <hr />
                        </div>
                        <div className="text-xl font-semibold mb-10">
                            <h1 className="mb-10">My Listings</h1>
                            <div className="flex items-center gap-5">
                                {posts && posts.map((item, idx) => (
                                    <div className="w-full h-full">
                                        <button>
                                        <img className="rounded-2xl" src={'http://localhost:3000/uploads/' + item.photos[idx]} alt="" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>



        </div>
    )}
    </>
    )
}