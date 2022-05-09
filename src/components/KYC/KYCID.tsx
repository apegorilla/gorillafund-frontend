import React from "react";
import { useKYC } from "contexts/KycContext";
import { MdOutlineCameraEnhance } from "react-icons/md";
import { FiArrowLeft, FiPaperclip } from "react-icons/fi";
import iconID from "assets/img/svg/id.svg";
import iconIDGray from "assets/img/svg/id-gray.svg";
import iconDrive from "assets/img/svg/drive.svg";
import iconDriveGray from "assets/img/svg/drive-gray.svg";
import iconPassport from "assets/img/svg/passport.svg";
import iconPassportGray from "assets/img/svg/passport-gray.svg";

const KYCID = () => {
    var docElement1, docElement2;
    const { setStep, identifyType, setType, identifyNumber, setNumber, identifyExpire, setExpire, doc1, setDoc1, doc2, setDoc2 } = useKYC();

    const changeType = type => (() => setType(type));
    const changeNumber = e => setNumber(e.target.value);
    const changeExpire = e => setExpire(e.target.value);
    const changeImg1 = e => {
        let file = e.target.files[0];
        if(file) setDoc1(file);
    }
    const changeImg2 = e => {
        let file = e.target.files[0];
        if(file) setDoc2(file);
    }
    const inputImg1 = () => docElement1.click();
    const inputImg2 = () => docElement2.click();
    const onNext = () => {
        let isValid = true;
        if(!(0 < identifyType && identifyType < 3)) isValid = false;
        if(identifyNumber.trim().length < 2) isValid = false;
        if(!identifyExpire) isValid = false;
        if(!doc1) isValid = false;
        if(!doc2) isValid = false;
        isValid && setStep(3);
    }
    const onPrev = () => setStep(1);

    return (
        <>
            <input ref={el => docElement1 = el} onChange={changeImg1} type="file" className="hidden" />
            <input ref={el => docElement2 = el} onChange={changeImg2} type="file" className="hidden" />
            <div className="flex items-center justify-center w-12 h-12 bg-teal-100 rounded-full">
                <MdOutlineCameraEnhance className="text-teal-700" size={30} />
            </div>
            <div className="pt-6 text-2xl font-bold">Identification</div>
            <div className="pt-3 text-center text-gray-500">To verify corporate's identity, fill evidence of identification and upload a preferred form or forms of identification.</div>
            <div className="grid w-full grid-cols-3 gap-3 pt-6 text-gray-500">
                <div onClick={changeType(1)} className={`flex items-center gap-3 border px-2 py-4 cursor-pointer rounded-[4px] ${identifyType === 1 && "border-teal-700"}`}>
                    <img src={identifyType === 1 ? iconPassport : iconPassportGray} alt="" />
                    <div className={`font-semibold ${identifyType === 1 && "text-teal-700"}`}>Passport</div>
                </div>
                <div onClick={changeType(2)} className={`flex items-center gap-3 border px-2 py-4 cursor-pointer rounded-[4px] ${identifyType === 2 && "border-teal-700"}`}>
                    <img src={identifyType === 2 ? iconID : iconIDGray} alt="" />
                    <div className={`font-semibold ${identifyType === 2 && "text-teal-700"}`}>National ID</div>
                </div>
                <div onClick={changeType(3)} className={`flex items-center gap-3 border px-2 py-4 cursor-pointer rounded-[4px] ${identifyType === 3 && "border-teal-700"}`}>
                    <img src={identifyType === 3 ? iconDrive : iconDriveGray} alt="" />
                    <div className={`font-semibold ${identifyType === 3 && "text-teal-700"}`}>Driving Licence</div>
                </div>
            </div>
            <div className="flex flex-col w-full pt-6">
                <div className="pb-1 font-bold">Identify Number*</div>
                <input type="text" value={identifyNumber} onChange={changeNumber} className="w-full rounded-[4px] py-2 px-3 focus:outline-none border border-slate-200" placeholder="Identity Number" />
            </div>
            <div className="flex flex-col w-full pt-6">
                <div className="pb-1 font-bold">Date of Expiry*</div>
                <input type="date" value={identifyExpire} onChange={changeExpire} className="w-full rounded-[4px] py-2 px-3 focus:outline-none border border-slate-200" placeholder="Identity Number" />
            </div>
            <div className="flex flex-col w-full pt-6">
                <div className="pb-1 font-bold">Document upload*</div>
                <div onClick={inputImg1} className="border bg-white rounded-[4px] flex items-center justify-center px-2 cursor-pointer">
                    <FiPaperclip size={20} className="rotate-45" />
                    <div className="w-full px-3 py-2 text-gray-500">{doc1 ? doc1.name : "Click here to attach file"}</div>
                </div>
            </div>
            <div className="flex flex-col w-full pt-6">
                <div className="pb-1 font-bold">Document upload*</div>
                <div onClick={inputImg2} className="border bg-white rounded-[4px] flex items-center justify-center px-2 cursor-pointer">
                    <FiPaperclip size={20} className="rotate-45" />
                    <div className="w-full px-3 py-2 text-gray-500">{doc2 ? doc2.name : "Click here to attach file"}</div>
                </div>
            </div>
            <button onClick={onNext} className="w-full py-2 mt-6 rounded-[4px] text-white bg-teal-700">Next</button>
            <button onClick={onPrev} className="flex items-center justify-center w-full py-2 mt-3">
                <FiArrowLeft size={16} />
                <div className="pl-1 font-bold">Go back</div>
            </button>
        </>
    )
}

export default KYCID;