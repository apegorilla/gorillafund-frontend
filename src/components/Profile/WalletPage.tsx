import React, { useEffect, useState, useCallback } from "react";
import UserAPI from "api/user";
import web3, { isWeb3Enable } from "libs/web3";
import { useAuth } from "contexts/AuthContext";
import { FiLink2 } from "react-icons/fi";
import toast from "react-hot-toast";

const WalletPage = ({ submit, setSubmit }) => {
    const { user, logOut } = useAuth();
    const [ wallet, setWallet ] = useState<string>("");
    const handleClick = () => {
        if(!isWeb3Enable) return;
        web3.eth.requestAccounts()
        .then(users => setWallet(users[0]))
        .catch(err => window.console.log(err.message));
    }
    const changeWallet = useCallback(() => {
        setSubmit(false);
        UserAPI.confirmWallet(wallet)
        .then(res => {
            if(res.data.success) return UserAPI.updateWallet(wallet);
            else throw new Error("Wallet is already in use");
        })
        .then(res => {
            toast.success("Changed successfully. Please sign in again.");
            logOut();
        })
        .catch(err => toast.error(err.message));
    }, [logOut, setSubmit, wallet]);

    useEffect(() => user.walletAddress && setWallet(user.walletAddress), [user]);
    useEffect(() => {
        if(submit) changeWallet();
    }, [submit, changeWallet])

    return (
        <div className="py-5 bg-slate-50">
            <div className="max-w-[900px] w-full mx-auto px-3">
                <div className="p-5 bg-white rounded-t-md">
                    <div className="font-bold">Wallet</div>
                    <div className="text-sm text-gray-500">Connect your wallet and get exclusive access to GorillaFund.</div>
                </div>
                <hr />
                <div className="p-5 bg-white rounded-b-md">
                    <div className="max-w-[400px] text-sm">
                        <div className="text-sm font-bold">Your wallet</div>
                        <button className="flex items-center px-3 py-2 mt-3 text-white bg-teal-700 rounded-[4px]">
                            <FiLink2 />
                            <div onClick={handleClick} className="pl-2">{wallet || "Connect wallet"}</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WalletPage;