import { ArrowRight } from "lucide-react";
import { INTEGRATIONS } from "@/lib/CONSTANTS";
import IntegrationGroup from "./IntegrationGroup";

const SearchCapabilities = () => {
    const firstGroup = INTEGRATIONS.slice(0, 6);
    const secondGroup = INTEGRATIONS.slice(6);

    return (
        <section className="section-container mt-28 lg:mt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
                {/* Left column */}
                <div className="lg:flex lg:flex-col lg:justify-between">
                    {/* Heading + CTA */}
                    <div className="space-y-3">
                        <h2 className="text-3xl font-bold tracking-tight">
                            Upload your notes. Learn faster.
                        </h2>
                        <p className="">
                            ReedAI analyzes past questions and lecture slides to create personalized tutoring sessions.
                        </p>
                        <div className="flex items-center flex-wrap gap-4">
                            <a
                                href="#"
                                className="btn-base btn-blue">
                                Try for free
                            </a>
                            <a
                                href="#"
                                className="inline-flex gap-2 items-center btn-base text-blue-50 hover:underline">
                                <span>See how it works</span>
                                <ArrowRight />
                            </a>
                        </div>
                    </div>

                    {/* Integrations */}
                    <div className="mt-10 lg:mt-0 grid grid-cols-2">
                        <IntegrationGroup
                            items={firstGroup}
                            groupIndex={1}
                        />
                        <IntegrationGroup
                            items={secondGroup}
                            groupIndex={2}
                        />
                    </div>
                </div>

                {/* Right column */}
                <div className="">
                    <video
                        src="https://www.notion.com/front-static/pages/home/search/homepageSearchIntegrationsS-v4.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline></video>
                </div>
            </div>
        </section>
    );
};

export default SearchCapabilities;
