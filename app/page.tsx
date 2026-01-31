import HeroBannerWedding from "./components/hero/HeroBannerWedding";
import WishDashboard from "./components/wishes/WishBubble";
import WishForm from "./components/wishes/WishPopup";
import WishPage from "./components/wishes/HeroWishLive";
import AboutUs from "./components/body/AboutUs";
import LanguageSwitcher from "./components/lang/LanguageSwitcher";
import JourneyTimeline from "./components/body/JourneyTimeline";
import WeddingStoryGallery from "./components/body/WeddingStoryGallery";
import ThankYouLetterSection from "./components/body/Letter";

export default function Home() {
  return (
    <main>
      <LanguageSwitcher />
      <HeroBannerWedding />
      <AboutUs />
      <JourneyTimeline />
      <WeddingStoryGallery />
      <ThankYouLetterSection />
    </main>
  );
}
