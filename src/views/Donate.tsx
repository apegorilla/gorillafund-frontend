import React, { useEffect, useState } from "react";
import { ethers } from 'ethers'
import QRCode from "react-qr-code";
import { Link, useParams } from "react-router-dom";
import EthAPI from "api/eth";
import FundAPI from "api/fund";
import DonateAPI from "api/donate";
import { addressFormat } from "libs/utils";
import web3, { isWeb3Enable, switchNetwork } from "libs/web3";
import { URL, APP_NAME } from "libs/constants";
import { useAuth } from "contexts/AuthContext";
import NotFound from "views/NotFound";
import Modal from "components/util/Modal";
import Progress from "components/util/Progress";
import CopyInput from "components/util/CopyInput";
import { FiArrowLeft } from "react-icons/fi";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsExclamationOctagon } from "react-icons/bs";
import { FaEthereum, FaExchangeAlt, FaTimes } from "react-icons/fa";
import logo from "assets/img/svg/gorilla.svg";
import toast from "react-hot-toast";

const Donate = () => {
    const { user } = useAuth();
    const { uid } = useParams();
    const [ data, setData ] = useState<any>({});
    const [ error, setError ] = useState<boolean>(false);
    const [ amount, setAmount ] = useState<any>('0.1');
    const [ USD, setUSD ] = useState<any>('0');
    const [ isOpen, setOpen ] = useState<boolean>(false);
    const [ comment, setComment ] = useState<string>("");
    
    const handleChange = e => setAmount(e.target.value);
    const handleOpen = e => setOpen(true);
    const handleClose = e => setOpen(false);
    const handleCommentChange = e => setComment(e.target.value);
    const handleDonate = async () => {
        if(!isWeb3Enable) return toast.error('Please install metamask.');
        if(amount === '0') return toast.error('Donation must be greater than 0');
        let eth = ethers.utils.parseEther(amount);
        try {
            await switchNetwork(1);
            let wallet_users = await web3.eth.requestAccounts();
            let wallet_address = wallet_users[0];
            let transactionId = await (window as any).ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: wallet_address,
                    to: data.walletAddress,
                    gas: '0x5208',
                    value: eth._hex
                }]
            });
            await DonateAPI.create({
                fundId: data.id,
                fromAddress: wallet_address,
                transactionId: transactionId,
                toAddress: data.walletAddress,
                ethAmount: parseFloat(amount),
                usdAmount: parseFloat(USD),
                comment: comment
            });
            toast.success('Thank you for fund!');
            setComment("");
            setOpen(false);
        }
        catch(err: any) { toast.error(err.message) }
    }

    useEffect(() => {
        EthAPI.get('/exchange-rates?currency=ETH')
        .then(res => setUSD((amount * res.data.data.rates.USD).toLocaleString('en')))
        .catch(err => setUSD("Cannot fetch exchange rate."));
    }, [amount]);
    useEffect(() => {
        uid && FundAPI.findByUid(uid)
        .then(res => setData(res.data))
        .catch(err => setError(true));
    }, [uid]);
    
    return error ? <NotFound /> : (
        <div className="bg-slate-50">
            <div className="flex flex-col gap-1 w-full px-3 max-w-[900px] mx-auto text-sm pb-10">
                <div className="flex items-center justify-between w-full h-16">
                    <Link to={URL.FUND.replace(':uid', data.uid)} className="flex items-center justify-center text-gray-500">
                        <FiArrowLeft size={16} />
                        <div className="hidden pl-1 font-semibold sm:block">Back to fundraising</div>
                    </Link>
                    <Link to={URL.HOME} className="flex items-center gap-3">
                        <img src={logo} className="h-8" alt="" />
                        <div className="text-lg font-bold">{APP_NAME}</div>
                    </Link>
                    {
                        user.loggedIn ? 
                        <Link to={URL.DASHBOARD} className="flex items-center justify-end gap-3 cursor-pointer">
                            <div>{user.username || addressFormat(user.walletAddress)}</div>
                            <img src={user.avatar} className="rounded-full w-8 border bg-teal-300" alt="" />
                        </Link> :
                        <div className="flex gap-2 text-right">
                            <div className="hidden text-gray-500 sm:block">Already have an account? </div>
                            <Link to={URL.LOGIN} className="font-bold text-teal-700">Sign in</Link>
                        </div>
                    }
                </div>
                <div className="flex flex-col gap-[2px] pt-6">
                    <div className="rounded-t-md">
                        <img src={data.image} className="object-cover w-full bg-white rounded-t-md h-60" alt="" />
                        <div className="flex flex-wrap items-center justify-between gap-3 p-6 bg-white">
                            <div className="flex flex-col gap-2">
                                <div className="text-lg font-bold">{data.name}</div>
                                <div className="text-gray-500">{data.headline}</div>
                            </div>
                            <Link to="#" className="flex items-center gap-2 font-semibold text-gray-500">
                                <BsExclamationOctagon />
                                Report fundraising
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-[2px] bg-slate-50">
                        <div className="flex flex-col w-full p-6 bg-white rounded-bl-md">
                            <div className="font-semibold text-gray-500">
                                <span className="text-lg font-bold text-teal-700">{data.sumDonateETH || 0} ETH </span>pledged of {data.amount?.toLocaleString('en')} ETH goal</div>
                            <div className="pt-1 text-teal-700">{data.cntDonate} donations</div>
                            <Progress percent={data.sumDonateETH / data.amount * 100} className="py-4" />
                            <hr className="mt-3" />
                            <div className="pt-6 pb-2 font-bold">Enter your donation</div>
                            <div className="relative">
                                <div className="border flex items-center justify-center px-2 mb-2">
                                    <FaEthereum size={24} className="text-gray-700" />
                                    <input type="number" min={0} value={amount} onChange={handleChange} step={0.1} className="w-full p-2 pr-0 font-semibold text-right focus:outline-none" />
                                </div>
                                <div className="border flex items-center justify-center px-2">
                                    <AiFillDollarCircle size={24} className="text-teal-700" />
                                    <input value={USD} className="w-full p-2 pr-4 font-semibold text-right text-gray-500 focus:outline-none" readOnly />
                                </div>
                                <div className="absolute bg-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex items-center justify-center w-8 h-8 border rounded-full">
                                    <FaExchangeAlt className="text-gray-500 rotate-90" />
                                </div>
                            </div>
                            <div className="py-8 text-gray-500">Please ensure before making any transaction that the address entered matches the address displayed here.</div>
                            <button onClick={handleOpen} className="w-full py-2 font-bold text-white rounded-[4px] bg-teal-700">Donate</button>
                        </div>
                        <div className="w-full p-6 bg-white rounded-br-md">
                            <div className="flex justify-center">
                                <div className="border rounded p-2 border-gray-500">
                                    <QRCode value={`ethereum:${data.walletAddress}`} level="M" size={130} />
                                </div>
                            </div>
                            <div className="pt-6 pb-2 font-semibold text-gray-500">Send your ETH donation to:</div>
                            <CopyInput value={data.walletAddress} />
                            <div className="pt-8 text-gray-500">Please ensure before making any transaction that the address entered matches the address displayed here.</div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={isOpen} onClose={handleClose}>
                <div className="w-full max-w-md p-6 bg-white">
                    <div className="flex justify-between gap-10">
                        <div className="text-base font-bold text-black">Please leave comment about your donate.</div>
                        <button onClick={handleClose}><FaTimes size={16} /></button>
                    </div>
                    <hr className="my-3" />
                    <div className="flex justify-between pb-1 text-sm text-black">
                        <div>Amount: {amount} ETH</div>
                        <div>$ {USD}</div>
                    </div>
                    <textarea value={comment} onChange={handleCommentChange} className="w-full h-20 focus:outline-none border py-2 px-3 rounded-[4px]"></textarea>
                    <hr className="my-3" />
                    <button onClick={handleDonate} className="w-full py-2 font-bold text-white rounded-[4px] bg-teal-700">Confirm</button>
                </div>
            </Modal>
        </div>
    )
}

export default Donate;