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
    coverImg: string;
    coverImgSm?: string;
    gif: string;
    bgColor: string;
    borderColor: string;
    href: string;
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
                        href: "#",
                    },
                    {
                        title: "Chat Tutor",
                        description: "Text-based quick help",
                        href: "#",
                    },
                    {
                        title: "File Uploads",
                        description: "Past questions & notes",
                        href: "#",
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
                        href: "#",
                    },
                    {
                        title: "Study Plan",
                        description: "What to revise next",
                        href: "#",
                    },
                    {
                        title: "Exam Prep",
                        description: "Focused practice mode",
                        href: "#",
                    },
                ],
            },
        ],
    },
    {
        title: "Tutor Styles",
        href: "#",
    },
    {
        title: "Community",
        href: "#",
    },
    {
        title: "Pricing",
        href: "#",
    },
    {
        title: "Download",
        href: "#",
    },
    {
        title: "Start Learning",
        href: "#",
        isButton: true,
    },
];

export const TRUSTED_COMPANIES: TrustedCompany[] = [
    {
        name: "Harvard",
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Harvard_University_shield.png/1200px-Harvard_University_shield.png", // Placeholder or generic university logos would be better if available
    },
    {
        name: "MIT",
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/2560px-MIT_logo.svg.png",
    },
    {
        name: "Stanford",
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Stanford_Cardinal_logo.svg/1200px-Stanford_Cardinal_logo.svg.png",
    },
    {
        name: "Oxford",
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Oxford-University-Circlet.svg/1200px-Oxford-University-Circlet.svg.png",
    },
];

