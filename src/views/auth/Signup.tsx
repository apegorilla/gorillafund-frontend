import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";
import { URL } from "libs/constants";
import web3, { isWeb3Enable } from "libs/web3";
import Auth from "api/auth";
import { useAuth } from "contexts/AuthContext";
import iconLogo from "assets/img/svg/gorilla.svg";
import iconMetamask from "assets/img/svg/metamask.svg";
import toast from "react-hot-toast";

const Signup = () => {
    var signupButton;
    const navigate = useNavigate();
    const [ username, setUsername ] = useState<string>("");
    const [ email, setEmail ] = useState<string>("");
    const [ password, setPassword ] = useState<string>("");
    const { logIn } = useAuth();

    const handleChangeUsername = e => setUsername(e.target.value);
    const handleChangeEmail = e => setEmail(e.target.value);
    const handleChangePassword = e => setPassword(e.target.value);

    useEffect(() => {
        Auth.me().then(res => navigate(URL.HOME)).catch(err => {});
    }, [navigate]);

    const signUp = (e) => {
        e.preventDefault();
        signupButton.disabled = true;
        if(!/^\w+$/.test(username)) {
            signupButton.disabled = false;
            toast.error("Name must be at least 2 characters and alphanumeric.");
        }
        else if(!validator.isEmail(email)) {
            signupButton.disabled = false;
            toast.error("Input email correctly.");
        }
        else if(!validator.isLength(password, { min: 8 })) {
            signupButton.disabled = false;
            toast.error("Password must be at least 8 characters");
        }
        else {
            Auth.signup({ username, email, password })
            .then(res => {
                logIn(res.data.token);
                navigate(URL.EMAIL_VERIFY);
            })
            .catch(err => {
                signupButton && (signupButton.disabled = false);
                if(!err.response) toast.error("You're offline.");
                else if(err.response.status === 409) toast.error(err.response.data.message);
                else toast.error(err.message);
            });
        }
    }
    const handleMetamaskSignup = () => {
        if(!isWeb3Enable) {
            toast.error('Please install metamask.');
            return;
        }
        web3.eth.requestAccounts()
        .then(users => Auth.getMetamaskToken(users[0]))
        .then(async res => {
            let walletAddress = res.data.walletAddress;
            let signature = await web3!.eth.personal.sign(
                `Please sign the message to authenticate.\ntoken: ${res.data.randomkey}`,
                walletAddress,
                ''
            );
            return { walletAddress, signature };
        })
        .then(res => Auth.signinMetamask(res))
        .then(res => {
            logIn(res.data.token);
            navigate(URL.HOME);
        })
        .catch(err => toast.error(err.message));
    }

    return (
        <div className="flex justify-center py-40 text-sm">
            <form onSubmit={signUp} className="flex flex-col items-center w-[350px]">
                <Link to={URL.HOME}><img src={iconLogo} className="w-8" alt="" /></Link>
                <div className="pt-6 text-2xl font-bold">Create an account</div>
                <div className="pt-3 text-gray-500">Welcome! You must be Ape Gorilla holder to sign up.</div>
                <div className="flex flex-col w-full pt-6">
                    <div className="pb-1 font-bold">Username*</div>
                    <input type="text" value={username} onChange={handleChangeUsername} className="w-full rounded-[4px] py-2 px-3 focus:outline-none border border-slate-200" placeholder="Enter your username" autoComplete="true" />
                </div>
                <div className="flex flex-col w-full pt-6">
                    <div className="pb-1 font-bold">Email*</div>
                    <input type="email" value={email} onChange={handleChangeEmail} className="w-full rounded-[4px] py-2 px-3 focus:outline-none border border-slate-200" placeholder="Enter your email" autoComplete="true" />
                </div>
                <div className="flex flex-col w-full py-6">
                    <div className="pb-1 font-bold">Password*</div>
                    <input type="password" value={password} onChange={handleChangePassword} className="w-full rounded-[4px] py-2 px-3 focus:outline-none border border-slate-200" placeholder="Enter your password" autoComplete="true" />
                    <div className="pt-2 text-gray-500">Must be at least 8 characters.</div>
                </div>
                <button type="submit" ref={el => signupButton = el} className="w-full rounded-[4px] py-2 font-bold text-white bg-teal-700 disabled:opacity-50">Sign up</button>
                <button type="button" onClick={handleMetamaskSignup} className="flex rounded-[4px] justify-center w-full py-2 mt-3 border border-slate-200">
                    <img src={iconMetamask} alt="" />
                    <div className="pl-1 font-bold">Sign in with Metamask</div>
                </button>
                <div className="pt-6 text-gray-500">
                    Already have an account?
                    <Link to={URL.LOGIN} className="pl-1 font-bold text-teal-700">Sign in</Link>
                </div>
            </form>
        </div>
    )
}

export default Signup;