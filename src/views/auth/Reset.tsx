import React, { useEffect, useState } from "react";
import iconKey from "assets/img/svg/key.svg";
import { FiCheck, FiArrowLeft } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { URL } from "libs/constants";
import Auth from "api/auth";
import NotFound from "views/NotFound";
import toast from "react-hot-toast";

const Reset = () => {
    const [ password, setPassword ] = useState<string>("");
    const [ confirmPass, setConfirmPass ] = useState<string>("");
    const [ isReset, setIsReset ] = useState<boolean>(false);
    const { email, token } = useParams();
    const [ is404, set404] = useState<boolean>(true);

    const handleChange1 = (e: any) => {
        setPassword(e.target.value);
    }
    const handleChange2 = (e: any) => {
        setConfirmPass(e.target.value);
    }
    const handleClick = (e: any) => {
        if(!(password.length >=8 && password === confirmPass)) {
            toast.error("Email must be at least 8");
            return;
        }

        Auth.resetPassword(email || "", token || "", password)
        .then(res => {
            if(res.data.success) {
                setIsReset(true);
            }
        })
        .catch(err => {
            if(!err.response) toast.error("You're offline.");
            else if(err.response.data.message) toast.error(err.response.data.message);
            else toast.error(err.message);
        });
    }

    useEffect(() => {
        Auth.verifyResetLink(email || "", token || "")
        .then(res => {
            set404(false);
        })
        .catch(err => {
            set404(true);
        })
    }, [email, token]);

    return is404 ? <NotFound /> : (
        <div className="flex justify-center py-40 text-sm">
            { isReset ? (
                <div className="flex flex-col items-center w-[350px]">
                    <div className="flex items-center justify-center w-10 h-10 bg-teal-100 rounded-full">
                        <FiCheck className="text-teal-700" size={24} />
                    </div>
                    <div className="pt-6 text-2xl font-bold">Password reset</div>
                    <div className="py-4 text-center text-gray-500">Your password has been successfully reset. Click below to log in automatically.</div>
                    <button className="w-full rounded-[4px] py-2 font-bold text-center text-white bg-teal-700">Continue</button>
                    <Link to={URL.LOGIN} className="flex items-center justify-center w-full py-2 mt-3">
                        <FiArrowLeft size={16} />
                        <div className="pl-1 font-bold">Back to log in</div>
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col items-center w-[350px]">
                    <div className="flex items-center justify-center w-10 h-10 bg-teal-100 rounded-full">
                        <img src={iconKey} className="w-6" alt="" />
                    </div>
                    <div className="pt-6 text-2xl font-bold">Set your new password</div>
                    <div className="pt-3 text-center text-gray-500">Your new password must be different to previously used passwords.</div>
                    <div className="flex flex-col w-full pt-6">
                        <div className="pb-1 font-bold">Password*</div>
                        <input type="password" onChange={handleChange1} className="w-full rounded-[4px] py-2 px-3 focus:outline-none border border-slate-200" placeholder="Enter your email" />
                        <div className="pt-2 text-gray-500">Must be at least 8 characters.</div>
                    </div>
                    <div className="flex flex-col w-full py-6">
                        <div className="pb-1 font-bold">Confirm Password*</div>
                        <input type="password" onChange={handleChange2} className="w-full rounded-[4px] py-2 px-3 focus:outline-none border border-slate-200" placeholder="Enter your password" />
                    </div>
                    <button onClick={handleClick} className="w-full rounded-[4px] py-2 font-bold text-white bg-teal-700">Reset Password</button>
                    <Link to={URL.LOGIN} className="flex items-center justify-center w-full py-2 mt-3">
                        <FiArrowLeft size={16} />
                        <div className="pl-1 font-bold">Back to log in</div>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default Reset;