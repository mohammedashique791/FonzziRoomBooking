import { Link, useLocation } from "react-router-dom"

export default function Success() {
    const location = useLocation();
    return (
        <div className="h-screen bg-nineth">
            {console.log(location.state)}
            <div className="p-8 mt-4">
                <div className="flex gap-8 items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-60 h-60 bg-green-500 p-3 rounded-full text-white">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                </svg>
                <p className="text-white text-xl  mt-10 font-semibold">Your Booking is Successful</p>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="border px-14 py-8 rounded-xl bg-white mt-5">
                <h1 className="font-semibold">Booking Details</h1>
                  <div className="flex gap-4 mt-6">
                    <img className="w-40 h-40 object-cover rounded-xl" src={'http://localhost:3000/uploads/' + location.state.place.photos[0]} alt="" />
                    <div>
                        <h1 className="font-semibold">{location.state.place.title}</h1>
                        <h3 className="mt-3">Booked Under <b>{location.state.name}</b></h3>
                    </div>
                    </div> 
                    <div className="flex justify-between mt-5">
                        <Link to={'/'} className="border px-5 py-3 rounded-xl text-white bg-sixth">Go To Home Page</Link>
                        <Link to={'/account/bookings'} className="border px-5 py-3 rounded-xl text-white bg-nineth">View Your Booking</Link></div> 
                </div>
            </div>
        </div>
    )
}

{/* <div className="border p-8 rounded-xl bg-white mt-5">
                  <h1 className="font-semibold">Booking Details</h1>
                  <div className="flex gap-4 mt-6">
                    <img className="w-40 h-40 object-cover rounded-xl" src={'http://localhost:3000/uploads/' + location.state.place.photos[0]} alt="" />
                    <div>
                        <h1 className="font-semibold">{location.state.place.title}</h1>
                    </div>
                    </div>  
                </div> */}