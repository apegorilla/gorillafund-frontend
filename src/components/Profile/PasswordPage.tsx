import React, { useEffect, useState, useCallback } from "react";
import Auth from "api/auth";
import { MdLockOutline } from "react-icons/md";
import toast from "react-hot-toast";

const PasswordPage = ({submit, setSubmit}) => {
    const [ current, setCurrent ] = useState<string>("");
    const [ newPass, setNew ] = useState<string>("");
    const [ repeat, setRepeat ] = useState<string>("");

    const handleCurrent = e => setCurrent(e.target.value);
    const handleNew = e => setNew(e.target.value);
    const handleRepeat = e => setRepeat(e.target.value);

    const setPassword = useCallback(() => {
        setSubmit(false);
        if(newPass.length < 8) return toast.error('Password must be at least 8 characters.');
        if(newPass !== repeat) return toast.error('Please input password correctly.');
        Auth.changePassword(current, newPass)
        .then(res => {
            if(res.data.success) return toast.success("Changed successfully.");
            else return toast.error(res.data.message);
        })
        .catch(err => toast.error(err?.response.data.message || err.message));
    }, [current, newPass, repeat, setSubmit]);

    useEffect(() => {
        if(submit) setPassword();
    }, [submit, setPassword]);

    return (
        <div className="py-5 bg-slate-50">
            <div className="max-w-[900px] w-full mx-auto px-3">
                <div className="p-5 bg-white rounded-t-md">
                    <div className="font-bold">Password and Security</div>
                    <div className="text-sm text-gray-500">Update your photo and personal details here.</div>
                </div>
                <hr />
                <div className="p-5 bg-white rounded-b-md">
                    <div className="max-w-[400px] text-sm">
                        <div className="">
                            <div className="pb-2 font-bold">Current password</div>
                            <div className="flex rounded-sm bg-white w-full border border-slate-200">
                                <div className="flex items-center justify-center px-3">
                                    <MdLockOutline className="text-gray-500" size={16} />
                                </div>
                                <input type="password" value={current} onChange={handleCurrent} className="w-full py-2 pr-4 focus:outline-none" placeholder="Current password" />
                            </div>
                        </div>
                        <div className="pt-4">
                            <div className="pb-2 font-bold">New password</div>
                            <div className="flex rounded-sm bg-white w-full border border-slate-200">
                                <div className="flex items-center justify-center px-3">
                                    <MdLockOutline className="text-gray-500" size={16} />
                                </div>
                                <input type="password" value={newPass} onChange={handleNew} className="w-full py-2 pr-4 focus:outline-none" placeholder="New password" />
                            </div>
                            <div className="pt-1 text-gray-500">Must be at least 8 characters.</div>
                        </div>
                        <div className="pt-4">
                            <div className="pb-2 font-bold">Re-enter password</div>
                            <div className="flex rounded-sm bg-white w-full border border-slate-200">
                                <div className="flex items-center justify-center px-3">
                                    <MdLockOutline className="text-gray-500" size={16} />
                                </div>
                                <input type="password" value={repeat} onChange={handleRepeat} className="w-full py-2 pr-4 focus:outline-none" placeholder="Re-enter password" />
                            </div>
                            <div className="pt-1 text-gray-500">Password must match with new password.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PasswordPage;