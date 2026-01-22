import { NotionCalender, NotionMail } from "./Icons";
import type { Product as ProductType } from "@/lib/CONSTANTS";

interface ProductProps {
    product: ProductType;
}

const Product = ({ product }: ProductProps) => {
    const {
        icon,
        title,
        desc,
        href,
        images: { srcSet, src },
    } = product;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 bg-white-40 rounded-xl p-7 md:pr-0 md:pb-0">
            <div className="space-y-4">
                {icon === "NotionMail" ? <NotionMail /> : <NotionCalender />}
                <div>
                    <h3 className="text-2xl lg:text-3xl font-semibold">{title}</h3>
                    <p className="font-medium">{desc}</p>
                </div>
                <a
                    href={href}
                    className="btn-base bg-white border border-black/20 hover:bg-white-40">
                    Download
                </a>
            </div>

            <div className="hidden md:block overflow-hidden h-[280px]">
                <img
                    alt={`A preview image of the ${title.toLowerCase()} app`}
                    loading="lazy"
                    width="260"
                    height="230"
                    decoding="async"
                    className="shadow ml-auto h-full rounded-t-lg"
                    srcSet={srcSet}
                    src={src}
                />
            </div>
        </div>
    );
};

export default Product;
