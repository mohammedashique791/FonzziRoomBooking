export default function PlaceExtra({ place }) {
    let ampm = '';
    if (place.checkIn >= 12 || place.checkOut >= 12) {
        ampm = 'PM'
    }
    else if(place.checkIn < 12 || place.checkOut < 12){
        ampm = 'AM'
    }
    return (
        <div className="2xl:mx-40 mt-32 min-w-[300px] border border-sixth shadow shadow-md py-3 px-5 pb-10 rounded-2xl text-black bg-white mb-20">
            <h1 className="text-xl text-start md:text-center font-semibold mb-2 mt-10">Things to Know</h1>
            <div className="grid-cols-1 md:grid-cols-3 justify-items-center grid gap-5 mx-3">
                <div>
                    <h2 className="mb-4 mt-4 font-semibold">House rules</h2>
                    <p className="mb-4">Check-in after {place.checkIn}:00 {ampm}</p>
                    <p className="mb-4">Check-out before {place.checkOut}:00 {ampm}</p>
                    <p className="mb-4">{place.maxGuests} guests maximum</p>
                </div>
                <div>
                    <h2 className="mt-4 font-semibold">safety & property</h2>
                    <p className="mb-4 mt-4">Carbon monoxide alarm</p>
                    <p className="mb-4 mt-4">Smoke alarm</p>
                    <p className="mb-4 mt-4">Some spaces are shared</p>
                </div>
                <div>
                    <h2 className="mt-4 font-semibold">Cancellation policy</h2>
                    <p className="mb-4 mt-4">Free cancellation for 48 hours.</p>
                    <p className="mb-4 mt-4 w-4/5">Review the Host’s full cancellation policy which applies even if you cancel for illness or disruptions caused by COVID-19..</p>
                </div>
            </div>
            
        </div>
    )
}