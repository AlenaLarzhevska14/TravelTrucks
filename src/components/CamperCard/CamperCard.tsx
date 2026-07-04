import Image from 'next/image';
import {
  FaStar,
  FaMapMarkerAlt,
  FaHeart,
  FaGasPump,
  FaCogs,
  FaShuttleVan,
} from 'react-icons/fa';

import css from './CamperCard.module.css';
import { Camper } from '@/types/camper';
import Button from '@/components/Button/Button';

type CamperCardProps = {
  camper: Camper;
};

export default function CamperCard({ camper }: CamperCardProps) {
  return (
    <article className={css.card}>
      <div className={css.image}>
        <Image
          src={camper.coverImage}
          alt={camper.name}
          fill
          sizes="292px"
          className={css.img}
          priority={false}
        />
      </div>

      <div className={css.info}>
        <div className={css.header}>
          <h2 className={css.title}>{camper.name}</h2>

          <div className={css.priceBox}>
            <span className={css.price}>€{camper.price}</span>

            <button
              type="button"
              className={css.favorite}
              aria-label="Add to favorites"
            >
              <FaHeart />
            </button>
          </div>
        </div>
        <div className={css.meta}>
          <div className={css.metaItem}>
            <FaStar className={css.star} />
            <span>
              {camper.rating} ({camper.totalReviews} Reviews)
            </span>
          </div>

          <div className={css.metaItem}>
            <FaMapMarkerAlt />
            <span>{camper.location}</span>
          </div>
        </div>
        <p className={css.description}>{camper.description}</p>
        <div className={css.badges}>
          <span className={css.badge}>
            <FaGasPump />
            {camper.engine}
          </span>

          <span className={css.badge}>
            <FaCogs />
            {camper.transmission}
          </span>

          <span className={css.badge}>
            <FaShuttleVan />
            {camper.form}
          </span>
        </div>
        <Button href={`/catalog/${camper.id}`} target="_blank">
          Show more
        </Button>
      </div>
    </article>
  );
}
