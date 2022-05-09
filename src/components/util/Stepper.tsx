import React from "react";
import Logo from "assets/img/svg/gorilla.svg";
import { Link } from "react-router-dom";
import { URL, APP_NAME } from "libs/constants";
import { StepInterface } from "libs/interfaces";
import { FiCheck } from "react-icons/fi";
import { FaCircle } from "react-icons/fa";

const Stepper = ({step, data}: {step: number, data: StepInterface[]}) => {
    return (
        <div className="flex flex-col gap-16 p-12 bg-white">
            <Link to={URL.HOME} className="flex items-center gap-2">
                <img src={Logo} className="w-7" alt="" />
                <div className="font-bold">{APP_NAME}</div>
            </Link>
            <div className="flex">
                <div className="relative w-[2px] h-full left-[15px] bg-gray-200"></div>
                <div className="relative flex flex-col gap-16">
                    {
                        data.map((item: StepInterface, key: number) => (
                            <div className="flex items-center gap-2 bg-white" key={key}>
                                {
                                    step > key + 1 && 
                                    <div className="flex items-center justify-center h-7 border border-teal-700 w-[28px] rounded-full">
                                        <FiCheck className="text-teal-700" />
                                    </div>
                                }
                                {
                                    step === key + 1 &&
                                    <div className="flex items-center justify-center h-7 border border-teal-700 w-[28px] rounded-full">
                                        <FaCircle className="text-teal-700" size={14} />
                                    </div>
                                }
                                {
                                    step < key + 1 &&
                                    <div className="flex items-center justify-center h-7 border border-gray-200 w-[28px] rounded-full">
                                        <FaCircle className="text-gray-200" size={14} />
                                    </div>
                                }
                                <div className="flex flex-col flex-1 gap-1">
                                    <div className="text-sm font-bold">{item.title}</div>
                                    <div className="text-xs text-gray-500">{item.text}</div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Stepper;