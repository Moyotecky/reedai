const HeroPicture = () => {
    return (
        <picture>
            <source
                srcSet="https://www.notion.com/_next/image?url=%2Ffront-static%2Fpages%2Fhome%2Fhero%2Fhero_1_desktop.png&w=3840&q=75"
                media="(min-width: 840px)"
            />
            <img
                alt="Notion product interface"
                fetchPriority="high"
                width="600"
                height="680"
                decoding="async"
                className="h-full rounded-lg shadow lg:object-contain xl:object-fill"
                srcSet="
                https://www.notion.com/_next/image?url=%2Ffront-static%2Fpages%2Fhome%2Fhero%2Fhero_1_mobile.png&w=640&q=75 1x, 
                https://www.notion.com/_next/image?url=%2Ffront-static%2Fpages%2Fhome%2Fhero%2Fhero_1_mobile.png&w=1200&q=75 2x
              "
                src="https://www.notion.com/_next/image?url=%2Ffront-static%2Fpages%2Fhome%2Fhero%2Fhero_1_mobile.png&w=1200&q=75"
            />
        </picture>
    );
};

export default HeroPicture;
