import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Rating } from '@smastrom/react-rating';
import { UserContext } from './userContext';
import BarRating from './BarRating';

const MyPopup = ({ location, ids }) => {
    const [Open, setIsOpen] = useState(false);
    const { pictures } = useContext(UserContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [result, setResult] = useState('');
    const togglePopup = () => {
        setIsOpen(!Open);
    };
    let randomNo = 0;

    useEffect(() => {
        async function gatherSortedResult() {
            if (searchQuery !== '') {
                const { data } = await axios.get(`/sortedResult/${searchQuery}/${location._id}`);
                setResult(data);
            }
            else {
                setResult('');
            }
        };
        gatherSortedResult();
    }, [searchQuery]);


    async function setLike(id) {
        if (user) {
            const { data } = await axios.post(`/liking/${id}`, {
                user
            });
            setData(data);
            setlikes(data.likes.length);

        } else {
            setRedirect(true);
        }
    }



    function addclass() {
        let classes = ''
        if (location.review.length < 4) {
            classes += 'mx-10 mt-8 max-w-72 overflow-y-auto'
        }
        else {
            classes += 'mx-10 mt-8 max-w-72 fixed'
        }
        return classes
    }
    return (
        <div>
            <div>
                <div>
                    <button onClick={togglePopup} className="hidden md:inline-block text-sm mt-8 border rounded-xl p-4 border-gray-400 mx-28">
                        Show Full Comments
                    </button>
                    {Open && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 overflow-y-auto no-scrollbar z-50">
                            <div className="absolute inset-0"></div>
                            <div className="absolute bg-white rounded-3xl p-6 w-2/3 h-5/6 min-w-md max-h-full p-20 overflow-y-scroll no-scrollbar z-70">
                                <div className='relative sticky top-0'>
                                    <button onClick={togglePopup} className=" top-2 right-2 text-gray-600 hover:text-gray-800">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="mt-4">
                                    <div className="mt-2">
                                        <div className='grid gap-10 grid-cols-1 lg:grid-cols-[1fr_2fr]'>
                                            <div className='overflow-y-auto max-h-full'>
                                                <div className={addclass()}>
                                                    <div className='flex gap-2 items-center mb-20'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                            <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
                                                        </svg>
                                                        <p className='font-semibold'>4.89</p>
                                                    </div>
                                                    <h1 className='text-sm font-semibold text-center'>Guest Favourite</h1>
                                                    <p className='text-center text-sm text-gray-600 mb-10'>One of the most loved homes on Fonzzi based on ratings, reviews and reliability.</p>
                                                    <hr />
                                                    <div className='mt-8'>
                                                        <h1 className='text-sm font-semibold'>Overall rating</h1>

                                                        <BarRating />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='overflow-y-auto max-h-full'>
                                                {result.length > 0 && (
                                                    <div>
                                                        <h1 className='text-md font-semibold mx-5'>{result.length} sorted {result.length > 1 ? 'Reviews' : 'Review'}.</h1>
                                                    </div>
                                                )}
                                                {searchQuery.length === 0 && result.length === 0 && (
                                                    <h1 className='text-md font-semibold mx-5'>{location.review.length} {location.review.length > 1 ? 'reviews' : 'review'}</h1>
                                                )}
                                                {searchQuery.length > 0 && result.length === 0 && <h1 className='text-md font-semibold mx-5'>No Reviews</h1>}
                                                <div className='mt-5 ml-3 flex items-center border border-gray-300 px-5 rounded-full mb-3'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                                    </svg>
                                                    <input value={searchQuery} onChange={ev => setSearchQuery(ev.target.value)} className='border-none outline-none bg-transparent' placeholder='Search Reviews' type="text" />
                                                </div>
                                                {location.review.length === 0 &&
                                                    <p className='text-center mt-10'>No comments yet.</p>}
                                                {location.review && (
                                                    location.review.map((comment) => (
                                                        <div className=" rounded-2xl py-1 p-8">
                                                            {searchQuery.length === 0 && (
                                                                <div>
                                                                    <div className="flex gap-4 p-6">
                                                                        <div className="hidden">
                                                                            {randomNo = Math.floor(Math.random() * pictures.length)}
                                                                        </div>
                                                                        <div>
                                                                            <img className="rounded-full aspect-square max-w-[43px] object-cover" src={comment.author.profilepic ? 'http://localhost:3000/uploads/' + comment.author.profilepic : pictures[randomNo]} alt="" />
                                                                        </div>
                                                                        <div className="items-center">
                                                                            <h1 className="text-base font-semibold">{comment.author.username}</h1>
                                                                            <Link pictures={pictures} to={`/userProfile/${comment.author._id}`} className="-mb-3 underline text-primary cursor-pointer">{comment.author.email}</Link>
                                                                            <Rating className="-mx-16 mt-2" style={{ maxWidth: 90 }} value={comment.rating} />
                                                                        </div>

                                                                    </div>

                                                                    <div className="mx-8">
                                                                        <p className="text-base">{comment.body}</p>
                                                                        
                                                                    </div>
                                                                </div>
                                                            )}

                                                        </div>
                                                    ))

                                                )}
                                                <div>
                                                    {searchQuery.length > 0 && (
                                                        <div>
                                                            <div>
                                                                {result.length > 0 && (
                                                                    result.map((newResult) => (
                                                                        <div className='mx-8'>
                                                                            <div className="flex gap-4 p-6">
                                                                                <div className="hidden">
                                                                                    {randomNo = Math.floor(Math.random() * pictures.length)}
                                                                                </div>
                                                                                <div>
                                                                                    <img className="rounded-full object-scale-down w-10 mt-2" src={pictures[randomNo]} alt="" />
                                                                                </div>
                                                                                <div className="items-center">
                                                                                    <h1 className="text-base font-semibold">{newResult.author.username}</h1>
                                                                                    <Link pictures={pictures} to={`/userProfile/${newResult.author._id}`} className="-mb-3 underline text-primary cursor-pointer">{newResult.author.email}</Link>
                                                                                    <Rating className="-mx-16 mt-2" style={{ maxWidth: 90 }} value={newResult.rating} />
                                                                                </div>

                                                                            </div>
                                                                            <div className="mx-8">
                                                                                <p className="text-base">{newResult.body}</p>


                                                                            </div>

                                                                        </div>

                                                                    )))}
                                                            </div>
                                                            {result.length === 0 && (
                                                                <div>
                                                                    <p className='text-lg mx-10 mt-6'>
                                                                        No Results Found.
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>

                                            </div>

                                        </div>
                                        {/* Repeat for other comments */}
                                    </div>
                                </div>
                            </div>
                        </div>

                    )}

                </div>
            </div>
        </div>
    );
};



export default MyPopup;

