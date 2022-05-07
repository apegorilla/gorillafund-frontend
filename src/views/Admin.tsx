import React, { Fragment } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { URL, APP_NAME } from "libs/constants";
import { AiOutlineFund, AiOutlineSetting } from "react-icons/ai";
import { BiDonateHeart } from "react-icons/bi";
import { MdLogout } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import logo from "assets/img/svg/gorilla.svg";
import avatar from "assets/img/home/banner_big.png";
import AdminProvider, { useAdminAuth } from "contexts/AdminContext";

const AdminHeader = () => {
    const navigate = useNavigate();
    const { email, setEmail } = useAdminAuth();
    const logOut = () => {
        localStorage.removeItem('s_token');
        setEmail("");
        navigate(URL.ADMIN);
    }

    return (
        <Fragment>
            <div className="w-full text-white">
                <div className="flex flex-wrap items-center justify-between w-full h-16 px-3 mx-auto bg-neutral-700">
                    <Link to={URL.ADMIN} className="flex items-center gap-3">
                        <img src={logo} className="w-10 h-10 p-1 bg-white rounded-full" alt="" />
                        <div className="hidden text-lg font-bold sm:flex">{APP_NAME}</div>
                    </Link>
                    {
                        email &&
                        <div className="flex flex-row items-center gap-5">
                            <div>{email}</div>
                            <img src={avatar} className="w-8 h-8 bg-white border rounded-full" alt="" />
                            <MdLogout onClick={logOut} size={30} className="cursor-pointer" />
                        </div>
                    }
                </div>
                {
                    email &&
                    <div className="flex items-center w-full h-12 gap-10 px-8 border-b border-slate-300 bg-slate-200">
                        <NavLink to={URL.ADMIN_USERS} className={({ isActive }) => isActive ? "text-teal-700" : "text-slate-400"}><FiUsers size={25} /></NavLink>
                        <NavLink to={URL.ADMIN_FUNDS} className={({ isActive }) => isActive ? "text-teal-700" : "text-slate-400"}><AiOutlineFund size={25} /></NavLink>
                        <NavLink to={URL.ADMIN_DONATES} className={({ isActive }) => isActive ? "text-teal-700" : "text-slate-400"}><BiDonateHeart size={25} /></NavLink>
                        <NavLink to={URL.ADMIN_SETTING} className={({ isActive }) => isActive ? "text-teal-700" : "text-slate-400"}><AiOutlineSetting size={25} /></NavLink>
                    </div>
                }
            </div>
            <Outlet />
        </Fragment>
    )
}

const Admin = () => (
    <AdminProvider>
        <AdminHeader />
    </AdminProvider>
)

export default Admin;