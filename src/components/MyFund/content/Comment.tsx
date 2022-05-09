import React from "react";
import Loading from "components/util/Loading";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const Comment = () => {
    return (
        <>
            <div className="grid grid-cols-1 divide-y">
                {
                    // [1,1,1,1,1,1,1,1,1,1].map((val, index) => 
                    //     <div className="flex gap-3 px-6 py-4" key={index}>
                    //         <img src={imgAvatar} className="w-10 h-10" alt="" />
                    //         <div className="flex-1 text-gray-500">
                    //             <div className="flex justify-between">
                    //                 <div className="font-bold text-black">Wade Warren</div>
                    //                 <div className="text-xs">30 minutes ago</div>
                    //             </div>
                    //             <div className="text-xs">Today's Fortune 500 list rolls over faster than ever. Today, only 12 percent of the companies that made the list in 1955 still remain. And 94 percent of the Fortune 500 list believes they'll change more in the next five years than in the past 50.</div>
                    //         </div>
                    //     </div>
                    // )
                    <Loading />
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