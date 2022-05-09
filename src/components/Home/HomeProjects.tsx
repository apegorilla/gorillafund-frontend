import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FundAPI from "api/fund";
import { URL } from "libs/constants";
import { ImFire } from "react-icons/im";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import ProjectCard from "components/util/ProjectCard";
import toast from "react-hot-toast";

const HomeProjects = () => {
    const [data, setData] = useState<any[]>([]); 

    const [pos, setPos] = useState(0);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        FundAPI.topRated(8).then(res => setData(res.data)).catch(err => toast.error(err.message));
    }, []);

    useEffect(() => {
        setPos(-index * 340);
    }, [index]);

    const nextProject = () => {
        if(index + 1 >= data.length) {
            setIndex(0);
        }
        else setIndex(index + 1);
    }

    const prevProject = () => {
        if(index - 1 < 0) {
            setIndex(data.length - 1);
        }
        else setIndex(index -1);
    }

    return (
        <div className="w-full overflow-hidden bg-slate-50">
            <div className="px-3 pt-24 max-w-[900px] mx-auto">
                <div className="flex flex-wrap items-end justify-between gap-3">
                    <div className="flex gap-3 text-2xl font-bold text-black">
                        <ImFire /> Ape Gorilla Project Proposals
                    </div>
                    <Link to={URL.SEARCH} className="flex items-center hover:font-bold">
                        <div className="pr-3">See more</div>
                        <IoIosArrowForward />
                    </Link>
                </div>
                <div className="relative flex gap-5 pt-10 transition-all duration-200 w-max" style={{ left: `${pos}px` }}>
                    {   data.length ?
                        data.map((prop, key: number) => <ProjectCard data={prop} key={key} className="w-64" />) :
                        <div className="font-semibold">No fundraising yet ...</div>
                    }
                </div>
                <div className="relative z-10 left-8 sm:-top-60 w-min">
                    <button className="flex items-center justify-center w-12 h-12 bg-teal-700 rounded-full" onClick={prevProject}>
                        <IoIosArrowBack className="text-white" size={20} />
                    </button>
                </div>
                <div className="relative flex justify-end right-8 sm:-top-72 -top-12">
                    <button className="flex items-center justify-center w-12 h-12 bg-teal-700 rounded-full" onClick={nextProject}>
                        <IoIosArrowForward className="text-white" size={20} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HomeProjects;
