import axios from "axios";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "./userContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MyPosts() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { user } = useContext(UserContext);
    const loginAlert = () => toast('You Must be Logged in First');


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

    return (
        <div>
            <div className="mt-1 mb-12 mx-5">
                <Link className="border bg-primary text-white p-3 rounded-3xl" to={'/'}>Go to Home</Link>
            </div>
            <h1 className="text-lg font-semibold mx-8">Posted By Me</h1>
            <div className={`mt-8 ${posts.length > 0 ? 'border rounded-xl' : ' '} px-3`}>
                {posts && posts.length > 0 && (
                    posts.map((book) => (
                        <div className="2xl:w-full px-5 py-8">
                            <div className="flex flex-col lg:flex-row lg:gap-20 gap-8 mx-20 2xl:w-full xl:w-4/5 lg:w-3/5 ">
                                <img className="w-60 h-60 rounded-2xl object-cover mt-2 rounded-xl" src={'http://localhost:3000/uploads/' + book.photos[0]} alt="" />
                                <div className="rounded-xl p-1">
                                    <div className="mt-2">
                                        <h1 className="text-xl font-semibold">{book.title}</h1>
                                        <div className="text-sm mt-3">
                                            <p>{book.description.substring(0, 100) + '  ......'}</p>


                                        </div>
                                    </div>
                                    <div>
                                        <p>Booked Price: <b>₹{book.price}</b></p>
                                    </div>
                                    <div className="mt-8 -ml-1 hidden 2xl:block">
                                        <Link to={`/places/${book._id}`} className="border px-5 py-2 hover:-translate-y-1 rounded-full bg-primary hover:bg-black text-white mb-6">View {book.title}</Link>
                                    </div>
                                    <div className="mt-8 -ml-1 block 2xl:hidden">
                                        <Link to={`/places/${book._id}`} className="border px-5 py-2 hover:-translate-y-1 rounded-full bg-primary hover:bg-black text-white mb-6">View</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
                <div className="mx-48 flex justify-between items-center">
                    {posts.length === 0 && <p>You haven't Posted Anything yet. If you want to post, Just click on the <b>button</b> to add your Accomodation and start earning.</p>}
                    {posts.length === 0 && (
                        <Link to={'/account/accomodations/addplace'} className="flex gap-3 border bg-primary p-3 rounded-3xl text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        <p>Add a Place</p>
                    </Link>
                    )}
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}