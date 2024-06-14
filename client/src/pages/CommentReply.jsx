import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "./userContext";
import { Link, Navigate } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";
import Layout, { LayoutContext } from "../Layout";

export default function CommentReply({ author, commentID, comment }) {
    const [Open, setOpen] = useState(false);
    const [reply, setReply] = useState('');
    const [data, setData] = useState(comment);
    const { user } = useContext(UserContext);
    const [redirect, setRedirect] = useState(false);
    const [text, setText] = useState(false);
    const { pictures } = useContext(UserContext);
    const [likes, setlikes] = useState(comment.likes.length);
    function togglePopup() {
        if (user) {
            setOpen(!Open);
        } else {
            setRedirect(true);
        }
    }

    let randomNo = 0;
    function changeText(ev) {
        ev.preventDefault();
        setText(!text);
    };



    async function handleSubmit(ev) {
        try {
            const { data } = await axios.post(`/commentReply/${commentID}`, {
                reply, user
            })
            setReply('');
            ;
        } catch (e) {
            console.log(e);
        }
    }

    async function setLike(ev) {
        if (user) {

            ev.preventDefault();
            const { data } = await axios.post(`/liking/${commentID}`, {
                user
            });
            setData(data);
            setlikes(data.likes.length);

        } else {
            setRedirect(true);
        }
    }
    if (redirect) {
        return <Navigate to={'/login'} />
    }


    // async function getCommentLikes(commentid){
    //     fonzzi = '';
    //     fonzzi = await axios.get(`/likesofComment/comment/${commentid}/myran`);
    //     return fonzzi.data;
    // }






    return (
        <div>
            {/* <a className="text-gray-400" href="/">Reply</a> */}
            <div className="grid gap-16 grid-cols-3 mt-2">
                <div>
                <a onClick={setLike} className="text-gray-400" href="">{user ? data && data.likes.includes(user._id) ? <p className="text-primary">Liked</p> : <p>Like</p> : <p>Like</p>}</a>
                </div>
                <div>
                <button onClick={togglePopup} className="text-gray-400 -mt-1">Reply</button>
                </div>
                <div className="mx-24 -mt-2">
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 bg-primary text-white rounded-full p-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                    <p className="text-sm ">{likes}</p>
                </button>
                </div>
            </div>
            
            <div>
                {Open && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 overflow-y-auto z-50">
                        <div className="absolute inset-0"></div>
                        <div className="absolute bg-white rounded-3xl p-6 w-2/3 max-h-full px-5 py-2 pb-16 overflow-y-scroll no-scrollbar z-10">
                            <div className='relative sticky top-0'>
                                <button onClick={togglePopup} className="absolute top-0 right-3 text-gray-600 hover:text-gray-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>

                            </div>
                            <div className="mt-4">
                                <div className="mt-2">
                                    <div>
                                        <h1 className="text-lg text-center mb-6">Replying to @<span className="text-primary font-semibold">{author}</span></h1>
                                        <div className="mb-8 mx-auto border border-red-300 rounded-2xl px-2 w-4/5 py-4">
                                            <div className="flex gap-4 px-8 py-4">
                                                <div className="hidden">
                                                    {randomNo = Math.floor(Math.random() * pictures.length)}
                                                </div>
                                                <div>
                                                    <img className="rounded-full aspect-square max-w-[43px] object-cover" src={comment.author.profilepic ? 'http://localhost:3000/uploads/' + comment.author.profilepic : pictures[randomNo]} alt="" />
                                                </div>
                                                <div className="items-center">
                                                    <h1 className="text-base font-semibold">{comment.author.username}</h1>
                                                    <Link pictures={pictures} to={`/userProfile/${comment.author._id}`} className="-mb-3 underline text-primary cursor-pointer">{comment.author.email}</Link>
                                                    <Rating className="-mx-16 mt-2" style={{ maxWidth: 90 }} value={comment.rating} />
                                                </div>
                                            </div>
                                            <div className="mx-8">
                                                <p className="text-base">{comment.body}</p>
                                            </div>
                                        </div>
                                        <form onSubmit={handleSubmit}>
                                            <input value={reply} type="text" onChange={(ev) => setReply(ev.target.value)} placeholder={`Replying to ${comment.author.username} . . . . .`} />
                                            <div className="absolute bottom-20 right-10">
                                                <button>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                        <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </form>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                )}

            </div>
        </div>
    )
}