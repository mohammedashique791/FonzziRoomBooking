import { useContext, useEffect, useState } from "react"
import { UserContext } from "./userContext"
import axios from "axios";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
export default function Profile({ logout }) {
    const { pictures } = useContext(UserContext);
    const { user } = useContext(UserContext);
    const [data, setData] = useState('');
    const [place, setPlace] = useState('');
    const location = useLocation();
    useEffect(() => {
        async function fetchPlace() {
            try {
                const { data } = await axios.get('/myPlaces');
                setPlace(data);
            }
            catch (err) {
                console.log('error while fetching place details');
            }
        };
        fetchPlace();
    }, []);

    useEffect(() => {
        async function fetchUserDetails() {
            try {
                const { data } = await axios.get(`/user/details/${user._id}`);
                setData(data);
            }
            catch (e) {
                console.log(e);
            }
        };
        fetchUserDetails();
    }, []);



    // <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    //                     <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    //                 </svg>

    return (
        <div className="gap-15 w-5/6">
            <div>
                <h1 className="text-xl font-semibold mx-8">Added to Your Favourites</h1>
                <div>
                    <div className="items-center">

                    </div>
                    {data.favourites && data.favourites.length === 0 && <p className="mx-20 mt-10">You haven't added anything to favourites.</p>}
                    <div className="mt-10 mx-10 w-full border border-red-200 rounded-xl">
                    {data.favourites && (
                        data.favourites.map((book) => (
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
                    </div>
                </div>
            </div>
        </div >
    )
}


