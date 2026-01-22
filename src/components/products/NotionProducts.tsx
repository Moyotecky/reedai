import { PRODUCTS } from "@/lib/CONSTANTS";
import Product from "./Product";
import { MsStoreIcon } from "./Icons";

const NotionProducts = () => {
    return (
        <section className="section-container mt-28 lg:mt-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left column (Download Notion) */}
                <div className="bg-white-40 rounded-xl pt-7 pl-7 space-y-4">
                    <svg
                        className="w-12"
                        viewBox="0 0 120 126">
                        <path
                            d="m7.5434 5.40612 69.3741-5.120205c8.5191-.732314 10.711-.2417737 16.0655 3.656575l22.145 15.59941c3.654 2.6825 4.872 3.4128 4.872 6.337v85.5571c0 5.362-1.949 8.533-8.763 9.018l-80.5636 4.876c-5.115.245-7.5494-.486-10.2281-3.901l-16.30795-21.206c-2.92219-3.903-4.13735-6.8233-4.13735-10.24v-76.0489c0-4.38486 1.94945-8.04243 7.5434-8.52798z"
                            fill="#fff"></path>
                        <path
                            clipRule="evenodd"
                            d="m76.9175.285915-69.3741 5.120205c-5.59395.48555-7.5434 4.14312-7.5434 8.52798v76.0489c0 3.4167 1.21516 6.337 4.13735 10.24l16.30795 21.206c2.6787 3.415 5.1131 4.146 10.2281 3.901l80.5636-4.876c6.814-.485 8.763-3.656 8.763-9.018v-85.5571c0-2.7717-1.094-3.5724-4.32-5.9327-.178-.1299-.361-.2644-.552-.4043l-22.145-15.59941c-5.3545-3.8983487-7.5464-4.388889-16.0655-3.656575zm-44.4175 24.189785c-6.5771.4452-8.0716.5463-11.8066-2.495l-9.4982-7.5559c-.9688-.9771-.4829-2.1959 1.9493-2.4377l66.6911-4.87545c5.5965-.48854 8.5165 1.46463 10.7083 3.17005l11.4381 8.2882c.487.2428 1.702 1.7034.241 1.7034l-68.8739 4.1452c-.2922.0195-.5751.0387-.8491.0572zm-7.6758 86.2273v-72.6344c0-3.1681.9736-4.6317 3.8926-4.8775l79.1002-4.6297c2.683-.2437 3.897 1.4637 3.897 4.6297v72.1469c0 3.171-.488 5.856-4.87 6.098l-75.693 4.39c-4.3806.241-6.3268-1.219-6.3268-5.123zm74.7229-68.7382c.4849 2.196 0 4.3899-2.1947 4.6366l-3.6473.7284v53.6232c-3.1664 1.706-6.0864 2.681-8.5195 2.681-3.8957 0-4.8713-1.219-7.7893-4.8734l-23.8558-37.5369v36.3181l7.5488 1.7074s0 4.3848-6.0903 4.3848l-16.7898.977c-.4878-.977 0-3.412 1.703-3.9l4.3814-1.2171v-48.019l-6.0834-.4886c-.4878-2.1959.7272-5.362 4.1371-5.6077l18.0118-1.2169 24.8265 38.0255v-33.6386l-6.3298-.7282c-.4859-2.6845 1.4585-4.6338 3.8926-4.8755z"
                            fill="#000"
                            fillRule="evenodd"></path>
                    </svg>

                    <div className="">
                        <h3 className="text-2xl font-semibold">Get started with ReedAI</h3>
                        <p className="font-medium">Your personal voice tutor.</p>
                    </div>
                    <div className="space-y-3 w-[240px]">
                        <a
                            href="https://www.notion.com/desktop/windows/download?from=marketing&pathname=%2F&tid=w_1c947063a9cc49618fc5300014a58d16"
                            className="download-btn-black">
                            <svg
                                className="w-4"
                                viewBox="0 0 88 88">
                                <path
                                    fill="white"
                                    d="m0,12.402,35.687-4.8602,0.0156,34.423-35.67,0.20313zm35.67,33.529,0.0277,34.453-35.67-4.9041-0.002-29.78zm4.3261-39.025,47.318-6.906,0,41.527-47.318,0.37565zm47.329,39.349-0.0111,41.34-47.318-6.6784-0.0663-34.739z"></path>
                            </svg>
                            Download for Windows
                        </a>
                        <a
                            href="https://apps.microsoft.com/detail/XPDBVSS44R0L9H?referrer=appbadge&cid=notion_web_msbadge&mode=direct"
                            className="download-btn-black h-16">
                            <MsStoreIcon />
                        </a>
                    </div>

                    <div className="mt-10 ">
                        <img
                            alt="A preview image of the notion desktop app"
                            loading="lazy"
                            width="1550"
                            height="950"
                            decoding="async"
                            className="rounded-t-xl"
                            srcSet="https://www.notion.com/_next/image?url=%2Ffront-static%2Fdownloads%2Fnotion%2Fen-US.png&amp;w=1920&amp;q=75 1x, https://www.notion.com/_next/image?url=%2Ffront-static%2Fdownloads%2Fnotion%2Fen-US.png&amp;w=3840&amp;q=75 2x"
                            src="https://www.notion.com/_next/image?url=%2Ffront-static%2Fdownloads%2Fnotion%2Fen-US.png&amp;w=3840&amp;q=75"
                        />
                    </div>
                </div>

                {/* Right column (2 product) */}
                <div className="flex flex-col justify-between gap-6 lg:gap-0">
                    {PRODUCTS?.map((product) => (
                        <Product
                            key={product.title}
                            product={product}
                        />
                    ))}
                </div>
            </div>

            <p className="mt-3 text-white-70 text-sm">
                ReedAI is always at home right{" "}
                <a
                    href="#"
                    className="underline hover:text-blue-50">
                    in your browser
                </a>
                .
            </p>
        </section>
    );
};

export default NotionProducts;
