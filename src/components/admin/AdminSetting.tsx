import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FundAPI from "api/fund";
import AdminAPI from "api/admin";
import Toggle from "components/util/Toggle";

const AdminSetting = () => {
    const [ isNftVerify, setNftVerify ] = useState<boolean>(false);
    useEffect(() => {
        FundAPI.isNftVerify()
        .then(res => setNftVerify(res.data.nftVerify))
        .catch(err => toast.error(err.message));
    }, []);
    const onChangeNftVerify = () => {
        AdminAPI.setNftVerify(!isNftVerify)
        .then(() => setNftVerify(!isNftVerify))
        .catch(err => toast.error(err.message));
    }

    return (
        <div className="flex flex-col gap-2 px-5 py-5">
            <div className="flex items-center justify-between p-2 rounded-sm bg-teal-700/20">
                <div>Enable NFT ownership verify when fundraisers post project.</div>
                <Toggle checked={isNftVerify} onChange={onChangeNftVerify} />
            </div>
        </div>
    );
}

export default AdminSetting;