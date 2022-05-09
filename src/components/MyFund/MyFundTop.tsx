import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "components/util/Modal";
import Progress from "components/util/Progress";
import CopyInput from "components/util/CopyInput";
import { URL, APP_URL, APP_NAME, SOCIAL } from "libs/constants";
import { FiShare2 } from "react-icons/fi";
import { ImTwitter } from "react-icons/im";
import { AiOutlineMail } from "react-icons/ai";
import { MdOutlineSettings } from "react-icons/md";
import { BsFacebook, BsLinkedin, BsDiscord } from "react-icons/bs";

const MyFundTop = ({ fund }) => {
    const [ data, setData ] = useState<any>({});
    const [ raised, setRaise ] = useState<number>(0);
    const [ isOpen, setOpen ] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        setData(fund);
        setRaise(fund.donates?.reduce((sum, donate) => sum + donate.ethAmount, 0));
    }, [fund]);

    return (
        <div className="bg-white">
            <img src={data.image} className="object-cover rounded-[4px] w-full opacity-30 h-44" alt="" />
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 max-w-[900px] px-3 mx-auto -translate-y-20 -mb-20">
                <img src={data.image} className="object-cover h-40 w-72 rounded-[4px] border border-teal-700 bg-white" alt="" />
                <div className="flex flex-col w-full gap-2 sm:flex-1">
                    <div className="text-sm text-gray-500">Fundraising progress</div>
                    <Progress percent={raised / data.amount * 100} />
                    <div className="flex justify-between">
                        <div className="text-sm font-bold">{raised} ETH raised</div>
                        <div className="text-sm text-gray-500">{data.amount} ETH Goal</div>
                    </div>
                </div>
            </div>
            <hr className="my-6" />
            <div className="flex items-center flex-wrap gap-3 pb-3 justify-between max-w-[900px] mx-auto px-3">
                <div className="flex flex-col gap-2">
                    <div className="font-bold">{data.name}</div>
                    <div className="text-sm text-gray-500">{data.headline}</div>
                </div>
                <div className="flex gap-3">
                    <Link to={URL.SETTING.replace(':uid', data.uid || '')} className="flex rounded-[4px] items-center gap-2 border py-2 px-3 hover:border-teal-700 hover:bg-teal-700 hover:text-white transition-all duration-200 hover:shadow-md">
                        <MdOutlineSettings size={20} />
                        <div className="text-sm font-bold">Setting</div>
                    </Link>
                    <button onClick={handleOpen} className="flex rounded-[4px] items-center gap-2 border py-2 px-3 hover:border-teal-700 hover:bg-teal-700 hover:text-white transition-all duration-200 hover:shadow-md">
                        <FiShare2 size={20} />
                        <div className="text-sm font-bold">Share fundraiser</div>
                    </button>
                </div>
            </div>
            <Modal isOpen={isOpen} onClose={handleClose}>
                <div className="w-full max-w-md p-6 bg-white">
                    <div className="flex items-end justify-between">
                        <div className="font-bold text-black">Help by sharing</div>
                        <div onClick={handleClose} className="text-2xl font-bold text-gray-500 cursor-pointer">&times;</div>
                    </div>
                    <div className="pt-2 text-sm text-gray-500">Fundraisers shared on social networks raise up to 5x more</div>
                    <hr className="my-5" />
                    <div className="grid grid-cols-3 gap-3 text-sm font-semibold text-gray-500">
                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${APP_URL + URL.FUND.replace(':uid', data.uid)}`} target="_blank" rel="noreferrer" className="border flex flex-col gap-3 items-center py-5 rounded-[4px]">
                            <BsFacebook size={30} className="text-blue-600" />
                            <div>Facebook</div>
                        </a>
                        <a href={`https://twitter.com/intent/tweet/?text=${data.name}&url=${APP_URL + URL.FUND.replace(':uid', data.uid)}&via=${APP_NAME}`} target="_blank" rel="noreferrer" className="border flex flex-col gap-3 items-center py-5 rounded-[4px]">
                            <ImTwitter size={30} className="text-sky-500" />
                            <div>Twitter</div>
                        </a>
                        <a href={`https://www.linkedin.com/shareArticle?mini=true&source=${APP_NAME}&title=${data.name}&url=${APP_URL + URL.FUND.replace(':uid', data.uid)}`} target="_blank" rel="noreferrer" className="border flex flex-col gap-3 items-center py-5 rounded-[4px]">
                            <BsLinkedin size={30} />
                            <div>LinkedIn</div>
                        </a>
                        <a href={SOCIAL.DISCORD} target="_blank" rel="noreferrer" className="border flex flex-col gap-3 items-center py-5 rounded-[4px]">
                            <BsDiscord size={30} className="text-indigo-400" />
                            <div>Discord</div>
                        </a>
                        <a href={`mailto:?body=Check it out: ${APP_URL + URL.FUND.replace(':uid', data.uid)} via ${APP_NAME}&subject=${data.name}`} target="_blank" rel="noreferrer" className="border flex flex-col gap-3 items-center py-5 rounded-[4px]">
                            <AiOutlineMail size={30} />
                            <div>Email</div>
                        </a>
                    </div>
                    <hr className="my-5" />
                    <div className="pb-1 font-bold text-gray-800">Share via link</div>
                    <CopyInput value={APP_URL + URL.FUND.replace(':uid', data.uid)} className="text-sm text-gray-500" />
                </div>
            </Modal>
        </div>
    )
}

export default MyFundTop;