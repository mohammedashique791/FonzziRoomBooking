import { useContext, useState, useEffect } from "react"
import { UserContext } from "./userContext"
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import Bookings from "./BookingsPage";
import PlacePage from "./Places";
import Profile from "./ProfilePage";
export default function Account() {
    const { user, ready, setUser } = useContext(UserContext);
    const [place, setPlace] = useState([]);
    const [toRedirect, setToRedirect] = useState(false);
    if (!user) {
        return <Navigate to={'/login'} />
    }
    if (!ready) {
        return '...Loading'
    }
    if (ready && !user) {
        return <Navigate to={'login'} />
    }

    async function LogOut() {
        try {
            await axios.post('/logout')
            setToRedirect(true);
        } catch (e) {
            console.log('Oh error while logging out');
        }
    }

    useEffect(() => {
        async function fetchProfile() {
            const { data } = await axios.get('/myPlaces');
            setPlace(data);
        };
        fetchProfile();
    }, []);




    const { subpages } = useParams();
    function SpotLight(type = null) {
        let classes = 'inline-flex  gap-2 p-2 px-7';
        if (type === subpages || (subpages === undefined && type === 'profile')) {
            classes += ' border bg-primary text-white rounded-full'
        }
        return classes;
    }
    if (toRedirect) {
        setUser(null);
        return <Navigate to={'/'} />
    }



    return (
        <div className="mb-40">
            <Link className="bg-primary px-2 py-2 rounded-full text-white mx-6" to={'/'}>Go to Home Page</Link>
            <nav className="w-full flex md:flex-row flex-col mt-3 p-6 justify-center gap-8 mb-8">
                <Link className={SpotLight('profile')} to={'/account/profile'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                    My Profile</Link>
                <Link className={SpotLight('bookings')} to={'/account/bookings'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                    </svg>

                    My Bookings</Link>
                <Link className={SpotLight('accomodations')} to={'/account/accomodations'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
                    </svg>

                    My Accomodations</Link>
            </nav>
            {subpages === 'profile' && (
                <Profile place={place} logout = {LogOut}/>
            )}
            {subpages === 'accomodations' && (
                <PlacePage />
            )}
            {subpages === 'bookings' && (
                <div>
                <Bookings />
                </div>
            )}
        </div>
    )
}