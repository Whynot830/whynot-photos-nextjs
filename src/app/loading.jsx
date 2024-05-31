import { Loader } from "lucide-react";

export default function loading() {
    return (
        <div className="absolute inset-0 bottom-20 flex justify-center items-center">
            <Loader className="animate-[spin_1.5s_infinite_linear] h-[15%] w-[15%] max-h-[100px]" />
        </div>
    )
}