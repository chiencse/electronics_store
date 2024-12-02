import AuthLogin from '@/app/components/Login-box';
import HeroSection from './landing/HeroSection';
import ShowProduct from './landing/ShowProduct';
import Article from './landing/components/Article';

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <HeroSection />
      <ShowProduct />
      <Article />
    </div>
  );
}
