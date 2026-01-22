import Hero from "@/components/hero/Hero";
import Showcase from "@/components/showcase/Showcase";
import { ShowcaseArticle } from "@/lib/CONSTANTS";

const NOTEBOOKS_HERO_COPY = {
    title: "Smart Notebooks",
    subtitle:
        "AI-generated study notes created automatically as you use ReedAI. Never lose track of a definition again.",
    cta: [
        { label: "View Notebooks", href: "#", variant: "btn-blue" },
        { label: "How it works", href: "#", variant: "btn-ghost" },
    ],
};

const NOTEBOOKS_ARTICLES: ShowcaseArticle[] = [
    {
        id: 1,
        icon: "https://placehold.co/96x96/F59E0B/FFF?text=Content",
        title: "What's Inside",
        isNew: true,
        desc: "Definitions, core explanations, exam tips, mistakes to avoid, and summaries.",
        href: "#",
    },
    {
        id: 2,
        icon: "https://placehold.co/96x96/6366F1/FFF?text=Auto",
        title: "Automatic",
        isNew: false,
        desc: "You don’t need to write notes manually — ReedAI keeps track for you during every session.",
        href: "#",
    },
];

export default function NotebooksPage() {
    return (
        <main>
            <Hero copy={NOTEBOOKS_HERO_COPY} variant="centered" />
            <Showcase
                articles={NOTEBOOKS_ARTICLES}
                quote="AI that writes the notes while you focus on learning."
                author="— Smart Notebooks"
            />
        </main>
    );
}
