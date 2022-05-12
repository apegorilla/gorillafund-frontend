import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminAPI from "api/admin";
import Modal from "components/util/Modal";
import Toggle from "components/util/Toggle";
import Loading from "components/util/Loading";
import { timeAgoFormat, getUserName } from "libs/utils";
import { FUNDCATEGORY } from "libs/constants";

const AdminFund = () => {
    const [ funds, setFunds ] = useState<any[]>();
    const [ fund, setFund ] = useState<any>({});
    const [ isOpen, setOpen ] = useState<boolean>(false);
    const loadData = () => {
        AdminAPI.funds()
        .then(res => setFunds(res.data))
        .catch(err => toast.error(err.message));
    }
    const onApprove = (uid: string) => {
        return () => AdminAPI.approve(uid)
        .then(res => {
            loadData();
            let message = res.data.approved ? "Approved successfully." : "Disapproved successfully.";
            toast.success(message);
        })
        .catch(err => toast.error(err.message));
    };
    const onBlur = (uid: string) => {
        return () => AdminAPI.blur(uid)
        .then(res => {
            loadData();
            let message = res.data.isImageBlur ? "You set image blur." : "You set image clear.";
            toast.success(message);
        })
        .catch(err => toast.error(err.message));
    };
    const onClick = (uid: string) => {
        return () => AdminAPI.fund(uid)
        .then(res => {
            setOpen(true);
            setFund(res.data);
        })
        .catch(err => toast.error(err.message));
    }
    const onClose = () => setOpen(false);
    useEffect(loadData, []);

    return (
        <div className="flex flex-col gap-2 px-5 py-5">
            {
                funds ? (
                    funds.length ?
                    funds.map((fund, key) => (
                        <div key={key} className="rounded-[4px] hover:shadow-md border">
                            <div onClick={onClick(fund.uid)} className="px-3 py-2 flex justify-between text-white rounded-t-[4px] bg-teal-700">
                                <div className="cursor-pointer line-clamp-1 hover:underline">{fund.name}</div>
                                <div>Goal: {fund.amount} ETH</div>
                            </div>
                            <div className="px-3 my-2 text-gray-600 line-clamp-3">{fund.description}</div>
                            <hr />
                            <div className="flex justify-between px-3 py-2 text-sm">
                                <div className="flex items-center gap-3">
                                    <img src={fund.user?.avatar} alt="" className="w-8 h-8 bg-teal-300 rounded-full" />
                                    <div>{getUserName(fund.user)}</div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div>{"Created " + timeAgoFormat(fund.createdAt)}</div>
                                    <div className="flex gap-1">
                                        <span>Approved:</span>
                                        <Toggle onChange={onApprove(fund.uid)} checked={fund.approved} />
                                    </div>
                                    <div className="flex gap-1">
                                        <span>Image blur:</span>
                                        <Toggle onChange={onBlur(fund.uid)} checked={fund.isImageBlur} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) :
                    <div>Nothing to show ...</div>
                ) : <Loading />
            }
            <Modal isOpen={isOpen} onClose={onClose}>
                <div className="flex flex-col max-w-[900px] mx-auto px-3 bg-white">
                    <div className="pt-6 text-lg font-bold">{fund.name}</div>
                    <div className="py-6 pt-1 text-sm text-gray-500">{fund.headline}</div>
                    <div className="max-w-[500px] flex-1 text-gray-500 text-sm">
                        <img src={fund.image} alt="" />
                        <div className="flex justify-between py-5">
                            <div className="px-3 py-1 text-teal-700 transition-all duration-200 rounded-full bg-teal-700/20 hover:text-white hover:bg-teal-700">{FUNDCATEGORY[fund.categoryId]?.label}</div>
                            <div className="">{"Created " + timeAgoFormat(fund.createdAt)}</div>
                        </div>
                        <hr />
                        <div className="py-5 text-lg font-bold text-black">Story</div>
                        <div className="pb-5 whitespace-pre-wrap">{fund.description}</div>
                        <hr />
                        <div className="flex justify-between py-5 text-black">
                            <div><span className="font-bold">{fund.sumDonateETH || 0}</span> ETH raised</div>
                            <div>Goal: <span className="font-bold">{fund.amount}</span> ETH</div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default AdminFund;