export const SHOWCASE_ARTICLES: ShowcaseArticle[] = [
    {
        id: 1,
        icon: "https://www.notion.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fspoqsaf9291f%2F2RmBatRiqNZT7mu44Qoifl%2F6a834087f3d0a018fa5b14a5bae00582%2Fai-meeting-notes-icon.png&w=96&q=75", // Keeping generic icon for now
        title: "Voice Tutor",
        isNew: true,
        desc: "Explain it like I'm 5.",
        coverImg:
            "https://www.notion.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fspoqsaf9291f%2F4zmmc2Sts2j750iWG4cz9C%2Ff9fc4a58dea5be6e42777a8637684765%2Fbento_1.en-US.png&w=3840&q=75", // Placeholder
        gif: "https://www.notion.com/front-static/nosey/bento/noseyWriting.gif",
        bgColor: "bg-sky-50",
        borderColor: "hover:border-blue-200",
        href: "#",
    },
    {
        id: 2,
        icon: "https://www.notion.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fspoqsaf9291f%2F4Jnz1LdPqjujdW77jmtWTh%2Fa055aeb5baa46435d5db493456991bff%2Ficon_bento_search.png&w=96&q=75",
        title: "File Uploads",
        isNew: true,
        desc: "Upload past questions.",
        coverImg:
            "https://www.notion.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fspoqsaf9291f%2F2ZvcfZ5FYoh5mWSzqBAoqI%2F0fc610cde8307c2707c679304bf55589%2F30222&w=3840&q=75",
        gif: "https://www.notion.com/front-static/nosey/bento/noseyWriting.gif",
        bgColor: "bg-teal-50",
        borderColor: "hover:border-teal-200",
        href: "#",
    },
    {
        id: 3,
        icon: "https://www.notion.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fspoqsaf9291f%2F1vDd1Xq1bijUBXwf3p33RL%2F70cae92019d022cc26708127829459ae%2Ficon_bento_projects.png&w=96&q=75",
        title: "Study Plan",
        isNew: false,
        desc: "Know what to study next.",
        coverImg:
            "https://www.notion.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fspoqsaf9291f%2FsBvJS45PQCJBRR1hfIZH6%2F89c2b8066e8e52ef45c433294d6d0af9%2Fbento_3.en-US.png&w=3840&q=75",
        coverImgSm:
            "https://www.notion.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fspoqsaf9291f%2F4koJ8tLvPFOdNRQP3y7UG0%2Fde0cbd1c1fbc45788d26c9b5f9a4c34b%2Fbento_3_mobile.en-US.png&w=3840&q=75",
        gif: "https://www.notion.com/front-static/nosey/bento/noseyWriting.gif",
        bgColor: "bg-orange-50",
        borderColor: "hover:border-orange-200",
        href: "#",
    },
    {
        id: 4,
        icon: "https://www.notion.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fspoqsaf9291f%2F3ZUI2YU0fvfX5iqzaO6vy5%2F116f6227f7a97a126cac46377c0b6ea2%2Ficon_bento_mail.png&w=96&q=75",
        title: "Chat Tutor",
        isNew: true,
        desc: "Text-based guidance.",
        coverImg:
            "https://www.notion.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fspoqsaf9291f%2F3WUVrdpc8WmnGJooDLXPR7%2F58a35d526f463c4a492a8119c1b652b8%2Fbento_4.en-US.png&w=3840&q=75",
        gif: "https://www.notion.com/front-static/nosey/bento/noseyWriting.gif",
        bgColor: "bg-indigo-50",
        borderColor: "hover:border-indigo-200",
        href: "#",
    },
    {
        id: 5,
        icon: "https://www.notion.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fspoqsaf9291f%2F7x3FVMsVsqlTTYDAC8PEpD%2F3a305e02cf4577a6d7b2acf0b979bb66%2Ficon_bento_templates.png&w=96&q=75",
        title: "Notebooks",
        isNew: false,
        desc: "Notes written for you.",
        coverImg:
            "https://www.notion.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fspoqsaf9291f%2F4m5lpqe7uGKqVeCbxJTzs8%2Fe55e27db18bf03aa6b431f6797219894%2Fbento_5.en-US.png&w=3840&q=75",
        gif: "https://www.notion.com/front-static/nosey/bento/noseyWriting.gif",
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
        imageSm:
            "https://images.ctfassets.net/spoqsaf9291f/1qg1xJT2WrTLhvT4y48Bee/de811cf8548b6041552721be3df5b767/product_mobile.en-US.png",
        imageLg:
            "https://images.ctfassets.net/spoqsaf9291f/5FOEEkHXxB4F3hQrZLWZ8G/19d5ecb4cbfc5922564e7ba1fca72a3f/product.en-US.png",
        bgColor: "bg-sky-50",
    },
    {
        title: "Exam-Focused",
        imageSm:
            "https://images.ctfassets.net/spoqsaf9291f/63GeWhwARchHSKZOmlzNnz/bc6fa5bfe56f5695f2e221bbe76770b8/engineering_mobile.en-US.png",
        imageLg:
            "https://images.ctfassets.net/spoqsaf9291f/3uWfsJnlpCimdqcYJVszKt/1b0dbe85435e11fcc4ab85ab1e580603/engineering.en-US.png",
        bgColor: "bg-rose-50",
    },
    {
        title: "Revision",
        imageSm:
            "https://images.ctfassets.net/spoqsaf9291f/6vZtvmpVrMu9iJSZzGay9u/b8fb6d9418a763c0cdd35a8f3b05b3b4/design_mobile.en-US.png",
        imageLg:
            "https://images.ctfassets.net/spoqsaf9291f/18gxMna3Gsoy0MXIciuwcm/4432a321b521d1f8dfc97732b7645562/design.en-US.png",
        bgColor: "bg-cyan-50",
    },
    {
        title: "Practice",
        imageSm:
            "https://images.ctfassets.net/spoqsaf9291f/710fTKrV2CFME0yyRYOFzR/1b6c7c596971c3d14d13be0683afe459/it_mobile.en-US.png",
        imageLg:
            "https://images.ctfassets.net/spoqsaf9291f/N3cXw71SPLzvRZotzDIJK/cddf7d316085de46387b959f51becbed/it.en-US.png",
        bgColor: "bg-orange-50",
    },
];

