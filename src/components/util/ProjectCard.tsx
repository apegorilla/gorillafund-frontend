import React from "react";
import { Link } from "react-router-dom";
import Progress from "components/util/Progress";
import { URL } from "libs/constants";
import { nFormatter, timeAgoFormat } from "libs/utils";
import { AiOutlineEye } from "react-icons/ai";
import { FiThumbsUp } from "react-icons/fi";

const ProjectCard = ({data, className}: {data: any, className?: string}) => {
    return (
        <Link to={URL.FUND.replace(':uid', data.uid)} className={"flex flex-col text-sm text-gray-500 bg-white shadow-md transition-all duration-200 hover:shadow-xl hover:-translate-y-3 rounded-md " + className}>
            <img src={data.image} className="object-cover h-44 rounded-t-md" alt="" />
            <div className="flex flex-col px-4 py-5">
                <div className="text-lg font-bold text-black line-clamp-1">{data.headline}</div>
                <div className="pt-2 text-justify line-clamp-4">{data.description}</div>
                <div className="flex justify-between pt-10 pb-3">
                    <div>{"Created " + timeAgoFormat(data.createdAt)}</div>
                    <div className="flex items-center gap-2">
                        <AiOutlineEye />
                        <div>{data.viewCnt}</div>
                        <FiThumbsUp />
                        <div>{data.followCnt}</div>
                    </div>
                </div>
                <Progress percent={data.raised / data.amount * 100} />
                <div className="flex justify-between pt-5">
                    <div className="font-bold text-black">ETH {data.raised || 0} raised</div>
                    <div>ETH {nFormatter(data.amount, 1)} Goal</div>
                </div>
            </div>
        </Link>
    )
}

export default ProjectCard;