import type { CSSProperties } from "react";

interface VideoMaskStyle extends CSSProperties {
    maskImage: string;
    maskRepeat: string;
    maskPosition: string;
    maskSize: string;
}

interface VideoConfig {
    url: string;
    poster: string;
    maskStyle: VideoMaskStyle;
}

const VIDEO_CONFIG: VideoConfig = {
    url: "https://www.notion.com/front-static/nosey/hero/noseyHeroV2.mp4",
    poster: "https://www.notion.com/front-static/pages/home/hero/nosey_firstframe_placeholder.png",
    maskStyle: {
        maskImage: "url(https://www.notion.com/front-static/pages/home/hero/nosey_mask.png)",
        maskRepeat: "no-repeat",
        maskPosition: "center",
        maskSize: "contain",
    },
};

const HeroVideo = () => (
    <div className="absolute -bottom-20 w-[65%] left-1/2 -translate-x-1/2 overflow-hidden">
        <video
            className="w-full h-42"
            src={VIDEO_CONFIG.url}
            autoPlay
            muted
            playsInline
            preload="auto"
            poster={VIDEO_CONFIG.poster}
            style={VIDEO_CONFIG.maskStyle}
        />
    </div>
);

export default HeroVideo;
