import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { nFormatter } from "libs/utils";
import { useFund } from "contexts/FundContext";
import { FiArrowLeft } from "react-icons/fi";

const FundPreview = () => {
    var button;
    const { setStep, name, amount, image, head, desc, submit, setWel } = useFund();
    const [url, setURL] = useState<string>('');
    const handleComplete = () => {
        button.disabled = true;
        submit().then(res => {
            button.disable = false;
            setWel(res.data.uid);
        })
        .catch(err => {
            toast.error(err.message);
            button.disabled = false;
        });
    }
    const handlePrev = () => setStep(4);

    useEffect(() => {
        if(image) setURL(window.URL.createObjectURL(image));
    }, [image]);

    return (
        <>
            <div className="pt-6 text-2xl font-bold">Preview of your fundraiser</div>
            <div className="pt-3 text-center text-gray-500">Explain who you are and why you're fundraising.</div>
            <img src={url} className="pt-5 w-full object-cover rounded-[4px]" alt="" />
            <div className="flex flex-col w-full px-3 py-5">
                <div className="text-base font-bold">{name}</div>
                <div className="pt-3 text-gray-500">{head}</div>
                <hr className="mt-5" />
                <div className="pt-5 text-base font-bold">Story</div>
                <div className="pt-3 text-gray-500">{desc}</div>
                <hr className="mt-5" />
                <div className="flex justify-between pt-5">
                    <div className="text-base font-bold">0.0 ETH raised</div>
                    <div className="text-base text-gray-500">{nFormatter(amount, 1)} ETH Goal</div>
                </div>
            </div>
            <button onClick={handleComplete} ref={el => button = el} className="w-full py-2 mt-6 text-white bg-teal-700 disabled:opacity-50 rounded-[4px]">Complete fundraiser</button>
            <button onClick={handlePrev} className="flex items-center justify-center w-full py-2 mt-3 transition-all duration-200 bg-white border border-white hover:border-teal-700 rounded-[4px]">
                <FiArrowLeft size={16} />
                <div className="pl-1 font-bold ">Go back</div>
            </button>
        </>
    )
}

export default FundPreview;