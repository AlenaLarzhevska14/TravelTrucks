import type { Metadata } from 'next';
import Image from 'next/image';
import { cache } from 'react';
import { isAxiosError } from 'axios';
import { notFound } from 'next/navigation';
import { FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import Header from '@/components/Header/Header';
import { getCamperById, getCamperReviews } from '@/services/campers';
import { formatCamperLabel } from '@/utils/campers';
import BookingForm from './BookingForm';
import css from './page.module.css';

type CamperDetailsPageProps = {
  params: Promise<{
    camperId: string;
  }>;
};

const getCamperPageData = cache(async (camperId: string) =>
  Promise.all([getCamperById(camperId), getCamperReviews(camperId)])
);

export async function generateMetadata({
  params,
}: CamperDetailsPageProps): Promise<Metadata> {
  const { camperId } = await params;

  try {
    const [camper] = await getCamperPageData(camperId);

    return {
      title: camper.name,
      description: `Explore ${camper.name}, a ${formatCamperLabel(camper.form).toLowerCase()} camper in ${camper.location}.`,
    };
  } catch {
    return {
      title: 'Camper details',
      description: 'TravelTrucks camper details page.',
    };
  }
}

export default async function CamperDetailsPage({
  params,
}: CamperDetailsPageProps) {
  const { camperId } = await params;
  const [camper, reviews] = await loadCamperPageData(camperId);
  const detailBadges = Array.from(
    new Set([
      camper.transmission,
      camper.engine,
      ...camper.amenities,
      camper.form,
    ])
  );
  const vehicleDetails = [
    { label: 'Form', value: formatCamperLabel(camper.form) },
    { label: 'Length', value: camper.length },
    { label: 'Width', value: camper.width },
    { label: 'Height', value: camper.height },
    { label: 'Tank', value: camper.tank },
    { label: 'Consumption', value: camper.consumption },
  ];

  return (
    <>
      <Header />
      <main className={css.main}>
        <section className={css.head}>
          <div className={css.titleRow}>
            <div>
              <h1 className={css.title}>{camper.name}</h1>
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
            </div>
            <p className={css.price}>€{camper.price}</p>
          </div>
        </section>

        <section className={css.gallerySection} aria-label="Camper gallery">
          <div className={css.galleryTrack}>
            {camper.gallery.map(image => (
              <div key={image.id} className={css.galleryItem}>
                <Image
                  src={image.original}
                  alt={`${camper.name} gallery image ${image.order}`}
                  fill
                  sizes="(max-width: 768px) 80vw, 360px"
                  className={css.galleryImage}
                  priority={image.order === 1}
                />
              </div>
            ))}
          </div>
        </section>

        <p className={css.description}>{camper.description}</p>

        <section className={css.contentGrid}>
          <div className={css.stack}>
            <article className={`${css.panel} ${css.detailsPanel}`}>
              <h2 className={`${css.sectionTitle} ${css.detailsTitle}`}>
                Vehicle details
              </h2>

              <div className={css.badges}>
                {detailBadges.map(item => (
                  <span key={item} className={css.badge}>
                    {formatCamperLabel(item)}
                  </span>
                ))}
              </div>

              <div className={css.detailsDivider} />

              <dl className={css.detailsTable}>
                {vehicleDetails.map(item => (
                  <div key={item.label} className={css.detailsRow}>
                    <dt className={css.detailsLabel}>{item.label}</dt>
                    <dd className={css.detailsValue}>{item.value}</dd>
                  </div>
                ))}
              </dl>
            </article>

            <article className={css.panel}>
              <div className={css.sectionHeader}>
                <div>
                  <h2 className={css.sectionTitle}>Reviews</h2>
                  <p className={css.sectionText}>
                    Real feedback from previous travelers.
                  </p>
                </div>
                <span className={css.sectionNote}>{reviews.length} total</span>
              </div>

              {reviews.length > 0 ? (
                <ul className={css.reviewList}>
                  {reviews.map(review => (
                    <li key={review.id} className={css.reviewItem}>
                      <div className={css.reviewHead}>
                        <div>
                          <p className={css.reviewName}>
                            {review.reviewer_name}
                          </p>
                          <p className={css.reviewDate}>
                            {new Date(review.createdAt).toLocaleDateString(
                              'en-US',
                              {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              }
                            )}
                          </p>
                        </div>
                        <div className={css.reviewRating}>
                          <FaStar className={css.star} />
                          <span>{review.reviewer_rating}</span>
                        </div>
                      </div>
                      <p className={css.reviewComment}>{review.comment}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={css.emptyText}>No reviews yet.</p>
              )}
            </article>
          </div>

          <BookingForm camperId={camper.id} camperName={camper.name} />
        </section>
      </main>
    </>
  );
}

async function loadCamperPageData(camperId: string) {
  try {
    return await getCamperPageData(camperId);
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404) {
      notFound();
    }

    throw error;
  }
}