export const CLIENT_STORIES: ClientStory[] = [
    {
        company: "Computer Science Student",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Apple_logo_grey.svg/172px-Apple_logo_grey.svg.png", // Generic logo
        quote: '"I used to just memorize code. ReedAI explained the logic until I actually understood it."',
        href: "#",
    },
    {
        company: "Med Student",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Churchill_College_Crest.svg/1200px-Churchill_College_Crest.svg.png",
        quote: '"The voice tutor is a lifesaver for late-night revision without straining my eyes."',
        href: "#",
    },
    {
        company: "Law Student",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1869px-Python-logo-notext.svg.png",
        quote: '"Uploading my case notes and having ReedAI quiz me on them changed my grades completely."',
        href: "#",
    },
    {
        company: "Engineering Student",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/800px-JavaScript-logo.png",
        quote: '"It feels like a real tutor. I can interrupt and ask \'wait, why?\' and it actually explains."',
        href: "#",
    }
];

export const INTEGRATIONS: Integration[] = [
    {
        name: "PDF Upload",
        icon_url: "https://cdn-icons-png.flaticon.com/512/337/337946.png",
        status: "Available",
    },
    {
        name: "Voice Notes",
        icon_url: "https://cdn-icons-png.flaticon.com/512/3756/3756627.png",
        status: "Available",
    },
    {
        name: "Past Questions",
        icon_url: "https://cdn-icons-png.flaticon.com/512/29/29302.png",
        status: "Available",
    },
    {
        name: "Lecture Slides",
        icon_url: "https://cdn-icons-png.flaticon.com/512/337/337953.png",
        status: "Available",
    },
];

export const PRODUCTS: Product[] = [
    {
        title: "ReedAI Mobile",
        desc: "Tutor in your pocket.",
        icon: "NotionMail", // Reusing icon for now
        href: "#",
        images: {
            srcSet:
                "https://www.notion.com/_next/image?url=%2Ffront-static%2Fdownloads%2Fmail%2Fen-US.png&w=384&q=75 1x, https://www.notion.com/_next/image?url=%2Ffront-static%2Fdownloads%2Fmail%2Fen-US.png&w=640&q=75 2x", // Placeholder
            src: "https://www.notion.com/_next/image?url=%2Ffront-static%2Fdownloads%2Fmail%2Fen-US.png&w=640&q=75",
        },
    },
    {
        title: "ReedAI Desktop",
        desc: "Focused study session.",
        icon: "NotionCalender", // Reusing icon for now
        href: "#",
        images: {
            srcSet:
                "https://www.notion.com/_next/image?url=%2Ffront-static%2Fdownloads%2Fcalendar%2Fen-US.png&w=384&q=75 1x, https://www.notion.com/_next/image?url=%2Ffront-static%2Fdownloads%2Fcalendar%2Fen-US.png&w=640&q=75 2x", // Placeholder
            src: "https://www.notion.com/_next/image?url=%2Ffront-static%2Fdownloads%2Fcalendar%2Fen-US.png&w=640&q=75",
        },
    },
];

const PREFIX = "https://www.reedai.com"; // Updated domain placeholder

export const FOOTER_LINK_COLUMNS: FooterLinkColumn[] = [
    {
        title: "Company",
        links: [
            { text: "About ReedAI", href: `#` },
            { text: "Careers", href: `#` },
            { text: "Security", href: `#` },
            { text: "Terms & Privacy", href: `#` },
        ],
    },
    {
        title: "Download",
        links: [
            { text: "iOS & Android", href: `#` },
            { text: "Mac & Windows", href: `#` },
        ],
    },
    {
        title: "Resources",
        links: [
            { text: "Help Center", href: `#` },
            { text: "Pricing", href: `#` },
            { text: "Blog", href: `#` },
            { text: "Community", href: `#` },
        ],
    },
    {
        title: "Study",
        isLastColumn: true,
        links: [
            { text: "For Students", href: `#` },
            { text: "For Teachers", href: `#` },
            { text: "Exam Prep", href: `#` },
            { text: "Start Learning →", href: `#` },
        ],
    },
];
