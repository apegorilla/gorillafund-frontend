import React, { useEffect, useState } from "react";
import Donation from "components/MyFund/content/Donation";
import Comment from "components/MyFund/content/Comment";
import Update from "components/MyFund/content/Update";

const MyFundContent = ({ fund }) => {
    const [ index, setIndex ] = useState<number>(1);
    const [ content, setContent ] = useState<any>(<Donation donates={fund.donates} />);
    const changeContent = i => (() => setIndex(i));

    useEffect(() => {
        index === 1 && setContent(<Donation donates={fund.donates} />);
        index === 2 && setContent(<Comment comments={fund.comments} />);
        index === 3 && setContent(<Update />);
    }, [index, fund])

    return (
        <div className="flex flex-col text-sm text-gray-500 bg-white max-w-[876px] my-6 mx-auto rounded-md">
            <div className="flex gap-5 px-6">
                <div onClick={changeContent(1)} className={"py-3 font-bold cursor-pointer hover:border-b-2 hover:border-teal-700" + (index === 1 ? " text-black border-b-2 border-teal-700" : "")}>Donations</div>
                <div onClick={changeContent(2)} className={"py-3 font-bold cursor-pointer hover:border-b-2 hover:border-teal-700" + (index === 2 ? " text-black border-b-2 border-teal-700" : "")}>Comments</div>
                <div onClick={changeContent(3)} className={"py-3 font-bold cursor-pointer hover:border-b-2 hover:border-teal-700" + (index === 3 ? " text-black border-b-2 border-teal-700" : "")}>Update</div>
            </div>
            <hr />
            { content }
        </div>
    )
}

export default MyFundContent;