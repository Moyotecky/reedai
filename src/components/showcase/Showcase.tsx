import { SHOWCASE_ARTICLES, ShowcaseArticle } from "@/lib/CONSTANTS";
import Article from "./Article";

interface ShowcaseProps {
    articles?: ShowcaseArticle[];
    quote?: string;
    author?: string;
}

const Showcase = ({
    articles = SHOWCASE_ARTICLES,
    quote = "A tutor that actually listens.",
    author = "— ReedAI"
}: ShowcaseProps) => {
    return (
        <section className="section-container mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                {articles?.map((article) => (
                    <Article
                        key={article.id}
                        article={article}
                    />
                ))}
            </div>

            <div className="py-32 flex justify-center">
                <figure className="text-center space-y-4">
                    <blockquote className="text-3xl md:text-4xl font-light tracking-wide font-dm-sans blockquote-with-quotes break-words">
                        {quote}
                    </blockquote>
                    <figcaption>
                        <span className="text-white-70 font-medium">{author}</span>
                    </figcaption>
                </figure>
            </div>
        </section>
    );
};

export default Showcase;
