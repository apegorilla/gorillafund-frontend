import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { URL } from "libs/constants";
import { getUserName, timeAgoFormat } from "libs/utils";
import Progress from "components/util/Progress";
import { FaEthereum } from "react-icons/fa";

const FundLeft = ({ uid, raised, donations, goal }) => {
    const [ DOM, setDOM ] = useState<JSX.Element>(
        <div className="flex flex-col gap-8 p-5 min-w-[380px] bg-white animate-pulse">
            <div className="w-full">
                <div className="h-5 rounded-full bg-slate-300" />
                <div className="w-40 h-4 mt-2 rounded-full bg-slate-300" />
                <div className="w-full h-1 mt-3 mb-8 rounded-full bg-slate-300" />
                <button className="inline-block font-bold rounded-[4px] w-full py-2 text-center text-white bg-teal-700">...</button>
            </div>
            <div className="flex flex-col gap-8">
                <div className="w-24 h-5 rounded-full bg-slate-300" />
                {
                    Array(3).fill(0).map((item, key) => (
                        <div className="flex gap-3" key={key}>
                            <div className="w-10 h-10 bg-teal-300 rounded-full" />
                            <div className="flex flex-col justify-between flex-1 w-full py-1">
                                <div className="w-full h-4 rounded-full bg-slate-300" />
                                <div className="w-20 h-3 rounded-full bg-slate-300" />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );

    useEffect(() => uid && donations && goal && setDOM(
        <div className="flex flex-col gap-8 p-5 min-w-[380px] text-sm bg-white">
            <div className="w-full">
                <div className="flex items-center">
                    <FaEthereum className="text-teal-700" size={20} />
                    <div className="text-gray-500">
                        <span className="text-lg font-bold text-teal-700">
                            {(raised || 0).toLocaleString('en')}
                        </span> pledged of {goal?.toLocaleString('en')} ETH goal
                    </div>
                </div>
                <div className="text-teal-700">{donations.length} donations</div>
                <Progress percent={raised / goal * 100} className="mt-3 mb-8" />
                <Link to={URL.DONATE.replace(':uid', uid)} className="inline-block font-bold rounded-[4px] w-full py-2 text-center text-white bg-teal-700">Donate now</Link>
            </div>
            <div className="flex flex-col gap-8">
                <div className="text-base font-bold">Donations({donations.length})</div>
                {
                    donations.length ?
                    donations?.map((donation, key) => (
                        <div className="flex gap-3" key={key}>
                            <img src={donation.user.avatar} className="w-10 h-10 bg-teal-300 rounded-full" alt="" />
                            <div className="">
                                <div className="text-gray-500"><span className="font-bold text-black">{getUserName(donation.user)}</span> donated {donation.ethAmount} ETH</div>
                                <div className="text-gray-500">{timeAgoFormat(donation.createdAt)}</div>
                            </div>
                        </div>
                    )) :
                    <div className="pl-3">No donations yet ...</div>
                }
                <button className="w-full bg-slate-200 rounded-[4px] transition-all duration-200 py-2 text-black font-bold hover:border-teal-700 hover:bg-teal-700 hover:text-white">See all donations</button>
            </div>
        </div>
    ), [uid, raised, donations, goal]);

    return DOM;
}

export default FundLeft;