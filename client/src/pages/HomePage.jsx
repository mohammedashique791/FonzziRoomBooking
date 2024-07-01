import { useContext, useEffect, useState } from "react"
import { UserContext } from "./userContext"
import axios from "axios";
import { Link } from "react-router-dom";
import HomeShowing from "./HomeShowing";
import { LayoutContext } from "../Layout";
import FilterPop from "./FiltersPopUp";
export default function HomePage() {
  const { user } = useContext(UserContext);
<<<<<<< HEAD
  const { searchDest, setSearchDest, sortedPlaces, setFilteredPlaces, filteredPlaces, value, mininitalValue, maxInitialValue, darkmode, availablePlaces, setAvailablePlaces } = useContext(LayoutContext);
=======
  const { searchDest, setSearchDest, sortedPlaces, setFilteredPlaces, filteredPlaces, value, mininitalValue, maxInitialValue, darkmode, unbookedPlaces, setUnbookedPlaces } = useContext(LayoutContext);
>>>>>>> newone
  // if(!user){
  //   return <Navigate to={'/login'}/>
  // };

  const [places, setPlaces] = useState([]);
  const [result, setResult] = useState(null);

  const [users, setUsers] = useState([]);

  // render useEffect only for the initial time.
  useEffect(() => {
    async function showPlaces() {
      const { data } = await axios.get('/showPlaces');
      if (searchDest === 'undefined' || filteredPlaces === 'undefined') {
        alert('searchDest is undefined');
      }
      setPlaces(data);
      setResult(user);
    };
    showPlaces();
  }, []);

  useEffect(() => {
    if (filteredPlaces && filteredPlaces.length > 0) {
      async function filterfilteredResults() {
        const { data } = await axios.post('/searchafterFiltering/results', { filteredPlaces, searchDest });
      };
      filterfilteredResults();
    }
  }, [searchDest]);

  return (
    <div className={`${darkmode ? 'bg-[#121212] text-white w-full' : ''} p-2 `}>

      <div className="w-[40px] mx-16">
        <FilterPop />
      </div>
      

      <div className="min-w-[441px] grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-1 p-10">
<<<<<<< HEAD
        {filteredPlaces && filteredPlaces.length > 0 && searchDest.length > 0 && availablePlaces.length === 0 &&(
=======
      {unbookedPlaces && unbookedPlaces.length > 0 && (
          <>
            {unbookedPlaces.map((place)=>(
              <>
              <Link to={`/places/${place._id}`} className="flex flex-col p-4 cursor-pointer">
                <div className="relative flex w-65 h-60 bg-gray-300 mb-2 rounded-2xl">
                  {place.photos.length > 0 && (
                    <img className="rounded-2xl object-cover" src={'http://localhost:3000/uploads/' + place.photos[0]} alt='' />
                  )}
                  <div className="absolute right-3 top-3 text-white">
                    <HomeShowing place={place} user={user} />
                  </div>
                </div>
                <div className="font-semibold text-sm mt-1">
                  <h4>{place.location}</h4>
                </div>
                <p className="text-gray-600 mt-2">Stay with {place.owner.username}</p>
                <p className="mt-2"><b>₹{place.price}</b> night</p>
              </Link>
            </>
            ))}
          </>
        )}

        {filteredPlaces && filteredPlaces.length > 0 && searchDest.length > 0 && (
>>>>>>> newone
          <>
            {sortedPlaces.map((place) => (
              <>
                <Link to={`/places/${place._id}`} className="flex flex-col p-4 cursor-pointer">
                  <div className="relative flex w-65 h-60 bg-gray-300 mb-2 rounded-2xl">
                    {place.photos.length > 0 && (
                      <img className="rounded-2xl object-cover" src={'http://localhost:3000/uploads/' + place.photos[0]} alt='' />
                    )}
                    <div className="absolute right-3 top-3 text-white">
                      <HomeShowing place={place} user={user} />
                    </div>
                  </div>
                  <div className="font-semibold text-sm mt-1">
                    <h4>{place.location}</h4>
                  </div>
                  <p className="text-gray-600 mt-2">Stay with {place.owner.username}</p>
                  <p className="mt-2"><b>₹{place.price}</b> night</p>
                </Link>
              </>
            ))}
          </>
        )}

<<<<<<< HEAD
        {filteredPlaces && filteredPlaces.length > 0 && searchDest.length === 0 && availablePlaces.length === 0 &&(
=======
        

        {filteredPlaces && filteredPlaces.length > 0 && searchDest.length === 0 && (
>>>>>>> newone
          filteredPlaces.map((place) => (
            <>
              <Link to={`/places/${place._id}`} className="flex flex-col p-4 cursor-pointer">
                <div className="relative flex w-65 h-60 bg-gray-300 mb-2 rounded-2xl">
                  {place.photos.length > 0 && (
                    <img className="rounded-2xl object-cover" src={'http://localhost:3000/uploads/' + place.photos[0]} alt='' />
                  )}
                  <div className="absolute right-3 top-3 text-white">
                    <HomeShowing place={place} user={user} />
                  </div>
                </div>
                <div className="font-semibold text-sm mt-1">
                  <h4>{place.location}</h4>
                </div>
                <p className="text-gray-600 mt-2">Stay with {place.owner.username}</p>
                <p className="mt-2"><b>₹{place.price}</b> night</p>
              </Link>
            </>
          ))
        )}

        {filteredPlaces && filteredPlaces.length === 0 && value != '1' && (
          <>
            <p className="text-center font-semibold">No Places Found.</p>
          </>
        )}
<<<<<<< HEAD
        {!searchDest && filteredPlaces && value == '1' && mininitalValue == 2000 && maxInitialValue == 100000 && availablePlaces.length === 0 &&(
=======
        {!searchDest && unbookedPlaces.length === 0 && filteredPlaces && value == '1' && mininitalValue == 2000 && maxInitialValue == 100000 && (
>>>>>>> newone
          places.map((place) => (
            <>
              <Link to={`/places/${place._id}`} className="flex flex-col p-4 cursor-pointer">
                <div className="relative flex w-65 h-60 bg-gray-300 mb-2 rounded-2xl">
                  {place.photos.length > 0 && (
                    <img className="rounded-2xl object-cover" src={'http://localhost:3000/uploads/' + place.photos[0]} alt='' />
                  )}
                  <div className="absolute right-3 top-3 text-white">
                    <HomeShowing place={place} user={user} />
                  </div>
                </div>
                <div className="font-semibold text-sm mt-1">
                  <h4>{place.location}</h4>
                </div>
                <p className="text-gray-600 mt-2">Stay with {place.owner.username}</p>
                <p className="mt-2"><b>₹{place.price}</b> night</p>
              </Link>
            </>
          ))
        )}

        {availablePlaces && availablePlaces.length > 0 && (
          availablePlaces.map((place) => (
            <>
              <Link to={`/places/${place._id}`} className="flex flex-col p-4 cursor-pointer">
                <div className="relative flex w-65 h-60 bg-gray-300 mb-2 rounded-2xl">
                  {place.photos.length > 0 && (
                    <img className="rounded-2xl object-cover" src={'http://localhost:3000/uploads/' + place.photos[0]} alt='' />
                  )}
                  <div className="absolute right-3 top-3 text-white">
                    <HomeShowing place={place} user={user} />
                  </div>
                </div>
                <div className="font-semibold text-sm mt-1">
                  <h4>{place.location}</h4>
                </div>
                <p className="text-gray-600 mt-2">Stay with {place.owner.username}</p>
                <p className="mt-2"><b>₹{place.price}</b> night</p>
              </Link>
            </>
          ))
        )}

        {searchDest && searchDest.length > 0 && filteredPlaces && filteredPlaces.length === 0 && availablePlaces.length === 0 &&(
          sortedPlaces.map((place) => (
            <>
              <Link to={`/places/${place._id}`} className="flex flex-col p-4 cursor-pointer">
                <div className="relative flex w-65 h-60 bg-gray-300 mb-2 rounded-2xl">
                  {place.photos.length > 0 && (
                    <img className="rounded-2xl object-cover" src={'http://localhost:3000/uploads/' + place.photos[0]} alt='' />
                  )}
                  <div className="absolute right-3 top-3 text-white">
                    <HomeShowing place={place} user={user} />
                  </div>
                </div>
                <div className="font-semibold text-sm mt-1">
                  <h4>{place.location}</h4>
                </div>
                <p className="text-gray-600 mt-2">Stay with {place.owner.username}</p>
                <p className="mt-2"><b>₹{place.price}</b> night</p>
              </Link>
            </>
          ))
        )}
      </div>
      <div>
        {searchDest && searchDest.length > 0 && sortedPlaces && sortedPlaces.length === 0 && (
          <h1 className="text-center">No Accomodations found for <b>{searchDest}</b>.</h1>
        )}
      </div>
    </div>
  )
}

