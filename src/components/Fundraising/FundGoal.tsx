import React from "react";
import Select from "react-select";
import toast from "react-hot-toast";
import CurrencyInput from "react-currency-input-field";
import { useFund } from "contexts/FundContext";
import { FUNDCATEGORY } from "libs/constants";
import "assets/styles/ReactSelect.css";
import { FiArrowLeft } from "react-icons/fi";

const FundGoal = () => {
    const { setStep, name, setName, category, setCategory, amount, setAmount, address } = useFund();

    const handleChangeName = e => setName(e.target.value);
    const handleChangeAmount = val => setAmount(val);
    const handleNext = () => {
        if(!name.trim().length) return toast.error('Please input name of fundraising.');
        if(!amount) return toast.error('Please input amount of fundraising.');
        if(!category) return toast.error('Please select category.');
        if(!address) return toast.error('Please input your wallet address.');
        setStep(3);
    }
    const handlePrev = () => setStep(1);

    return (
        <>
            <div className="pt-6 text-2xl font-bold">Goal and Details about fundraiser</div>
            <div className="pt-3 text-center text-gray-500">We're here to guide you through your fundraising journey.</div>
            <div className="flex flex-col w-full pt-6">
                <div className="pb-1 font-bold">Name of Fundraising</div>
                <input type="text" value={name} onChange={handleChangeName} className="w-full rounded-[4px] py-2 px-3 focus:outline-none border border-slate-200" placeholder="Enter fundraising name" />
            </div>
            <div className="flex flex-col w-full pt-6">
                <div className="pb-1 font-bold">How much would you like to raise?</div>
                <CurrencyInput suffix=" ETH" allowDecimals={false} defaultValue={amount} onValueChange={handleChangeAmount} placeholder="Please enter your goal" className="w-full py-2 px-3 focus:outline-none rounded-[4px] border border-slate-200" />
            </div>
            <div className="flex flex-col w-full pt-6">
                <div className="pb-1 font-bold">What are you fundarising for?</div>
                <Select options={FUNDCATEGORY} value={category} onChange={setCategory} />
            </div>
            <div className="flex flex-col w-full pt-6">
                <div className="pb-1 font-bold">Ethereum Address*</div>
                <input type="text" defaultValue={address} className="w-full rounded-[4px] py-2 px-3 focus:outline-none border border-slate-200" disabled />
            </div>
            <button onClick={handleNext} className="w-full rounded-[4px] py-2 mt-6 text-white bg-teal-700">Next</button>
            <button onClick={handlePrev} className="flex items-center justify-center w-full py-2 mt-3 transition-all duration-200 bg-white border border-white hover:border-teal-700 rounded-[4px]">
                <FiArrowLeft size={16} />
                <div className="pl-1 font-bold">Go back</div>
            </button>
        </>
    )
}

export default FundGoal;