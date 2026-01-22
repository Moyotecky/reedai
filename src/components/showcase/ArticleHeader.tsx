import { ArrowRight } from "lucide-react";
import clsx from "clsx";

interface ArticleHeaderProps {
    title: string;
    icon: string;
    isNew: boolean;
    desc: string;
    isProject: boolean;
}

const ArticleHeader = ({ title, icon, isNew, desc, isProject }: ArticleHeaderProps) => {
    return (
        <header className="lg:w-[40%] p-5">
            {/* Title Row */}
            <div className="flex items-center gap-2">
                <img
                    src={icon}
                    alt={title}
                    className="w-[30px] h-[30px]"
                    loading="lazy"
                />
                <span className="font-medium text-sm">{title}</span>
                {isNew && <span className="bg-white text-white-70 text-sm rounded-full px-2">New</span>}
            </div>

            {/* Description + Arrow */}
            <div
                className={clsx(
                    "flex items-center justify-between",
                    isProject && "lg:h-full lg:pb-5 lg:flex-col lg:items-start"
                )}>
                <h2 className="text-2xl tracking-tight font-medium">{desc}</h2>
                <div className="p-1 bg-white rounded-full">
                    <ArrowRight size={16} />
                </div>
            </div>
        </header>
    );
};

export default ArticleHeader;
