import Food from "../components/Food/Food";
import SpecialFoods from "../components/Food/SpecialFoods";
import AboutSection from "../components/Home/AboutSection";
import BrandSection from "../components/Home/BrandSection";
import Category from "../components/Home/Categories/Category";
import DiscountSection from "../components/Home/Discount/DiscountSection";
import Features from "../components/Home/Features";
import Hero from "../components/Home/Hero";


const Home = () => {
    return (
        <div>
            <Hero />
            <Features />
            <Category />
            <AboutSection />
            <SpecialFoods />
            <Food />
            <DiscountSection />
            <BrandSection />
        </div>
    );
};

export default Home;