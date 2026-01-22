import ClientStory from "./ClientStory";
import SocialProof from "./SocialProof";
import HeaderArticle from "./HeaderArticle";
import HeaderImage from "./HeaderImage";
import { CLIENT_STORIES } from "@/lib/CONSTANTS";

const Testimonials = () => {
    return (
        <section className="section-container">
            {/* Section Label */}
            <h2 className="flex items-center gap-2 text-lg tracking-tight font-medium">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 64 64"
                    width="1em">
                    <defs fill="currentColor"></defs>
                    <path
                        d="m32,8c-14.81,0-24,8.43-24,22,0,6.92,2.4,12.49,6.7,16.3l-6.7,6.7,2,3c5.42,0,10.43-1.8,14.45-4.84,2.32.55,4.84.84,7.55.84,14.81,0,24-8.43,24-22s-9.19-22-24-22Zm0,8c4.94,0,8,3.06,8,8s-3.06,8-8,8-8-3.06-8-8,3.06-8,8-8Zm0,30c-5.6,0-10.03-1.41-13.09-4.03,2.72-3.81,7.24-5.97,13.09-5.97s10.37,2.16,13.09,5.97c-3.06,2.62-7.49,4.03-13.09,4.03Z"
                        fill="currentColor"></path>
                </svg>
                <span>Customer stories</span>
            </h2>

            {/* Section Content */}
            <div className="mt-4 bg-white-40 rounded-xl p-10 lg:p-16 shadow shadow-black/20">
                {/* Header */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0">
                    <HeaderArticle />
                    <HeaderImage />
                </div>

                {/* Clients Stories */}
                <div className="mt-10 lg:mt-20">
                    {/* First row */}
                    <div className="pt-4 lg:pt-10 grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-6 border-t border-t-white-70/30">
                        {CLIENT_STORIES.slice(0, 3)?.map((story) => (
                            <ClientStory
                                key={story.company}
                                story={story}
                                isFirstRow={true}
                            />
                        ))}
                    </div>

                    {/* Second row */}
                    <div className="hidden pt-4 lg:grid grid-cols-1 lg:grid-cols-3 gap-6 border-t border-t-white-70/30">
                        {CLIENT_STORIES.slice(3)?.map((story) => (
                            <ClientStory
                                key={story.company}
                                story={story}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Social proof stats */}
            <div className="my-4">
                <SocialProof />
            </div>
        </section>
    );
};

export default Testimonials;
