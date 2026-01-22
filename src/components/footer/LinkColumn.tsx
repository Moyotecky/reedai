import type { FooterLinkColumn } from "@/lib/CONSTANTS";

interface LinkColumnProps {
    column: FooterLinkColumn;
}

const LinkColumn = ({ column }: LinkColumnProps) => {
    const { title, links, isLastColumn } = column;
    const finalLinks = isLastColumn ? links.slice(0, -1) : links;

    return (
        <div className="flex flex-col justify-between">
            <div>
                <h4 className="text-lg font-medium mb-2">{title}</h4>

                <ul>
                    {finalLinks?.map(({ text, href }) => (
                        <li key={text}>
                            <a
                                href={href}
                                className="text-black/80 hover:underline decoration-blue-50">
                                {text}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            {isLastColumn && (
                <a
                    href="https://www.notion.com/explore"
                    className="font-bold hover:underline decoration-blue-50">
                    Explore more →
                </a>
            )}
        </div>
    );
};

export default LinkColumn;
