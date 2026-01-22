import clsx from "clsx";
import type { ShowcaseArticle } from "@/lib/CONSTANTS";

import GifBadge from "./GifBadge";
import ArticleMedia from "./ArticleMedia";
import ArticleHeader from "./ArticleHeader";

interface ArticleProps {
    article: ShowcaseArticle;
}

const Article = ({ article }: ArticleProps) => {
    const { icon, title, isNew, desc, coverImg, coverImgSm, gif, bgColor, borderColor, href } =
        article;

    const isProject = title === "Voice Tutor";

    return (
        <article
            className={clsx(
                "relative rounded-xl group border-[1.5px] border-transparent overflow-hidden",
                bgColor || "bg-white",
                borderColor || "border-gray-100",
                isProject && "lg:col-span-2"
            )}>
            {/* Content Wrapper */}
            <div className={clsx(isProject && "lg:h-[270px] lg:flex", !coverImg && !gif && "p-6")}>
                <ArticleHeader
                    title={title}
                    icon={icon}
                    isNew={isNew}
                    desc={desc}
                    isProject={isProject}
                />
                {coverImg && (
                    <ArticleMedia
                        coverImg={coverImg}
                        coverImgSm={coverImgSm}
                        isProject={isProject}
                    />
                )}
            </div>

            {/* Fancy Gif Badge */}
            {gif && (
                <GifBadge
                    gif={gif}
                    isProject={isProject}
                />
            )}

            {/* Clickable overlay link */}
            <a
                href={href}
                className="absolute inset-0 z-10"
            />
        </article>
    );
};

export default Article;
