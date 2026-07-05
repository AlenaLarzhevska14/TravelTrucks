'use client';

import { useState } from 'react';
import { isAxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { createBookingRequest } from '@/services/campers';
import css from './BookingForm.module.css';

type BookingFormProps = {
  camperId: string;
  camperName: string;
};

type BookingFormValues = {
  name: string;
  email: string;
  bookingDate: string;
  comment: string;
};

type FormMessage = {
  type: 'success' | 'error';
  text: string;
};

export default function BookingForm({
  camperId,
  camperName,
}: BookingFormProps) {
  const defaultBookingDate = new Date().toISOString().split('T')[0];

  const [message, setMessage] = useState<FormMessage | null>(null);

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm<BookingFormValues>({
    defaultValues: {
      name: '',
      email: '',
      bookingDate: defaultBookingDate,
      comment: '',
    },
  });

  async function onSubmit(values: BookingFormValues) {
    setMessage(null);

    try {
      await createBookingRequest({
        camperId,
        ...values,
      });

      setMessage({
        type: 'success',
        text: `Booking request for ${camperName} was sent successfully.`,
      });

      reset();
    } catch (error) {
      setMessage({
        type: 'error',
        text: getBookingErrorMessage(error),
      });
    }
  }

  return (
    <aside className={css.card}>
      <h2 className={css.title}>Book your campervan now</h2>

      <p className={css.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <form className={css.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <label className={css.field}>
          <span className={css.fieldLabel}>Name</span>

          <input
            type="text"
            className={`${css.input} ${errors.name ? css.inputError : ''}`}
            placeholder="Name*"
            aria-invalid={errors.name ? 'true' : 'false'}
            {...register('name', {
              required: 'Name is required.',
              minLength: {
                value: 2,
                message: 'Name must contain at least 2 characters.',
              },
            })}
          />

          {errors.name && (
            <span className={css.errorText}>{errors.name.message}</span>
          )}
        </label>

        <label className={css.field}>
          <span className={css.fieldLabel}>Email</span>

          <input
            type="email"
            className={`${css.input} ${errors.email ? css.inputError : ''}`}
            placeholder="Email*"
            aria-invalid={errors.email ? 'true' : 'false'}
            {...register('email', {
              required: 'Email is required.',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Enter a valid email address.',
              },
            })}
          />

          {errors.email && (
            <span className={css.errorText}>{errors.email.message}</span>
          )}
        </label>

        <input
          type="hidden"
          {...register('bookingDate', {
            required: 'Booking date is required.',
          })}
        />

        <input type="hidden" {...register('comment')} />

        <button type="submit" className={css.submit} disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send'}
        </button>
      </form>

      {message && (
        <p
          className={
            message.type === 'success' ? css.successMessage : css.errorMessage
          }
        >
          {message.text}
        </p>
      )}
    </aside>
  );
}

function getBookingErrorMessage(error: unknown) {
  if (isAxiosError(error) && error.response?.status === 404) {
    return 'Booking endpoint is unavailable in the current TravelTrucks API.';
  }

  return 'Booking request failed. Please try again later.';
}
