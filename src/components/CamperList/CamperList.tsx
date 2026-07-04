import CamperCard from '../CamperCard/CamperCard';
import css from './CamperList.module.css';

type CamperListProps = {
  campers: any[];
};

export default function CamperList({ campers }: CamperListProps) {
  return (
    <section className={css.list}>
      {campers.map(camper => (
        <CamperCard key={camper.id} camper={camper} />
      ))}

      <button className={css.loadMore}>Load more</button>
    </section>
  );
}
