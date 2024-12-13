import AuthLogin from '@/app/components/Login-box';
import HeroSection from './landing/HeroSection';
import ShowProduct from './landing/ShowProduct';
import Article from './landing/components/Article';

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div  className='m-4'>
      <iframe
        
        src="https://open.spotify.com/embed/playlist/3tcCT7XxZStJ2v0nW1AVfO?utm_source=generator"
        width="100%"
        height="160"
       
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
      </div>
      
      <HeroSection />
      <ShowProduct />
      <Article />
    </div>
  );
}
