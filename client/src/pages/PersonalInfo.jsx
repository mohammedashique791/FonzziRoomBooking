import { useContext } from "react";
import { UserContext } from "./userContext";
import { Link } from "react-router-dom";
export default function Personal() {
    const { user } = useContext(UserContext);
    return (
        <div className="flex justify-center mt-6">
            <div className="grid grid-cols-2 gap-20 w-4/5">
                <div className="mx-auto px-10 py-4 w-full">
                    <h1><Link to={'/account/profile/navigations'}>Account</Link> &gt; <b>personal info</b></h1>
                    <h1 className="text-2xl mt-3 font-semibold">Personal Info</h1>
                    <div className="flex w-full justify-between mt-6">
                        <div className="w-full border-b">
                            <p>Legal Name</p>
                            <p className="text-gray-600">{user && user.username}</p>
                            <p className="mb-5"></p>
                        </div>
                        <Link><p className="underline">Edit</p></Link>
                    </div>
                    <div className="flex w-full justify-between mt-6">
                        <div className="w-full border-b">
                            <p>Preferred Name</p>
                            <p className="text-gray-600">{user.preferredname ? user.preferredname : 'Not Provided'}</p>
                            <p className="mb-5"></p>
                        </div>
                        <Link><p className="underline">Add</p></Link>
                    </div>
                    <div className="flex w-full justify-between mt-6">
                        <div className="w-full border-b">
                            <p>Email Address</p>
                            <p className="text-gray-600">{user && user.email}</p>
                            <p className="mb-5"></p>
                        </div>
                        <Link><p className="underline">Add</p></Link>
                    </div>
                    <div className="flex w-full justify-between mt-6">
                        <div className="w-full border-b">
                            <p>Phone Number</p>
                            <p className="text-gray-600">{user && user.phone ? user.phone : 'Not Provided'}</p>
                            <p className="mb-5"></p>
                        </div>
                        <Link><p className="underline">Add</p></Link>
                    </div>
                    <div className="flex w-full justify-between mt-6">
                        <div className="w-full border-b">
                            <p>Address</p>
                            <p className="text-gray-600">Not Provided</p>
                            <p className="mb-5"></p>
                        </div>
                        <Link><p className="underline">Add</p></Link>
                    </div>
                </div>
                <div className="mx-auto px-6 py-4">
                    <div className="w-3/5 border p-8 rounded-xl">
                        <div className="border-b">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-primary">
                                <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
                            </svg>
                            <h1 className="text-lg font-semibold mt-4">Why isn't my info shown here?</h1>
                            <p className="text-gray-500">We’re hiding some account details to protect your identity.</p>
                            <p className="mb-8"></p>
                        </div>
                        <div className="mt-10 border-b">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-primary">
                                <path d="M18 1.5c2.9 0 5.25 2.35 5.25 5.25v3.75a.75.75 0 0 1-1.5 0V6.75a3.75 3.75 0 1 0-7.5 0v3a3 3 0 0 1 3 3v6.75a3 3 0 0 1-3 3H3.75a3 3 0 0 1-3-3v-6.75a3 3 0 0 1 3-3h9v-3c0-2.9 2.35-5.25 5.25-5.25Z" />
                            </svg>
                            <h1 className="text-lg font-semibold mt-4">Which details can be edited?</h1>
                            <p className="text-gray-500">Contact info and personal details can be edited. If this info was used to verify your identity, you’ll need to get verified again the next time you book – or to continue hosting.</p>
                            <p className="mb-8"></p>
                        </div>
                        <div className="mt-10">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-primary">
                                <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                            </svg>
                            <h1 className="text-lg font-semibold mt-4">What info is shared with others?</h1>
                            <p className="text-gray-500">Airbnb only releases contact information for Hosts and guests after a reservation is confirmed.</p>     
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};