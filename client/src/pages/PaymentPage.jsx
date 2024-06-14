import { useLocation, useNavigate } from "react-router-dom"
import { UserContext } from "./userContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { LayoutContext } from "../Layout";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import PanPopUp from "./PanPopUp";
import PhonePop from "./PhonePopUp";
import Otp from "./OtpVerification";
export default function Payment() {
    const [thePan, setThePan] = useState('');
    const [thePhone, setThePhone] = useState('');
    const { pan, setpan } = useContext(LayoutContext);
    const { phone, setphone } = useContext(LayoutContext);
    const { otp, setotp } = useContext(LayoutContext);
    const { showerror, setshowerror } = useContext(LayoutContext);
    const [openPhone, setopenPhone] = useState(false);
    const location = useLocation();
    const [phonebuttonText, setphoneButtonText] = useState('');
    const [vpa, setvpa] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setexpiry] = useState('');
    const [cvv, setcvv] = useState('');
    const [cardHolderName, setCardHolderName] = useState('');
    const { user } = useContext(UserContext);
    const [bookingdata, setbookingdata] = useState('');
    const [buttonText, setButtonText] = useState('');
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('upi');
    const place = location.state.place;
    const [redirect, setRedirect] = useState(false);
    const [track, setTrack] = useState('');
    const navigate = useNavigate();
    const checkin = location.state.checkin;
    const checkout = location.state.checkout;
    const guests = location.state.guests;
    const name = location.state.name;
    const [isDisabled, setisDisabled] = useState(false);
    const [isDisabledphone, setisDisabledphone] = useState(false);
    const [otpTracker, setoptTracker] = useState(false);

    const bookSuccess = () => toast('Your Booking is Successful');
    const notify = () => toast("You Must be Logged in first!");



    const { register, handleSubmit, formState: { errors } } = useForm();
    function togglePopup() {
        setOpen(!open);
    }

    function togglePopupphone() {
        setopenPhone(!openPhone);
    }

    async function submitPan() {
        const { data } = await axios.post(`/pan/new/${user._id}`, { pan });
        setThePan(data);
        togglePopup();
    }


    async function verifyOtp() {
        const { data } = await axios.post(`/phone/verify/${otp}`, { thePhone });
        if (data === true) {
            setoptTracker(true);
            togglePopupphone();
        }
        else {
            setshowerror(true);
        }
    }

    async function submitPhone() {
        const { data } = await axios.post(`/phone/${user._id}/new`, { phone });
        setThePhone(data);
        togglePopupphone();
    }

    useEffect(() => {
        async function fetchPan() {
            if (user) {
                const { data } = await axios.get(`/pan/details/${user._id}`);
                setThePan(data);
            }
        };
        fetchPan();
    }, []);


    useEffect(() => {
        async function fetchPhone() {
            setThePhone(user);
        };
        fetchPhone();
    }, []);


    useEffect(() => {
        function isNumber() {
            if (thePhone && thePhone.phone) {
                setphoneButtonText('Added');
                setisDisabledphone(true);
            }
            else {
                setphoneButtonText('Add');
            }
        };
        isNumber();
    }, [thePhone]);


    useEffect(() => {
        async function isPan() {
            if (thePan.pan) {
                setButtonText('Added');
                setisDisabled(true);
            }
            else {
                setButtonText('Add')
            }
        }
        isPan();
    }, [thePan])


    useEffect(() => {
        async function changeButtonText() {
            if (track.length > 0) {
                setButtonText('Added');
                setisDisabled(true);
            }
        };
        changeButtonText();
    }, [track])



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







    async function submitForm() {
        try {
            if (!user) {
                notify();
                navigate('/login');
            }
            else {
                const { data } = await axios.post(`/booking`, {
                    place: place._id, checkin, checkout, guests, name, price: place.price
                });
                setbookingdata(data);
                setRedirect(true);
            }

        }
        catch (e) {
            console.log(e);
        }
    }


    if (redirect && user) {
        bookSuccess();
        navigate('/booking/payment/success', { state: { place, checkin, checkout, guests, name, price: place.price } });
    }

    if (redirect && !user) {
        notify();
        navigate('/login')
    }


    return (
        <div className="mt-10 p-6 flex lg:translate-x-36">
            <div className="grid grid-cols-1 lg:grid-cols-2 px-6 gap-14">
                <div className=" md:p-14 lg:block lg:order-1 hidden">
                    <div className="flex gap-6 ">

                        <Link to={`/`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                            </svg>

                        </Link>

                        <h1 className="text-2xl font-semibold">Request to Book</h1>

                    </div>
                    <div className="border mt-8 p-6 rounded-xl shadow shadow-md">
                        <p className="font-semibold">This is a rare find.</p>
                        <p><b>{location.state.place.owner.username.toUpperCase()}</b>'s place is usually booked.</p>
                        <div className="flex w-full justify-end text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ">
                                <path fillRule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <h1 className="text-xl font-semibold mt-8">Your Trip</h1>
                    <h2 className="font-semibold mt-6">Dates</h2>
                    <h3 className="mt-1">{formattingDates(location.state.checkin)} - {formattingDates(location.state.checkout)}</h3>
                    <h1 className="text-xl font-semibold mt-8">Guests</h1>
                    <h3 className="mt-1">{location.state.guests} {location.state.guests > 1 ? 'guests' : 'guest'}</h3>
                    <div className="mt-6 mb-6">
                        <hr />
                    </div>
                    <div className="flex justify-between items-center">
                        <h1>Pay With</h1>
                        <div className="flex gap-8 items-center ">
                            <div>
                                <svg className="object-" xmlns="http://www.w3.org/2000/svg" width="40" height="48" fill="none" id="mastercard"><path fill="#fff" d="M24 48c13.255 0 24-10.745 24-24S37.255 0 24 0 0 10.745 0 24s10.745 24 24 24Z"></path><path fill="#F79F1A" d="M38.379 24.116c0 4.923-3.983 8.913-8.897 8.913s-8.897-3.99-8.897-8.913 3.983-8.914 8.897-8.914 8.897 3.99 8.897 8.914Z"></path><path fill="#EA001B" d="M27.403 24.116c0 4.923-3.983 8.913-8.897 8.913-4.913 0-8.897-3.99-8.897-8.913s3.984-8.914 8.897-8.914c4.914 0 8.897 3.99 8.897 8.914Z"></path><path fill="#FF5F01" d="M23.994 17.099a8.902 8.902 0 0 0-3.408 7.016 8.905 8.905 0 0 0 3.408 7.018 8.906 8.906 0 0 0 3.409-7.018 8.902 8.902 0 0 0-3.409-7.016Z"></path></svg>
                            </div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 48 48" height='40' width='40' viewBox="0 0 48 48" id="visa"><polygon fill="#1565c0" points="17.202 32.269 21.087 32.269 23.584 16.732 19.422 16.732"></polygon><path fill="#1565c0" d="M13.873 16.454l-3.607 11.098-.681-3.126c-1.942-4.717-5.272-6.659-5.272-6.659l3.456 14.224h4.162l5.827-15.538H13.873zM44.948 16.454h-4.162l-6.382 15.538h3.884l.832-2.22h4.994l.555 2.22H48L44.948 16.454zM39.954 26.997l2.22-5.826 1.11 5.826H39.954zM28.855 20.893c0-.832.555-1.665 2.497-1.665 1.387 0 2.775 1.11 2.775 1.11l.832-3.329c0 0-1.942-.832-3.607-.832-4.162 0-6.104 2.22-6.104 4.717 0 4.994 5.549 4.162 5.549 6.659 0 .555-.277 1.387-2.497 1.387s-3.884-.832-3.884-.832l-.555 3.329c0 0 1.387.832 4.162.832 2.497.277 6.382-1.942 6.382-5.272C34.405 23.113 28.855 22.836 28.855 20.893z"></path><path fill="#ff9800" d="M9.711,25.055l-1.387-6.936c0,0-0.555-1.387-2.22-1.387c-1.665,0-6.104,0-6.104,0
	S8.046,19.229,9.711,25.055z"></path></svg>
                            </div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width='40' height='40' viewBox="0 0 1024 466" id="upi"><path fill="#3d3d3c" d="M98.1 340.7h6.3l-5.9 24.5c-.9 3.6-.7 6.4.5 8.2 1.2 1.8 3.4 2.7 6.7 2.7 3.2 0 5.9-.9 8-2.7 2.1-1.8 3.5-4.6 4.4-8.2l5.9-24.5h6.4l-6 25.1c-1.3 5.4-3.6 9.5-7 12.2-3.3 2.7-7.7 4.1-13.1 4.1-5.4 0-9.1-1.3-11.1-4s-2.4-6.8-1.1-12.2l6-25.2zm31.4 40.3 10-41.9 19 24.6c.5.7 1 1.4 1.5 2.2.5.8 1 1.7 1.6 2.7l6.7-27.9h5.9l-10 41.8-19.4-25.1-1.5-2.1c-.5-.8-.9-1.5-1.2-2.4l-6.7 28h-5.9zm44.2 0 9.6-40.3h6.4l-9.6 40.3h-6.4zm15.5 0 9.6-40.3h21.9l-1.3 5.6h-15.5l-2.4 10H217l-1.4 5.7h-15.5l-4.5 18.9h-6.4zm29 0 9.6-40.3h6.4l-9.6 40.3h-6.4zm15.5 0 9.6-40.3h21.9l-1.3 5.6h-15.5l-2.4 10.1h15.5l-1.4 5.7h-15.5l-3.1 13H257l-1.4 5.9h-21.9zm29.3 0 9.6-40.3h8.6c5.6 0 9.5.3 11.6.9 2.1.6 3.9 1.5 5.3 2.9 1.8 1.8 3 4.1 3.5 6.8.5 2.8.3 6-.5 9.5-.9 3.6-2.2 6.7-4 9.5-1.8 2.8-4.1 5-6.8 6.8-2 1.4-4.2 2.3-6.6 2.9-2.3.6-5.8.9-10.4.9H263zm7.8-6h5.4c2.9 0 5.2-.2 6.8-.6 1.6-.4 3-1.1 4.3-2 1.8-1.3 3.3-2.9 4.5-4.9 1.2-1.9 2.1-4.2 2.7-6.8.6-2.6.8-4.8.5-6.7-.3-1.9-1-3.6-2.2-4.9-.9-1-2-1.6-3.5-2-1.5-.4-3.8-.6-7.1-.6h-4.6l-6.8 28.5zm59.7-12.1-4.3 18.1h-6l9.6-40.3h9.7c2.9 0 4.9.2 6.2.5 1.3.3 2.3.8 3.1 1.6 1 .9 1.7 2.2 2 3.8.3 1.6.2 3.3-.2 5.2-.5 1.9-1.2 3.7-2.3 5.3-1.1 1.6-2.4 2.9-3.8 3.8-1.2.7-2.5 1.3-3.9 1.6-1.4.3-3.6.5-6.4.5h-3.7zm1.7-5.4h1.6c3.5 0 6-.4 7.4-1.2 1.4-.8 2.3-2.2 2.8-4.2.5-2.1.2-3.7-.8-4.5-1.1-.9-3.3-1.3-6.6-1.3H335l-2.8 11.2zm40.1 23.5-2-10.4h-15.6l-7 10.4H341l29-41.9 9 41.9h-6.7zm-13.8-15.9h10.9l-1.8-9.2c-.1-.6-.2-1.3-.2-2-.1-.8-.1-1.6-.1-2.5-.4.9-.8 1.7-1.3 2.5-.4.8-.8 1.5-1.2 2.1l-6.3 9.1zm29.7 15.9 4.4-18.4-8-21.8h6.7l5 13.7c.1.4.2.8.4 1.4.2.6.3 1.2.5 1.8l1.2-1.8c.4-.6.8-1.1 1.2-1.6l11.7-13.5h6.4L399 362.5l-4.4 18.4h-6.4zm60.9-19.9c0-.3.1-1.2.3-2.6.1-1.2.2-2.1.3-2.9-.4.9-.8 1.8-1.3 2.8-.5.9-1.1 1.9-1.8 2.8l-15.4 21.5-5-21.9c-.2-.9-.4-1.8-.5-2.6-.1-.8-.2-1.7-.2-2.5-.2.8-.5 1.7-.8 2.7-.3.9-.7 1.9-1.2 2.9l-9 19.8h-5.9l19.3-42 5.5 25.4c.1.4.2 1.1.3 2 .1.9.3 2.1.5 3.5.7-1.2 1.6-2.6 2.8-4.4.3-.5.6-.8.7-1.1l17.4-25.4-.6 42h-5.9l.5-20zm10.6 19.9 9.6-40.3h21.9l-1.3 5.6h-15.5l-2.4 10.1h15.5l-1.4 5.7h-15.5l-3.1 13H483l-1.4 5.9h-21.9zm29.2 0 10-41.9 19 24.6c.5.7 1 1.4 1.5 2.2.5.8 1 1.7 1.6 2.7l6.7-27.9h5.9l-10 41.8-19.4-25.1-1.5-2.1c-.5-.8-.9-1.5-1.2-2.4l-6.7 28h-5.9zm65.1-34.8-8.3 34.7h-6.4l8.3-34.7h-10.4l1.3-5.6h27.2l-1.3 5.6H554zm6.7 26.7 5.7-2.4c.1 1.8.6 3.2 1.7 4.1 1.1.9 2.6 1.4 4.6 1.4 1.9 0 3.5-.5 4.9-1.6 1.4-1.1 2.3-2.5 2.7-4.3.6-2.4-.8-4.5-4.2-6.3-.5-.3-.8-.5-1.1-.6-3.8-2.2-6.2-4.1-7.2-5.9-1-1.8-1.2-3.9-.6-6.4.8-3.3 2.5-5.9 5.2-8 2.7-2 5.7-3.1 9.3-3.1 2.9 0 5.2.6 6.9 1.7 1.7 1.1 2.6 2.8 2.9 4.9l-5.6 2.6c-.5-1.3-1.1-2.2-1.9-2.8-.8-.6-1.8-.9-3-.9-1.7 0-3.2.5-4.4 1.4-1.2.9-2 2.1-2.4 3.7-.6 2.4 1.1 4.7 5 6.8.3.2.5.3.7.4 3.4 1.8 5.7 3.6 6.7 5.4 1 1.8 1.2 3.9.6 6.6-.9 3.8-2.8 6.8-5.7 9.1-2.9 2.2-6.3 3.4-10.3 3.4-3.3 0-5.9-.8-7.7-2.4-2-1.6-2.9-3.9-2.8-6.8zm47.1 8.1 9.6-40.3h6.4l-9.6 40.3h-6.4zm15.6 0 10-41.9 19 24.6c.5.7 1 1.4 1.5 2.2.5.8 1 1.7 1.6 2.7l6.7-27.9h5.9l-10 41.8-19.4-25.1-1.5-2.1c-.5-.8-.9-1.5-1.2-2.4l-6.7 28h-5.9zm65.1-34.8-8.3 34.7h-6.4l8.3-34.7h-10.4l1.3-5.6h27.2l-1.3 5.6h-10.4zm6.9 34.8 9.6-40.3h22l-1.3 5.6h-15.5l-2.4 10.1h15.5l-1.4 5.7h-15.5l-3.1 13h15.5l-1.4 5.9h-22zm39.5-18.1-4.3 18h-6l9.6-40.3h8.9c2.6 0 4.6.2 5.9.5 1.4.3 2.5.9 3.3 1.7 1 1 1.6 2.2 1.9 3.8.3 1.5.2 3.2-.2 5.1-.8 3.2-2.1 5.8-4.1 7.6-2 1.8-4.5 2.9-7.5 3.3l9.1 18.3h-7.2l-8.7-18h-.7zm1.6-5.1h1.2c3.4 0 5.7-.4 7-1.2 1.3-.8 2.2-2.2 2.7-4.3.5-2.2.3-3.8-.7-4.7-1-.9-3.1-1.4-6.3-1.4h-1.2l-2.7 11.6zm18.9 23.2 9.6-40.3h21.9l-1.3 5.6h-15.5l-2.4 10h15.5l-1.4 5.7h-15.5l-4.5 18.9h-6.4zm52.8 0-2-10.4h-15.6l-7 10.4h-6.7l29-41.9 9 41.9h-6.7zm-13.9-15.9h10.9l-1.8-9.2c-.1-.6-.2-1.3-.2-2-.1-.8-.1-1.6-.1-2.5-.4.9-.8 1.7-1.3 2.5-.4.8-.8 1.5-1.2 2.1l-6.3 9.1zm62.2-14.6c-1.4-1.6-3.1-2.8-4.9-3.5-1.8-.8-3.8-1.2-6.1-1.2-4.3 0-8.1 1.4-11.5 4.2-3.4 2.8-5.6 6.5-6.7 11-1 4.3-.6 7.9 1.4 10.8 1.9 2.8 4.9 4.2 8.9 4.2 2.3 0 4.6-.4 6.9-1.3 2.3-.8 4.6-2.1 7-3.8l-1.8 7.4c-2 1.3-4.1 2.2-6.3 2.8-2.2.6-4.4.9-6.8.9-3 0-5.7-.5-8-1.5s-4.2-2.5-5.7-4.5c-1.5-1.9-2.4-4.2-2.8-6.8-.4-2.6-.3-5.4.5-8.4.7-3 1.9-5.7 3.5-8.3 1.6-2.6 3.7-4.9 6.1-6.8 2.4-2 5-3.5 7.8-4.5s5.6-1.5 8.5-1.5c2.3 0 4.4.3 6.4 1 1.9.7 3.7 1.7 5.3 3.1l-1.7 6.7zm.6 30.5 9.6-40.3h21.9l-1.3 5.6h-15.5l-2.4 10.1h15.5l-1.4 5.7H868l-3.1 13h15.5L879 381h-21.9z"></path><path fill="#70706e" d="M740.7 305.6h-43.9l61-220.3h43.9l-61 220.3zM717.9 92.2c-3-4.2-7.7-6.3-14.1-6.3H462.6l-11.9 43.2h219.4l-12.8 46.1H481.8v-.1h-43.9l-36.4 131.5h43.9l24.4-88.2h197.3c6.2 0 12-2.1 17.4-6.3 5.4-4.2 9-9.4 10.7-15.6l24.4-88.2c1.9-6.6 1.3-11.9-1.7-16.1zm-342 199.6c-2.4 8.7-10.4 14.8-19.4 14.8H130.2c-6.2 0-10.8-2.1-13.8-6.3-3-4.2-3.7-9.4-1.9-15.6l55.2-198.8h43.9l-49.3 177.6h175.6l49.3-177.6h43.9l-57.2 205.9z"></path><path fill="#098041" d="M877.5 85.7 933 196.1 816.3 306.5z"></path><path fill="#e97626" d="M838.5 85.7 894 196.1 777.2 306.5z"></path></svg>
                            </div>
                        </div>
                    </div>
                    <div className="border px-5 rounded-xl mt-3">
                        <select name="" id="" className="w-full p-4 outline-none" value={value} onChange={ev => setValue(ev.target.value)}>
                            <option value="upi">
                                <h1>UPI</h1>
                            </option>
                            <option value="card">Credit or Debit Card</option>
                        </select>
                    </div>
                    {value === 'upi' && (
                        <div className="border p-1 rounded-xl mt-3">
                            <input type="text" name='vpas' {...register('vpas', { required: true })} value={vpa} onChange={e => setvpa(e.target.value)} placeholder="virtual payment address" className="border-none outline-none" />
                            {errors.vpas && <p className="text-red-500 mt-2">VPA is Required.</p>}
                        </div>
                    )}
                    {value === 'card' && (
                        <div>
                            <div className="border p-1 rounded-tl-xl rounded-b-none rounded-tr-xl mt-3">
                                <p className="text-sm text-gray-600 mx-3 mt-3">Card Number</p>
                                <input type="text" maxLength="16" value={cardNumber} onKeyDown={(e) => {
                                    const input = e.target;
                                    const key = e.key;
                                    if (!isNaN(key) && key !== ' ') {
                                        if (input.value.length % 5 === 0) {
                                            input.value += ' ';
                                        }
                                    }
                                    else {
                                        if (key !== 'Backspace') {
                                            e.preventDefault();
                                        }
                                    }
                                }} onChange={e => setCardNumber(e.target.value)} placeholder="1234 5678 9012" className="border-none outline-none" />
                            </div>
                            <div className="border rounded-bl-xl py-5 rounded-br-xl grid grid-cols-2 gap-0">
                                <div className="border-r ">
                                    <p className="text-gray-600 mx-3 text-sm">Expiration</p>
                                    <input type="text" maxLength="5" value={expiry} onChange={e => setexpiry(e.target.value)} onKeyDown={(e) => {
                                        const input = e.target;
                                        const key = e.key;
                                        if (!isNaN(key) && key !== ' ') {
                                            if (input.value.length === 2) {
                                                input.value += '/';
                                            }
                                        }
                                        else {
                                            if (key !== 'Backspace') {
                                                e.preventDefault();
                                            }
                                        }
                                    }} placeholder="MM/YY" className="border-none outline-none p-none m-none" />
                                </div>
                                <div>
                                    <p className="text-gray-600 mx-3 text-sm">CVV</p>
                                    <input type="password" value={cvv} onChange={e => setcvv(e.target.value)} maxLength="3" placeholder="3 digits" className="border-none outline-none p-none -mt-2" />
                                </div>
                            </div>
                            <div className="border p-1 rounded-xl mt-3">
                                <input type="text" value={cardHolderName} onChange={e => setCardHolderName(e.target.value)} placeholder="cardholder name" className="border-none outline-none" />
                            </div>
                        </div>
                    )}
                    <div className="mt-10">
                        <h1 className="text-xl font-semibold">Required for your Trip</h1>
                        <div className="flex justify-between items-center mt-5">
                            <h1 className="font-semibold">Permanent Account Number (PAN)</h1>
                            <button disabled={isDisabled} onClick={togglePopup} className={`border px-3 py-2 rounded-xl font-medium border-black ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}>{buttonText}</button>
                        </div>
                        <PanPopUp panSubmit={submitPan} open={open} setOpen={setOpen} />
                        <p className="w-4/5 text-sm">A valid PAN is required per Reserve Bank of India (RBI) regulations.</p>
                        {thePan.pan && (
                            <div className="mt-2"><p>Your PAN : <b>{thePan.pan.Uid}</b></p></div>
                        )}
                        <div className="flex justify-between items-center mt-5">
                            <h1 className="font-semibold">Phone Number</h1>
                            <button disabled={isDisabledphone} onClick={togglePopupphone} className={`border px-3 py-2 rounded-xl font-medium border-black ${isDisabledphone ? 'opacity-50 cursor-not-allowed' : ''}`}>{phonebuttonText}</button>

                        </div>
                        <PhonePop open={openPhone} setOpen={setopenPhone} phoneSubmit={submitPhone} />
                        <p className="w-4/5 text-sm">Add and confirm your phone number to get trip updates.</p>
                    </div>
                    {thePhone && thePhone.phone && (
                        <div className="mt-2">
                            <p>Your Number : <b>{thePhone.phone}</b></p>
                        </div>
                    )}
                    {thePhone && thePhone.length > 10 && (
                        <div>
                            <Otp verifyOtp={verifyOtp} requestID={thePhone} />
                        </div>
                    )}
                    {otpTracker === true && (
                        <div className="mt-3">
                            <p>Your Phone: <b>{phone}</b></p>
                        </div>
                    )}
                    <div className="mt-10 mb-10">
                        <hr />
                    </div>
                    <div className="text-gray-600">
                        <h1 className="text-xl text-black font-semibold">Ground Rules</h1>
                        <p className="mt-3">We ask every guest to remember a few simple things about what makes a great guest.</p>
                        <div className="mt-4">
                            <li>Follow the house rules</li>
                            <li className="mt-3">Treat your Host’s home like your own</li>
                        </div>
                    </div>
                    <div className="mt-12 mb-8">
                        <hr />
                    </div>
                    <div className="mt-16">
                        <p className="text-xs mb-8">By selecting the button below, I agree to the <span className="underline font-semibold">Host's House Rules</span>, <span className="underline font-semibold">Ground rules for guests</span>, <span className="underline font-semibold">Fonzzi's Rebooking and Refund Policy</span> and that Fonzzi can <span className="underline font-semibold">charge my payment method</span> if I’m responsible for damage. I agree to pay the total amount shown if the Host accepts my booking request.</p>
                        <button onClick={submitForm} className="border p-3 w-2/3 rounded-2xl bg-seventh text-eighth ">Book this Place</button>
                    </div>
                </div>
                <div className="border p-4 rounded-xl lg:block lg:order-2 hidden h-2/6 mt-20 w-3/5">
                    <div className="flex gap-5 p-1">
                        <img className="w-28 h-28 object-cover rounded-xl" src={'http://localhost:3000/uploads/' + location.state.place.photos[0]} alt="" />
                        <div>
                            <p className="font-semibold">{place.title}</p>
                            <p className="mt-1">Room in rental unit</p>
                            <div className="flex gap-4 items-center mt-1">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                </svg>
                                <p className="font-semibold">4.89</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-7 mb-7">
                        <hr />
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold">Price Details</h1>
                        <div className="flex justify-between mt-3 text-gray-600">
                            <p>₹{location.state.price} x {location.state.numberofDays}</p>
                            <p>₹{location.state.price * location.state.numberofDays}</p>
                        </div>
                        <div className="flex justify-between mt-3 text-gray-600">
                            <p className="underline">Cleaning fee</p>
                            <p>₹1200</p>
                        </div>
                        <div className="flex justify-between mt-3 text-gray-600">
                            <p className="underline">Taxes</p>
                            <p>₹1100</p>
                        </div>
                    </div>
                    <div className="mt-12">
                        <hr />
                    </div>
                    <div className="mt-8 flex justify-between">
                        <p className="font-semibold">Total(INR)</p>
                        <p className="font-semibold">₹{location.state.price * location.state.numberofDays + 1200 + 1100}</p>
                    </div>
                </div>
            </div>

            <div className="lg:hidden block w-full -mt-14 relative ">
                <Link to={'/'} className="absolute -top-2 -left-14 border px-4 py-2 rounded-xl shadow shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg></Link>
                <h1 className="font-semibold text-center">Request to Book</h1>
                <div className="flex gap-6 items-center -mx-14 mt-14">
                    <img className="w-28 h-28 object-cover rounded-xl" src={'http://localhost:3000/uploads/' + location.state.place.photos[0]} alt="" />
                    <div>
                        <p className="font-semibold">{place.title}</p>
                        <p className="mt-1 text-gray-600">Room in rental unit</p>
                        <div className="flex gap-2 items-center mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                            </svg>
                            <p className="font-semibold">4.89</p>
                        </div>
                    </div>
                </div>
                <div className="lg:hidden mt-10 -mx-14 border-b-4 border-gray-300 block w-full">
                </div>
                <div className="lg:hidden mt-5 -mx-14 border-b-4 border-gray-300 block w-full">
                    <h1 className="text-xl font-semibold mt-8">Your Trip</h1>
                    <h2 className="font-semibold mt-6">Dates</h2>
                    <h3 className="mt-1">{formattingDates(location.state.checkin)} - {formattingDates(location.state.checkout)}</h3>
                    <h1 className="text-xl font-semibold mt-8">Guests</h1>
                    <h3 className="mt-1 mb-6">{location.state.guests} {location.state.guests > 1 ? 'guests' : 'guest'}</h3>
                </div>
                <div className="lg:hidden mt-5 -mx-14 border-b-4 border-gray-300 block w-full">
                    <h1 className="text-xl font-semibold">Price Details</h1>
                    <div className="flex justify-between mt-3 text-gray-600">
                        <p>₹{location.state.price} x {location.state.numberofDays}</p>
                        <p>₹{location.state.price * location.state.numberofDays}</p>
                    </div>
                    <div className="flex justify-between mt-3 text-gray-600">
                        <p className="underline">Cleaning fee</p>
                        <p>₹1200</p>
                    </div>
                    <div className="flex justify-between mt-3 text-gray-600">
                        <p className="underline">Taxes</p>
                        <p>₹1100</p>
                    </div>
                    <div className="mt-3 flex justify-between mb-6">
                        <p className="font-semibold">Total(INR)</p>
                        <p className="font-semibold">₹{location.state.price * location.state.numberofDays + 1200 + 1100}</p>
                    </div>
                </div>
                <h1 className="-mx-12 mt-4 text-lg font-semibold">Pay With</h1>
                <div className="border px-5 rounded-xl mt-3 lg:hidden mt-5 -mx-14 border-b-4  block w-full">
                    <select name="" id="" className="w-full p-4 outline-none" value={value} onChange={ev => setValue(ev.target.value)}>
                        <option value="upi">
                            <h1>UPI</h1>
                        </option>
                        <option value="card">Credit or Debit Card</option>
                    </select>
                </div>
                {value === 'upi' && (
                    <div className="border p-1 rounded-xl mt-3 -mx-14 w-full">
                        <input type="text" name='vpas' {...register('vpas', { required: true })} value={vpa} onChange={e => setvpa(e.target.value)} placeholder="virtual payment address" className="border-none outline-none" />
                        {errors.vpas && <p className="text-red-500 mt-2">VPA is Required.</p>}
                    </div>
                )}
                {value === 'card' && (
                    <div>
                        <div className="border p-1 -mx-14 w-full rounded-tl-xl rounded-b-none rounded-tr-xl mt-3">
                            <p className="text-sm text-gray-600 mx-3 mt-3">Card Number</p>
                            <input type="text" maxLength="16" value={cardNumber} onKeyDown={(e) => {
                                const input = e.target;
                                const key = e.key;
                                if (!isNaN(key) && key !== ' ') {
                                    if (input.value.length % 5 === 0) {
                                        input.value += ' ';
                                    }
                                }
                                else {
                                    if (key !== 'Backspace') {
                                        e.preventDefault();
                                    }
                                }
                            }} onChange={e => setCardNumber(e.target.value)} placeholder="1234 5678 9012" className="border-none outline-none" />
                        </div>
                        <div className="border -mx-14 w-full rounded-bl-xl py-5 rounded-br-xl grid grid-cols-2 gap-0">
                            <div className="border-r ">
                                <p className="text-gray-600 mx-3 text-sm">Expiration</p>
                                <input type="text" maxLength="5" value={expiry} onChange={e => setexpiry(e.target.value)} onKeyDown={(e) => {
                                    const input = e.target;
                                    const key = e.key;
                                    if (!isNaN(key) && key !== ' ') {
                                        if (input.value.length === 2) {
                                            input.value += '/';
                                        }
                                    }
                                    else {
                                        if (key !== 'Backspace') {
                                            e.preventDefault();
                                        }
                                    }
                                }} placeholder="MM/YY" className="border-none outline-none p-none m-none" />
                            </div>
                            <div>
                                <p className="text-gray-600 mx-3 text-sm">CVV</p>
                                <input type="password" value={cvv} onChange={e => setcvv(e.target.value)} maxLength="3" placeholder="3 digits" className="border-none outline-none p-none -mt-2" />
                            </div>
                        </div>
                        <div className="border p-1 -mx-14 w-full rounded-xl mt-3">
                            <input type="text" value={cardHolderName} onChange={e => setCardHolderName(e.target.value)} placeholder="cardholder name" className="border-none outline-none mb-6" />
                        </div>
                    </div>
                )}
                <div className="mt-10 -mx-14 w-full">
                    <h1 className="text-xl font-semibold">Required for your Trip</h1>
                    <div className="flex justify-between items-center mt-5">
                        <h1 className="font-semibold">Permanent Account Number (PAN)</h1>
                        <button disabled={isDisabled} onClick={togglePopup} className={`border px-3 py-2 rounded-xl font-medium border-black ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}>{buttonText}</button>
                    </div>
                    <PanPopUp panSubmit={submitPan} open={open} setOpen={setOpen} />
                    <p className="w-4/5 text-sm">A valid PAN is required per Reserve Bank of India (RBI) regulations.</p>
                    {thePan.pan && (
                        <div className="mt-2"><p>Your PAN : <b>{thePan.pan.Uid}</b></p></div>
                    )}
                    <div className="flex justify-between items-center mt-5">
                        <h1 className="font-semibold">Phone Number</h1>
                        <button disabled={isDisabledphone} onClick={togglePopupphone} className={`border px-3 py-2 rounded-xl font-medium border-black ${isDisabledphone ? 'opacity-50 cursor-not-allowed' : ''}`}>{phonebuttonText}</button>

                    </div>
                    <PhonePop open={openPhone} setOpen={setopenPhone} phoneSubmit={submitPhone} />
                    <p className="w-4/5 text-sm">Add and confirm your phone number to get trip updates.</p>
                </div>
                {thePhone && thePhone.phone && (
                    <div className="mt-2 -mx-14 w-full">
                        <p>Your Number : <b>{thePhone.phone}</b></p>
                    </div>
                )}
                {thePhone && thePhone.length > 10 && (
                    <div>
                        <Otp verifyOtp={verifyOtp} requestID={thePhone} />
                    </div>
                )}
                {otpTracker === true && (
                    <div className="mt-3">
                        <p>Your Phone: <b>{phone}</b></p>
                    </div>
                )}
                <div className="text-gray-600 mt-12 -mx-14 w-full">
                        <h1 className="text-xl text-black font-semibold">Ground Rules</h1>
                        <p className="mt-3 text-sm">We ask every guest to remember a few simple things about what makes a great guest.</p>
                        <div className="mt-4 text-sm">
                            <li>Follow the house rules</li>
                            <li className="mt-3">Treat your Host’s home like your own</li>
                        </div>
                    </div>
                    <div className="mt-12 mb-8 -mx-14 w-full">
                        <hr />
                    </div>
                    <div className="mt-16 -mx-14 w-full">
                        <p className="text-xs mb-8">By selecting the button below, I agree to the <span className="underline font-semibold">Host's House Rules</span>, <span className="underline font-semibold">Ground rules for guests</span>, <span className="underline font-semibold">Fonzzi's Rebooking and Refund Policy</span> and that Fonzzi can <span className="underline font-semibold">charge my payment method</span> if I’m responsible for damage. I agree to pay the total amount shown if the Host accepts my booking request.</p>
                        <button onClick={submitForm} className="border p-3 w-2/3 rounded-2xl bg-seventh text-eighth ">Book this Place</button>
                    </div>
            </div>
        </div>
    )
};

