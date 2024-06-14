import { useContext, useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";
import MyPopup from "./MyPopup";
import CommentReply from "./CommentReply";
import { UserContext } from "./userContext";
import ReplyShow from "./ReplyShowing";
import axios from "axios";
import { LayoutContext } from "../Layout";
export default function CommentShow({ place, pictures, id }) {
    const [text, setText] = useState(false);
    const [visibleComments, setvisibleComments] = useState(6);
    const { user } = useContext(UserContext);
    function handleMoreComments() {
        setvisibleComments(prev => prev + 6);
    }


    function changeText(ev) {
        ev.preventDefault();
        setText(!text);
    }







    let randomNo = 0;
    return (
        <div>
            <div className="grid gap-10 hidden md:grid md:grid-cols-1 2xl:grid-cols-2 mt-1">
                {place.review && (
                    place.review.slice(0, visibleComments).map((comment) => (
                        <div className="mx-20 rounded-2xl py-3 p-8 rounded-3xl mt-8">
                            <div className="flex gap-4 p-6">
                                <div className="hidden">
                                    {randomNo = Math.floor(Math.random() * pictures.length)}
                                </div>
                                <div>
                                    <img className="rounded-full aspect-square max-w-[43px] object-cover" src={comment.author.profilepic ? 'http://localhost:3000/uploads/' + comment.author.profilepic : pictures[randomNo]} alt="" />
                                </div>
                                {/* content here */}

                                <div className="items-center">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <h1 className="text-base font-semibold">{comment.author.username}</h1>
                                        </div>
                                        {comment.length > 0 && comment.author._id === user._id && (
                                            <div className="grid grid-cols-3 gap-3 items-center">
                                                <div>
                                                    <button><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                                    </svg>
                                                    </button>
                                                </div>
                                                <div>
                                                    <button><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                    </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <Link pictures={pictures} to={`/userProfile/${comment.author._id}`} className="-mb-3 underline text-primary cursor-pointer">{comment.author.email}</Link>
                                    <Rating className="-mx-16 mt-2" style={{ maxWidth: 90 }} value={comment.rating} />
                                </div>


                            </div>

                            <div className="mx-10">
                                <p className="text-base">{comment.body}</p>
                                <div className="grid grid-cols-4 mt-2">

                                    <div>
                                        <CommentReply author={comment.author.username} comment={comment} commentID={comment._id} />
                                    </div>

                                </div>
                            </div>
                            {comment.replies.length > 0 && (
                                <div>
                                    <ReplyShow comment={comment} />
                                </div>
                            )}
                        </div>
                    ))
                )}

            </div>
            <div className="">
                <MyPopup ids={id} handleComments={handleMoreComments} location={place} />
            </div>
        </div>
    )
}