import clsx from "clsx";

interface GifBadgeProps {
    gif: string;
    isProject: boolean;
}

const GifBadge = ({ gif, isProject }: GifBadgeProps) => {
    return (
        <>
            {/* Gif for large screens in special position */}
            {isProject && (
                <div className="hidden lg:block absolute right-[57%] bottom-4">
                    <img
                        src={gif}
                        alt="Noise Gif"
                        className="opacity-0 translate-x-4 w-16 rounded-full shadow-black/30 shadow-sm transition-all duration-200 ease-linear group-hover:opacity-100 group-hover:translate-x-0"
                    />
                </div>
            )}

            {/* Default Gif */}
            <div className={clsx("absolute right-4 bottom-4", isProject && "lg:hidden")}>
                <img
                    src={gif}
                    alt="Noise Gif"
                    className="opacity-0 translate-y-3 w-16 rounded-full shadow-black/30 shadow-sm transition-all duration-200 ease-linear group-hover:opacity-100 group-hover:translate-y-0"
                />
            </div>
        </>
    );
};

export default GifBadge;
