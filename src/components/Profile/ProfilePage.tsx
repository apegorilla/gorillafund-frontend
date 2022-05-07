import React, { useEffect, useRef, useState, useCallback } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import Modal from "components/util/Modal";
import Auth from "api/auth";
import UserAPI from "api/user";
import { URL } from "libs/constants";
import countries from "libs/countries";
import { useAuth } from "contexts/AuthContext";
import { GoLocation } from "react-icons/go";
import { AiOutlineMail } from "react-icons/ai";
import { MdOutlinePhone } from "react-icons/md";
import "assets/styles/ReactSelect.css";
import toast from "react-hot-toast";

const ProfilePage = ({submit, setSubmit}) => {
    const imageType = ["image/png", "image/jpeg", "image/gif", "image/svg+xml"];
    const inputPhoto = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const { user, reload, logOut } = useAuth();
    const [ image, setImage ] = useState<any>(null);
    const [ imageUrl, setUrl ] = useState<string>("");
    const [ firstName, setFirst ] = useState<string>("");
    const [ lastName, setLast ] = useState<string>("");
    const [ username, setName ] = useState<string>("");
    const [ email, setEmail ] = useState<string>("");
    const [ phone, setPhone ] = useState<string>("");
    const [ address, setAddress ] = useState<string>("");
    const [ country, setCountry ] = useState<any>({});
    const [ city, setCity ] = useState<string>("");
    const [ zipCode, setZip ] = useState<string>("");
    const [ isModalOpen, setModalOpen ] = useState<boolean>(false);
    const [ isKeyValid, setKeyValid ] = useState<boolean>(false);

    const onClickPhoto = () => inputPhoto.current && inputPhoto.current.click();
    const onChangePhoto = e => {
        const file = e.target.files[0];
        if(!(file && imageType.includes(file.type))) return;
        setImage(file);
        setUrl(window.URL.createObjectURL(file));
    }
    const onDeletePhoto = () => {
        if(!image) return;
        setImage(null);
        setUrl("https://avatars.dicebear.com/api/identicon/00000000000000000000000000000000.svg");
    }
    const onChangeFirst = e => setFirst(e.target.value);
    const onChangeLast = e => setLast(e.target.value);
    const onChangeName = e => setName(e.target.value);
    const onChangeEmail = e => setEmail(e.target.value);
    const onChangePhone = e => setPhone(e.target.value);
    const onChangeAddress = e => setAddress(e.target.value);
    const onChangeCity = e => setCity(e.target.value);
    const onChangeZip = e => setZip(e.target.value);
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);
    const handleChangeKey = e => setKeyValid(e.target.value === "delete");
    const handleUserDelete = e => {
        e.preventDefault();
        if(!isKeyValid) return;
        Auth.deleteAccount()
        .then(() => {
            logOut();
            navigate(URL.HOME);
        })
        .catch(err => toast.error(err.message));
    }

    const submitData = useCallback(() => {
        setSubmit(false);
        const data = { firstName, lastName, username, email, phone, address, country, city, zipCode }
        if(image) {
            const formData = new FormData();
            formData.append('avatar', image);
            UserAPI.confirmEmail(email)
            .then(res => {
                if(res.data.success) return UserAPI.avatarUpload(formData);
                else throw new Error("Email already in use.");
            })
            .then(res => UserAPI.updateProfile(data))
            .then(res => {
                toast.success("Updated successfully");
                reload();
            })
            .catch(err => {
                toast.error(err.message);
            });
        }
        else {
            UserAPI.confirmEmail(email)
            .then(res => {
                if(res.data.success) return UserAPI.updateProfile(data);
                else throw new Error("Email already in use.");
            })
            .then(res => {
                toast.success("Updated successfully");
                reload();
            })
            .catch(err => {
                toast.error(err.message);
            });
        }
    }, [address, city, country, email, firstName, image, lastName, phone, reload, setSubmit, username, zipCode]);

    useEffect(() => {
        if(submit) submitData();
    }, [submit, submitData]);
    useEffect(() => {
        if(!user.loggedIn) return;
        setUrl(user.avatar);
        setFirst(user.firstName);
        setLast(user.lastName);
        setName(user.username);
        setEmail(user.email);
        setPhone(user.phone);
        setAddress(user.address);
        setCountry(user.country);
        setCity(user.city);
        setZip(user.zipCode);
    }, [user])

    return (
        <div className="py-5 bg-slate-50">
            <div className="max-w-[900px] w-full mx-auto px-3">
                <div className="p-5 bg-white rounded-t-md">
                    <div className="font-bold">Profile</div>
                    <div className="text-sm text-gray-500">Update your photo and personal details here.</div>
                </div>
                <hr />
                <div className="p-5 bg-white rounded-b-md">
                    <div className="text-sm font-bold">Your photo</div>
                    <div className="flex items-center py-3">
                        <input type="file" onChange={onChangePhoto} ref={inputPhoto} className="hidden" />
                        <img src={imageUrl} onClick={onClickPhoto} className="w-12 h-12 bg-teal-300 rounded-full cursor-pointer" alt={user.username} />
                        <div className="pl-5">
                            <div className="flex gap-3">
                                <button onClick={onClickPhoto} className="px-3 py-2 text-xs font-bold text-white bg-teal-700 rounded-[4px] hover:shadow-md transition-all duration-200">Update photo</button>
                                <button onClick={onDeletePhoto} className="px-3 py-2 text-xs font-bold bg-gray-200 rounded-[4px] hover:shadow-md transition-all duration-200">Delete photo</button>
                            </div>
                            <div className="pt-1 text-xs font-bold text-gray-500">SVG, PNG, JPG or GIF (max. 500x500px)</div>
                        </div>
                    </div>
                    <hr />
                    <div className="max-w-[400px] py-5 text-sm">
                        <div className="flex gap-3">
                            <div className="w-full">
                                <div className="pb-2 font-bold">First name</div>
                                <input type="text" value={firstName} onChange={onChangeFirst} className="py-2 rounded-[4px] px-3 w-full focus:outline-none border-[1px] border-slate-200" placeholder="First name" />
                            </div>
                            <div className="w-full">
                                <div className="pb-2 font-bold">Last name</div>
                                <input type="text" value={lastName} onChange={onChangeLast} className="py-2 rounded-[4px] px-3 w-full focus:outline-none border-[1px] border-slate-200" placeholder="Last name" />
                            </div>
                        </div>
                        <div className="pt-4">
                            <div className="pb-2 font-bold">Username</div>
                            <input type="text" value={username} onChange={onChangeName} className="py-2 rounded-[4px] px-3 w-full focus:outline-none border-[1px] border-slate-200" placeholder="Username" />
                        </div>
                        <div className="pt-4">
                            <div className="pb-2 font-bold">Email address</div>
                            <div className="flex rounded-[4px] bg-white w-full border-[1px] border-slate-200">
                                <div className="flex items-center justify-center px-3">
                                    <AiOutlineMail className="text-gray-500" size={16} />
                                </div>
                                <input type="text" value={email} onChange={onChangeEmail} className="w-full rounded-[4px] py-2 pr-4 focus:outline-none" placeholder="Email address" />
                            </div>
                        </div>
                        <div className="pt-4">
                            <div className="pb-2 font-bold">Phone number</div>
                            <div className="flex rounded-[4px] bg-white w-full border-[1px] border-slate-200">
                                <div className="flex items-center justify-center px-3">
                                    <MdOutlinePhone className="text-gray-500" size={16} />
                                </div>
                                <input type="text" value={phone} onChange={onChangePhone} className="w-full rounded-[4px] py-2 pr-4 focus:outline-none" placeholder="Phone number" />
                            </div>
                        </div>
                        <div className="pt-4">
                            <div className="pb-2 font-bold">Residental address</div>
                            <div className="flex rounded-[4px] bg-white w-full border-[1px] border-slate-200">
                                <div className="flex items-center justify-center px-3">
                                    <GoLocation className="text-gray-500" size={16} />
                                </div>
                                <input type="text" value={address} onChange={onChangeAddress} className="w-full rounded-[4px] py-2 pr-4 focus:outline-none" placeholder="Residental address" />
                            </div>
                        </div>
                        <div className="pt-4">
                            <div className="pb-2 font-bold">Country</div>
                            <Select options={countries} value={country} onChange={setCountry} className="w-full" />
                        </div>
                        <div className="flex gap-3 pt-4">
                            <div className="w-full">
                                <div className="pb-2 font-bold">City</div>
                                <input type="text" value={city} onChange={onChangeCity} className="py-2 rounded-[4px] px-3 w-full focus:outline-none border-[1px] border-slate-200" placeholder="City" />
                            </div>
                            <div className="w-full">
                                <div className="pb-2 font-bold">Zip code</div>
                                <input type="text" value={zipCode} onChange={onChangeZip} className="py-2 rounded-[4px] px-3 w-full focus:outline-none border-[1px] border-slate-200" placeholder="Zip code" />
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="flex flex-wrap items-center justify-between gap-2 py-3">
                        <div className="">
                            <div className="pb-1 text-sm font-bold">Delete your account</div>
                            <div className="text-xs text-gray-500">You will no longer have access to this fundraiser after deleting.</div>
                            <div className="text-xs text-gray-500">If your received donations, your donors will still be able to view a summary.</div>
                        </div>
                        <button onClick={handleModalOpen} className="px-3 py-2 text-sm font-bold text-white transition-all duration-200 bg-red-400 rounded-[4px] hover:bg-red-500">Delete my account</button>
                    </div>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={handleModalClose}>
                <form onSubmit={handleUserDelete} className="w-full max-w-md p-6 bg-white">
                    <div className="flex items-end justify-between">
                        <div className="font-bold text-black">Delete your account</div>
                        <div onClick={handleModalClose} className="text-2xl font-bold text-gray-500 cursor-pointer">&times;</div>
                    </div>
                    <p className="text-sm text-gray-500">You will no longer have access to this fundraiser after deleting.</p>
                    <p className="text-sm text-gray-500">If your received donations, your donors will still be able to view a summary.</p>
                    <hr className="my-4" />
                    <input type="text" onChange={handleChangeKey} className="w-full py-2 px-3 focus:outline-none border-[1px] border-slate-200" autoComplete="off" placeholder="delete" />
                    <button type="submit" className="w-full py-2 mt-4 font-bold text-white transition-all duration-200 bg-teal-700 disabled:opacity-70" disabled={!isKeyValid}>Delete my account</button>
                </form>
            </Modal>
        </div>
    )
}

export default ProfilePage;