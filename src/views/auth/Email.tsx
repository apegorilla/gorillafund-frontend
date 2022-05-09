import React, { useState } from "react";
import iconKey from "assets/img/svg/key.svg";
import { FiArrowLeft, FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";
import { URL } from "libs/constants";
import Auth from "api/auth";
import toast from "react-hot-toast";

const Email = () => {
    const [ email, setEmail ] = useState<string>("");
    const [ isValid, setIsValid ] = useState<boolean>(false);
    const [ isSent, setIsSent ] = useState<boolean>(false);
    
    const handleChange = (e: any) => {
        setIsValid(e.target.checkValidity());
        setEmail(e.target.value);
    }
    const handleClick = (e: any) => {
        if(isValid) {
            Auth.forgetPassword(email)
            .then(res => {
                if(res.data.success) {
                    setIsSent(true);
                }
            })
            .catch(err => {
                if(!err.response) toast.error("You're offline.");
                else if(err.response.data.message) toast.error(err.response.data.message);
                else toast.error(err.message);
            });
        }
    }

    return (
        <div className="flex justify-center py-40 text-sm">
            { isSent ? (
                <div className="flex flex-col items-center w-[350px]">
                    <div className="flex items-center justify-center w-10 h-10 bg-teal-100 rounded-full">
                        <FiMail className="text-teal-700" size={24} />
                    </div>
                    <div className="pt-6 text-2xl font-bold">Check your email</div>
                    <div className="py-4 text-center text-gray-500">We sent a password reset link to <span className="font-bold">{email}</span></div>
                    <a href={`mailto:${email}`} className="w-full rounded-[4px] py-2 font-bold text-center text-white bg-teal-700">Open email app</a>
                    <div className="pt-5 text-gray-500">Didn't receive the email? <span onClick={handleClick} className="font-bold text-teal-700 cursor-pointer">Resend</span></div>
                    <Link to={URL.LOGIN} className="flex items-center justify-center w-full py-2 mt-3">
                        <FiArrowLeft size={16} />
                        <div className="pl-1 font-bold">Back to log in</div>
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col items-center w-[350px]">
                    <div className="flex justify-center w-10 h-10 bg-teal-100 rounded-full">
                        <img src={iconKey} className="w-6" alt="" />
                    </div>
                    <div className="pt-6 text-2xl font-bold">Forgot password?</div>
                    <div className="pt-3 text-gray-500">No worries, we'll send you reset instructions.</div>
                    <div className="flex flex-col w-full py-6">
                        <div className="pb-1 font-bold">Email</div>
                        <input type="email" onChange={handleChange} className="w-full rounded-[4px] py-2 px-3 focus:outline-none border border-slate-200" placeholder="Enter your email" required />
                    </div>
                    <button onClick={handleClick} className="w-full rounded-[4px] py-2 font-bold text-white bg-teal-700">Reset password</button>
                    <Link to={URL.LOGIN} className="flex items-center justify-center w-full py-2 mt-3">
                        <FiArrowLeft size={16} />
                        <div className="pl-1 font-bold">Back to log in</div>
                    </Link>
                </div>
            ) }
        </div>
    )
}

export default Email;