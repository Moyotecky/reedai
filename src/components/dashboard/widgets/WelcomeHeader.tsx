interface WelcomeHeaderProps {
    username?: string;
}

const WelcomeHeader = ({ username = "User" }: WelcomeHeaderProps) => {
    return (
        <div>
            <h1 className="text-3xl sm:text-4xl lg:mt-10 font-bold font-dm-sans tracking-tight text-[#1E2A5E]">
                Welcome back, {username}
            </h1>
            <p className="text-gray-500 mt-2 text-lg">
                Ready to continue learning?
            </p>
        </div>
    );
};

export default WelcomeHeader;
