import React, { useState } from "react";
import { Link} from "react-router-dom";
import { URL } from "libs/constants";
import { addressFormat } from "libs/utils";
import { StepInterface } from "libs/interfaces";
import { useAuth } from "contexts/AuthContext";
import FundProvider, { useFund } from "contexts/FundContext";
import StepBar from "components/util/StepBar";
import Stepper from "components/util/Stepper";
import FundGoal from "components/Fundraising/FundGoal";
import FundPhoto from "components/Fundraising/FundPhoto";
import FundStory from "components/Fundraising/FundStory";
import FundVerify from "components/Fundraising/FundVerify";
import FundPreview from "components/Fundraising/FundPreview";
import FundSuccess from "components/Fundraising/FundSuccess";
import Logo from "assets/img/svg/gorilla.svg";

const FundraisingPage = () => {
    const { step, welcome } = useFund();
    const { user } = useAuth();
    const [ data ] = useState<StepInterface[]>([
        {
            title: "Verify",
            text: "Confirm you are an Ape Gorilla Holder."
        },
        {
            title: "Detail and Goal",
            text: "Setup your Fundraising with all useful information."
        },
        {
            title: "Cover photo",
            text: "A high-quality photo will help tell your story."
        },
        {
            title: "Story",
            text: "Describe your fundraising."
        },
        {
            title: "Preview",
            text: "Confirm you fundraising."
        }
    ]);
    const stepComponent = [
        <FundVerify />,
        <FundGoal />,
        <FundPhoto />,
        <FundStory />,
        <FundPreview />
    ];

    return welcome ? <FundSuccess /> : (
        <div className="flex flex-wrap bg-slate-50">
            <Stepper step={step} data={data} />
            <div className="flex flex-col flex-1 min-w-[360px] gap-16 px-2 py-12">
                {
                    user.loggedIn ? 
                    <Link to={URL.DASHBOARD} className="flex items-center justify-end gap-3 pr-10 cursor-pointer">
                        <div>{user.username || addressFormat(user.walletAddress)}</div>
                        <img src={user.avatar} className="w-8 h-8 bg-teal-300 border rounded-full" alt="" />
                    </Link> :
                    <div className="pr-10 text-right">Already have an account? <Link to={URL.LOGIN} className="font-bold text-teal-700">Sign in</Link></div>
                }
                <div className="flex justify-center text-sm">
                    <div className="flex flex-col items-center w-full max-w-[500px]">
                        <img src={Logo} className="w-8" alt="" />
                        { stepComponent[step - 1] }
                        <StepBar step={step} length={data.length} />
                    </div>
                </div>
            </div>
        </div>
    )
}

const Fundraising = () => {
    return (
        <FundProvider>
            <FundraisingPage />
        </FundProvider>
    )
}

export default Fundraising;