import Header from '@/components/Header/Header';
import Filters from '@/components/Filters/ Filters';
import CamperList from '@/components/CamperList/CamperList';
import css from './page.module.css';
import { getCampers } from '@/services/campers';

export default async function CatalogPage() {
  const campers = await getCampers();
  console.log(campers);
  console.log(Array.isArray(campers));
  console.log(Array.isArray(campers.campers));

  return (
    <>
      <Header />
      <main className={css.main}>
        <Filters />
        <CamperList campers={campers.campers} />
      </main>
    </>
  );
}
