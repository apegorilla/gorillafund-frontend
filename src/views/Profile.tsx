import React, { useState } from "react";
import Nav from "components/Nav/Nav";
import ProfileMenu from "components/Profile/ProfileMenu";
import ProfilePage from "components/Profile/ProfilePage";
import PasswordPage from "components/Profile/PasswordPage";
import WalletPage from "components/Profile/WalletPage";
import NotificationPage from "components/Profile/NotificationPage";
import Footer from "components/Footer/Footer";

const Profile = () => {
    const [ index, setIndex ] = useState<number>(0);
    const [ submit, setSubmit ] = useState<boolean>(false);
    const pages = [
        <ProfilePage submit={submit} setSubmit={setSubmit} />,
        <PasswordPage submit={submit} setSubmit={setSubmit} />,
        <WalletPage submit={submit} setSubmit={setSubmit} />,
        <NotificationPage submit={submit} setSubmit={setSubmit} />
    ];

    return (
        <div>
            <Nav />
            <ProfileMenu setSubmit={setSubmit} index={index} setIndex={setIndex} />
            {pages[index]}
            <Footer />
        </div>
    )
}

export default Profile;