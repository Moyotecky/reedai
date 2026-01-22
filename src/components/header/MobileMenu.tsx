"use client";

import { useState } from "react";
import clsx from "clsx";
import { MAIN_NAV_ITEMS } from "@/lib/CONSTANTS";
import MobileMenuNavItem from "./MobileMenuNavItem";

interface MobileMenuProps {
    isOpenMobileMenu: boolean;
}

interface DropDownMenuState {
    features: boolean;
    explore: boolean;
    [key: string]: boolean;
}

const MobileMenu = ({ isOpenMobileMenu }: MobileMenuProps) => {
    const NAV_ITEMS = MAIN_NAV_ITEMS.slice(0, MAIN_NAV_ITEMS.length - 1);

    const [dropDownMenuState, setDropDownMenuState] = useState<DropDownMenuState>({
        features: false,
        explore: false,
    });
    const isOpenDropDownMenu = dropDownMenuState.features || dropDownMenuState.explore;

    const toggleDropDownMenu = (title: string) => {
        setDropDownMenuState((prev) => {
            return {
                features: false,
                explore: false,
                [title]: !prev[title],
            };
        });
    };

    return (
        <div
            className={clsx(
                "fixed z-50 inset-x-0 top-16 bottom-32 pt-5 bg-white opacity-0 duration-300 ease-linear",
                isOpenMobileMenu ? "opacity-100 pointer-events-auto" : "pointer-events-none"
            )}>
            <div className={clsx("h-full px-4 pb-10", isOpenDropDownMenu && "overflow-y-auto")}>
                <nav
                    aria-label="Mobile Navigation"
                    className="">
                    <ul className="space-y-1">
                        {NAV_ITEMS?.map((link) => (
                            <MobileMenuNavItem
                                key={link.title}
                                link={link}
                                dropDownMenuState={dropDownMenuState}
                                toggleDropDownMenu={toggleDropDownMenu}
                            />
                        ))}
                    </ul>
                </nav>

                <div className="fixed bottom-0 z-10 inset-x-0 flex flex-col justify-center items-center bg-white px-4 py-0 h-32 space-y-4 border-t border-t-white-70/20">
                    <button className="btn-base btn-blue w-full">Download ReedAI</button>
                    <button className="btn-base btn-ghost w-full">Log in</button>
                </div>
            </div>
        </div>
    );
};

export default MobileMenu;
