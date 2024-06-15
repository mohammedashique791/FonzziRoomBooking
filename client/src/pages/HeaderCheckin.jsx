import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from "react-router-dom";
import { LayoutContext } from "../Layout";
export default function HeaderCheckin() {
    const [isOpencheckin, setisOpencheckin] = useState(false);
    const { startDate, setStartDate, endDate, setEnddate } = useContext(LayoutContext);
    const [isOpencheckout, setisOpencheckout] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const handleClick = (event) => {
        const rect = event.target.getBoundingClientRect();
        setPosition({ x: rect.left, y: rect.bottom });
        setShowCalendar(true);
        setisOpencheckin(!isOpencheckin);
    };

    const handleClickcheckout = () => {
        setisOpencheckout(!isOpencheckout);
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

    useEffect(() => {
        setisOpencheckin(!isOpencheckin);
        setisOpencheckout(true);
    }, [startDate]);

    useEffect(() => {
        setisOpencheckout(false);
    }, [endDate]);
    return (
        <>
            <div className="relative w-1/5 border-r border-gray-400"><button onClick={handleClick} className="flex flex-col"><p className="text-xs">Check in</p><p className="text-gray-500">{startDate === null ? <p>Add dates</p> : <p className="font-semibold text-black">{formattingDates(startDate)}</p>}</p></button>
            </div>
            {showCalendar && isOpencheckin && (
                <>
                    {isOpencheckin && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 overflow-y-auto no-scrollbar z-50">
                            <div className="absolute inset-0"></div>
                            <div className="absolute bg-white rounded-3xl p-6 w-3/5 h-4/6 min-w-md h-2/3 p-20 overflow-y-scroll no-scrollbar z-70">
                                <div className='relative sticky top-0'>
                                    <button onClick={handleClick} className=" top-2 right-2 text-gray-600 hover:text-gray-800">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="mt-4">
                                    <div className="mt-2">
                                        <div className='grid gap-10 grid-cols-[2fr_1fr]'>
                                            <div className='flex overflow-y-auto max-h-full justify-center mt-20'>
                                                <p className="p-6 text-lg font-semibold">First Pick a checkin Date from the Calendar.</p>
                                            </div>
                                            <div className='overflow-y-auto max-h-full'>
                                                <div
                                                    className="left-0 top-5 z-10"
                                                    style={{ top: position.y + 'px', left: position.x + 'px' }}
                                                >
                                                    <DatePicker
                                                        selected={startDate}
                                                        onChange={(date) => setStartDate(date)}
                                                        inline
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                        {/* Repeat for other comments */}
                                    </div>
                                </div>
                                <div className="mt-10">
                                    <p className="text-md font-semibold mb-3">Note:</p>
                                    <p className="mx-8">This is Just work in Progress and would be subjected to changes and modifications in the future.</p>
                                </div>
                            </div>
                        </div>

                    )}

                </>
            )}

            {showCalendar && isOpencheckout && (
                <>
                    {isOpencheckout && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 overflow-y-auto no-scrollbar z-50">
                            <div className="absolute inset-0"></div>
                            <div className="absolute bg-white rounded-3xl p-6 w-3/5 h-4/6 min-w-md h-2/3 p-20 overflow-y-scroll no-scrollbar z-70">
                                <div className='relative sticky top-0'>
                                    <button onClick={handleClickcheckout} className=" top-2 right-2 text-gray-600 hover:text-gray-800">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="mt-4">
                                    <div className="mt-2">
                                        <div className='grid gap-10 grid-cols-[2fr_1fr]'>
                                            <div className='flex overflow-y-auto max-h-full justify-center mt-20'>
                                                <p className="p-6 text-lg font-semibold">Secondly Pick a checkOut Date from the Calendar.</p>
                                            </div>
                                            <div className='overflow-y-auto max-h-full'>
                                                <div
                                                    className="left-0 top-5 z-10"
                                                    style={{ top: position.y + 'px', left: position.x + 'px' }}
                                                >
                                                    <DatePicker
                                                        selected={endDate}
                                                        onChange={(date) => setEnddate(date)}
                                                        inline

                                                    />
                                                </div>
                                            </div>

                                        </div>
                                        {/* Repeat for other comments */}
                                    </div>
                                </div>
                                <div className="mt-10">
                                    <p className="text-md font-semibold mb-3">Note:</p>
                                    <p className="mx-8">This is Just Work in Progress and would be subjected to changes and modifications in the future.</p>
                                </div>
                            </div>
                        </div>

                    )}

                </>
            )}

        </>
    )
}