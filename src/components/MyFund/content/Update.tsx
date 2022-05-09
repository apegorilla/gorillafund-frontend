import React, { useState } from "react";
import Modal from "components/util/Modal";
import { FaTimes } from "react-icons/fa";

const Update = () => {
    const [ isOpen, setOpen ] = useState<boolean>(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    return (
        <div className="flex flex-col items-center gap-3 py-5">
            <div className="font-bold text-black">No updates yet!</div>
            <div className="text-xs">Keep your donors and followers up to date on your fundraisers!</div>
            <button onClick={handleOpen} className="px-3 py-2 font-bold text-black border hover:border-teal-700 hover:bg-teal-700 hover:text-white transition-all duration-200 hover:shadow-md rounded-[4px]">Post an update</button>
            <Modal isOpen={isOpen} onClose={handleClose}>
                <div className="w-full max-w-md p-6 bg-white">
                    <div className="flex justify-between">
                        <div className="text-base font-bold text-black">Post an update</div>
                        <button onClick={handleClose}><FaTimes size={16} /></button>
                    </div>
                    <hr className="my-5" />
                    <div className="pb-1 font-bold text-black">Keep your donors and followers up to date on your fundraisers!</div>
                    <textarea className="w-full h-32 focus:outline-none border py-2 px-3 rounded-[4px]"></textarea>
                    <hr className="my-5" />
                    <div className="font-bold text-black">Send update to</div>
                    <label className="flex items-center gap-3 pt-3 pl-1 cursor-pointer">
                        <input type="radio" value={0} name="setting" className="w-2 h-2 rounded-full appearance-none outline outline-1 outline-offset-4 checked:outline-teal-700 outline-gray-300 checked:bg-teal-700" />
                        <div className="font-semibold">Campaign Page</div>
                    </label>
                    <label className="flex items-center gap-3 pt-3 pl-1 cursor-pointer">
                        <input type="radio" value={1} name="setting" className="w-2 h-2 rounded-full appearance-none outline outline-1 outline-offset-4 checked:outline-teal-700 outline-gray-300 checked:bg-teal-700" />
                        <div className="font-semibold">Donors and Followers</div>
                    </label>
                    <label className="flex items-center gap-3 pt-3 pl-1 cursor-pointer">
                        <input type="radio" value={2} name="setting" className="w-2 h-2 rounded-full appearance-none outline outline-1 outline-offset-4 checked:outline-teal-700 outline-gray-300 checked:bg-teal-700" />
                        <div className="font-semibold">Facebook</div>
                    </label>
                    <label className="flex items-center gap-3 pt-3 pl-1 cursor-pointer">
                        <input type="radio" value={3} name="setting" className="w-2 h-2 rounded-full appearance-none outline outline-1 outline-offset-4 checked:outline-teal-700 outline-gray-300 checked:bg-teal-700" />
                        <div className="font-semibold">Twitter</div>
                    </label>
                    <hr className="my-5" />
                    <button onClick={() => alert(process.env.APP_URL)} className="w-full py-2 font-bold text-white bg-teal-700 rounded-[4px]">Post an update</button>
                </div>
            </Modal>
        </div>
    )
}

export default Update;