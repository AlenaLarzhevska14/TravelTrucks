import Loader from '../Loader/Loader';
import CamperCard from '../CamperCard/CamperCard';
import css from './CamperList.module.css';
import { Camper } from '@/types/camper';

type CamperListProps = {
  campers: Camper[];
  errorMessage?: string;
  hasNextPage: boolean;
  isLoading: boolean;
  isLoadingMore: boolean;
  onLoadMore: () => void;
};

export default function CamperList({
  campers,
  errorMessage,
  hasNextPage,
  isLoading,
  isLoadingMore,
  onLoadMore,
}: CamperListProps) {
  if (errorMessage) {
    return (
      <section className={css.list}>
        <p className={css.message}>{errorMessage}</p>
      </section>
    );
  }

  if (isLoading && campers.length === 0) {
    return (
      <section className={css.list}>
        <Loader label="Loading campers..." centered />
      </section>
    );
  }

  if (!isLoading && campers.length === 0) {
    return (
      <section className={css.list}>
        <p className={css.message}>No campers found</p>
      </section>
    );
  }

  return (
    <section className={css.list}>
      {campers.map(camper => (
        <CamperCard key={camper.id} camper={camper} />
      ))}

      {hasNextPage ? (
        <div className={css.loadMoreBox}>
          <button
            type="button"
            className={css.loadMore}
            disabled={isLoadingMore}
            onClick={onLoadMore}
          >
            Load More
          </button>
          {isLoadingMore ? <Loader label="Loading more..." size="sm" /> : null}
        </div>
      ) : null}
    </section>
  );
}
