import React from "react";
import { timeAgoFormat, getUserName } from "libs/utils";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const Comment = ({ comments }) => {
    return (
        <>
            <div className="grid grid-cols-1 divide-y">
                {
                    comments?.length ?
                    comments.map((comment, index) => 
                        <div className="flex gap-3 px-6 py-4" key={index}>
                            <img src={comment.user.avatar} className="w-10 h-10 bg-teal-300 rounded-full" alt="" />
                            <div className="flex-1 text-gray-500">
                                <div className="flex justify-between">
                                    <div className="font-bold text-black">{getUserName(comment.user)}</div>
                                    <div className="text-xs">{timeAgoFormat(comment.createdAt)}</div>
                                </div>
                                <div className="text-xs">{comment.comment}</div>
                            </div>
                        </div>
                    ) :
                    <div className="py-5 font-bold text-center text-black">No comments yet!</div>
                }
            </div>
            <hr />
            <div className="flex items-center justify-between px-6 py-4">
                <button className="flex items-center gap-3 text-gray-500" disabled>
                    <FiArrowLeft />
                    <div className="font-bold">Previous</div>
                </button>
                <div className="flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 font-semibold text-black cursor-pointer hover:bg-slate-300">1</div>
                    {/* <div className="flex items-center justify-center w-8 h-8 cursor-pointer hover:bg-slate-300">2</div>
                    <div className="flex items-center justify-center w-8 h-8 cursor-pointer hover:bg-slate-300">3</div>
                    <div className="px-3">...</div>
                    <div className="flex items-center justify-center w-8 h-8 cursor-pointer hover:bg-slate-300">8</div>
                    <div className="flex items-center justify-center w-8 h-8 cursor-pointer hover:bg-slate-300">9</div>
                    <div className="flex items-center justify-center w-8 h-8 cursor-pointer hover:bg-slate-300">10</div> */}
                </div>
                <button className="flex items-center gap-3 text-black">
                    <div className="font-bold">Next</div>
                    <FiArrowRight />
                </button>
            </div>
        </>
    )
}

export default Comment;