import HeroBannerWedding from "./components/hero/HeroBannerWedding";
import WishDashboard from "./components/wishes/WishDashboard";
import WishForm from "./components/wishes/WishForm";

export default function Home() {
  return (
    <main>
      <HeroBannerWedding />
      <div id="wishes" className="relative min-h-screen bg-[#fffaf3] py-24 px-6">
        <WishForm />
        <WishDashboard />
      </div>
    </main>
  );
}
