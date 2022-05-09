import React from "react";
import { timeAgoFormat, getUserName } from "libs/utils";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const Donation = ({ donates }) => {
    return (
        <>
            <div className="grid grid-cols-1 divide-y">
                {
                    donates?.length ?
                    donates?.map((donate, key) => 
                        <div className="flex gap-3 px-6 py-4" key={key}>
                            <img src={donate.user.avatar} className="w-10 h-10 bg-teal-300 rounded-full" alt="" />
                            <div className="flex-1 text-gray-500">
                                <div className="flex justify-between">
                                    <div className="font-bold"><span className="text-black">{getUserName(donate.user)}</span> donated {donate.ethAmount} ETH</div>
                                    <div className="text-xs">{timeAgoFormat(donate.createdAt)}</div>
                                </div>
                                <div className="text-xs">Today's Fortune 500 list rolls over faster than ever. Today, only 12 percent of the companies that made the list in 1955 still remain. And 94 percent of the Fortune 500 list believes they'll change more in the next five years than in the past 50.</div>
                            </div>
                        </div>
                    ) :
                    <div className="py-5 font-bold text-center text-black">No donations yet!</div>
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

export default Donation;