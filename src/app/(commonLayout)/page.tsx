import { Footer2 } from "@/components/modules/homepage/footer2";
import HeroBanner from "@/components/modules/homepage/Banner";
import BenefitsStrip from "@/components/modules/homepage/BenefitsStrip";
import WhyUs from "@/components/layout/WhyUs";
import FeaturedMedicines from "@/components/modules/homepage/FeaturedMedicines";


export default function HomePage() {

    return (
        <div className="items-center justify-center">
            <HeroBanner />
            <BenefitsStrip />
            <FeaturedMedicines />
            <WhyUs />
            <Footer2 />
        </div >
    );
}
