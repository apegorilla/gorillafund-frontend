import React, { useEffect, useState } from "react";
import Select from "react-select";
import toast from "react-hot-toast";
import CurrencyInput from "react-currency-input-field";
import { useFund } from "contexts/FundContext";
import FundAPI from "api/fund";
import { contract } from "libs/web3";
import { FUNDCATEGORY } from "libs/constants";
import logo from "assets/img/svg/gorilla.svg";
import "assets/styles/ReactSelect.css";
import WalletAddressInput from "components/util/WalletAddressInput";

const FundGoal = () => {
    const { setStep, name, setName, category, setCategory, amount, setAmount, address, setAddress } = useFund();
    const [ verify, setVerify ] = useState<boolean>(false);
    const [ isNftVerify, setNftVerify ] = useState<boolean>(true);

    const handleChangeName = e => setName(e.target.value);
    const handleChangeAmount = val => setAmount(val);
    const handleChangeAddress = val => setAddress(val);
    const handleNext = () => {
        if(!name.trim().length) return toast.error('Please input name of fundraising.');
        if(!amount) return toast.error('Please input amount of fundraising.');
        if(!category) return toast.error('Please select category.');
        if(!address) return toast.error('Please input your wallet address.');
        if(!verify && isNftVerify) return toast.custom(() => (
            <div className="flex gap-3 p-2 bg-white rounded-lg shadow-md">
                <img src={logo} alt="" />
                <div>
                    <p>You don't have ApeGorilla NFT in your wallet.</p>
                    <p>Please mint an ApeGorilla from ApeGorilla.com to create a funding proposal.</p>
                </div>
            </div>
        ));
        setStep(2);
    }

    useEffect(() => {
        if(!address || !isNftVerify) return;
        contract.methods.balanceOf(address).call()
        .then(balance => {
            if(parseInt(balance) > 0) {
                toast.success('You have ' + parseInt(balance) + ' AGC tokens in your wallet.');
                setVerify(true);
            }
            else toast.custom(() => (
                <div className="flex gap-3 p-2 bg-white rounded-lg shadow-md">
                    <img src={logo} alt="" />
                    <div>
                        <p>You don't have ApeGorilla NFT in your wallet.</p>
                        <p>Please mint an ApeGorilla from ApeGorilla.com to create a funding proposal.</p>
                    </div>
                </div>
            ));
        })
        .catch(err => toast.error(err.message));
    }, [address]);
    useEffect(() => {
        FundAPI.isNftVerify()
        .then(res => setNftVerify(res.data.nftVerify))
        .catch(err => toast.error(err.message));
    }, []);

    return (
        <>
            <div className="pt-6 text-2xl font-bold">Goal and Details about fundraiser</div>
            <div className="pt-3 text-center text-gray-500">We're here to guide you through your fundraising journey.</div>
            <div className="flex flex-col w-full pt-6">
                <div className="pb-1 font-bold">Name of Fundraising</div>
                <input type="text" value={name} onChange={handleChangeName} className="w-full rounded-[4px] py-2 px-3 focus:outline-none border-[1px] border-slate-200" placeholder="Enter fundraising name" />
            </div>
            <div className="flex flex-col w-full pt-6">
                <div className="pb-1 font-bold">How much would you like to raise?</div>
                <CurrencyInput suffix=" ETH" allowDecimals={false} defaultValue={amount} onValueChange={handleChangeAmount} placeholder="Please enter your goal" className="w-full py-2 px-3 focus:outline-none rounded-[4px] border-[1px] border-slate-200" />
            </div>
            <div className="flex flex-col w-full pt-6">
                <div className="pb-1 font-bold">What are you fundarising for?</div>
                <Select options={FUNDCATEGORY} value={category} onChange={setCategory} />
            </div>
            <div className="flex flex-col w-full pt-6">
                <div className="pb-1 font-bold">Ethereum Address*</div>
                <WalletAddressInput value={address} onChange={handleChangeAddress} />
            </div>
            <button onClick={handleNext} className="w-full rounded-[4px] py-2 mt-6 text-white bg-teal-700">Next</button>
            <div className="pt-5 text-center text-gray-500">By continuing, you agree to the GorillaFund terms and privacy policy.</div>
        </>
    )
}

export default FundGoal;