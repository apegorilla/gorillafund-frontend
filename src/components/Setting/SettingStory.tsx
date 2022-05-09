import React from "react";

const SettingStory = ({data, setData}) => {
    const changeHeadline = e => setData({ ...data, headline: e.target.value});
    const changeDesc = e => setData({ ...data, description: e.target.value});

    return (
        <div className="w-full bg-slate-50">
            <div className="max-w-[900px] mx-auto px-3 py-5">
                <div className="p-5 text-sm bg-white rounded-md">
                    <div className="flex flex-col w-full">
                        <div className="pb-1 font-bold">Headline</div>
                        <input type="text" value={data.headline} onChange={changeHeadline} className="w-full py-2 px-3 focus:outline-none border border-slate-200 rounded-[4px]" placeholder="Enter a headline" />
                    </div>
                    <div className="flex flex-col w-full pt-6">
                        <div className="pb-1 font-bold">Story</div>
                        <textarea value={data.description} onChange={changeDesc} className="w-full h-[150px] py-2 px-3 focus:outline-none border border-slate-200 rounded-[4px]" placeholder="Enter a description..." />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingStory;