import clsx from "clsx";

interface ArticleMediaProps {
    coverImg: string;
    coverImgSm?: string;
    isProject: boolean;
}

const ArticleMedia = ({ coverImg, coverImgSm, isProject }: ArticleMediaProps) => {
    return (
        <div
            className={clsx(
                "flex-1 mt-4 ps-2 pb-[1.8px] overflow-hidden self-end",
                isProject ? "lg:max-h-[240px]" : "sm:max-h-[400px] lg:max-h-[350px]"
            )}>
            <picture>
                <source
                    srcSet={coverImgSm || ""}
                    media="(max-width: 959px)"
                />
                <img
                    src={coverImg}
                    alt="Article media"
                    className={clsx(
                        isProject ? "object-contain object-bottom h-full" : "md:object-cover"
                    )}
                    loading="lazy"
                    decoding="async"
                />
            </picture>
        </div>
    );
};

export default ArticleMedia;
