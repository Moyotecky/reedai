import Hero from "@/components/hero/Hero";
import Showcase from "@/components/showcase/Showcase";
import { ShowcaseArticle } from "@/lib/CONSTANTS";

const UPLOADS_HERO_COPY = {
    title: "Knowledge Library",
    subtitle:
        "Upload your course materials so ReedAI can learn specifically what you need to know.",
    cta: [
        { label: "Upload File", href: "#", variant: "btn-blue" },
    ],
};

const UPLOADS_ARTICLES: ShowcaseArticle[] = [
    {
        id: 1,
        icon: "https://placehold.co/96x96/E11D48/FFF?text=Files",
        title: "What You Can Upload",
        isNew: true,
        desc: "Past questions, lecture notes, study materials, and PDFs.",
        href: "#",
    },
    {
        id: 2,
        icon: "https://placehold.co/96x96/6366F1/FFF?text=Smart",
        title: "Smart Analysis",
        isNew: false,
        desc: "ReedAI analyzes your uploads to give more relevant explanations during your tutoring sessions.",
        href: "#",
    },
];

export default function UploadsPage() {
    return (
        <main>
            <Hero copy={UPLOADS_HERO_COPY} variant="centered" />
            <Showcase
                articles={UPLOADS_ARTICLES}
                quote="Your personal syllabus, analyzed."
                author="— Uploads"
            />
        </main>
    );
}
