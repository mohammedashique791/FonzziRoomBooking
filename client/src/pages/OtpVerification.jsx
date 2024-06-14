import { useContext, useEffect, useState } from "react";
import { LayoutContext } from "../Layout";
import { UserContext } from "./userContext";

export default function Otp({ verifyOtp}) {
    const { pan, setpan } = useContext(LayoutContext);
    const { otp, setotp } = useContext(LayoutContext);
    const { showerror, setshowerror } = useContext(LayoutContext);
    const [open, setOpen]=  useState(false);
    const { user } = useContext(UserContext);
    function togglePopup() {
        setOpen(!open);
    }



    function classDecider() {
        let classes = 'text-white p-2 px-8 py-2 rounded-lg';
        if (otp.length === 4) {
            classes = 'bg-seventh text-white p-2 px-8 py-2 rounded-lg';
        }
        else {
            classes = 'bg-sixth text-eighth p-2 px-8 py-2 rounded-lg opacity-50 cursor-not-allowed'
        }
        return classes;
    }



    const isButtonDisabled = otp.length !== 4;
    return (
        <div>
            {open && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 overflow-y-auto no-scrollbar z-50">
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
                            <h1 className="text-2xl font-semibold">Enter OTP</h1>
                            <p className="mt-2 text-sm text-gray-600">Enter the OTP sent to the number you provided.</p>

                            <div className="relative border mt-3 rounded-lg border-black mt-5"><input onChange={e => setotp(e.target.value)} type="text" maxLength='4' placeholder="OTP" className="border-none outline-none" />
                                <div className="absolute bottom-5 right-3"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                    <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
                                </svg>
                                </div>

                            </div>

                            {showerror === true && (
                                <div className="flex gap-1 text-primary mt-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                                    </svg>
                                    <p>Invalid OTP</p>
                                </div>
                            )}

                            <div className="mt-14 text-xs">
                                <p class>By continuing, I certify that the Number I entered belongs to the person paying for this reservation and that I have permission to share their information.</p>
                            </div>
                            <div className="mt-5">
                                <hr />
                            </div>
                        </div>
                        <div className="mt-10 flex justify-between px-6 items-center    ">
                            <button onClick={togglePopup} className="text-md font-semibold">Cancel</button>
                            <button onClick={verifyOtp} disabled={isButtonDisabled} className={classDecider()} >Submit</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}