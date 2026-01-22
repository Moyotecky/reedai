import { FOOTER_LINK_COLUMNS } from "@/lib/CONSTANTS";
import NotionIcon from "./NotionIcon";
import LinkColumn from "./LinkColumn";
import SOCIALS from "./SOCIALS";

const Footer = () => {
    return (
        <footer className="border-t border-black/10 mt-20 lg:mt-28 py-20">
            <div className="section-container grid grid-cols-1 lg:grid-cols-5 gap-10 lg:items-start">
                {/* First Column */}
                <div className="">
                    <div className="space-y-6">
                        <a
                            href="#"
                            className="inline-block">
                            <NotionIcon />
                        </a>

                        <ul className="flex items-center gap-1">
                            {SOCIALS?.map((social) => (
                                <li
                                    key={social.label}
                                    className="">
                                    <a
                                        href={social.href}
                                        className="text-white-70 inline-block p-2 rounded-lg hover:bg-black/20 hover:text-black">
                                        {social.icon}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-16 space-y-2">
                        <select
                            className="inline-block p-2 rounded-md border border-black/30 hover:bg-white-40 cursor-pointer"
                            name=""
                            id="">
                            <option value="">English</option>
                            <option value="">Bangla</option>
                            <option value="">Urdhu</option>
                        </select>
                        <p className="text-white-70 text-sm">
                            We do not sell or share your personal information. Cookie settings.
                        </p>
                        <p className="text-white-70 text-sm">© 2026 ReedAI, Inc.</p>
                    </div>
                </div>

                {/* Footer Navigation */}
                <nav
                    aria-label="footer navigation"
                    className="col-span-4 grid grid-cols-2 lg:grid-cols-4 gap-10">
                    {FOOTER_LINK_COLUMNS?.map((column) => (
                        <LinkColumn
                            key={column.title}
                            column={column}
                        />
                    ))}
                </nav>
            </div>
        </footer>
    );
};

export default Footer;
