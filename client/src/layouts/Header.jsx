import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../pages/userContext";
import { useContext, useState, useEffect } from "react";
import { LayoutContext } from "../Layout";
import HeaderCheckin from "../pages/HeaderCheckin";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
export default function Header() {
  const { user, setUser, pictures, confirm, setConfirm } = useContext(UserContext);
<<<<<<< HEAD
  const { searchDest, setSearchDest, startDate, endDate, availablePlaces, setAvailablePlaces, setStartDate, setEnddate } = useContext(LayoutContext);
=======
  const { searchDest, setSearchDest, startDate, endDate, unbookedPlaces, setUnbookedPlaces, number, setNumber } = useContext(LayoutContext);
>>>>>>> newone
  const [isOpen, setisOpen] = useState(false);
  const [redirectFavourites, setRedirectFavourites] = useState(false);
  const [start, setStart] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
<<<<<<< HEAD
  const fetchSuccess = () => toast(`Showing ${count} Places are available according to your dates!!!`);
=======
  const fetchSuccess = () => toast(`Showing Places are available according to your dates!!!`);
>>>>>>> newone
  const loginAlert = () => toast('You Must be Logged in First');


  const [toRedirect, setToRedirect] = useState(false);
  const togglePopup = () => {
    setisOpen(!isOpen);
  };
  useEffect(() => {
    if (!user) {
      axios.get('/profile').then(({ data }) => {
        setUser(data);
      })
    }
  }, []);

  useEffect(() => {
    async function fetchUser() {
      const { data } = await axios.get('/profile');
      setUser(data);
    };
    fetchUser();
  }, [confirm]);


  let count = ''
  //below useEffect is used to reset the value of redirectFavourites!!!

  useEffect(() => {
    if (redirectFavourites) {
      setRedirectFavourites(false);
    }
  }, [start]);


  useEffect(() => {
    if (redirectFavourites) {
      setisOpen(!isOpen);
      setStart(!start);
    }
  }, [redirectFavourites]);


  const handleNavigation = () => {
    setRedirectFavourites(true);
  }
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


  async function LogOut() {
    try {
      await axios.post('/logout')
      setToRedirect(true);
      handleNavigation();
    } catch (e) {
      console.log('Oh error while logging out');
    }
  };

  if (toRedirect) {
    setUser(null);
    if (location.pathname === '/account' || location.pathname === '/account/accomodations' || location.pathname === '/account/accomodations/addplace' || location.pathname === '/account/profile' || location.pathname === '/account/bookings') {
      return navigate('/');
    }
    setToRedirect(false);
  }


  const removingPages = location.pathname === '/ownerPage' || location.pathname === `/userProfile/${user ? user._id : ''}` || location.pathname === '/account/profile/navigations' || location.pathname === '/booking/payment' || location.pathname === '/booking/payment/success';
  if (removingPages) {
    return null
  }

  function loginfromPop() {
    handleNavigation();
    return navigate('/login');
  }

  async function handlesubmission(ev) {
    if (user) {
<<<<<<< HEAD

      const { data } = await axios.post('/isavailable', { startDate, endDate });
      setAvailablePlaces(data);
      count = data.length
=======
      const {data} = await axios.post('/checkinstatus', {startDate, endDate});
      if(data){
        setUnbookedPlaces(data);
      }
>>>>>>> newone
      fetchSuccess();
    }
    else {
      loginAlert();
      return navigate('/login');
    }
  }

  function removeEnddate(){
    setAvailablePlaces([]);
    setEnddate(null)
  }

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 overflow-y-auto no-scrollbar z-50">
          <div className="absolute inset-0"></div>
          <div className="absolute bg-white rounded-3xl p-6 bottom-0 lg:bottom-32 h-3/6 md:right-10 xl:w-1/5 md:h-4/6 min-w-md max-h-full p-20 overflow-y-scroll no-scrollbar z-70">
            <div className='relative sticky top-0'>
              <button onClick={togglePopup} className=" top-2 right-2 text-gray-600 hover:text-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div>
              <div className="p-3 mt-5">
                <Link to={'/account/profile'} onClick={handleNavigation} className="flex gap-5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                  </svg>
                  <h1>My Favourites</h1>
                </Link>
              </div>
              <div>
                <Link to={'/account/bookings'} onClick={handleNavigation} className="flex gap-5 mt-5 p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <h1>My Bookings</h1>
                </Link>
              </div>
              <div>
                <Link to={user ? '/account/myPosts' : '/login'} onClick={handleNavigation} className="flex gap-5 mt-6 p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                  </svg>
                  <h1>My Posts</h1>
                </Link>
              </div>
              <div>
                <Link to={'/user/profile/settings'} onClick={handleNavigation} className="flex gap-5 mt-6 p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
                  </svg>
                  <h1>Profile Settings</h1>
                </Link>
              </div>
              {user &&
                <div>
                  <Link to={`/userProfile/${user._id}`} onClick={handleNavigation} className="flex gap-5 mt-6 p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    <h1>Account Settings</h1>
                  </Link>
                </div>
              }
              {user ?
                <button onClick={LogOut} className="mx-10 bg-primary text-white mt-3 rounded-full absolute bottom-5 w-1/2 ">Log Out</button> :
                <button onClick={loginfromPop} className="mx-10 bg-primary w-8/12 text-white mt-3 rounded-full absolute bottom-5 w-1/2 ">Log In</button>}
            </div>
          </div>
        </div>)}
      <header className='flex lg:flex-row flex-col gap-5 m-6 justify-between'>
        <a className='flex items-center' href="">
          <span className='ml-4 text-2xl text-red-400'><b>Fonzzi</b></span>
        </a>
        {location.pathname === '/' && (
          <div className='mt-2 sm:flex gap-2 border hidden sm:block text-sm items-center sm:rounded-full px-8 py-2 2xl:w-2/5 shadow-md shadow-gray-400 '>
            <div className="w-2/5 border-r border-gray-400 flex"><form className="flex flex-col gap-0"><p className="text-xs mx-3"></p><p className="m-0"><input value={searchDest} onChange={(ev) => setSearchDest(ev.target.value)} type="text" placeholder='Search destinations' className="border-none placeholder-gray-500 ::placeholder outline-none bg-transparent px-0 py-0 m-0" /></p></form></div>
            <div className='border border-l border-gray-300'></div>
            <HeaderCheckin />
            <div className='border border-l border-gray-300'></div>
            <div className="w-1/5 border-r border-gray-400 flex gap-2">
              <button className="flex flex-col"><p className="text-xs">Check out</p><p className="text-gray-500">{endDate === null ? <p>add dates</p> : <p className="font-semibold text-black">{formattingDates(endDate)}</p>}</p></button>
              {endDate !== null && (
                <div>
                  <button onClick={removeEnddate}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
              </button>
                </div>
              )}
              
              </div>
            <div className='border border-l border-gray-300'></div>
            <div className="w-1/5"><button className="flex flex-col"><p className="text-xs">Who</p><p className="text-gray-500">Add guests</p></button></div>
            <button onClick={handlesubmission} className='bg-primary rounded-full p-4 text-white'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
              <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
            </svg>
            </button>
          </div>
        )}


        <div className="min-w-[395px] flex border rounded-xl px-4 items-center block sm:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <div className="flex gap-5 items-center w-full">
            <input value={searchDest} onChange={(ev) => setSearchDest(ev.target.value)} type="text" placeholder="Where to ?" className="border-none outline-none placeholder:text-sixth" />
            <div className="flex gap-3 mx-auto items-center border py-1 px-3 rounded-xl bg-primary text-white">
              <button onClick={togglePopup}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
              </svg>
              </button>
              <Link to={'/account/profile'}>
                {user && <img className="rounded-full aspect-square max-w-[40px] object-cover" src={user.profilepic ? 'http://localhost:3000/uploads/' + user.profilepic : pictures[4]} alt="" />}
              </Link>
              {user && (
                <div>
                  <p>
                    {user.preferredname ? user.preferredname : user.username}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <Link to={user ? '/account/profile' : '/login'} className='hidden lg:block lg:flex items-center gap-4 border rounded-full p-4 shadow-md shadow-gray-400'>
          <Link onClick={togglePopup} >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
            </svg>
          </Link>
          {user && <img className="rounded-full aspect-square max-w-[50px] object-cover" src={user && user.profilepic ? 'http://localhost:3000/uploads/' + user.profilepic : pictures[4]} alt="" />}
          {!user && <button>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-sixth">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          </button>}
          {user && (
            <div>
              <p>
                {user.preferredname ? user.preferredname : user.username}
              </p>
            </div>
          )}
        </Link>
      </header>
      <div className="mt-3 border-b mb-10"></div>
    </div>
  )
}