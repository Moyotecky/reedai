import { ChevronDown, ChevronUp } from "lucide-react";
import clsx from "clsx";
import type { NavItem as NavItemType, DropdownSection, NavLink } from "@/lib/CONSTANTS";

interface NavItemProps {
    link: NavItemType;
}

interface DropDownContentProps {
    content: DropdownSection[];
    title: string;
}

interface DropDownContentColumnProps {
    column: DropdownSection;
}

interface DropDownLinkProps {
    link: NavLink;
    heading?: string;
}

const NavItem = ({ link }: NavItemProps) => {
    const { title, href, isDropdown, dropdownContent } = link;

    return (
        <li className="group relative">
            {isDropdown ? (
                <button className="nav-item flex items-center gap-2 cursor-pointer">
                    <span>{title}</span>
                    <span>
                        <span className="group-hover:hidden">
                            <ChevronDown size={14} />
                        </span>
                        <span className="hidden group-hover:inline">
                            <ChevronUp size={14} />
                        </span>
                    </span>
                </button>
            ) : (
                <a
                    href={href}
                    className="nav-item">
                    <span>{title}</span>
                </a>
            )}

            {/* Dropdown Menu */}
            {isDropdown && dropdownContent && (
                <div className="opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto absolute inset-x-0 top-full w-full pt-2 transition-all duration-300 ease-linear">
                    <div className="translate-y-[-16px] group-hover:translate-y-0 fixed inset-x-0 bg-white px-20 py-4 shadow shadow-black/10 transition-all duration-300 ease-linear">
                        <DropDownContent
                            content={dropdownContent}
                            title={title}
                        />
                    </div>
                </div>
            )}
        </li>
    );
};

export default NavItem;

/* 
====================================
<--------- Sub Components --------->
====================================
*/

// Content is an array of object and each object is a column of links
const DropDownContent = ({ content, title }: DropDownContentProps) => {
    return (
        <div className="">
            <div className={clsx("grid gap-16", content.length === 3 ? "grid-cols-3" : "grid-cols-4")}>
                {content?.map((column) => (
                    <DropDownContentColumn
                        key={column.id}
                        column={column}
                    />
                ))}
            </div>

            {title === "Notion" && (
                <div className="w-2/3 flex justify-between gap-8 ms-2 mt-8 px-6 py-8 bg-white-60 rounded-lg">
                    <div className="flex flex-col justify-between">
                        <p className="text-lg font-medium">
                            Try the Notion desktop app for a faster experience
                        </p>

                        <a
                            href="#"
                            className="btn-base btn-blue px-24">
                            Download app
                        </a>
                    </div>

                    <div className="w-[60%]">
                        <img
                            src="/images/download-app.png"
                            alt=""
                            className="w-1/2 mx-auto"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

const DropDownContentColumn = ({ column }: DropDownContentColumnProps) => {
    const { heading, links } = column;

    return (
        <div className="">
            {heading && <h2 className="ps-2 text-white-70">{heading}</h2>}

            <ul className="mt-4 space-y-0">
                {links?.map((link) => (
                    <DropDownLink
                        key={link.title}
                        link={link}
                        heading={heading}
                    />
                ))}
            </ul>
        </div>
    );
};

const DropDownLink = ({ link, heading }: DropDownLinkProps) => {
    const { title, description, href, isNew } = link;
    const isSmalLinkSize = ["Get started", "Learn", "Build"].includes(heading || "");

    return (
        <li className="">
            <a
                href={href}
                className={clsx(
                    "flex flex-col ps-2 py-1 rounded-lg hover:bg-white-60 tracking-tighter group/child",
                    isSmalLinkSize ? "" : "text-2xl"
                )}>
                <p className="space-x-2">
                    <span className="font-medium">{title}</span>
                    {isNew && (
                        <span className="text-sm font-medium rounded-3xl px-2 py-0 bg-blue-100/65 text-blue-60 group-hover/child:bg-white">
                            New
                        </span>
                    )}
                </p>
                <span className="text-white-70 text-sm">{description}</span>
            </a>
        </li>
    );
};
