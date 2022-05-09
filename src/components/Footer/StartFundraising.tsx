import React from "react";
import { Link } from "react-router-dom";
import { URL } from "libs/constants";

const StartFundraising = () => {
    return (
        <div className="flex flex-col items-center px-3 py-12 bg-teal-700 gap-7">
            <div className="text-2xl font-bold text-center text-white">Ready to start Fundraising?</div>
            <div className="flex flex-col items-center text-sm text-teal-50">
                <p className="text-center">"Change your life with Gorilla Fund today!</p>
                <p className="text-center">Receive the support from the community and public and start receiving crypto donations!"</p>
            </div>
            <Link to={URL.FUNDRAISE} className="px-5 py-2 font-bold text-teal-700 border rounded-[4px] border-teal-700 bg-white hover:bg-teal-700 hover:border-white hover:text-white transition-all duration-200">Start a GorillaFund</Link>
        </div>
    )
}

export default StartFundraising;
