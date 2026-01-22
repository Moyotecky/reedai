
import Image from "next/image";

const HeroPicture = () => {
    return (
        <div className="">
            <Image
                src="/hero-dashboard.png"
                alt="ReedAI Dashboard Interface"
                width={1200}
                height={1200}
                priority
                className="w-1000 h-350 rounded-xl shadow-2xl border border-gray-200/50"
            />
        </div>
    );
};

export default HeroPicture;
