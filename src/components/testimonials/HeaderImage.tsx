const HeaderImage = () => {
    return (
        <div className="lg:self-end">
            <div className="relative w-full lg:w-[350px] lg:ms-auto cursor-pointer">
                <img
                    src="/images/ali-abdal.webp"
                    alt="Ali abdal workspace"
                    width="350"
                    height="200"
                    className="w-full rounded-lg transition-all duration-300 ease-linear brightness-[.8] hover:brightness-[.9]"
                />
                <span className="absolute bottom-5 right-5 p-2 bg-white rounded-full">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 64 64"
                        width="1em"
                        className="">
                        <defs fill="currentColor"></defs>
                        <path
                            d="m50,30v4l-32,16h-4V14h4l32,16Z"
                            fill="currentColor"></path>
                    </svg>
                </span>
            </div>
        </div>
    );
};

export default HeaderImage;
