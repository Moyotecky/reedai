import Hero from "@/components/hero/Hero";
import Showcase from "@/components/showcase/Showcase";
import { ShowcaseArticle } from "@/lib/CONSTANTS";

const COMMUNITY_HERO_COPY = {
    title: "The ReedAI Community",
    subtitle:
        "A focused academic space where students help each other learn. It is not a social network — it’s a study board.",
    cta: [
        { label: "Join Community", href: "#", variant: "btn-blue" },
        { label: "Read Guidelines", href: "#guidelines", variant: "btn-ghost" },
    ],
};

const COMMUNITY_ARTICLES: ShowcaseArticle[] = [
    {
        id: 1,
        icon: "https://placehold.co/96x96/1E2A5E/FFF?text=Do",
        title: "What You Can Do",
        isNew: true,
        desc: "Ask questions, share exam tips, discuss past questions, and help others explain concepts.",
        href: "#",
    },
    {
        id: 2,
        icon: "https://placehold.co/96x96/E11D48/FFF?text=Not",
        title: "What It Is Not",
        isNew: false,
        desc: "Not a chat room. Not for memes. Not for followers. The goal is shared understanding, not attention.",
        href: "#",
    },
    {
        id: 3,
        icon: "https://placehold.co/96x96/2EC4B6/FFF?text=Rules",
        title: "Guidelines",
        isNew: false,
        desc: "Stay academic. Be respectful. No spam. Help when you can, ask when you need.",
        href: "#",
    },
];

export default function CommunityPage() {
    return (
        <main>
            <Hero copy={COMMUNITY_HERO_COPY} variant="centered" />
            <Showcase
                articles={COMMUNITY_ARTICLES}
                quote="The goal is shared understanding, not attention."
                author="— Community Guidelines"
            />
        </main>
    );
}
