import Hero from "~/components/hero/Hero";
import Showcase from "~/components/showcase/Showcase";
import TeamUseCaseCarousel from "@/components/teamusecase/TeamUseCaseCarousel";
import Testimonials from "~/components/testimonials/Testimonials";
import SearchCapabilities from "~/components/search/SearchCapabilities";
import NotionProducts from "~/components/products/NotionProducts";

export default function Home() {
    return (
        <>
            <main>
                <Hero />
                <Showcase />
                <TeamUseCaseCarousel />
                <Testimonials />
                <SearchCapabilities />
                <NotionProducts />
            </main>
        </>
    );
}
