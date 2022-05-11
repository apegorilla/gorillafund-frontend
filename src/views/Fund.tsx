import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FundAPI from "api/fund";
import Nav from "components/Nav/Nav";
import StartFundraising from "components/Footer/StartFundraising";
import FundContent from "components/Fund/FundContent";
import FundComments from "components/Fund/FundComment";
import FundLeft from "components/Fund/FundLeft";
import FundProject from "components/Fund/FundProject";
import Footer from "components/Footer/Footer";
import NotFound from "views/NotFound";

const Fund = () => {
    const { uid } = useParams();
    const [ fund, setFund ] = useState<any>({});
    const [ error, setError ] = useState<boolean>(false);

    useEffect(() => {
        uid && FundAPI.findByUid(uid)
        .then(res => setFund(res.data))
        .catch(err => setError(true));
    }, [uid]);

    return error ? <NotFound /> : (
        <div className="bg-slate-50">
            <Nav />
            <div className="flex flex-col max-w-[900px] w-full mx-auto">
                <div className="px-3">
                    <div className="pt-16 text-lg font-bold">{fund.name}</div>
                    <div className="py-6 pt-1 text-sm text-gray-500">{fund.headline}</div>
                </div>
                <div className="flex flex-wrap gap-5 px-3">
                    <FundContent id={fund.id} uid={fund.uid} photo={fund.image} categoryId={fund.categoryId} date={fund.createdAt} story={fund.description} followers={fund.followCnt} />
                    <FundLeft uid={fund.uid} raised={fund.sumDonateETH} cnt={fund.cntDonate} donations={fund.donates} goal={fund.amount} />
                </div>
                <hr className="my-5" />
                <FundComments organizer={fund.user} cnt={fund.cntDonate} donations={fund.donates} />
                <FundProject />
            </div>
            <StartFundraising />
            <Footer />
        </div>
    )
}

export default Fund;