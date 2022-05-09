import toast from "react-hot-toast";
import { MdOutlineContentCopy } from "react-icons/md";

const CopyInput = ({value, className}: {value: string, className?: string}) => {
    const handleCopy = () => window.navigator.clipboard.writeText(value).then(() => toast.success('Copied.'));

    return (
        <div className={"border rounded-[4px] flex items-center justify-center px-1 " + className}>
            <input value={value || ""} className="w-full px-1 py-2 font-semibold focus:outline-none" readOnly />
            <MdOutlineContentCopy onClick={handleCopy} size={20} className="text-gray-400 cursor-pointer hover:text-gray-700" />
        </div>
    )
}

export default CopyInput;