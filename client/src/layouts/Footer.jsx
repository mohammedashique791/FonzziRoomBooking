import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { LayoutContext } from "../Layout";
export default function Footer() {
    const location = useLocation();
    const {darkmode} = useContext(LayoutContext);
    const isLoginPage = location.pathname === '/login' || location.pathname ==='/register' || location.pathname === '/ownerPage' || location.pathname === '/booking/payment/success'    ;
    if (isLoginPage) {
        return null
    }
    return (
        <div className={`${darkmode ? 'bg-black': ''} my-auto w-full min-w-[420px]`}>
            <div className={`border mt-3.5 -mx-2 p-20 rounded-xl ${darkmode ? ' bg-black text-white' : ' bg-gray-100'}`}>
                <div className="flex  grid grid-cols-1 md:grid-cols-3 flex-col md:flex-row">
                    <div className="text-sm mt-2 ">
                        <h1 className="hover:underline font-medium cursor-pointer">Support</h1>
                        <button className="hover:underline text-gray-600 mt-2">Help Centre</button>
                        <button className="hover:underline block text-gray-600 mt-2">Disability Support</button>
                        <button className="hover:underline text-gray-600 mt-2">Cancellation Options</button>
                        <div className="mt-3 mb-3 block md:hidden">
                            <hr/>
                        </div>
                    </div>
    
                    <div className="text-sm mt-2 ">
                        <h1 className="cursor-pointer hover:underline font-medium">Hosting</h1>
                        <button className="hover:underline text-gray-600 mt-2">Fonzzi Your Home</button>
                        <button className="hover:underline block text-gray-600 mt-2">Hosting Resources</button>
                        <button className="hover:underline text-gray-600 mt-2">Hosting Criterias</button>
                        <div className="mt-3 mb-3 block md:hidden">
                            <hr/>
                        </div>
                    </div>
                    <div className="text-sm mt-2">
                        <h1 className="cursor-pointer hover:underline font-medium">Fonzzi</h1>
                        <button className="hover:underline text-gray-600 mt-2">New Features</button>
                        <button className="hover:underline block text-gray-600 mt-2">About</button>
                        <button className="hover:underline text-gray-600 mt-2">Contact us</button>
                    </div>
                </div>
                <div className="mt-10"><hr /></div>
                <div className="">
                    <div className="grid grid-cols-1 lg:grid-cols-2 mt-5">
                        <div className="md:flex gap-3 mx-auto text-gray-600 text-sm items-center">
                            <h1>&copy; 2024 Fonzzi, Inc.</h1>
                            <button>&#183; Privacy</button>
                            <button>&#183; Terms</button>
                            <button>&#183; Company details</button>
                        </div>
                        <div className="flex gap-3 mx-auto  font-semibold text-sm items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                            </svg>
                            <h1>English(IN)</h1>
                            <h1>₹ INR</h1>
                            <Link>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50">
                                <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M37,19h-2c-2.14,0-3,0.5-3,2 v3h5l-1,5h-4v15h-5V29h-4v-5h4v-3c0-4,2-7,6-7c2.9,0,4,1,4,1V19z"></path>
                            </svg>
                            </Link>
                            <Link to={'https://www.facebook.com'}>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 30 30">
                                <path d="M28,6.937c-0.957,0.425-1.985,0.711-3.064,0.84c1.102-0.66,1.947-1.705,2.345-2.951c-1.03,0.611-2.172,1.055-3.388,1.295 c-0.973-1.037-2.359-1.685-3.893-1.685c-2.946,0-5.334,2.389-5.334,5.334c0,0.418,0.048,0.826,0.138,1.215 c-4.433-0.222-8.363-2.346-10.995-5.574C3.351,6.199,3.088,7.115,3.088,8.094c0,1.85,0.941,3.483,2.372,4.439 c-0.874-0.028-1.697-0.268-2.416-0.667c0,0.023,0,0.044,0,0.067c0,2.585,1.838,4.741,4.279,5.23 c-0.447,0.122-0.919,0.187-1.406,0.187c-0.343,0-0.678-0.034-1.003-0.095c0.679,2.119,2.649,3.662,4.983,3.705 c-1.825,1.431-4.125,2.284-6.625,2.284c-0.43,0-0.855-0.025-1.273-0.075c2.361,1.513,5.164,2.396,8.177,2.396 c9.812,0,15.176-8.128,15.176-15.177c0-0.231-0.005-0.461-0.015-0.69C26.38,8.945,27.285,8.006,28,6.937z"></path>
                            </svg>
                            </Link>
                            <Link>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 30 30">
                                <path d="M 9.9980469 3 C 6.1390469 3 3 6.1419531 3 10.001953 L 3 20.001953 C 3 23.860953 6.1419531 27 10.001953 27 L 20.001953 27 C 23.860953 27 27 23.858047 27 19.998047 L 27 9.9980469 C 27 6.1390469 23.858047 3 19.998047 3 L 9.9980469 3 z M 22 7 C 22.552 7 23 7.448 23 8 C 23 8.552 22.552 9 22 9 C 21.448 9 21 8.552 21 8 C 21 7.448 21.448 7 22 7 z M 15 9 C 18.309 9 21 11.691 21 15 C 21 18.309 18.309 21 15 21 C 11.691 21 9 18.309 9 15 C 9 11.691 11.691 9 15 9 z M 15 11 A 4 4 0 0 0 11 15 A 4 4 0 0 0 15 19 A 4 4 0 0 0 19 15 A 4 4 0 0 0 15 11 z"></path>
                            </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}