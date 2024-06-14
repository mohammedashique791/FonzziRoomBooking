import axios from "axios"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Bookings() {
    const [booking, setBooking] = useState([]);

    useEffect(() => {
        async function grabBookingDetails() {
            try {
                const { data } = await axios.get('/bookings/details');
                console.log('Successfully fetched booking data');
                setBooking(data);
            }
            catch (e) {
                console.log('Error Fetching Booking Data');
            }
        }
        grabBookingDetails();

    }, []);


    return (
        <div className="mb-40">
            <h1 className="mx-20 text-xl font-semibold">My Bookings</h1>
            <div className="flex mb-20 p-5 rounded-xl justify-items-stretch my-10">
                {booking.length === 0 && (
                    <div className="w-full">
                        <p className="text-center w-full">Empty Bookings. Book a place to show that place here.</p>
                    </div>
                )}
                {booking.length > 0 && (
                    <div className="2xl:w-full border px-5 py-8 border-red-200 rounded-xl">

                        {booking.map((book, index) => (
                            <div key={index} className="flex flex-col lg:flex-row lg:gap-20 gap-8 mx-20 2xl:w-full xl:w-4/5 lg:w-3/5 mb-20">
                                {book.place && book.place.photos && book.place.photos[0] && (
                                    <img className="w-60 h-60 rounded-2xl object-cover mt-2 rounded-xl" src={`http://localhost:3000/uploads/${book.place.photos[0]}`} alt="" />
                                )}
                                <div className="rounded-xl p-1">
                                    {book.place && (
                                        <>
                                            <div className="mt-2">
                                                <h1 className="text-xl font-semibold">{book.place.title}</h1>
                                                <div className="text-sm mt-3">
                                                    <p>{book.place.description.substring(0, 100) + '  ......'}</p>
                                                    <p>Booking Name: {book.name}</p>
                                                    <p>Check In this Place at: {book.checkin.substring(0, 10)}</p>
                                                    <p>Check Out this Place at: {book.checkout.substring(0, 10)}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <p>Booked Price: <b>₹{book.price}</b></p>
                                            </div>
                                            <div className="mt-8 -ml-1 hidden 2xl:block">
                                                <Link to={`/places/${book.place._id}`} className="border px-5 py-2 hover:-translate-y-1 rounded-full bg-primary hover:bg-black text-white mb-6">View {book.place.title}</Link>
                                            </div>
                                            <div className="mt-8 -ml-1 block 2xl:hidden">
                                                <Link to={`/places/${book.place._id}`} className="border px-5 py-2 hover:-translate-y-1 rounded-full bg-primary hover:bg-black text-white mb-6">View</Link>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
