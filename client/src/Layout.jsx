import { Outlet } from "react-router-dom";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import { createContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
export const LayoutContext = createContext({});
export default function Layout(){
    const [darkmode, setdarkmode] = useState(false);
    const [searchDest, setSearchDest] = useState('');
    const [sortedPlaces, setSortedPlaces] = useState([]);
    const [perks, setPerks] = useState([]);
    const [otp, setotp] = useState('');
    const [newDate, setnewDate] = useState(null);
    const [track, setTrack] = useState(false);
    const [value, setValue] = useState('1');
    const [mininitalValue, setMinInitialValue] = useState(2000);
    const [maxInitialValue, setMaxInitialValue] = useState(100000);
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [checkin, setcheckin] = useState('');
    const [checkout, setcheckout] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEnddate] = useState(null);
    const [likes, setlikes] = useState(0);
    const [pan, setpan] = useState('');
    const [phone, setphone] = useState('');
    const [showerror, setshowerror] = useState(false);

    useEffect(() => {
        async function grabPlaceDetails() {
          try {
            if (searchDest.length > 0) {
              const { data } = await axios.get(`/placeDetails/${searchDest}`);
              setSortedPlaces(data);
            }
          }
          catch (e) {
            console.log(e);
          };
        };
        grabPlaceDetails();
      }, [searchDest]);

      useEffect(()=>{
        async function filterResults(){
            try {
                const { data } = await axios.post(`/results/getSorted`, {
                    mininitalValue, maxInitialValue, value, perks
                })
                setFilteredPlaces(data);
            }
            catch (e) {
                console.log(e);
            }
        };
        filterResults();
    }, [value, mininitalValue, maxInitialValue, perks]);
    

    async function filterResults() {
        try {
            const { data } = await axios.post(`/results/getSorted`, {
                mininitalValue, maxInitialValue, value, perks
            })
            setFilteredPlaces(data);
        }
        catch (e) {
            console.log(e);
        }
    }
      
    return(
        <LayoutContext.Provider value={{showerror, setshowerror, darkmode, setdarkmode,  otp, setotp, phone, setphone, pan, setpan, track, setTrack, likes, setlikes, searchDest, setSearchDest, sortedPlaces, perks, setPerks, value, setValue, mininitalValue, setMinInitialValue, maxInitialValue, setMaxInitialValue, filteredPlaces, setFilteredPlaces, checkin, setcheckin, checkout, setcheckout, newDate, setnewDate, startDate, setStartDate, endDate, setEnddate}}>
        <div className="p-3 flex flex-col relative min-h-screen">
            <Header/>
            <Outlet/>
            <Footer />
        </div>
        </LayoutContext.Provider>
    )
};