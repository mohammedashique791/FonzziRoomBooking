import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { useParams } from "react-router-dom";
import { UserContext } from "./userContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import CommentShow from "./CommentShow";
import NewPopUp from "./NewPopUp";
import 'react-toastify/dist/ReactToastify.css';
import PlaceExtra from "./PlaceExtraInfo";
import * as React from 'react';
import dayjs from 'dayjs';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

import { compareAsc, differenceInCalendarDays, format } from "date-fns";
import { func } from "joi";
export default function View() {
    const { id } = useParams();
    const [place, setPlace] = useState('');
    const [author, setauthor] = useState('');
    const [bookingOpen, setBookingOpen] = useState(false);
    const [checkin, setcheckin] = useState('');
    const [checkout, setcheckout] = useState('');
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const { user } = useContext(UserContext);
    const [showAllPhotos, setshowallPhotos] = useState(false);
    const [guests, setGuests] = useState(1);
    const [name, setName] = useState('');
    const [isVisible, setisVisible] = useState(false);
    const navigate = useNavigate();
    const [bookeddates, setbookeddates] = useState([]);
    const notify = () => toast("You Must be Logged in first!");
    const available = () => toast('This place is available on your booking Time!!! Hooray!!')


    function formattingDates(startDate) {
        const date = new Date(startDate);
        const day = date.getDate();
        const monthAbbreviations = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        const monthAbbreviation = monthAbbreviations[date.getMonth()];
        const formattedDate = `${day} ${monthAbbreviation}`;
        return formattedDate;
    }

    const { register, handleSubmit, formState: { errors } } = useForm();


    useEffect(() => {
        async function getdisabledDates() {
            const { data } = await axios.post('/bookedPlaces', { id: place._id });
            setbookeddates(data);
        };
        getdisabledDates();
    }, [bookingOpen]);


    // async function isDayDisabled(date) {

    //     // return date.getDate() !== 4;
    // }

    let numberofDays = differenceInCalendarDays(new Date(checkout), new Date(checkin));
    useEffect(() => {
        async function graspDetails() {
            const { data } = await axios.get(`http://localhost:3000/places/${id}`);
            setPlace(data);
            setauthor(data.owner.username);
        }
        graspDetails();
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);


    function addClass() {
        let classes = "border h-4/6 cursor-pointer border-gray-300 rounded-2xl p-7 shadow shadow-xl"
        if (checkin.length > 0 && checkout.length > 0) {
            classes = "border h-5/6 cursor-pointer border-gray-300 rounded-2xl p-7 shadow shadow-xl"
        }
        return classes;
    }


    function handleScroll() {
        if (window.scrollY > 2000) {
            setisVisible(true);
        }
        else {
            setisVisible(false);
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behaviour: 'smooth'
        })
    }



    function toLogin() {
        navigate('/login');
    }


    const pictures = [
        'data:image/jpeg;base64,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',
        'data:image/jpeg;base64,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',
        'data:image/jpeg;base64,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',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqqpfjO9_XqL6FNZNnDf6n3OEYmTZCdzoN9o0CWWRnuOugrpjDQ-xPKHWZ9w&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4I6FiEyLA0u4gWx47QmcQ1gCRctRZqqM2rA&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjNv7jc844KwGlTkllTjo_OBC7E_KJBg6WYtK_FNFCkqRIwOjZAjbJV_RsXOuZuYOBDP8&usqp=CAU'
    ];




    const addComment = async (ev) => {
        ev.preventDefault();
        const { data } = await axios.post(`/addcomment/${place._id}`, {
            comment, rating
        });
        setPlace(data);
        setComment('');
    }





    function logomporter(place) {
        if (place === 'wifi') {
            return <svg xmlns="http://www.w3.org/2000/svg" name='wifilogo' fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
            </svg>
        }
        else if (place === 'pets') {
            return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
            </svg>
        }
        else if (place === 'tv') {
            return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" />
            </svg>
        }
        else if (place === 'entrance') {
            return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
            </svg>
        }
        else if (place === 'aid') {
            return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" />
            </svg>
        }
    }



    function handliClick() {
        if (user && user.username === author) {
            return navigate(`/userProfile/${user._id}`);
        }
        if (user) {
            return navigate('/ownerPage', { state: { fonzzi: place.owner } });
        }
        else {
            return navigate('/login');
        }
    }

    async function routeToPayment() {
        if (user) {
            const { data } = await axios.post(`/isBooked/${place._id}`, { checkin, checkout })
            if (data) {
                alert('This place is booked at this checkin date. Try different checkin date')
            }
            else {
                available();
                return navigate('/booking/payment', { state: { place, checkin, checkout, guests, name, price: place.price, numberofDays } });
            }
        }
        else {
            notify();
            return navigate('/login');
        }
    }

    const [startDate, setStartDate] = useState(new Date());

    if (showAllPhotos) {
        return (
            <div className="absolute bg-white min-w-full min-h-screen">
                <button onClick={() => setshowallPhotos(false)} className="fixed cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
                <h1 className="text-center text-2xl font-semibold mb-5 mt-4">Photos of {author}</h1>
                {place?.photos?.length > 0 && place.photos.map((photo) => (
                    <div className="flex justify-center">
                        <img className="w-1/2" src={'http://localhost:3000/uploads/' + photo} alt="" />
                    </div>
                ))}
            </div>
        )
    }



    return (
        <div>
            <Link to={'/'} className="hidden lg:inline-block border p-3 rounded-full bg-primary text-white ml-5">Go to Home Page</Link>
            <div className=" p-3 w-2/3 mx-auto mb-4  rounded-2xl">
                <h1 className="text-2xl font-semibold mb-3">{place.title}</h1>
                <a target="_blank" href={'http://maps.google.com?q=' + place.location} className="block text-sm underline cursor-pointer">{place.location}</a>
                <div className="relative">
                    <div className="relative grid gap-2 grid-cols-1 lg:grid-cols-[2fr_1fr] mt-7">
                        <div>
                            {place.photos?.[0] && (
                                <div>
                                    <img className=" rounded-2xl aspect-square object-cover shadow shadow-md" src={'http://localhost:3000/uploads/' + place.photos[0]} alt="" />
                                </div>
                            )}
                        </div>
                        <div className="grid hidden lg:block">
                            {place.photos?.[1] && (
                                <img className="rounded-2xl aspect-square object-cover" src={'http://localhost:3000/uploads/' + place.photos[1]} alt="" />
                            )}
                            <div className="overflow-hidden hidden lg:block">
                                {place.photos?.[2] && (
                                    <img className="rounded-2xl aspect-square object-cover relative top-2" src={'http://localhost:3000/uploads/' + place.photos[2]} alt="" />
                                )}
                            </div>
                        </div>
                        <NewPopUp myplace={place} />
                    </div>

                    <button onClick={() => setshowallPhotos(true)} to={'/places/photos/' + place._id} className="lg:flex gap-1 hidden lg:block absolute bottom-2 right-0 text-white border border-black py-2 px-4 bg-primary rounded-xl">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                        Show More Photos</button>
                </div>
                <div className="mt-10 grid gap-10 grid-cols-1 xl:grid-cols-[2fr_1fr]">
                    <div>
                        <h1 className="text-2xl font-semibold">Room in {place.location}</h1>
                        <div className="mt-4 flex gap-7 items-center mb-8">
                            <div className="relative">
                                <img className="rounded-full aspect-square max-w-[50px] object-cover" src={place && place.owner && place.owner.profilepic ? 'http://localhost:3000/uploads/' + place.owner.profilepic : pictures[4]} alt="" />
                                <div className="absolute bottom-0 right-0 bg-primary rounded-full text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                                        <path d="M2 6.342a3.375 3.375 0 0 1 6-2.088 3.375 3.375 0 0 1 5.997 2.26c-.063 2.134-1.618 3.76-2.955 4.784a14.437 14.437 0 0 1-2.676 1.61c-.02.01-.038.017-.05.022l-.014.006-.004.002h-.002a.75.75 0 0 1-.592.001h-.002l-.004-.003-.015-.006a5.528 5.528 0 0 1-.232-.107 14.395 14.395 0 0 1-2.535-1.557C3.564 10.22 1.999 8.558 1.999 6.38L2 6.342Z" />
                                    </svg>
                                </div>
                            </div>
                            <p className="font-semibold">
                                Hosted By {author}
                                <div className="flex gap-3 text-gray-500">
                                    <p className="text-base font-thin">Superhost</p>
                                    <p className="text-base font-thin">&#183; 1 Year Hosting</p>
                                </div>
                            </p>
                            <p className="mt-5"><hr /></p>
                        </div>
                        <hr />
                        <h1 className='text-2xl font-semibold mt-5'>Meet Your Host</h1>
                        <div className="bg-fourth text-white rounded-xl p-10 mt-5">
                            <div className="grid grid-cols-1 2xl:grid-cols-2 gap-10">
                                <div className="bg-teritiary rounded-xl p-10 shadow shadow-2xl text-black">
                                    <div className="grid grid-cols-1 gap-10  ">
                                        <div className="relative">
                                            <img className="rounded-full aspect-square max-w-[150px] sm:max-w-[225px] xl:max-w-[120px] 2xl:max-w-[140px] object-cover" src={place && place.owner && place.owner.profilepic ? 'http://localhost:3000/uploads/' + place.owner.profilepic : pictures[4]} alt="" />
                                            <div className="hidden 2xl:block absolute bottom-24 right-20 text-white bg-green-300 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                                            </svg>
                                            </div>
                                            <div className="w-full">
                                                <h1 className="mx-3 sm:translate-x-10 xl:-translate-x-2 font-semibold text-3xl mt-5">{author}</h1>
                                            </div>
                                            <div className="mx-3 flex gap-2 items-center mt-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                                                    <path d="M2 6.342a3.375 3.375 0 0 1 6-2.088 3.375 3.375 0 0 1 5.997 2.26c-.063 2.134-1.618 3.76-2.955 4.784a14.437 14.437 0 0 1-2.676 1.61c-.02.01-.038.017-.05.022l-.014.006-.004.002h-.002a.75.75 0 0 1-.592.001h-.002l-.004-.003-.015-.006a5.528 5.528 0 0 1-.232-.107 14.395 14.395 0 0 1-2.535-1.557C3.564 10.22 1.999 8.558 1.999 6.38L2 6.342Z" />
                                                </svg>
                                                <p>superhost</p>
                                            </div>
                                        </div>
                                        <div className="">
                                            <div className="border-b-2 mt-3">
                                                <h1 className="font-semibold text-xl">25</h1>
                                                <span className="text-xs font-semibold">Reviews</span></div>
                                            <div className="border-b-2 mt-3">
                                                <div className="flex items-center gap-1">
                                                    <h1 className="font-semibold text-xl">4.96</h1>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                                                        <path fillRule="evenodd" d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <span className="text-xs font-semibold">Rating</span>
                                            </div>
                                            <div className="mt-3">
                                                <h1 className="font-semibold text-xl">1</h1>
                                                <span className="text-xs font-semibold">Year Hosting</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-black">
                                    <div className="mb-10">
                                        <p className="mx-2 text-xl font-semibold mb-8">{author} is a Superhost.</p>
                                        <p className="text-base font-thin mx-2 mb-8">Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</p>
                                        <p className="mx-2 text-xl font-semibold mb-8 mt-3">Host Details.</p>
                                        <p className="text-base font-thin mx-2">Response rate: 100%.</p>
                                        <p className="text-base font-thin mx-2">Responds within a few hours.</p>
                                    </div>
                                    <button className="border p-3 bg-black text-white rounded-2xl" onClick={handliClick}>{user && user.username === author ? 'View My Profile' : 'Message Host'}</button>
                                </div>
                            </div>

                        </div>
                        <h1 className="text-2xl hidden xl:block font-semibold mt-8">What this place offers</h1>
                        <h1 className="xl:hidden text-2xl font-semibold mt-8 mx-2">Book Now</h1>
                        <div className="hidden xl:block grid grid-cols-2">
                            {place.perks && (
                                place.perks.map((place) => (
                                    <div className="flex gap-5 mt-3 rounded-xl p-3">
                                        {logomporter(place)}
                                        <p>{place}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>


                    {bookingOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto z-50">
                            <div className="bg-sixth text-white rounded-xl shadow-lg p-6 w-full max-w-lg min-h-[250px]">
                                <div className='relative sticky top-0'>
                                    <button onClick={() => setBookingOpen(!bookingOpen)} className="absolute -top-1 right-2 text-gray-600 hover:text-gray-800">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                {/* Your comment content goes here */}
                                <div className="mt-4">
                                    <h1 className="text-lg font-semibold mx-3">Booked Dates</h1>
                                    <div className="mt-8 grid grid-cols-2 gap-5">
                                        {bookeddates.length > 0 && bookeddates.map((book) => (
                                            <div className="border p-7 rounded-xl bg-primary text-white">
                                                <p className="text-lg font-semibold">{formattingDates(book.checkin)} - {formattingDates(book.checkout)}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-center">
                                        {bookeddates && bookeddates.length === 0 && <p className="">No Bookings for this Place Yet.</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className={`${addClass()} xl:max-h-[630px] h-[730px] md:h-[630px] min-w-[300px] md:min-w-[440px]`}>
                        <h1 className="mb-4"><span className="text-2xl">₹{place.price}</span> night</h1>
                        <div className="w-full flex justify-end -mx-1">
                            <button onClick={() => setBookingOpen(!bookingOpen)} className="text-xs font-semibold text-primary">View Bookings</button>
                        </div>
                        <form onSubmit={handleSubmit(routeToPayment)}>
                            <div className="">
                                <div className="grid md:grid-cols-[1fr_1fr] ">
                                    <div className="border border-gray-300 p-3 mt-3 rounded-lg md:rounded-tr-none md:rounded-br-none md:rounded-bl-none rounded-tl-lg">
                                        <p className="text-xs font-semibold">CHECK-IN</p>
                                        <input type="date" name="fonzzi1" {...register('fonzzi1', { required: true })} value={checkin} onChange={ev => setcheckin(ev.target.value)} />
                                        {errors.fonzzi1 && <p className="text-red-500 mt-2">Check in Date is required.</p>}
                                        {/* <p className="text-sm mt-1">{checkin}</p> */}
                                    </div>
                                    <div className="border-y border-r border-l md:border-l-none rounded-tl-lg md:rounded-tl-none border-gray-300 p-3 mt-3 rounded-tr-lg">
                                        <p className="text-xs font-semibold">CHECK-OUT</p>
                                        <input type="date" name='fonzzi2' {...register('fonzzi2', { required: true })} value={checkout} onChange={ev => setcheckout(ev.target.value)} />
                                        {errors.fonzzi2 && <p className="text-red-500 mt-2">Check out Date is required.</p>}
                                    </div>
                                </div>
                                <div className="border-x border-b border-gray-300 p-3 rounded-b-lg">
                                    <div>
                                        <label for="guests" class="block text-sm font-medium leading-6 text-gray-900">Guests</label>
                                        <select name='select' {...register('select', { max: place.maxGuests })} className="border w-full rounded-full p-2 border-gray-200" value={guests} onChange={ev => setGuests(ev.target.value)} id="guests">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            {place.maxGuests > 5 && <option value="5+">Between 5 and {place.maxGuests}</option>}

                                        </select>
                                        {errors.select && <p className="text-red-500 mt-2">Maximum {place.maxGuests} are allowed at this place.</p>}
                                        {numberofDays > 0 && (
                                            <div className="mt-2">
                                                <label for="kunju" class="block text-sm font-medium leading-6 text-gray-900">Your Full Name</label>
                                                <input value={name} name='yourname' {...register('yourname', { required: true })} onChange={ev => setName(ev.target.value)} id='kunju' type="text" placeholder="Eg: Fonzzi Zayn" />
                                                {errors.yourname && <p className="text-red-500 ml-3">Your Name is required.</p>}
                                                <p className="text-sm text-gray-600 mt-3 ml-2">Maximum <b>{place.maxGuests}</b> guests are allowed at this Place</p>
                                            </div>
                                        )}

                                    </div>
                                </div>
                                <button className="bg-primary text-white w-full mt-4 rounded-xl p-3">Check For Availability</button>
                            </div>
                        </form>
                        <p className="text-center text-gray-500 mt-2">You won't be charged yet</p>
                        <div className="grid gap-2 grid-cols-[2fr_1fr] mt-3">
                            <div>
                                {numberofDays > 0 && <p className="text-gray-600 underline">{place.price} <span className="text-sm">&#10005;</span> {numberofDays} {numberofDays > 1 ? 'nights' : 'night'}</p>}

                                <p className="text-gray-600 underline mt-2">Cleaning fee</p>
                            </div>
                            <div>
                                {numberofDays > 0 && <p className="text-gray-600 ml-5">₹{place.price * numberofDays}</p>}

                                <p className="text-gray-600 ml-5 mt-2">₹1200</p>
                            </div>
                            <h1 className="w-full mt-5"><hr /></h1>
                        </div>
                        <div className="grid grid-cols-[2fr_1fr] mt-5">
                            <div>
                                <h1 className="font-semibold">Total Before Taxes</h1>
                            </div>
                            <div>{numberofDays > 0 && <p className="ml-5 font-semibold">₹{(place.price * numberofDays) + 1200}</p>}
                            </div>
                        </div>
                    </div>
                </div>
                <h1 className="mt-10"><hr /></h1>
                <div className="mt-10 gap-3">
                    <h1 className="text-2xl font-semibold mt-1">Rating</h1>
                    <div className="mt-3">
                        <Rating style={{ maxWidth: 170 }} value={rating} onChange={setRating} />

                    </div>
                </div>
                <h1 className="mt-10"><hr /></h1>
                {user && (
                    <div>
                        <h1 className="text-lg font-semibold mt-5 mb-3">Add a Review</h1>
                        <div className="relative">
                            <form onSubmit={addComment}>
                                <input value={comment} onChange={ev => setComment(ev.target.value)} type="text" placeholder="Add a Review..." />
                                <div className="absolute bottom-3 right-3">
                                    <button>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                                        </svg>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {!user && (
                    <div className="hidden sm:block relative sticky top-0">
                        <p className=" border rounded-2xl p-4 mt-4 border-gray-300 bg-primary text-white ">Log in to share your thoughts! </p>
                        <div className="absolute right-5 bottom-2">
                            <button onClick={toLogin} className="border p-2 rounded-full text-white">Log In</button>
                        </div>
                    </div>
                )}
                {!user && (
                    <div className="block sm:hidden">
                        <button onClick={toLogin} className="border px-4 py-2 mt-5 rounded-xl bg-primary text-white">Login Now</button>
                    </div>
                )}

                <h1 className="mt-5"><hr /></h1>
                <h1 className='font-semibold hidden md:block mt-3'>Comments</h1>
                <div className="flex">
                    <CommentShow place={place} pictures={pictures} />
                </div>
            </div>
            <PlaceExtra place={place} />
            <button
                onClick={scrollToTop}
                className={`${isVisible ? 'block' : 'hidden'
                    } fixed bottom-4 right-20 bg-sixth text-white px-4 py-2 rounded-md shadow-md`}
            >
                Scroll To Top
            </button>
        </div>
    )
}

