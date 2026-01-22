// Navigation Types
export interface NavLink {
    title: string;
    description?: string;
    href?: string;
    isNew?: boolean;
}

export interface DropdownSection {
    id: number;
    heading?: string;
    links: NavLink[];
}

export interface NavItem {
    title: string;
    href?: string;
    isDropdown?: boolean;
    isButton?: boolean;
    dropdownContent?: DropdownSection[];
}

// Company Types
export interface TrustedCompany {
    name: string;
    url: string;
}

// Showcase Types
export interface ShowcaseArticle {
    id: number;
    icon: string;
    title: string;
    isNew: boolean;
    desc: string;
    coverImg?: string;
    coverImgSm?: string;
    gif?: string;
    bgColor?: string;
    borderColor?: string;
    href?: string;
}

// Carousel Types
export interface CarouselTabContent {
    title: string;
    imageSm: string;
    imageLg: string;
    bgColor: string;
}

// Client Story Types
export interface ClientStory {
    company: string;
    logo: string;
    quote: string;
    href: string;
}

// Integration Types
export interface Integration {
    name: string;
    icon_url: string;
    status: "Available" | "Coming soon";
}

// Product Types
export interface ProductImages {
    srcSet: string;
    src: string;
}

export interface Product {
    title: string;
    desc: string;
    icon: string;
    href: string;
    images: ProductImages;
}

// Footer Types
export interface FooterLink {
    text: string;
    href: string;
}

export interface FooterLinkColumn {
    title: string;
    isLastColumn?: boolean;
    links: FooterLink[];
}

// Data Exports
export const MAIN_NAV_ITEMS: NavItem[] = [
    {
        title: "Features",
        isDropdown: true,
        dropdownContent: [
            {
                id: 1,
                heading: "Core Experience",
                links: [
                    {
                        title: "Voice Tutor",
                        description: "Talk to learn naturally",
                        href: "/about",
                    },
                    {
                        title: "Chat Tutor",
                        description: "Text-based quick help",
                        href: "/tasks",
                    },
                    {
                        title: "File Uploads",
                        description: "Past questions & notes",
                        href: "/uploads",
                    },
                ],
            },
            {
                id: 2,
                heading: "Study Tools",
                links: [
                    {
                        title: "Notebooks",
                        isNew: true,
                        description: "Auto-generated summaries",
                        href: "/notebooks",
                    },
                    {
                        title: "Study Plan",
                        description: "What to revise next",
                        href: "/tasks",
                    },
                    {
                        title: "Exam Prep",
                        description: "Focused practice mode",
                        href: "/credits",
                    },
                ],
            },
        ],
    },
    {
        title: "Tutor Styles",
        href: "/about",
    },
    {
        title: "Community",
        href: "/community",
    },
    {
        title: "Pricing",
        href: "/credits",
    },
    {
        title: "Download",
        href: "/auth/login",
    },
    {
        title: "Start Learning",
        href: "/auth/signup",
        isButton: true,
    },
];

export const TRUSTED_COMPANIES: TrustedCompany[] = [
    {
        name: "Harvard",
        url: "https://placehold.co/200x80/transparent/1F2937?text=Harvard",
    },
    {
        name: "MIT",
        url: "https://placehold.co/200x80/transparent/1F2937?text=MIT",
    },
    {
        name: "Stanford",
        url: "https://placehold.co/200x80/transparent/1F2937?text=Stanford",
    },
    {
        name: "Oxford",
        url: "https://placehold.co/200x80/transparent/1F2937?text=Oxford",
    },
];

export const SHOWCASE_ARTICLES: ShowcaseArticle[] = [
    {
        id: 1,
        icon: "https://placehold.co/96x96/1E2A5E/FFF?text=Voice",
        title: "Voice Tutor",
        isNew: true,
        desc: "Explain it like I'm 5.",
        coverImg: "https://placehold.co/600x400/1E2A5E/FFF?text=Voice+Tutor+Preview",
        gif: "https://placehold.co/600x400/EEE/333?text=Voice+Animation", // Static placeholder for GIF
        bgColor: "bg-sky-50",
        borderColor: "hover:border-blue-200",
        href: "#",
    },
    {
        id: 2,
        icon: "https://placehold.co/96x96/2EC4B6/FFF?text=File",
        title: "File Uploads",
        isNew: true,
        desc: "Upload past questions.",
        coverImg: "https://placehold.co/600x400/2EC4B6/FFF?text=File+Uploads+Preview",
        gif: "https://placehold.co/600x400/EEE/333?text=Upload+Animation",
        bgColor: "bg-teal-50",
        borderColor: "hover:border-teal-200",
        href: "#",
    },
    {
        id: 3,
        icon: "https://placehold.co/96x96/F59E0B/FFF?text=Plan",
        title: "Study Plan",
        isNew: false,
        desc: "Know what to study next.",
        coverImg: "https://placehold.co/600x400/F59E0B/FFF?text=Study+Plan+Preview",
        coverImgSm: "https://placehold.co/300x200/F59E0B/FFF?text=Study+Plan+Mobile",
        gif: "https://placehold.co/600x400/EEE/333?text=Plan+Animation",
        bgColor: "bg-orange-50",
        borderColor: "hover:border-orange-200",
        href: "#",
    },
    {
        id: 4,
        icon: "https://placehold.co/96x96/6366F1/FFF?text=Chat",
        title: "Chat Tutor",
        isNew: true,
        desc: "Text-based guidance.",
        coverImg: "https://placehold.co/600x400/6366F1/FFF?text=Chat+Tutor+Preview",
        gif: "https://placehold.co/600x400/EEE/333?text=Chat+Animation",
        bgColor: "bg-indigo-50",
        borderColor: "hover:border-indigo-200",
        href: "#",
    },
    {
        id: 5,
        icon: "https://placehold.co/96x96/E11D48/FFF?text=Notes",
        title: "Notebooks",
        isNew: false,
        desc: "Notes written for you.",
        coverImg: "https://placehold.co/600x400/E11D48/FFF?text=Notebooks+Preview",
        gif: "https://placehold.co/600x400/EEE/333?text=Notes+Animation",
        bgColor: "bg-rose-50",
        borderColor: "hover:border-rose-200",
        href: "#",
    },
];

