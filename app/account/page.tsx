import Hero from "@/components/hero/Hero";
import Showcase from "@/components/showcase/Showcase";
import { ShowcaseArticle } from "@/lib/CONSTANTS";

const ACCOUNT_HERO_COPY = {
    title: "Your Account",
    subtitle:
        "Manage your learning journey, track your progress, and customize your experience.",
    cta: [
        { label: "Log In", href: "#", variant: "btn-blue" },
        { label: "Sign Up", href: "#", variant: "btn-ghost" },
    ],
};

const ACCOUNT_ARTICLES: ShowcaseArticle[] = [
    {
        id: 1,
        icon: "https://placehold.co/96x96/1E2A5E/FFF?text=Dash",
        title: "Dashboard",
        isNew: false,
        desc: "Track credits, view notebooks, summaries, and see your call history.",
        href: "#",
    },
    {
        id: 2,
        icon: "https://placehold.co/96x96/6366F1/FFF?text=Safe",
        title: "Privacy",
        isNew: true,
        desc: "Participate in the community or keep things private. Your data stays secure.",
        href: "#",
    },
];

export default function AccountPage() {
    return (
        <main>
            <Hero copy={ACCOUNT_HERO_COPY} variant="centered" />
            <Showcase
                articles={ACCOUNT_ARTICLES}
                quote="Your data stays private and secure."
                author="— Account Security"
            />
        </main>
    );
}
