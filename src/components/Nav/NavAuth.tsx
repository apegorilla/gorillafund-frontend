import React, { useState } from "react";
import { Menu, MenuItem, MenuDivider } from "@szhsin/react-menu";
import { Link, useNavigate } from "react-router-dom";
import { URL, APP_NAME } from "libs/constants";
import { getUserName } from "libs/utils";
import { useAuth } from "contexts/AuthContext";
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import logo from "assets/img/svg/gorilla.svg";
import { ImSearch } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";

const NavAuth = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState<string>("");
    const onChangeKeyword = e => setKeyword(e.target.value);
    const onKeydownKeyword = e => {
        if(e.keyCode !== 13) return;
    }
    const handleLogout = () => {
        logOut();
        navigate(URL.HOME);
    }

    return (
        <div className="w-full bg-white">
            <div className="flex flex-wrap items-center justify-between w-full h-16 px-3 max-w-[900px] mx-auto">
                <div className="flex gap-3">
                    <Link to={URL.HOME} className="flex items-center gap-3">
                        <img src={logo} className="w-10" alt="" />
                        <div className="hidden text-lg font-bold text-teal-700 sm:block">{APP_NAME}</div>
                    </Link>
                    <div className="flex bg-white border-l">
                        <div className="flex items-center justify-center px-2">
                            <ImSearch className="text-gray-500" size={16} />
                        </div>
                        <input type="text" value={keyword} onChange={onChangeKeyword} onKeyDown={onKeydownKeyword} className="pr-4 text-sm w-44 focus:outline-none focus:border-b" placeholder="Search by name, category" />
                    </div>
                </div>
                <div className="">
                    <Menu menuButton={
                        <div className="flex items-center justify-end gap-3 cursor-pointer">
                            <img src={user.avatar} className="rounded-full w-8 h-8 border bg-teal-300" alt="" />
                            <div className="hidden xs:block">{getUserName(user)}</div>
                            <IoIosArrowDown className="hidden xs:block" />
                        </div>
                    } align="end" transition>
                        <Link to={URL.DASHBOARD}><MenuItem>Dashboard</MenuItem></Link>
                        <Link to={URL.KYC}><MenuItem>KYC</MenuItem></Link>
                        <Link to={URL.PROFILE}><MenuItem>Profile</MenuItem></Link>
                        <MenuDivider />
                        <MenuItem onClick={handleLogout}>Log out</MenuItem>
                    </Menu>
                </div>
            </div>
        </div>
    )
}

export default NavAuth;