import React, { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import FundAPI from "api/fund";
import { URL } from "libs/constants";
import { timeAgoFormat } from "libs/utils";
import { FUNDCATEGORY } from "libs/constants";
import Loading from "components/util/Loading";

const FundContent = ({ id, uid, photo, categoryId, date, story, followers }) => {
    const [ isFollow, setFollow ] = useState(false);
    const [ DOM, setDOM ] = useState<JSX.Element>(
        <div className="flex-1 text-sm text-gray-500">
            <Loading />
        </div>
    );
    const onFollow = useCallback(() => {
        FundAPI.follow(uid, !isFollow)
        .then(res => {
            toast.success(res.data.message);
            setFollow(res.data.followed);
        })
        .catch(err => {
            if(err.response.status === 401) toast.error('Please sign in to follow fund.');
            else toast.error(err.message);
        });
    }, [uid, isFollow]);
    useEffect(() => {
        id && FundAPI.isFollow(id)
        .then(res => setFollow(res.data.isFollow))
        .catch(err => {});
    }, [id]);
    useEffect(() => photo && categoryId && date && story && setDOM(
        <div className="flex-1 text-sm text-gray-500">
            <img src={photo} alt="" />
            <div className="flex items-center justify-between py-5">
                <div className="flex items-center gap-2">
                    <Link to={URL.SEARCH + '?category=' + categoryId} className="px-3 py-1 text-teal-700 transition-all duration-200 rounded-full bg-teal-700/20 hover:text-white hover:bg-teal-700">{FUNDCATEGORY[categoryId]?.label}</Link>
                    <div className="">{"Created " + timeAgoFormat(date)}</div>
                </div>
                <button onClick={onFollow} className="px-2 text-teal-700 transition-all duration-200 border border-teal-700 rounded-full hover:bg-teal-700 hover:text-white">{ isFollow ? 'Unfollow' : 'Follow' }</button>
            </div>
            <hr />
            <div className="py-5 text-lg font-bold text-black">Story</div>
            <div className="pb-5 whitespace-pre-wrap">{story}</div>
        </div>
    ), [photo, categoryId, date, story, isFollow, onFollow]);

    return DOM;
}

export default FundContent;