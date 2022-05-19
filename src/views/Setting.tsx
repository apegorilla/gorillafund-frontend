import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FundAPI from "api/fund";
import Nav from "components/Nav/Nav";
import SettingPage from "components/Setting/SettingPage";
import Footer from "components/Footer/Footer";
import NotFound from "views/NotFound";

const Setting = () => {
    const { uid } = useParams();
    const [ is404, set404 ] = useState<boolean>(false);
    useEffect(() => {
        uid && FundAPI.myFund(uid).then(res => set404(false)).catch(err => set404(true));
    }, [uid]);

    return is404 ? <NotFound /> : (
        <div>
            <Nav />
            <SettingPage />
            <Footer />
        </div>
    )
}

export default Setting;