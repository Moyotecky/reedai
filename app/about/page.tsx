import Hero from "@/components/hero/Hero";
import Showcase from "@/components/showcase/Showcase";
import { ShowcaseArticle } from "@/lib/CONSTANTS";

const ABOUT_HERO_COPY = {
    title: "What is ReedAI?",
    subtitle:
        "ReedAI is a voice-first AI tutoring platform built to help students understand their courses by talking things through. Instead of passive videos or endless reading, ReedAI encourages active learning through natural conversation.",
    cta: [
        { label: "Start Learning", href: "#", variant: "btn-blue" },
        { label: "Our Philosophy", href: "#philosophy", variant: "btn-ghost" },
    ],
};

const ABOUT_ARTICLES: ShowcaseArticle[] = [
    {
        id: 1,
        icon: "https://placehold.co/96x96/1E2A5E/FFF?text=Why",
        title: "Why ReedAI Exists",
        isNew: false,
        desc: "Many students struggle not because they don’t study, but because they don’t fully understand. We give space to ask freely.",
        href: "#",
    },
    {
        id: 2,
        icon: "https://placehold.co/96x96/2EC4B6/FFF?text=How",
        title: "How It Works",
        isNew: true,
        desc: "Upload notes, talk to ReedAI, and get personalized explanations. We track your learning automatically.",
        href: "#",
    },
    {
        id: 3,
        icon: "https://placehold.co/96x96/F59E0B/FFF?text=Who",
        title: "Who Is It For",
        isNew: false,
        desc: "University students, exam-focused learners, and anyone who wants clarity without the content overload.",
        href: "#",
    },
    {
        id: 4,
        icon: "https://placehold.co/96x96/6366F1/FFF?text=Philosophy",
        title: "Our Philosophy",
        isNew: false,
        desc: "Learning should be calm. Understanding matters more than memorization. Technology should support, not overwhelm.",
        href: "#",
    },
];

export default function AboutPage() {
    return (
        <main>
            <Hero copy={ABOUT_HERO_COPY} variant="centered" />
            <Showcase
                articles={ABOUT_ARTICLES}
                quote="Learning should feel calm, not stressful."
                author="— Our Philosophy"
            />
        </main>
    );
}
