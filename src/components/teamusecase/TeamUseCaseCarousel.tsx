"use client";

import { useState } from "react";
import { CAROUSEL_TABS, CAROUSEL_TAB_CONTENTS } from "@/lib/CONSTANTS";
import CarouselTabContent from "./CarouselTabContent";
import CarouselTab from "./CarouselTab";

const TeamUseCaseCarousel = () => {
    const [activeTab, setActiveTab] = useState(CAROUSEL_TABS[0].toLowerCase());

    const changeActiveTab = (tab: string) => {
        setActiveTab(tab.toLowerCase());
    };

    return (
        <section className="section-container">
            <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-center">
                    One space for every team.
                </h2>

                {/* Tabs */}
                <nav
                    role="tablist"
                    className="my-6 flex flex-wrap items-center justify-center gap-2">
                    {CAROUSEL_TABS?.map((tab) => (
                        <CarouselTab
                            key={tab}
                            tab={tab}
                            activeTab={activeTab}
                            changeActiveTab={changeActiveTab}
                        />
                    ))}
                </nav>
            </div>

            {/* Tab Content */}
            <div className="relative h-[400px] lg:h-[530px]">
                {CAROUSEL_TAB_CONTENTS?.map((tabContent) => (
                    <CarouselTabContent
                        key={tabContent.title}
                        tabContent={tabContent}
                        isActiveTab={activeTab === tabContent.title.toLowerCase()}
                    />
                ))}
            </div>

            {/* Footer */}
            <div className="my-28 lg:max-w-3xl lg:mx-auto">
                <p className="text-center font-semibold">More productivity. Fewer tools.</p>
                <picture>
                    <source
                        media="(min-width: 840px)"
                        srcSet="https://www.notion.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fspoqsaf9291f%2F1VJq4eDjZKJfNP8ertYCn7%2F15adb9934fa5b1c74b5b050baa0bade9%2FCrossOut-L.png&amp;w=3840&amp;q=75"
                        height="378"
                        width="2523"
                    />
                    <img
                        alt="Homepage | Competitors | Logos Crossed out | S"
                        loading="lazy"
                        width="2136"
                        height="96"
                        decoding="async"
                        srcSet="https://www.notion.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fspoqsaf9291f%2F5bp9xSTpHxKgdOTkMXlTOV%2F6a68e2652c4d4128fad278efa61bd39d%2FCrossOut-S.png&amp;w=3840&amp;q=75 1x"
                        src="https://www.notion.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fspoqsaf9291f%2F5bp9xSTpHxKgdOTkMXlTOV%2F6a68e2652c4d4128fad278efa61bd39d%2FCrossOut-S.png&amp;w=3840&amp;q=75"
                    />
                </picture>
            </div>
        </section>
    );
};

export default TeamUseCaseCarousel;
