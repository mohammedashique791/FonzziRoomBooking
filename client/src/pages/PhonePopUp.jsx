import { useContext, useEffect, useState } from "react";
import { LayoutContext } from "../Layout";
import { UserContext } from "./userContext";
import { useNavigate } from "react-router-dom";

export default function PhonePop({ open, setOpen, phoneSubmit}) {
    const navigate = useNavigate();
    const { phone, setphone } = useContext(LayoutContext);
    const {user} = useContext(UserContext);
    function togglePopup() {
        setOpen(!open);
    }


   
    if(!user){
        return navigate('/');
    }

    console.log('user is', user);
    if(user.pan){
        console.log('the length is ', user.pan.length);
    }
    


   

    function classDecider() {
        let classes = 'text-white p-2 px-8 py-2 rounded-lg';
        if (phone.length === 10) {
            classes = 'bg-seventh text-white p-2 px-8 py-2 rounded-lg';
        }
        else {
            classes = 'bg-sixth text-eighth p-2 px-8 py-2 rounded-lg opacity-50 cursor-not-allowed'
        }
        return classes;
    }



    const isButtonDisabled = phone.length !== 10;
    return (
        <div>
           

            {open && (
                <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 overflow-y-auto no-scrollbar z-50 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer'}`}>
                    <div className="absolute inset-0"></div>
                    <div className="absolute bg-white rounded-xl p-6 w-1/3 h-3/6 min-w-md max-h-full p-20 overflow-y-scroll no-scrollbar z-70">
                        
                            <div className='relative sticky top-0'>
                                <button onClick={togglePopup} className=" top-2 right-2 text-gray-600 hover:text-gray-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="mt-8">
                                <h1 className="text-2xl font-semibold">Add Phone Number</h1>
                                <p className="mt-2 text-sm text-gray-600">An otp will be sent to this provided number to verify this number.</p>

                                <div className="relative border mt-3 rounded-lg border-black mt-5"><input  onChange={e => setphone(e.target.value)} onKeyDown={(e) => {
                                            const input = e.target;
                                            const key = e.key;
                                            if (!isNaN(key) && key !== ' ') {
                                               
                                            }
                                            else {
                                                if (key !== 'Backspace') {
                                                    e.preventDefault();
                                                }
                                            }
                                        }} type="text" maxLength='10' placeholder="Phone Number" className="border-none outline-none" />
                                    <div className="absolute bottom-5 right-3"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                        <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
                                    </svg>
                                    </div>
                                </div>
                                
                                <div className="mt-14 text-xs">
                                    <p class>By continuing, I certify that this Phone Number I entered belongs to the person paying for this reservation and that I have permission to share their information.</p>
                                </div>
                                <div className="mt-5">
                                    <hr />
                                </div>
                            </div>
                            <div className="mt-10 flex justify-between px-6 items-center    ">
                                <button onClick={togglePopup} className="text-md font-semibold">Cancel</button>
                                <button onClick={phoneSubmit} disabled={isButtonDisabled} className={classDecider()}>Submit</button>
                            </div>
                    </div>
                </div>

            )}
        </div>
    )
}