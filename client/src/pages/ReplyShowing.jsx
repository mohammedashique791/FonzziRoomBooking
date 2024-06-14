import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./userContext";
import { Link } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";
export default function ReplyShow({ comment }) {
    const [isOpen, setIsOpen] = useState(false);
    const [reply, setReplies] = useState('');
    const { pictures } = useContext(UserContext);
    function toggleOpening() {
        setIsOpen(!isOpen);
    }

    let randomNo = 0;
    useEffect(() => {
        async function gatherReplies() {
            const { data } = await axios.get(`commentDetails/${comment._id}`);
            setReplies(data);
        };
        gatherReplies();
    }, []);
    return (
        <div>
            {reply && reply.replies.length > 0 && <button onClick={toggleOpening} className="text-red-600 mx-9 mt-5">View {reply.replies && reply.replies.length} replies</button>}
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto z-50">
                    <div className="absolute bg-white rounded-3xl shadow-lg p-2 w-1/3 h-5/6 max-h-full p-10 overflow-y-scroll no-scrollbar">
                        <div className='relative sticky top-0'>
                            <button onClick={toggleOpening} className="mt-5 absolute -top-1 right-6 text-gray-600 hover:text-gray-800">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        {/* Your comment content goes here */}
                        <div className="mt-4 overflow-y-auto mb-20 mt-8">
                            <h1 className='text-lg font-semibold mb-1 mt-5 mx-8'>{comment.replies.length} Replies So Far...</h1>
                            {/* Display comments */}
                            {reply.replies &&
                                reply.replies.map((replyComment) => (
                                    <div className="mt-10 overflow-y-auto mx-5">
                                        <div>
                                            <div className="flex gap-4 p-6">
                                                <div className="hidden">
                                                    {randomNo = Math.floor(Math.random() * pictures.length)}
                                                </div>
                                                <div>
                                                    <img className="rounded-full aspect-square max-w-[43px] object-cover" src={replyComment.author.profilepic ? 'http://localhost:3000/uploads/' + replyComment.author.profilepic : pictures[4]} alt="" />
                                                </div>
                                                <div className="items-center">
                                                    <h1 className="text-base font-semibold">{replyComment.author.username}</h1>
                                                    <Link pictures={pictures} to={`/userProfile/${replyComment.author._id}`} className="-mb-3 underline text-primary cursor-pointer">{replyComment.author.email}</Link>
                                                    <Rating className="-mx-16 mt-2" style={{ maxWidth: 90 }} value={replyComment.rating} />
                                                </div>

                                            </div>

                                            <div className="mx-8">
                                                <p className="text-base">{replyComment.body}</p>
                                            </div>
                                        </div>

                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}