import { useContext, useEffect, useState } from "react"
import { LayoutContext } from "../Layout";
export default function FilterPop() {
    const [isOpen, setIsOpen] = useState(false);
    const [changingText, setChangingText] = useState('');
    const {perks, setPerks, value, setValue, mininitalValue, setMinInitialValue, maxInitialValue, setMaxInitialValue, filteredPlaces} = useContext(LayoutContext);
    function togglePopup() {
        setIsOpen(!isOpen);
    }

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

    function filterResults(){
        setIsOpen(!isOpen);
    }



    function selectValue(number) {
        setValue(number);
    }

    function isSelected(number) {
        if (value !== '') {
            if (value == number) {
                return "border rounded-full px-8 py-3 border-gray-300 bg-sixth text-white"
            }
            else {
                return "border rounded-full px-8 py-3 border-gray-300"
            }
        }

    }


    function colorDecider(value) {
        let initailClass = ''
        if (value == 'AnyType') {
            initailClass = 'font-semibold border rounded-tl-xl rounded-bl-xl py-5'
        }
        if (value == 'Room') {
            initailClass = 'font-semibold border'
        }
        if (value == 'EntireHome') {
            initailClass = 'font-semibold border rounded-tr-xl rounded-br-xl'
        }

        if (value == changingText) {
            initailClass += ' bg-sixth text-white';
        }

        return initailClass;
    }

    function clearFilters(){
        setMinInitialValue(2000);
        setMaxInitialValue(100000);
        setValue(1);
    }

    


    return (
        <div>
            <div className="min-w-[100px]">
            <button onClick={togglePopup} className="flex gap-3 border-2 border-sixth w-full py-2 px-2 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                </svg>

                <p className="font-semibold">Filters</p>
            </button>
           
            </div>

            {isOpen && (
                <div className="min-w-[620px] fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 overflow-y-auto no-scrollbar z-50">
                    <div className="absolute inset-0"></div>
                    <div className="absolute bg-white rounded-3xl p-6 w-3/5 h-5/6 min-w-md max-h-full p-20 overflow-y-scroll no-scrollbar z-70">
                        <div className='relative sticky top-0'>
                            <button onClick={togglePopup} className=" top-2 right-2 text-gray-600 hover:text-gray-800">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="mt-2">
                            <div className="mt-8">
                                <div >
                                    <h1 className="text-center font-semibold">Filters</h1>
                                </div>
                                <div>
                                    <h1 className="font-semibold text-lg">Type of Place</h1>
                                    <p className="mt-3 mb-8">Search rooms, entire homes or any type of place</p>
                                    <div className="grid grid-cols-1 gap-1 md:grid-cols-3 mx-10 mb-8">
                                        <button onClick={() => setChangingText('AnyType')} className={colorDecider('AnyType')}>
                                            <p>AnyType</p>
                                        </button>
                                        <button onClick={() => setChangingText('Room')} className={colorDecider('Room')}>
                                            <p>Room</p>
                                        </button>
                                        <button onClick={() => setChangingText('EntireHome')} className={colorDecider('EntireHome')}>
                                            <p>Entire Home</p>
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <h1 className="font-semibold text-lg">Price Range</h1>
                                    <p className="mt-3">Nightly Prices before fees and taxes</p>
                                </div>
                                <div className="flex gap-1 items-center justify-evenly">
                                    <div className="border p-1 rounded-xl mt-3 w-1/3">
                                        <p className="text-sm text-gray-500">Minimum</p>
                                        <input value={mininitalValue} onChange={(ev) => setMinInitialValue(ev.target.value)} className="outline-none border-none" type="text" />
                                    </div>
                                    <div>
                                        -
                                    </div>
                                    <div className="border p-3 rounded-xl mt-3 w-1/3 mx-5">
                                        <p className="text-sm text-gray-500">Maximum</p>
                                        <input value={maxInitialValue} onChange={(ev) => setMaxInitialValue(ev.target.value)} className="outline-none border-none" type="text" />
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <h1 className="font-semibold text-lg">Maximum Guests</h1>
                                    <div className="mt-5 md:flex gap-3 justify-evenly">
                                        <button onClick={() => selectValue(1)} className={isSelected(1)}>1</button>
                                        <button onClick={() => selectValue(2)} className={isSelected(2)}>2</button>
                                        <button onClick={() => selectValue(3)} className={isSelected(3)}>3</button>
                                        <button onClick={() => selectValue(4)} className={isSelected(4)}>4</button>
                                        <button onClick={() => selectValue(5)} className={isSelected(5)}>4 +</button>
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <h1 className="font-semibold text-lg mb-5">Essentials</h1>
                                    <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mx-2">
                                        <label className='border p-8 flex gap-3 rounded-2xl items-center'>
                                            <input type="checkbox" name='wifi' onChange={handlecbClicker} />
                                            <svg xmlns="http://www.w3.org/2000/svg" name='wifilogo' fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
                                            </svg>
                                            <span>Wifi</span>
                                        </label>
                                        <label className='border p-8 flex gap-3 rounded-2xl items-center'>
                                            <input type="checkbox" name='pets' onChange={handlecbClicker} />
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                                            </svg>

                                            <span>Pets</span>
                                        </label >
                                        <label className='border p-8 flex gap-3 rounded-2xl items-center'>
                                            <input type="checkbox" name='entrance' onChange={handlecbClicker} />
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                                            </svg>
                                            <span>Private Entrance</span>
                                        </label>
                                        <label className='border p-8 flex gap-3 rounded-2xl items-center'>
                                            <input type="checkbox" name='tv' onChange={handlecbClicker} />
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" />
                                            </svg>
                                            <span>TV</span>
                                        </label>
                                        <label className='border p-8 flex gap-3 rounded-2xl items-center'>
                                            <input type="checkbox" name='aid' onChange={handlecbClicker} />
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" />
                                            </svg>
                                            <span>First Aid Kit</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-20 relative sticky bg-sixth bottom-0 rounded-xl flex justify-between border w-full p-4">
                            {/* <div className="mb-3">
                                <hr />
                            </div> */}
                            <button onClick={clearFilters} className="border bg-sixth text-white p-3 rounded-xl">Clear Filters</button>
                            <button onClick={filterResults} className="border bg-sixth text-white p-3 rounded-xl">Show {filteredPlaces.length} Places</button>
                        </div>
                    </div>
                </div>

            )}
        </div>
    )
};