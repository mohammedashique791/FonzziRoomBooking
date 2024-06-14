import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { UserContext } from './userContext';

const NewPopUp = ({ myplace }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [placeData, setPlacedata] = useState('');
    const [show, setShow] = useState(false);
    const { user } = useContext(UserContext);
    const [editRedirect, setEditRedirect] = useState(false);
    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    async function yesFunction() {
        try {
            const { data } = await axios.delete(`/deletePost/${myplace._id}`);
            if (data === true) {
                setRedirect(true);
            }
            else {
                return <Navigate to={'/login'} />
            }
        } catch (err) {
            console.log(err);
        }
    }

    function editpost(){
        setEditRedirect(true);
    }

    if(editRedirect){
        return <Navigate to={`/accout/edit/${myplace._id}`} />
    }

    function isVisible() {
        if (myplace && user) {
            if (myplace.owner._id === user._id) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    };

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <div>
            {isVisible() && (
                <div className='flex justify-between -mt-16 -mt-12 mx-4'>
                    <div>
                        <button onClick={togglePopup} className="hidden sm:block sm:flex gap-1 border p-1 items-center rounded-xl bg-primary text-white"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                        </svg>
                            <p className="text-white">Delete This Post</p>
                        </button>
                    </div>
                    <div>
                        <button onClick={editpost} className="hidden sm:block sm:flex gap-1 border p-1 items-center rounded-xl bg-amber-400 text-white"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                        </svg>
                            <p className="text-white">Edit This Post</p>
                        </button>
                    </div>
                </div>
            )}

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
                            <h1 className='text-lg font-medium text-yellow-400 mb-1'>Warning</h1>
                            {/* Display comments */}
                            <p className='mb-5'>Are You Sure You want to Delete this post?</p>
                            <div className='flex justify-between'>
                                <button onClick={yesFunction} className='border bg-primary p-2 px-4 text-white'>Yes</button>
                                <button onClick={togglePopup} className='border bg-green-300 p-2 px-4 text-white'>No</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewPopUp;
