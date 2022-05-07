import React from "react";
import { Link } from "react-router-dom";
import { URL } from "libs/constants";
// import Modal from "components/util/Modal";
// import how_it_works from "assets/video/how_it_works.mp4";
// import { FaRegPlayCircle } from "react-icons/fa";

const HomeTop = () => {
    // const video = useRef<HTMLVideoElement>(null);
    // const [ isOpen, setOpen ] = useState<boolean>(false);
    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);

    // useEffect(() => {
    //     if(video.current === null) return;
    //     if(isOpen) video.current.play();
    //     else video.current.pause();
    // }, [ isOpen ]);

    return (
        <div className="flex flex-col md:flex-row bg-slate-50">
            <div className="max-w-[450px] flex flex-col gap-8 flex-1 mx-auto my-4 px-3 md:m-auto">
                <div className="text-3xl font-bold xl:text-4xl">Trusted fundraising for all of life's moments</div>
                <div className="text-sm text-gray-500">The Ape Gorilla team has built this platform to allow Ape Gorilla NFT holders to create business, charity, or project proposals to receive funding. Ape Gorilla will fund projects from the 20% reserve of revenues from the NFT's public sale, and also give the opportunity for AGC NFT holders to receive donations and funding in crypto from the public and community directly, with no middle-man. </div>
                <div className="flex flex-wrap items-center gap-3">
                    <Link to={URL.FUNDRAISE} className="px-4 py-3 font-bold text-white bg-teal-700 rounded-md">Start a GorillaFund</Link>
                    {/* <button onClick={handleOpen} className="flex items-center gap-3 px-4 py-2 text-gray-500 transition-all duration-200 hover:text-teal-700">
                        <FaRegPlayCircle size={30} />
                        <div className="font-bold">How it works?</div>
                    </button> */}
                </div>
            </div>
            <div className="bg-[url('../../assets/img/home/e-sport.png')] w-full mb-0 mt-4 md:mt-0 bg-cover bg-center md:w-[500px] h-[400px]"></div>
            {/* <Modal isOpen={isOpen} onClose={handleClose}>
                <div className="px-3">
                    <video ref={video} width={600} controls>
                        <source src={how_it_works} type="video/mp4" />
                        Your brower does not support HTML video.
                    </video>
                </div> 
            </Modal> */}
        </div>
    )
}

export default HomeTop;
