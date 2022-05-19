import React, { useState } from "react";
import UserAPI from "api/user";
import { APP_URL, URL } from "libs/constants";
import { useAuth } from "contexts/AuthContext";
import Nav from "components/Nav/Nav";
import Footer from "components/Footer/Footer";
import CopyInput from "components/util/CopyInput";
import toast from "react-hot-toast";

const Invite = () => {
    const { user } = useAuth();
    const [ email, setEmail ] = useState<string>("");
    const onChange = e => setEmail(e.target.value);
    const onSubmit = e => {
        e.preventDefault();
        UserAPI.invite(email)
        .then(() => toast.success('Invite sent successfully.'))
        .catch(err => toast.error(err.message));
    }

    return (
        <>
            <Nav />
            <div className="w-full bg-white">
                <div className="px-3 pt-10 pb-2 max-w-[900px] mx-auto">
                    <div className="px-5 py-3 border rounded-md shadow-md">
                        <div className="text-lg font-bold">Share your link</div>
                        <div className="text-sm text-gray-500">Copy your personal referral link an share it with your friends and followers.</div>
                        <CopyInput value={APP_URL + URL.GET_INVITE.replace(':uid', user.username)} className="mt-3 text-sm" />
                    </div>
                </div>
                <div className="px-3 pt-10 pb-3 max-w-[900px] mx-auto">
                    <div className="text-lg font-bold">Refer by email</div>
                    <div className="pb-4 text-sm text-gray-500">Enter your contact manually and we'll invite him for you.</div>
                    <form onSubmit={onSubmit} className="flex items-center justify-between gap-3">
                        <input type="email" value={email} onChange={onChange} className="flex-1 px-3 py-2 text-sm border outline-none rounded-[4px]" placeholder="Type email address here" />
                        <button className="border border-teal-700 px-4 py-1 rounded-[4px] text-teal-700 hover:bg-teal-700 hover:text-white transition-all duration-200 hover:shadow-md">Send invites</button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Invite;