import Image from 'next/image';
import {
  FaStar,
  FaMapMarkerAlt,
  FaGasPump,
  FaCogs,
  FaShuttleVan,
} from 'react-icons/fa';

import Button from '@/components/Button/Button';
import css from './CamperCard.module.css';
import { Camper } from '@/types/camper';

type CamperCardProps = {
  camper: Camper;
};

export default function CamperCard({ camper }: CamperCardProps) {
  const {
    coverImage,
    name,
    price,
    rating,
    totalReviews,
    location,
    description,
    engine,
    transmission,
    form,
    id,
  } = camper;

  return (
    <article className={css.card}>
      <div className={css.image}>
        <Image
          src={coverImage}
          alt={name}
          fill
          sizes="292px"
          className={css.img}
        />
      </div>

      <div className={css.info}>
        <div className={css.header}>
          <h2 className={css.title}>{name}</h2>

          <div className={css.priceBox}>
            <span className={css.price}>€{price}</span>
          </div>
        </div>

        <div className={css.meta}>
          <div className={css.metaItem}>
            <FaStar className={css.star} />
            <span>
              {rating} ({totalReviews} Reviews)
            </span>
          </div>

          <div className={css.metaItem}>
            <FaMapMarkerAlt />
            <span>{location}</span>
          </div>
        </div>

        <p className={css.description}>{description}</p>

        <div className={css.badges}>
          <span className={css.badge}>
            <FaGasPump />
            {engine}
          </span>

          <span className={css.badge}>
            <FaCogs />
            {transmission}
          </span>

          <span className={css.badge}>
            <FaShuttleVan />
            {form}
          </span>
        </div>

        <Button href={`/catalog/${id}`} target="_blank">
          Show more
        </Button>
      </div>
    </article>
  );
}
