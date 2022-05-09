import React from "react";
import { Link } from "react-router-dom";
import { URL } from "libs/constants";
import { addressFormat } from "libs/utils";
import { StepInterface } from "libs/interfaces";
import { useAuth } from "contexts/AuthContext";
import KycProvider, { useKYC } from "contexts/KycContext";
import KYCDetail from "components/KYC/KYCDetail";
import KYCID from "components/KYC/KYCID";
import KYCWallet from "components/KYC/KYCWallet";
import Stepper from "components/util/Stepper";

const KYCPage = () => {
    const { user } = useAuth();
    const { step } = useKYC();
    const data: StepInterface[] = [
        {
            title: "Personal Details",
            text: "Please provide your personal details."
        },
        {
            title: "ID Proof",
            text: "Set amount that you are expecting to raise for the project."
        },
        {
            title: "Wallet",
            text: "Sign in with your account or create an account if you don't have."
        }
    ];
    const stepComponent = [
        <KYCDetail />,
        <KYCID />,
        <KYCWallet />
    ];

    return (
        <div className="flex flex-wrap bg-slate-50">
            <Stepper step={step} data={data} />
            <div className="flex flex-col flex-1 min-w-[360px] gap-16 px-2 py-12">
                {
                    user.loggedIn ?
                    <div className="flex items-center justify-end gap-3 pr-10 cursor-pointer">
                        <div>{user.username || addressFormat(user.walletAddress)}</div>
                        <img src={user.avatar} className="rounded-full w-8 border bg-teal-300" alt="" />
                    </div> :
                    <div className="pr-10 text-right">Already have an account? <Link to={URL.LOGIN} className="font-bold text-teal-700">Sign in</Link></div>
                }
                <div className="flex justify-center text-sm">
                    <div className="flex flex-col items-center w-full max-w-[500px]">
                        { stepComponent[step -1] }
                    </div>
                </div>
            </div>
        </div>
    )
}

const KYC = () => {
    return (
        <KycProvider>
            <KYCPage />
        </KycProvider>
    )
}

export default KYC;