import Hero from "@/components/hero/Hero";
import Showcase from "@/components/showcase/Showcase";
import { ShowcaseArticle } from "@/lib/CONSTANTS";

const CREDITS_HERO_COPY = {
    title: "AI Credits",
    subtitle:
        "Flexible usage without subscriptions. ReedAI uses a credit system to access AI tutoring features.",
    cta: [
        { label: "Get Credits", href: "#", variant: "btn-blue" },
    ],
};

const CREDITS_ARTICLES: ShowcaseArticle[] = [
    {
        id: 1,
        icon: "https://placehold.co/96x96/F59E0B/FFF?text=Coin",
        title: "How It Works",
        isNew: false,
        desc: "Credits are used for voice sessions and AI responses. They never expire.",
        href: "#",
    },
    {
        id: 2,
        icon: "https://placehold.co/96x96/2EC4B6/FFF?text=Free",
        title: "No Subscriptions",
        isNew: true,
        desc: "Buy credits when you need them. No monthly fees. Full control.",
        href: "#",
    },
];

export default function CreditsPage() {
    return (
        <main>
            <Hero copy={CREDITS_HERO_COPY} variant="centered" />
            <Showcase
                articles={CREDITS_ARTICLES}
                quote="Pay only for what you learn."
                author="— AI Credits"
            />
        </main>
    );
}
