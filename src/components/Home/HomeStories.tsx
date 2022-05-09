import React, { useEffect, useState } from "react";
import { zeroPad } from "libs/utils";
import imgStory from "assets/img/home/stories.png";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import FundAPI from "api/fund";
import toast from "react-hot-toast";

const HomeStories = () => {
    const [data, setData] = useState<any[]>([]); 
    const [index, setIndex] = useState(0);

    const nextStory = () => {
        if(index >= data.length - 1) setIndex(0);
        else setIndex(index + 1);
    }
    const prevStory = () => {
        if(index <= 0) setIndex(data.length - 1);
        else setIndex(index - 1);
    }

    useEffect(() => {
        FundAPI.topRated(5).then(res => setData(res.data)).catch(err => toast.error(err.message));
    }, []);

    return (
        <div className="w-full bg-slate-50">
            <div className="flex flex-col px-3 py-24 md:flex-row max-w-[900px] mx-auto">
                <div className="flex flex-col justify-between pt-0 pr-5 text-sm md:pt-8">
                    <div>
                        <div className="font-bold text-teal-700">GORILLAFUND STORIES</div>
                        <div className="pt-5 text-2xl font-bold text-black line-clamp-1">{data[index]?.headline}</div>
                        <div className="pt-5 text-gray-500 line-clamp-3">{data[index]?.description}</div>
                        <div className="py-5 font-bold text-gray-500">Ape Gorilla NFT project is donating 20% of Public Sales to Gorilla Fund proposals.</div>
                    </div>
                    <div className="flex items-center gap-5">
                        <button className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 hover:border-teal-700 hover:bg-teal-700 hover:text-white transition-all duration-200" onClick={prevStory}>
                            <IoIosArrowBack size={15} />
                        </button>
                        <button className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 hover:border-teal-700 hover:bg-teal-700 hover:text-white transition-all duration-200" onClick={nextStory}>
                            <IoIosArrowForward size={15} />
                        </button>
                        <div className="flex">
                            <div className="font-bold text-black">{zeroPad(index + 1, 2)}</div>
                            &nbsp;/&nbsp;{zeroPad(data.length, 2)}
                        </div>
                    </div>
                </div>
                <img src={imgStory} className="md:w-[60%] object-cover pt-5 md:pt-0" alt="" />
            </div>
        </div>
    )
}

export default HomeStories;
