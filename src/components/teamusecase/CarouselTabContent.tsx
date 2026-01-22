import clsx from "clsx";
import type { CarouselTabContent as CarouselTabContentType } from "@/lib/CONSTANTS";

interface CarouselTabContentProps {
    tabContent: CarouselTabContentType;
    isActiveTab: boolean;
}

const CarouselTabContent = ({ tabContent, isActiveTab }: CarouselTabContentProps) => {
    const { title, imageSm, imageLg } = tabContent;

    return (
        <div
            className={clsx(
                "absolute inset-0 overflow-hidden flex items-center justify-center rounded-lg transition-all duration-300 ease-linear",
                isActiveTab ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            )}>
            <picture className="">
                <source
                    media="(max-width: 740px)"
                    srcSet={imageSm}
                />
                <img
                    src={imageLg}
                    alt={`Homepage Carousel: ${title} - Desktop`}
                    loading="eager"
                    width="2506"
                    height="1332"
                    decoding="async"
                />
            </picture>
        </div>
    );
};

export default CarouselTabContent;
