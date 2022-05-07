import React, { useState } from "react";
import toast from "react-hot-toast";
import { useFund } from "contexts/FundContext";
import FundAPI from "api/fund";
import { FiArrowLeft, FiPaperclip } from "react-icons/fi";

const FundPhoto = () => {
    var imageInput;
    var nextButton;
    const imageType = ["image/png", "image/jpeg", "image/gif", "image/svg+xml"];
    const { setStep, image, setImage } = useFund();
    const [ photo, setPhoto ] = useState<any>(image);
    const [ img, setIMG ] = useState<any>();

    const fileReader = new window.FileReader();
    fileReader.onload = () => setPhoto(fileReader.result);

    const handleClick = () => imageInput.click();
    const handleChange = (e) => {
        const file = e.target.files[0];
        if(!(file && imageType.includes(file.type))) {
            setPhoto("");
            return;
        }
        setIMG(file);
        setPhoto(window.URL.createObjectURL(file));
    }
    const handleNext = () => {
        nextButton.disabled = true;
        if(!photo) {
            nextButton.disabled = false;
            return;
        }
        if(img) {
            const formData = new FormData();
            formData.append('photo', img);
            FundAPI.photoUpload(formData)
            .then(res => {
                nextButton.disabled = false;
                setImage(res.data.filePath);
                setStep(3);
            })
            .catch(err => {
                toast.error(err.message);
                nextButton.disabled = false;
            });
        }
        else {
            nextButton.disabled = false;
            setStep(3);
        }
    }
    const handlePrev = () => setStep(1);
    
    return (
        <>
            <div className="pt-6 text-2xl font-bold">Add a cover photo</div>
            <div className="pt-3 text-center text-gray-500">A high-quality photo will help tell your story.</div>
            <input ref={el => imageInput = el} type="file" accept="image/*" onChange={handleChange} className="hidden" />
            {
                photo ? <img onClick={handleClick} src={photo} className="w-full mt-6 border-2 border-teal-700 rounded-md cursor-pointer" alt="" /> :
                <div className="flex flex-col w-full pt-6">
                    <div className="pb-1 font-bold">Cover Image*</div>
                    <div onClick={handleClick} className="border-[1px] bg-white rounded-[4px] flex items-center justify-center px-2 cursor-pointer">
                        <FiPaperclip size={20} className="rotate-45" />
                        <div className="w-full px-3 py-2 text-gray-500">Click here to attach file</div>
                    </div>
                </div>
            }
            <button onClick={handleNext} ref={el => nextButton = el} className={`w-full rounded-[4px] disabled:opacity-50 py-2 mt-6 text-white ${photo ? "bg-teal-700" : "bg-teal-700/50 cursor-default"}`}>Save</button>
            <button onClick={handlePrev} className="flex items-center justify-center w-full py-2 mt-3 transition-all duration-200 bg-white border border-white hover:border-teal-700 rounded-[4px]">
                <FiArrowLeft size={16} />
                <div className="pl-1 font-bold">Go back</div>
            </button>
        </>
    )
}

export default FundPhoto;