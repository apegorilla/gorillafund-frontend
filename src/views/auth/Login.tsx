import React, { useEffect, useState } from "react";
import validator from "validator";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { URL } from "libs/constants";
import web3, { isWeb3Enable } from "libs/web3";
import Auth from "api/auth";
import { useAuth } from "contexts/AuthContext";
import iconLogo from "assets/img/svg/gorilla.svg";
import iconMetamask from "assets/img/svg/metamask.svg";
import toast from "react-hot-toast";

const Login = () => {
    var loginButton;
    const [ email, setEmail ] = useState<string>("");
    const [ password, setPassword ] = useState<string>("");
    const { logIn } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const redirect = searchParams.get('redirect') || URL.HOME;

    const handleChangeEmail = e => setEmail(e.target.value);
    const handleChangePassword = e => setPassword(e.target.value);
    const handleLogin = (e) => {
        e.preventDefault();
        loginButton.disabled = true;
        if(!validator.isEmail(email)) {
            toast.error("Input email correctly.");
            loginButton.disabled = false;
        }
        else if(!validator.isLength(password, { min: 8 })) {
            toast.error("Password must be at least 8 characters");
            loginButton.disabled = false;
        }
        else {
            Auth.login({ email, password})
            .then(res => {
                toast.success('Welcome back!');
                logIn(res.data.token);
                navigate(redirect);
            })
            .catch(err => {
                loginButton && (loginButton.disabled = false);
                if(!err.response) toast.error("Sever do not response.");
                else if(err.response.data.message) toast.error(err.response.data.message);
                else toast.error(err.message);
            });
        }
    }
    const handleMetamaskLogin = () => {
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
            navigate(redirect);
        })
        .catch(err => {
            if(err.response.status === 403) toast.error('Your account has been closed.');
            else toast.error(err.message)
        });
    }

    useEffect(() => {
        Auth.me().then(res => navigate(redirect)).catch(err => {});
    }, [navigate, redirect]);

    return (
        <div className="flex justify-center py-40 text-sm">
            <form onSubmit={handleLogin} className="flex flex-col items-center w-[350px]">
                <Link to={URL.HOME}><img src={iconLogo} className="w-8" alt="" /></Link>
                <div className="pt-6 text-2xl font-bold">Log in to your account</div>
                <div className="pt-3 text-gray-500">Welcome back! Please enter your details.</div>
                <div className="flex flex-col w-full pt-6">
                    <div className="pb-1 font-bold">Email</div>
                    <input type="email" value={email} onChange={handleChangeEmail} className="w-full rounded-[4px] py-2 px-3 focus:outline-none border border-slate-200" placeholder="Enter your email" autoComplete="on" />
                </div>
                <div className="flex flex-col w-full pt-6">
                    <div className="pb-1 font-bold">Password</div>
                    <input type="password" value={password} onChange={handleChangePassword} className="w-full rounded-[4px] py-2 px-3 focus:outline-none border border-slate-200" placeholder="Enter your password" autoComplete="on" />
                </div>
                <div className="flex justify-between w-full py-5">
                    <div className="flex items-center">
                        <input type="checkbox" name="rememeber" id="remember" className="w-4 h-4 rounded-none cursor-pointer" />
                        <label htmlFor="remember" className="pl-2 font-bold cursor-pointer">Remember me</label>
                    </div>
                    <Link to={URL.PASSWORD_EMAIL} className="font-bold text-teal-700">Forget password</Link>
                </div>
                <button type="submit" ref={el => loginButton = el} className="w-full rounded-[4px] py-2 font-bold text-white bg-teal-700 disabled:opacity-50">Sign in</button>
                <button type="button" onClick={handleMetamaskLogin} className="flex rounded-[4px] justify-center w-full py-2 mt-3 border border-slate-200">
                    <img src={iconMetamask} alt="" />
                    <div className="pl-1 font-bold">Sign in with Metamask</div>
                </button>
                <div className="pt-6 text-gray-500">
                    Don't have an account?
                    <Link to={URL.SIGNUP} className="pl-1 font-bold text-teal-700">Sign up</Link>
                </div>
            </form>
        </div>
    )
}

export default Login;