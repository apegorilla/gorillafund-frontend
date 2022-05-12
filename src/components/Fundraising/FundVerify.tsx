import React, { useEffect, useState, useRef } from "react";
import FundAPI from "api/fund";
import { contract } from "libs/web3";
import { SOCIAL } from "libs/constants";
import { useFund } from "contexts/FundContext";
import WalletAddressInput from "components/util/WalletAddressInput";
import toast from "react-hot-toast";

const FundVerify = () => {
    const button = useRef<HTMLButtonElement>(null);
    const { setStep, address, setAddress } = useFund();
    const [ isVerified, setVerified ] = useState<boolean>(false);
    const handleNext = async () => {
        button.current && (button.current.disabled = true);
        if(isVerified) setStep(2);
        else {
            if(!address.trim().length) {
                button.current && (button.current.disabled = false);
                return toast.error('Please connect your wallet.');
            }
            let balance;
            try{
                balance = await contract.methods.balanceOf(address).call();
            }
            catch(err) {
                toast.error((err as Error).message);
                button.current && (button.current.disabled = false);
            }
            if(isNaN(balance)) return;
            if(parseInt(balance) === 0) toast.error("You don't have ApeGorilla NFT.")
            else {
                setVerified(true);
                toast.success("Verified successfully.");
            }
            button.current && (button.current.disabled = false);
        }
    };
    const handleChangeAddress = val => setAddress(val);

    useEffect(() => {
        FundAPI.isNftVerify()
        .then(res => setVerified(!res.data.nftVerify))
        .catch(err => toast.error(err.message));
    }, []);

    return (
        <>
            <div className="pt-6 text-2xl font-bold">Verify NFT Ownership</div>
            <div className="pt-3 text-center text-gray-500">Confirm you are an Ape Gorilla Holder.</div>
            <div className="flex flex-col w-full pt-6">
                <div className="pb-1 font-bold">Ethereum Address*</div>
                <WalletAddressInput value={address} onChange={handleChangeAddress} />
                <div className="px-3 pt-3 text-gray-500">
                    If you don't have ApeGorilla NFT in your wallet,
                    please mint an ApeGorilla
                    from <a href={SOCIAL.WEBSITE} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">apegorilla.com</a> to
                    create a funding proposal.
                </div>
            </div>
            <button ref={button} onClick={handleNext} className="w-full py-2 mt-6 text-white bg-teal-700 rounded-[4px] disabled:opacity-50">{ isVerified ? 'Next' : 'Verify' }</button>
            <div className="pt-5 text-center text-gray-500">By continuing, you agree to the GorillaFund terms and privacy policy.</div>
        </>
    )
}

export default FundVerify;