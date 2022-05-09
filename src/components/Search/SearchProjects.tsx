import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";
import { useSearchParams } from "react-router-dom";
import ProjectCard from "components/util/ProjectCard";
import FundAPI from "api/fund";
import { FUNDCATEGORY, FUNDSORT } from "libs/constants";
import { ImFire, ImSearch } from "react-icons/im";
import toast from "react-hot-toast";

const SearchProjects = () => {
    const [ searchParams, setSearchParams ] = useSearchParams();
    const [ top, setTop ] = useState<any[]>([]);
    const [ data, setData ] = useState<any[]>([]);
    const [ keyword, setKeyword ] = useState<string>("");
    const setQuery = val => {
        let condition: any = {};
        let s = searchParams.get('s');
        let category = searchParams.get('category');
        let sort = searchParams.get('sort');
        if(val.s) condition.s = val.s;
        else if (val.s === undefined && s) condition.s = s;
        if(val.category) condition.category = val.category;
        else if (val.category === undefined && category) condition.category = category;
        if(val.sort) condition.sort = val.sort;
        else if (val.sort === undefined && sort) condition.sort = sort;
        setSearchParams(condition);
    }

    const onChangeKeyword = e => setKeyword(e.target.value);
    const onKeydownKeyword = e => {
        if(e.keyCode !== 13) return;
        setQuery({ s: keyword });
    }
    const search = () => {
        FundAPI.search({
            s: searchParams.get('s'),
            category: searchParams.get('category'),
            sort: searchParams.get('sort')
        }).then(res => setData(res.data)).catch(err => toast.error(err.message));
    }
    const setSort = val => setQuery({ sort: val.value });
    const setCategory = val => setQuery({ category: val.value });

    useEffect(() => {
        FundAPI.topRated(3).then(res => setTop(res.data)).catch(err => toast.error(err.message));
        FundAPI.search({}).then(res => setData(res.data)).catch(err => toast.error(err.message));
    }, []);
    useEffect(search, [searchParams]);

    return (
        <div className="w-full py-24 bg-slate-50">
            <div className="px-3 max-w-[900px] mx-auto">
                <div className="flex flex-wrap items-end justify-between gap-3">
                    <div className="flex items-center text-2xl font-bold text-black">
                        <ImFire /> Top Rated Project
                    </div>
                </div>
                <div className="grid gap-6 py-10 sm:grid-cols-2 md:grid-cols-3">
                    { top.map((prop, key: number) => <ProjectCard data={prop} key={key} />) }
                </div>
                <hr />
                <div className="flex flex-wrap items-center justify-between gap-5 py-10 text-sm">
                    <div className="flex bg-white border border-white rounded-sm hover:border-slate-200">
                        <div className="flex items-center justify-center px-4">
                            <ImSearch className="text-gray-500" size={18} />
                        </div>
                        <input type="text" value={keyword} onChange={onChangeKeyword} onKeyDown={onKeydownKeyword} className="w-48 py-2 pr-4 focus:outline-none" placeholder="Search by name, category" />
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <div className="flex px-2">
                            <div className="flex items-center justify-center pr-3 text-gray-500">
                                Categories:
                            </div>
                            <ReactSelect options={FUNDCATEGORY} value={FUNDCATEGORY[searchParams.get('category') || 0]} onChange={setCategory} className="w-40" />
                        </div>
                        <div className="flex px-2">
                            <div className="flex items-center justify-center pr-3 text-gray-500">
                                Sort by:
                            </div>
                            <ReactSelect options={FUNDSORT} value={FUNDSORT[parseInt(searchParams.get('sort') || '1') - 1]} onChange={setSort} className="w-40" />
                        </div>
                    </div>
                </div>
                <div className="grid gap-6 py-10 sm:grid-cols-2 md:grid-cols-3">
                    { data.map((prop, key: number) => <ProjectCard data={prop} key={key} />) }
                </div>
                <div className="flex justify-center">
                    <button className="border border-teal-700 text-teal-700 font-bold px-6 py-3 rounded-[4px] text-sm hover:bg-teal-700 hover:text-white transition-all duration-300">Load more</button>
                </div>
            </div>
        </div>
    )
}

export default SearchProjects;