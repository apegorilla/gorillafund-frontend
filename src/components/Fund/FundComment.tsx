import React, { useEffect, useState } from "react";
import { getUserName, timeAgoFormat } from "libs/utils";

const FundComments = ({ organizer, cnt, donations }) => {
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
                <div className="flex items-end justify-between pt-2">
                    <div className="text-lg font-bold text-black">Donations</div>
                    <div className="text-teal-700 cursor-pointer hover:font-bold">See all</div>
                </div>
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

    useEffect(() => organizer && donations && setDOM(
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
                <div className="flex items-end justify-between pt-2">
                    <div className="text-lg font-bold text-black">Donations ({cnt})</div>
                    <div className="text-teal-700 cursor-pointer hover:font-bold">See all</div>
                </div>
                {
                    cnt ?
                    donations?.map((donation, key) => (
                        <div className="flex gap-3" key={key}>
                            <img src={donation.user.avatar} className="w-10 h-10 bg-teal-300 rounded-full" alt="" />
                            <div className="flex flex-col flex-1 gap-2">
                                <div className="flex flex-wrap justify-between gap-3">
                                    <div className="text-gray-500"><span className="font-bold text-black">{donation.user.firstName + ' ' + donation.user.lastName}</span> donated {donation.ethAmount} ETH</div>
                                    <div className="text-gray-500">{timeAgoFormat(donation.createdAt)}</div>
                                </div>
                                <div>{donation.comment || "No comments ..."}</div>
                            </div>
                        </div>
                    )) :
                    <div className="pl-3">No donations yet ...</div>
                }
                <hr />
                <div className="pl-12">
                    <button className="font-bold rounded-[4px] px-4 py-2 transition-all duration-200 text-center bg-slate-200 text-black hover:text-white hover:bg-teal-700">Load more</button>
                </div>
            </div>
        </div>
    ), [organizer, cnt, donations]);

    return DOM;
}

export default FundComments;