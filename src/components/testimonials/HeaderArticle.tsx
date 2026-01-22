import { ArrowRight } from "lucide-react";

const HeaderArticle = () => {
    return (
        <article>
            <figure className="space-y-6">
                <img
                    alt="OpenAI-Logo"
                    loading="lazy"
                    width="1129"
                    height="307"
                    decoding="async"
                    srcSet="https://www.notion.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fspoqsaf9291f%2FjWkCPMAAj0Av69704DQoB%2F84499b606028b276e0bf94c238f07097%2FOpenAI-black-wordmark-cropped.png&w=1200&q=75 1x, https://www.notion.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fspoqsaf9291f%2FjWkCPMAAj0Av69704DQoB%2F84499b606028b276e0bf94c238f07097%2FOpenAI-black-wordmark-cropped.png&w=3840&q=75 2x"
                    src="https://www.notion.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fspoqsaf9291f%2FjWkCPMAAj0Av69704DQoB%2F84499b606028b276e0bf94c238f07097%2FOpenAI-black-wordmark-cropped.png&amp;w=3840&amp;q=75"
                    className="w-28"
                />
                <blockquote className="">
                    <p className="lg:hidden blockquote-with-quotes text-2xl sm:text-3xl font-crimson font-light -indent-6">
                        There&apos;s clarity in learning by conversation. ReedAI gives students a calm space to talk through difficult topics and actually understand them.
                    </p>
                    <p className="hidden lg:block text-3xl font-crimson font-light -indent-6">
                        There&apos;s clarity in learning by conversation. ReedAI gives students a calm space to talk through difficult topics and actually understand them.
                    </p>
                </blockquote>
                <figcaption>
                    <a
                        href="https://www.notion.com/customers/openai"
                        className="flex items-center gap-2 text-white-70 hover:text-blue-50 hover:underline">
                        <span>Read the full story</span>
                        <ArrowRight />
                    </a>
                </figcaption>
            </figure>
        </article>
    );
};

export default HeaderArticle;
