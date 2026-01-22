import { TRUSTED_COMPANIES } from "@/lib/CONSTANTS";

const TrustedCompanyLogos = () => (
    <div className="mt-10 lg:mt-16 flex flex-col items-center gap-3 lg:flex-row lg:justify-between">
        <p className="text-white-70">Trusted by top teams</p>
        <div className="lg:flex-1 flex justify-center items-center flex-wrap gap-x-6 gap-y-2 lg:justify-end lg:gap-16">
            {TRUSTED_COMPANIES?.map((company) => (
                <img
                    key={company.name}
                    src={company.url}
                    alt={`${company.name} logo`}
                    className="w-20"
                />
            ))}
        </div>
    </div>
);

export default TrustedCompanyLogos;
