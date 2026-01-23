
import Image from "next/image";

const HeroPicture = () => {
    return (
        <div className="relative w-full h-auto">
            <Image
                src="/hero-dashboard.png"
                alt="ReedAI Dashboard Interface"
                width={1200}
                height={800}
                priority
                className="w-full h-auto rounded-xl shadow-2xl border border-gray-200/50"
            />
        </div>
    );
};

export default HeroPicture;
