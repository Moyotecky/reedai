"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

import { MAIN_NAV_ITEMS } from "@/lib/CONSTANTS";
import NavItem from "./NavItem";
import MobileMenu from "./MobileMenu";

const Header = () => {
    const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const toggleMenu = () => {
        if (isOpenMobileMenu) {
            document.body.style.overflow = "auto";
        } else {
            document.body.style.overflow = "hidden";
        }

        setIsOpenMobileMenu((prevValue) => !prevValue);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div>
            <header
                className={clsx(
                    "fixed w-full z-50 h-16 flex items-center bg-white px-6",
                    scrolled && "border-b border-white-70/20"
                )}>
                {/* Container Div */}
                <div className="w-full flex justify-between items-center">
                    {/* Logo - Left side */}
                    <div className="lg:w-[230px]">
                        <a href="#">
                            <svg
                                width="100"
                                height="30"
                                viewBox="0 0 100 30"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <text x="0" y="22" fontSize="22" fontWeight="bold" fontFamily="sans-serif" fill="#1F2937">
                                    ReedAI
                                </text>
                            </svg>
                        </a>
                    </div>

                    {/* Desktop Navigation - Center */}
                    <div className="flex-1 flex justify-center">
                        <nav
                            className="hidden xl:block"
                            aria-label="Desktop Navigation">
                            <ul className="flex items-center gap-1">
                                {MAIN_NAV_ITEMS?.map((link) => (
                                    <NavItem
                                        key={link.title}
                                        link={link}
                                    />
                                ))}
                            </ul>
                        </nav>
                    </div>

                    {/* CTA/User actions - Right side */}
                    <div className="lg:w-[230px] flex items-center justify-end gap-2 overflow-hidden">
                        <a
                            href="#"
                            className="hidden sm:inline nav-item">
                            Log in
                        </a>
                        <a
                            href="#"
                            className="btn-base btn-blue flex-none">
                            Get Started
                        </a>

                        {/* Mobile menu toggle button */}
                        <button
                            onClick={toggleMenu}
                            className="lg:hidden cursor-pointer">
                            {isOpenMobileMenu ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            <MobileMenu isOpenMobileMenu={isOpenMobileMenu} />
        </div>
    );
};

export default Header;
