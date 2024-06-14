import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "./userContext";
import { useLocation } from "react-router-dom";

export default function Owner() {
    const { pictures, user } = useContext(UserContext);
    const [messages, setMessages] = useState('');
    const [isConnectionOpen, setisConnectionOpen] = useState(false);
    const [sendingMessage, setSendingMessage] = useState([]);
    const inputRef = useRef(null);
    const location = useLocation();
    const ws = useRef();

    const { fonzzi } = location.state;

    let randomNo = 0;
    let formattedTime = '';


    // useEffect will render for the first time and when sendingMessage is updated.
    useEffect(() => {
        inputRef.current.focus();
    }, [[], [sendingMessage]]);


    const sendMessage = (ev) => {
        ev.preventDefault();
        if (messages) {
            ws.current.send(
                JSON.stringify({
                    sender: user.username,
                    body: messages,
                    reciever: fonzzi.username
                })
            );
            setMessages('');
        }
    };



    useEffect(() => {
        ws.current = new WebSocket("ws://localhost:8080");
        ws.current.onopen = () => {
            console.log('Connection opened');
            setisConnectionOpen(true);
        };

       

        ws.current.onmessage = (event) => {
            // event.preventDefault();
            
            const data = JSON.parse(event.data);
            const recipient = data.reciever;
            console.log('the reciever is ', recipient);
            // const recipientConnection = connections.find((conn) => conn.username === recipient);
            // console.log(recipientConnection);
            const isPresent = sendingMessage.filter((msg) => msg.body !== data.body);
            setSendingMessage((prev) => {
                const newPrev = prev.filter((msg) => msg.body !== data.body);
                return [...newPrev, data];
            });
        };

        console.log('the sending message is', sendingMessage);

        return () => {
            console.log('cleaning up...');
            // ws.current.close();
        }
    }, [user.username]);

    const scrollTarget = useRef(null);

    function format12HourTime(timestamp) {
        const date = new Date(timestamp);
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const ampm = hours >= 12 ? 'PM' : 'AM';

        // Convert hours to 12-hour format
        hours = hours % 12;
        hours = hours ? hours : 12; // Handle midnight (0 hours)

        // Add leading zeros to minutes and seconds if needed
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        // Construct the 12-hour formatted time string
        const formattedTime = `${hours}:${formattedMinutes} ${ampm}`;

        return formattedTime;
    }

    useEffect(() => {
        if (scrollTarget.current) {
            scrollTarget.current.scrollIntoView({ behaviour: 'smooth' });
        }
    }, [sendingMessage.length]);

    return (
        <div className="flex flex-col min-h-screen">
            <header className="flex justify-between border border-red-400 p-8 bg-primary text-white rounded-xl">
                <div className="flex items-center gap-10 mx-20">
                    <a href="/">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-8">
                            <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                        </svg>

                    </a>
                    <div className="hidden">
                        {randomNo = Math.floor(Math.random() * pictures.length)}
                    </div>
                    <img className="rounded-full aspect-square max-w-[50px] object-cover" src={fonzzi && fonzzi.profilepic ? 'http://localhost:3000/uploads/' + fonzzi.profilepic : pictures[4]} />
                    <p className="text-2xl font-semibold">{fonzzi.username}</p>
                </div>
                <div className="flex items-center gap-10 mx-20">
                    <a href="/">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                        </svg>
                    </a>
                    <a href="">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                        </svg>
                    </a>
                    <a href="">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                        </svg>
                    </a>

                </div>
            </header>
            <div className="border-b-2 border-gray-100 mt-2"></div>
            <div className="flex-grow">
                {/* main content here */}
                {sendingMessage.map((message, index) => (
                    <div key={index} className={`mt-8 relative my-3 rounded-full rounded-tl-xs mx-3 py-5 w-1/5 text-white ${message.sender === user.username ? "self-end rounded-tl-lg rounded-3xl bg-primary  px-4 py-2" : "bg-blue-600"
                        }`}>
                        <h1>
                            {message.body}</h1>
                        <div className="absolute right-3 bottom-2">
                            <p className="text-xs text-gray-300">{formattedTime = format12HourTime(message.sentAt)}</p>
                        </div>
                        <div ref={scrollTarget}></div>
                    </div>
                ))}
            </div>
            <div className="flex items-center gap-3 justify-center  ">
                <footer className="w-5/6 my-auto flex m-6 justify-between border border-red-400 p-3 rounded-full">
                    <div className="flex gap-3 px-15 items-center">
                        <a href="">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                            </svg>
                        </a>
                        <p><input ref={inputRef} value={messages} onChange={(ev) => setMessages(ev.target.value)} type="text" className="border-none outline-none text-primary w-full" placeholder="Message" /></p>
                    </div>
                    <div className="flex gap-14 items-center mx-10 transition-transform duration-200">
                        <a href="">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 transform -rotate-45">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
                            </svg>
                        </a>
                        {messages.length === 0 && (
                            <>
                                <a href="">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </a>
                                <a href="">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                                    </svg>

                                </a>
                            </>
                        )}
                    </div>
                </footer>
                <div className="border p-8 bg-primary text-white rounded-full">
                    {messages.length > 0 ? <a onClick={sendMessage} disabled={!isConnectionOpen}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                    </a> : <a href="">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
                        </svg>

                    </a>}

                </div>
            </div>

        </div>
    )
};

