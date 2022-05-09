import React, { useEffect, useState } from "react";
import validator from "validator";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import AdminAPI from "api/admin";
import { URL } from "libs/constants";
import { useAdminAuth } from "contexts/AdminContext";
import iconLogo from "assets/img/svg/gorilla.svg";

const Admin = () => {
    var loginButton;
    const adminAuth = useAdminAuth();
    const navigate = useNavigate();
    const [ email, setEmail ] = useState<string>("");
    const [ password, setPassword ] = useState<string>("");

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
            AdminAPI.login({ email, password })
            .then(res => {
                localStorage.setItem('s_token', res.data.token);
                loginButton.disabled = false;
                toast.success('Logged in as admin.');
                adminAuth.setEmail(email);
            })
            .catch(err => {
                if(!err.response) toast.error("Sever do not response.");
                else if(err.response.data.message) toast.error(err.response.data.message);
                else toast.error(err.message);
                loginButton.disabled = false;
            });
        }
    }

    useEffect(() => {
        adminAuth.email && navigate(URL.ADMIN + '/' + URL.ADMIN_USERS);
    }, [adminAuth.email, navigate]);

    return (
        <div className="flex justify-center py-20 text-sm">
            <form onSubmit={handleLogin} className="flex flex-col items-center w-[350px]">
                <Link to={URL.HOME}><img src={iconLogo} className="w-8" alt="" /></Link>
                <div className="pt-6 text-2xl font-bold">Log in to Admin Panel</div>
                <div className="flex flex-col w-full pt-6">
                    <div className="pb-1 font-bold">Email</div>
                    <input type="email" value={email} onChange={handleChangeEmail} className="w-full rounded-[4px] py-2 px-3 focus:outline-none border border-slate-200" placeholder="Enter your email" autoComplete="on" />
                </div>
                <div className="flex flex-col w-full py-6">
                    <div className="pb-1 font-bold">Password</div>
                    <input type="password" value={password} onChange={handleChangePassword} className="w-full rounded-[4px] py-2 px-3 focus:outline-none border border-slate-200" placeholder="Enter your password" autoComplete="on" />
                </div>
                <button type="submit" ref={el => loginButton = el} className="w-full rounded-[4px] py-2 font-bold text-white bg-teal-700 disabled:opacity-50">Sign in</button>
            </form>
        </div>
    )
}

export default Admin;