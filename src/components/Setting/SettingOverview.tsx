import React, { useState } from "react";
import ReactSelect from "react-select";
import { useNavigate } from "react-router-dom";
import CurrencyInput from "react-currency-input-field";
import Modal from "components/util/Modal";
import Toggle from "components/util/Toggle";
import CopyInput from "components/util/CopyInput";
import WalletAddressInput from "components/util/WalletAddressInput";
import FundAPI from "api/fund";
import { FUNDCATEGORY, URL } from "libs/constants";
import toast from "react-hot-toast";

const SettingOverview = ({data, setData}) => {

    const navigate = useNavigate();
    const [isOpen, setOpen] = useState<boolean>(false);
    const [isValid, setValid] = useState<boolean>(false);
    const changeName = e => setData({ ...data, name: e.target.value });
    const changeAmount = val => setData({ ...data, amount: val });
    const changeAddress = val => setData({ ...data, walletAddress: val  });
    const changeCategory = val => setData({ ...data, categoryId: val.value });
    const changeDonor = val => setData({ ...data, allowDonorComment: val });
    const changeVisitor = val => setData({ ...data, allowVisitorComment: val });
    const changeDonation = val => setData({ ...data, allowDonation: val });
    const changeSearch = val => setData({ ...data, allowSearch: val });

    const handleDelete = (e) => {
        e.preventDefault();
        if(!isValid) return;
        FundAPI.delete(data.uid).then(res => navigate(URL.DASHBOARD)).catch(err => toast.error(err.message));
    }
    const handleChange = e => setValid(e.target.value === "delete");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className="w-full bg-slate-50">
            <div className="max-w-[900px] mx-auto px-3 py-5">
                <div className="p-5 text-sm bg-white rounded-md">
                    <div className="flex gap-3">
                        <div className="flex-1">
                            <div className="pb-1 font-bold">Name</div>
                            <input type="text" value={data.name || ""} onChange={changeName} className="w-full rounded-[4px] py-2 px-3 focus:outline-none border border-slate-200" placeholder="Enter fundraising name" />
                        </div>
                        <div className="flex-1">
                            <div className="pb-1 font-bold">Goal</div>
                            <CurrencyInput value={data.amount} onValueChange={changeAmount} suffix=" ETH" placeholder="Please enter your goal" className="w-full py-2 px-3 rounded-[4px] focus:outline-none border border-slate-200" />
                        </div>
                    </div>
                    <div className="pt-4">
                        <div className="pb-1 font-bold">Category</div>
                        <ReactSelect options={FUNDCATEGORY} value={FUNDCATEGORY[data.categoryId]} onChange={changeCategory} />
                    </div>
                    <div className="pt-4">
                        <div className="pb-1 font-bold">Address</div>
                        <WalletAddressInput value={data.walletAddress || ""} onChange={changeAddress} />
                    </div>
                    <div className="pt-4">
                        <div className="pb-1 font-bold">Campaign link</div>
                        <CopyInput value={window.location.origin + URL.FUND.replace(':uid', data.uid)} />
                        <div className="pt-1 text-gray-500">This link can be only changed once. Changing your link does not break your previous link.</div>
                    </div>
                    <hr className="my-5" />
                    <div className="font-bold">Fundraising setting</div>
                    <div className="flex justify-between pt-5 font-semibold">
                        <div className="text-gray-700">Allow donors to leave comments on my fundraiser.</div>
                        <Toggle onChange={changeDonor} checked={data.allowDonorComment} />
                    </div>
                    <div className="flex justify-between pt-6 font-semibold">
                        <div className="text-gray-700">Allow visitors leave comments on my fundraiser.</div>
                        <Toggle onChange={changeVisitor} checked={data.allowVisitorComment} />
                    </div>
                    <hr className="my-3" />
                    <div className="flex justify-between font-semibold">
                        <div className="text-gray-700">Allow donations to my fundraiser.</div>
                        <Toggle onChange={changeDonation} checked={data.allowDonation} />
                    </div>
                    <hr className="my-3" />
                    <div className="flex justify-between pb-1 font-semibold">
                        <div className="text-gray-700">Remove from search results</div>
                        <Toggle onChange={changeSearch} checked={data.allowSearch} />
                    </div>
                    <div className="text-xs text-gray-500">Your fundraiser will not appear in online search engines or GorillaFund search results.</div>
                    <div className="text-xs text-gray-500">AnyOne with a link will still be able to view the fundraiser.</div>
                </div>
                <div className="flex items-center justify-between p-5 mt-5 text-sm bg-white rounded-md">
                    <div className="">
                        <div className="pb-1 font-bold">Delete my fundraiser</div>
                        <div className="text-xs text-gray-500">You will no longer have access to this fundraiser after deleting.</div>
                        <div className="text-xs text-gray-500">If you received donations, your donors will still be able to view a summary.</div>
                    </div>
                    <div className="">
                        <button onClick={handleOpen} className="px-4 py-2 font-semibold text-white transition-all duration-200 bg-red-400 rounded-[4px] hover:bg-red-600 hover:shadow-md">Delete fundraiser</button>
                    </div>
                </div>
            </div>
            <Modal isOpen={isOpen} onClose={handleClose}>
                <form onSubmit={handleDelete} className="w-full max-w-md p-6 bg-white">
                    <div className="flex items-end justify-between">
                        <div className="font-bold text-black">Delete your fundraisers</div>
                        <div onClick={handleClose} className="text-2xl font-bold text-gray-500 cursor-pointer">&times;</div>
                    </div>
                    <p className="text-sm text-gray-500">You will no longer have access to this fundraiser after deleting.</p>
                    <p className="text-sm text-gray-500">If you wnat to continue with this action, type "delete" below.</p>
                    <hr className="my-4" />
                    <input type="text" onChange={handleChange} className="w-full rounded-[4px] py-2 px-3 focus:outline-none border border-slate-200" autoComplete="off" placeholder="delete" />
                    <button type="submit" className="w-full py-2 mt-4 font-bold text-white transition-all duration-200 bg-teal-700 disabled:opacity-70 rounded-[4px]" disabled={!isValid}>Delete fundraiser</button>
                </form>
            </Modal>
        </div>
    )
}

export default SettingOverview;