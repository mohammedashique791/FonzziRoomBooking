import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from 'react-toastify';
import { Navigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
export default function EditPage() {
    const [ourPlace, setOurPlace] = useState('');
    const { id } = useParams();
    const failure = () => toast("Error while Adding your Place");
    const [title, setTitle] = useState(ourPlace.title);
    const [price, setPrice] = useState(ourPlace.price);
    const [locations, setLocations] = useState(ourPlace.location);
    const [redirect, setRedirect] = useState(false);
    const [address, setAdress] = useState('');
    const [photoLink, setPhotoLink] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkin, setCheckin] = useState('');
    const [checkout, setCheckout] = useState('');
    const [maxguests, setmaxGuests] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(()=>{
    async function grabDetails() {
        const { data } = await axios.get(`/account/edit/details/${id}`);
        setOurPlace(data);
        setTitle(data.title);
        setDescription(data.description);
        setLocations(data.location);
        setAdress(data.address);
        setPrice(data.price);
        setExtraInfo(data.extraInfo);
        setCheckin(data.checkIn);
        setCheckout(data.checkOut);
        setmaxGuests(data.maxGuests);
        setPerks(data.perks);
    };

    grabDetails();

}, [id]);

console.log('these are the perks', perks);


    console.log('this is your location', ourPlace);
   



    async function addPhotobyLink(ev) {
        ev.preventDefault();
        const { data } = await axios.post('/upload-by-link', { link: photoLink });
        setAddedPhotos((prev) => {
            return [...prev, data];
        });
        setPhotoLink('');
    };

    function uploadByButton(ev) {
        const files = ev.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i]);
        };
        axios.post('/upload', data, {
            headers: { "Content-type": "multipart/form-data" }
        }).then((response) => {
            const { data: filenames } = response;
            setAddedPhotos((prev) => {
                return [...prev, ...filenames];
            })
        })
    };


    function handlecbClicker(ev) {
        const { checked, name } = ev.target;
        if (checked) {
            setPerks((prev) => {
                return [...prev, name];
            })
        }
        else {
            setPerks((prev) => {
                return [...prev.filter((specName) => specName !== name)]
            })
        }
    };


    async function handleSubmits() {
        try {
            const { data } = await toast.promise(axios.post(`http://localhost:3000/editPlace/${id}`, {
                title, address, addedPhotos, locations, price, description, perks, extraInfo, checkin, checkout, maxguests
            }), {
                success: 'Your Place edited Successfully'
            });
            setRedirect(true);
        }
        catch (e) {
            failure();
        }

    };

    if (redirect) {
        return <Navigate to={`/places/${id}`} />
    }
    return (
        <div>
            <a className="border bg-primary p-2 mt-10 rounded-2xl text-white" href="/">Go Back</a>
            <div className="mt-10">
                <form onSubmit={handleSubmit(handleSubmits)}>
                    <h2 className="text-2xl mt-5 mb-2">Title</h2>
                    <p className="text-gray-400 mx-2">Title of the Place, this should be short and catchy!</p>
                    <input value={title}  onChange={ev => setTitle(ev.target.value)} type="text" placeholder="Eg:  Fonzzi's Apartment" />
                    {errors.title && <p className="text-red-500 ml-3">Verify the Title.</p>}
                    <h2 className="text-2xl mt-5 mb-2">Location</h2>
                    <p className="text-gray-400 mx-2">Location to your place!</p>
                    <input type="text" value={locations} onChange={ev => setLocations(ev.target.value)} placeholder="Areekkulam, Vengara" />
                    <h2 className="text-2xl mt-5 mb-2">Address</h2>
                    <p className="text-gray-400 mx-2">Address to your place!</p>
                    <input value={address} onChange={ev => setAdress(ev.target.value)} type="text" placeholder="Address" />
                    {errors.address && <p className="text-red-500 ml-3">Verify your address.</p>}
                    <h2 className="text-2xl mt-5 mb-2">Price</h2>
                    <p className="text-gray-400 mx-2">Price for a night at Your Place</p>
                    <input value={price} type="text"  onChange={ev => setPrice(ev.target.value)} placeholder="Eg: 250" />
                    {errors.price && <p className="text-red-500 ml-3">Verify your Place.</p>}
                    <h2 className="text-2xl mt-5 mb-2">Photos</h2>
                    <h3>Add Link of Photo</h3>
                    <div className="flex gap-2">
                        <input value={photoLink} onChange={ev => setPhotoLink(ev.target.value)} type="text" placeholder="Eg:  https://images.unsplash.com/photo-1710390916960" name='url' />
                        <button onClick={addPhotobyLink} className="border border-gray-400 py-2 px-4 rounded-full bg-primary text-white shadow-md px-40 text-nowrap">Add Photo</button>
                    </div>
                    <div className='m-5 items-center gap-1 grid grid-cols-4 md: grid-cols-5 lg:grid-cols-6'>
                        {addedPhotos.length > 0 && addedPhotos.map((fonzzi) => (
                            <div className="flex h-32">
                                <img className="rounded-2xl w-full object-cover" src={'http://localhost:3000/uploads/' + fonzzi} alt="" />
                            </div>
                        ))}
                        <label className="cursor-pointer flex justify-center mx-3 border border-gray-400 rounded-2xl p-10 mt-5">
                            <input type="file" multiple className="hidden" onChange={uploadByButton} />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </label>
                    </div>
                    <div>
                        <h2 className="text-2xl mt-5 mb-2">Description</h2>
                        <p className="text-gray-400 mx-2">Brief Description about the Place!!</p>
                        <textarea value={description}  onChange={(ev) => setDescription(ev.target.value)} className="border border-gray-400 mt-3 mx-2 rounded-2xl px-4 py-2" placeholder="Nice and Cool Atmosphere!!" cols="245" rows="5"></textarea>
                        {errors.description && <p className="text-red-500 ml-3">Verify Description.</p>}
                    </div>
                    <h2 className="text-2xl mt-5 mb-2">Perks</h2>
                    <p className="text-gray-400 mx-2 mb-2">Add Perks to your Place!!!</p>
                    <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mx-2">
                        <label className='border p-8 flex gap-3 rounded-2xl items-center'>
                            <input checked={perks.includes('wifi')} type="checkbox" name='wifi' onChange={handlecbClicker} />
                            <svg xmlns="http://www.w3.org/2000/svg" name='wifilogo' fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
                            </svg>
                            <span>Wifi</span>
                        </label>
                        <label className='border p-8 flex gap-3 rounded-2xl items-center'>
                            <input checked={perks.includes('pets')} type="checkbox" name='pets' onChange={handlecbClicker} />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                            </svg>

                            <span>Pets</span>
                        </label >
                        <label className='border p-8 flex gap-3 rounded-2xl items-center'>
                            <input checked={perks.includes('entrance')} type="checkbox" name='entrance' onChange={handlecbClicker} />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                            </svg>
                            <span>Private Entrance</span>
                        </label>
                        <label className='border p-8 flex gap-3 rounded-2xl items-center'>
                            <input checked={perks.includes('tv')} type="checkbox" name='tv' onChange={handlecbClicker} />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" />
                            </svg>
                            <span>TV</span>
                        </label>
                        <label className='border p-8 flex gap-3 rounded-2xl items-center'>
                            <input checked={perks.includes('aid')} type="checkbox" name='aid' onChange={handlecbClicker} />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" />
                            </svg>
                            <span>First Aid Kit</span>
                        </label>
                    </div>
                    <h2 className="text-2xl mt-5 mb-2">Extra Info</h2>
                    <p className="text-gray-400 mx-2">Extra Features that you need to define about your Place!</p>
                    <input value={extraInfo} type="text" placeholder="Extra Info" onChange={(ev) => setExtraInfo(ev.target.value)} />
                    <h2 className="text-2xl mt-5 mb-2">Check In Time</h2>
                    <p className="text-gray-400 mx-2">Check in Time to Your Place</p>
                    <input value={checkin}  onChange={(ev) => setCheckin(ev.target.value)} type="text" placeholder="Eg: 09:00" />
                    {errors.checkin && <p className="text-red-500 ml-3">Verify Check In.</p>}
                    <h2 className="text-2xl mt-5 mb-2">Check Out Time</h2>
                    <p className="text-gray-400 mx-2">Check Out Time to Your Place</p>
                    <input value={checkout}  onChange={(ev) => setCheckout(ev.target.value)} type="text" placeholder="Eg: 12:00" />
                    {errors.checkout && <p className="text-red-500 ml-3">Verify Check Out.</p>}
                    <h2 className="text-2xl mt-5 mb-2">Max Guests</h2>
                    <p className="text-gray-400 mx-2">Maximum No.of Guest to Your Place!</p>
                    <input className="border border-gray-400 w-full rounded-2xl p-2" value={maxguests} onChange={(ev) => setmaxGuests(ev.target.value)} type="number" placeholder="Eg: 5" />
                    {errors.maxguests && <p className="text-red-400 ml-3">Verify No.of Guests.</p>}
                    <div>
                        <button className="bg-primary w-full mt-5 mb-5 rounded-2xl text-white">Edit</button>
                    </div>
                </form>
            </div>

        </div>
    )
}