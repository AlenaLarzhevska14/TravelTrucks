import Header from '@/components/Header/Header';
import css from './page.module.css';
import CatalogContent from './CatalogContent';

export const metadata = {
  title: 'Catalog',
  description:
    'Browse the TravelTrucks camper catalog with filters for location, form, engine, and transmission.',
};

export default function CatalogPage() {
  return (
    <>
      <Header />
      <main className={css.main}>
        <CatalogContent />
      </main>
    </>
  );
}
