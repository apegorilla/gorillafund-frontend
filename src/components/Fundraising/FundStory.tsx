import React from "react";
import { useFund } from "contexts/FundContext";
import { FiArrowLeft } from "react-icons/fi";
import toast from "react-hot-toast";

const FundStory = () => {
    const { setStep, head, setHead, desc, setDesc } = useFund();

    const onChangeHead = e => setHead(e.target.value);
    const onChangeDesc = e => setDesc(e.target.value);
    const handleNext = () => {
        let isValid = true;
        if(head.trim().length < 10) isValid = false;
        if(desc.trim().length < 10) isValid = false;
        if(isValid) setStep(5);
        else toast.error("Please provide correct details.");
    };
    const handlePrev = () => setStep(3);
    
    return (
        <>
            <div className="pt-6 text-2xl font-bold">Create an account to save and continue</div>
            <div className="pt-3 text-center text-gray-500">Please fill in your information to proceed with creating a fundraising.</div>
            <div className="flex flex-col w-full pt-6">
                <div className="pb-1 font-bold">Headline</div>
                <input type="text" value={head} onChange={onChangeHead} className="w-full px-3 py-2 border focus:outline-none border-slate-200" placeholder="Enter a headline" />
            </div>
            <div className="flex flex-col w-full pt-6">
                <div className="pb-1 font-bold">Description</div>
                <textarea value={desc} onChange={onChangeDesc} className="w-full h-[150px] py-2 px-3 focus:outline-none border border-slate-200" placeholder="Enter a description..." />
            </div>
            <button onClick={handleNext} className="w-full py-2 mt-6 text-white bg-teal-700 rounded-[4px]">Continue</button>
            <button onClick={handlePrev} className="flex items-center justify-center w-full py-2 mt-3 transition-all duration-200 bg-white border border-white hover:border-teal-700 rounded-[4px]">
                <FiArrowLeft size={16} />
                <div className="pl-1 font-bold">Go back</div>
            </button>
        </>
    )
}

export default FundStory;