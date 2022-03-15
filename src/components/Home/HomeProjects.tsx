import React, { useState, useEffect } from "react";
import { ProjectInterface } from "libs/interfaces";
import { rawListeners } from "process";
import { ImFire } from "react-icons/im";
import imgEsport from "assets/img/home/e-sport.png";
import imgRobot from "assets/img/home/robot.png";
import imgStories from "assets/img/home/stories.png";
import imgSupport from "assets/img/home/support.png";
import imgArrowRightBlack from "assets/img/svg/arrow-right-black.svg";
import imgArrowLeftWhite from "assets/img/svg/arrow-left-white.svg";
import imgArrowRightWhite from "assets/img/svg/arrow-right-white.svg";
import { Link } from "react-router-dom";

const HomeProjects = () => {
    const [ data ] = useState<ProjectInterface[]>([
        {
            img: imgEsport,
            title: "E-Sports Startup",
            content: "We've spent the last 5 years helping over 35,000 teams just like yourself to create and sustain successful online support ...",
            donate: "Last donation is  a minute ago",
            goal: 30.0,
            raise: 14.2
        },
        {
            img: imgStories,
            title: "Fundraising School for IT",
            content: "We've spent the last 5 years helping over 35,000 teams just like yourself to create and sustain successful online support ...",
            donate: "Last donation is 7 minute ago",
            goal: 15.0,
            raise: 7.5
        },
        {
            img: imgRobot,
            title: "Smart Robots",
            content: "We've spent the last 5 years helping over 35,000 teams just like yourself to create and sustain successful online support ...",
            donate: "Last donation is 23 minute ago",
            goal: 5.0,
            raise: 3.4
        },
        {
            img: imgSupport,
            title: "Support Ukraine",
            content: "We've spent the last 5 years helping over 35,000 teams just like yourself to create and sustain successful online support ...",
            donate: "Last donation is 23 minute ago",
            goal: 2.7,
            raise: 3.5
        },
        {
            img: imgRobot,
            title: "Smart Robots",
            content: "We've spent the last 5 years helping over 35,000 teams just like yourself to create and sustain successful online support ...",
            donate: "Last donation is 23 minute ago",
            goal: 5.0,
            raise: 3.4
        },
        {
            img: imgRobot,
            title: "Smart Robots",
            content: "We've spent the last 5 years helping over 35,000 teams just like yourself to create and sustain successful online support ...",
            donate: "Last donation is 23 minute ago",
            goal: 5.0,
            raise: 3.4
        },
        {
            img: imgRobot,
            title: "Smart Robots",
            content: "We've spent the last 5 years helping over 35,000 teams just like yourself to create and sustain successful online support ...",
            donate: "Last donation is 23 minute ago",
            goal: 5.0,
            raise: 3.4
        },
        {
            img: imgRobot,
            title: "Smart Robots",
            content: "We've spent the last 5 years helping over 35,000 teams just like yourself to create and sustain successful online support ...",
            donate: "Last donation is 23 minute ago",
            goal: 5.0,
            raise: 3.4
        }
    ]);

    const [pos, setPos] = useState(0);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        setPos(-index * 276);
    }, [index]);

    const nextProject = () => {
        if(index + 1 >= data.length - 2) {
            setIndex(0);
        }
        else setIndex(index + 1);
    }

    const prevProject = () => {
        if(index - 1 < 0) {
            setIndex(data.length - 3);
        }
        else setIndex(index -1);
    }

    return (
        <div className="px-56 pt-24 overflow-hidden bg-slate-50">
            <div className="flex items-center justify-between">
                <div className="flex items-center text-2xl font-bold text-black">
                    <ImFire /> Top Rated Project
                </div>
                <Link to="#" className="flex items-center">
                    <div className="pr-3">See more</div>
                    <img src={imgArrowRightBlack} />
                </Link>
            </div>
            <div className="relative flex gap-5 pt-10 transition-all duration-200 w-max" style={{ left: `${pos}px` }}>
                {
                    data.map((prop: ProjectInterface) => (
                        <div className="flex flex-col w-64 text-sm text-gray-500 bg-white">
                            <img src={prop.img} className="h-44" />
                            <div className="flex flex-col px-4 py-5">
                                <div className="text-lg font-bold text-black">{prop.title}</div>
                                <div className="pt-2">{prop.content}</div>
                                <div className="pt-10">{prop.donate}</div>
                                <div className="w-full h-1 pt-3 bg-gray-50">
                                    <div className="bg-teal-700 h-1 w-[50%]"></div>
                                </div>
                                <div className="flex justify-between pt-5">
                                    <div className="font-bold text-black">${prop.raise}M raised</div>
                                    <div>${prop.goal}M Goal</div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="relative z-10 left-8 -top-60 w-min">
                <button className="flex items-center justify-center w-12 h-12 bg-teal-700 rounded-full" onClick={prevProject}>
                    <img src={imgArrowLeftWhite} />
                </button>
            </div>
            <div className="relative right-0 flex justify-end -top-72">
                <button className="flex items-center justify-center w-12 h-12 bg-teal-700 rounded-full" onClick={nextProject}>
                    <img src={imgArrowRightWhite} />
                </button>
            </div>
        </div>
    )
}

export default HomeProjects;