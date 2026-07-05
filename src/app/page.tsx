import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/ Hero';

export const metadata = {
  title: 'Home',
  description:
    'Find comfortable campers for your next road trip with TravelTrucks.',
};

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
    </>
  );
}
