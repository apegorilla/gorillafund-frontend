import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import CommentAPI from "api/comment";
import { useAuth } from "contexts/AuthContext";
import { getUserName, timeAgoFormat } from "libs/utils";

const FundComments = ({ id, organizer, comments }) => {
    const { user } = useAuth();
    const [ leaved, setLeaved ] = useState<boolean>(false);
    const [ comment, setComment ] = useState<string>("");

    const onChangeComment = e => setComment(e.target.value);
    const onLeaveComment = useCallback(() => {
        if(comment.length < 10) return toast.error('Comment must be at least 10 characters.');
        CommentAPI.create({
            fundId: id,
            comment: comment
        })
        .then(res => {
            setLeaved(true);
            toast.success('Thank you for comment.');
        })
        .catch(err => {
            if(err.response.status === 401) toast.error('Please login to leave comment.');
            else toast.error(err.message);
        });
    }, [comment, id]);

    const [ DOM, setDOM ] = useState<JSX.Element>(
        <div className="p-3 max-w-[500px] text-gray-500 text-sm">
            <div className="">
                <div className="text-lg font-bold text-black">Organizer</div>
                <div className="flex justify-between py-3">
                    <div className="flex gap-3 animate-pulse">
                        <div className="w-10 h-10 bg-teal-300 rounded-full" />
                        <div className="flex flex-col justify-between flex-1 w-full py-1">
                            <div className="w-40 h-4 rounded-full bg-slate-300" />
                            <div className="w-20 h-3 rounded-full bg-slate-300" />
                        </div>
                    </div>
                    <button className="font-bold rounded-[4px] px-4 transition-all duration-200 text-center bg-slate-200 text-black hover:text-white hover:bg-teal-700">Contact organizer</button>
                </div>
            </div>
            <hr className="my-3" />
            <div className="flex flex-col gap-5">
                <div className="pt-2 text-lg font-bold text-black">Comments</div>
                {
                    Array(3).fill(0).map((item, key) => (
                        <div className="flex gap-3 animate-pulse" key={key}>
                            <div className="w-10 h-10 bg-teal-300 rounded-full" />
                            <div className="flex flex-col justify-between flex-1 w-full py-1">
                                <div className="w-full h-4 rounded-full bg-slate-300" />
                                <div className="w-20 h-3 rounded-full bg-slate-300" />
                            </div>
                        </div>
                    ))
                }
                <hr />
                <div className="pl-12">
                    <button className="font-bold rounded-[4px] px-4 py-2 transition-all duration-200 text-center bg-slate-200 text-black hover:text-white hover:bg-teal-700">Load more</button>
                </div>
            </div>
        </div>
    );

    useEffect(() => organizer && comments && setDOM(
        <div className="p-3 max-w-[500px] text-gray-500 text-sm">
            <div className="">
                <div className="text-lg font-bold text-black">Organizer</div>
                <div className="flex justify-between py-3">
                    <div className="flex gap-3">
                        <img src={organizer?.avatar} className="w-10 h-10 bg-teal-300 rounded-full" alt="" />
                        <div className="flex flex-col">
                            <div className="flex-wrap gap-3 font-bold text-black">{getUserName(organizer)}</div>
                            <div className="text-gray-500">Organizer</div>
                        </div>
                    </div>
                    <button className="font-bold rounded-[4px] px-4 transition-all duration-200 text-center bg-slate-200 text-black hover:text-white hover:bg-teal-700">Contact organizer</button>
                </div>
            </div>
            <hr className="my-3" />
            <div className="flex flex-col gap-5">
                <div className="pt-2 text-lg font-bold text-black">Comments ({comments.length})</div>
                {
                    comments.length ?
                    comments?.map((comment, key) => (
                        <div className="flex gap-3" key={key}>
                            <img src={comment.user.avatar} className="w-10 h-10 bg-teal-300 rounded-full" alt="" />
                            <div className="flex flex-col flex-1 gap-2">
                                <div className="flex flex-wrap justify-between gap-3">
                                    <div className="font-bold text-black">{getUserName(comment.user)}</div>
                                    <div className="text-gray-500">{timeAgoFormat(comment.createdAt)}</div>
                                </div>
                                <div>{comment.comment || "No comments ..."}</div>
                            </div>
                        </div>
                    )) :
                    <div className="pl-3">No comments yet ...</div>
                }
                {
                    leaved ? 
                    <>
                        <div className="flex gap-3">
                            <img src={user.avatar} className="w-10 h-10 bg-teal-300 rounded-full" alt="" />
                            <div className="flex flex-col flex-1 gap-2">
                                <div className="flex flex-wrap justify-between gap-3">
                                    <div className="font-bold text-black">{getUserName(user)}</div>
                                    <div className="text-gray-500">just now</div>
                                </div>
                                <div>{comment}</div>
                            </div>
                        </div>
                        <hr />
                    </> :
                    <>
                        <hr />
                        <div className="flex gap-3">
                            <img src={user.avatar} className="w-10 h-10 bg-teal-300 rounded-full" alt="" />
                            <div className="flex flex-col flex-1 gap-2">
                                <div className="font-bold text-black">{getUserName(user)}</div>
                                <textarea value={comment} onChange={onChangeComment} className="w-full p-2 h-20 border outline-none rounded-[4px]" />
                                <div className="flex justify-end">
                                    <button onClick={onLeaveComment} className="font-bold rounded-[4px] px-4 py-2 transition-all duration-200 text-center bg-slate-200 text-black hover:text-white hover:bg-teal-700">Leave comment</button>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    ), [organizer, comments, comment, user, leaved, onLeaveComment]);

    return DOM;
}

export default FundComments;