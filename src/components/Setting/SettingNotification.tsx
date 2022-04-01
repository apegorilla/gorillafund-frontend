import React from "react";

const SettingNotification = () => {
    return (
        <div className="w-full bg-slate-50">
            <div className="max-w-[900px] mx-auto px-3 py-5">
                <div className="p-5 text-sm bg-white">
                    <div className="font-bold">Donation email notifications</div>
                    <div className="pt-1 text-xs text-gray-500">Choose how you would like to receive emails when others donate or comment on your GoFundMe.</div>
                    <label className="flex items-center gap-3 pt-6 pl-1">
                        <input type="radio" name="setting" className="w-2 h-2 transition duration-200 rounded-full appearance-none outline outline-1 outline-offset-4 checked:outline-teal-700 outline-gray-300 checked:bg-teal-700" />
                        <div className="">Send me an email for every donation or comment</div>
                    </label>
                    <label className="flex items-center gap-3 pt-4 pl-1">
                        <input type="radio" name="setting" className="w-2 h-2 transition duration-200 rounded-full appearance-none outline outline-1 outline-offset-4 checked:outline-teal-700 outline-gray-300 checked:bg-teal-700" />
                        <div className="">Send me a daily highlight of donations and comments</div>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default SettingNotification;