import { ChevronDown, ChevronUp } from "lucide-react";
import clsx from "clsx";
import type { NavItem as NavItemType, DropdownSection, NavLink } from "@/lib/CONSTANTS";

interface DropDownMenuState {
    features: boolean;
    explore: boolean;
    [key: string]: boolean;
}

interface MobileMenuNavItemProps {
    link: NavItemType;
    dropDownMenuState: DropDownMenuState;
    toggleDropDownMenu: (title: string) => void;
}

interface DropDownContentProps {
    content: DropdownSection[];
    title: string;
}

interface DropDownContentColumnProps {
    column: DropdownSection;
    title: string;
}

interface DropDownLinkProps {
    link: NavLink;
    heading?: string;
}

const MobileMenuNavItem = ({ link, dropDownMenuState, toggleDropDownMenu }: MobileMenuNavItemProps) => {
    const { title, href, isDropdown, dropdownContent } = link;
    const isOpenDropDownMenu = dropDownMenuState[title.toLowerCase()] || false;
    const shouldChangeNavItemColor = dropDownMenuState.features || dropDownMenuState.explore;

    return (
        <li className="group relative">
            {isDropdown ? (
                <button
                    onClick={() => toggleDropDownMenu(link.title.toLowerCase())}
                    className={clsx(
                        "nav-item py-0 flex items-center gap-2 cursor-pointer",
                        shouldChangeNavItemColor && "text-white-70"
                    )}>
                    <span className="">{title === "Explore" ? "More" : title}</span>
                    <span>
                        {isOpenDropDownMenu ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </span>
                </button>
            ) : (
                <a
                    href={href}
                    className={clsx("nav-item", shouldChangeNavItemColor && "text-white-70")}>
                    <span>{title}</span>
                </a>
            )}

            {/* Dropdown Menu */}
            {isDropdown && dropdownContent && (
                <div
                    className={clsx(
                        "h-0 opacity-0 w-full transition-all duration-300 ease-linear",
                        isOpenDropDownMenu
                            ? "opacity-100 pointer-events-auto h-auto pt-3"
                            : "pointer-events-none"
                    )}>
                    <div
                        className={clsx(
                            "translate-y-[-10px] bg-white px-2 transition-all duration-700 ease-linear",
                            isOpenDropDownMenu && "translate-y-[5px]"
                        )}>
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

export default MobileMenuNavItem;

/* 
====================================
<--------- Sub Components --------->
====================================
*/

// Content is an array of object and each object is a column of links
const DropDownContent = ({ content, title }: DropDownContentProps) => {
    return (
        <div className="pb-2">
            <div className={clsx("flex flex-col gap-0")}>
                {content?.map((column) => (
                    <DropDownContentColumn
                        key={column.id}
                        column={column}
                        title={title}
                    />
                ))}
            </div>
        </div>
    );
};

const DropDownContentColumn = ({ column, title }: DropDownContentColumnProps) => {
    const { heading } = column;
    let links = column.links;
    if (column.id === 3) {
        links = links.filter((item) => item.title !== "Download web clipper");
    }

    return (
        <div className="">
            {title === "Explore" && heading && <h2 className="ps-2 text-white-70">{heading}</h2>}

            <ul className="space-y-0">
                {links?.map((link) => (
                    <DropDownLink
                        key={link.title}
                        link={link}
                        heading={heading}
                    />
                ))}
            </ul>

            {title === "Features" && column.id === 2 && (
                <hr className="border-white-70/30 inline-block w-full mx-2" />
            )}
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
                    "flex flex-col ps-2 py-1 rounded-lg tracking-tighter group/child",
                    isSmalLinkSize ? "" : "text-lg"
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
