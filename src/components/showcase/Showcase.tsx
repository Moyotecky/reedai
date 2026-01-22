import { SHOWCASE_ARTICLES } from "@/lib/CONSTANTS";
import Article from "./Article";

const Showcase = () => {
    return (
        <section className="section-container mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                {SHOWCASE_ARTICLES?.map((article) => (
                    <Article
                        key={article.id}
                        article={article}
                    />
                ))}
            </div>

            <div className="py-32 flex justify-center">
                <figure className="text-center space-y-4">
                    <blockquote className="text-3xl md:text-4xl font-light tracking-wide font-crimson blockquote-with-quotes break-words">
                        Your AI everything app.
                    </blockquote>
                    <figcaption>
                        <img
                            src="https://images.ctfassets.net/spoqsaf9291f/3FH43ruDfwZILGSgjnJ2sn/82bb2e9bfd3521c58e53a395bd72c6f6/forbes.png"
                            alt="forbes"
                            width="80"
                            height="20"
                            className="mx-auto"
                        />
                    </figcaption>
                </figure>
            </div>
        </section>
    );
};

export default Showcase;