export const CAROUSEL_TABS: string[] = [
    "Beginner",
    "Exam-Focused",
    "Revision",
    "Practice",
];

export const CAROUSEL_TAB_CONTENTS: CarouselTabContent[] = [
    {
        title: "Beginner",
        imageSm: "https://placehold.co/300x200/1E2A5E/FFF?text=Beginner+Mobile",
        imageLg: "https://placehold.co/800x500/1E2A5E/FFF?text=Beginner+Mode+Preview",
        bgColor: "bg-sky-50",
    },
    {
        title: "Exam-Focused",
        imageSm: "https://placehold.co/300x200/2EC4B6/FFF?text=Exam+Mobile",
        imageLg: "https://placehold.co/800x500/2EC4B6/FFF?text=Exam+Mode+Preview",
        bgColor: "bg-rose-50",
    },
    {
        title: "Revision",
        imageSm: "https://placehold.co/300x200/F59E0B/FFF?text=Revision+Mobile",
        imageLg: "https://placehold.co/800x500/F59E0B/FFF?text=Revision+Mode+Preview",
        bgColor: "bg-cyan-50",
    },
    {
        title: "Practice",
        imageSm: "https://placehold.co/300x200/E11D48/FFF?text=Practice+Mobile",
        imageLg: "https://placehold.co/800x500/E11D48/FFF?text=Practice+Mode+Preview",
        bgColor: "bg-orange-50",
    },
];

export const CLIENT_STORIES: ClientStory[] = [
    {
        company: "Computer Science Student",
        logo: "https://placehold.co/48x48/1F2937/FFF?text=CS",
        quote: '"I used to just memorize code. ReedAI explained the logic until I actually understood it."',
        href: "#",
    },
    {
        company: "Med Student",
        logo: "https://placehold.co/48x48/2EC4B6/FFF?text=Med",
        quote: '"The voice tutor is a lifesaver for late-night revision without straining my eyes."',
        href: "#",
    },
    {
        company: "Law Student",
        logo: "https://placehold.co/48x48/1E2A5E/FFF?text=Law",
        quote: '"Uploading my case notes and having ReedAI quiz me on them changed my grades completely."',
        href: "#",
    },
    {
        company: "Engineering Student",
        logo: "https://placehold.co/48x48/E11D48/FFF?text=Eng",
        quote: '"It feels like a real tutor. I can interrupt and ask \'wait, why?\' and it actually explains."',
        href: "#",
    }
];

export const INTEGRATIONS: Integration[] = [
    {
        name: "PDF Upload",
        icon_url: "https://placehold.co/48x48/transparent/1F2937?text=PDF",
        status: "Available",
    },
    {
        name: "Voice Notes",
        icon_url: "https://placehold.co/48x48/transparent/1F2937?text=Mic",
        status: "Available",
    },
    {
        name: "Past Questions",
        icon_url: "https://placehold.co/48x48/transparent/1F2937?text=Q%26A",
        status: "Available",
    },
    {
        name: "Lecture Slides",
        icon_url: "https://placehold.co/48x48/transparent/1F2937?text=PPT",
        status: "Available",
    },
];

export const PRODUCTS: Product[] = [
    {
        title: "ReedAI Mobile",
        desc: "Tutor in your pocket.",
        icon: "NotionMail",
        href: "#",
        images: {
            srcSet: "https://placehold.co/384x240/1E2A5E/FFF?text=App+Mobile 1x, https://placehold.co/640x400/1E2A5E/FFF?text=App+Mobile 2x",
            src: "https://placehold.co/640x400/1E2A5E/FFF?text=App+Mobile",
        },
    },
    {
        title: "ReedAI Desktop",
        desc: "Focused study session.",
        icon: "NotionCalender",
        href: "#",
        images: {
            srcSet: "https://placehold.co/384x240/2EC4B6/FFF?text=App+Desktop 1x, https://placehold.co/640x400/2EC4B6/FFF?text=App+Desktop 2x",
            src: "https://placehold.co/640x400/2EC4B6/FFF?text=App+Desktop",
        },
    },
];

const PREFIX = "https://www.reedai.com"; // Updated domain placeholder

export const FOOTER_LINK_COLUMNS: FooterLinkColumn[] = [
    {
        title: "Company",
        links: [
            { text: "About ReedAI", href: `/about` },
            { text: "Careers", href: `#` },
            { text: "Security", href: `/account` },
            { text: "Terms & Privacy", href: `/account` },
        ],
    },
    {
        title: "Download",
        links: [
            { text: "iOS & Android", href: `/uploads` },
            { text: "Mac & Windows", href: `/uploads` },
        ],
    },
    {
        title: "Resources",
        links: [
            { text: "Help Center", href: `/community` },
            { text: "Pricing", href: `/credits` },
            { text: "Blog", href: `/community` },
            { text: "Community", href: `/community` },
        ],
    },
    {
        title: "Study",
        isLastColumn: true,
        links: [
            { text: "For Students", href: `/about` },
            { text: "For Teachers", href: `/about` },
            { text: "Exam Prep", href: `/tasks` },
            { text: "Start Learning →", href: `/about` },
        ],
    },
];
