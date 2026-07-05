import {
  BookingRequest,
  CamperDetails,
  CamperReview,
  CampersResponse,
  GetCampersParams,
} from '@/types/camper';
import { api } from './api';

export async function getCampers(
  params: GetCampersParams = {}
): Promise<CampersResponse> {
  const response = await api.get<CampersResponse>('/campers', {
    params: {
      page: params.page,
      perPage: params.perPage,
      location: params.location || undefined,
      form: params.form || undefined,
      engine: params.engine || undefined,
      transmission: params.transmission || undefined,
    },
  });

  return response.data;
}

export async function getCamperById(camperId: string): Promise<CamperDetails> {
  const response = await api.get<CamperDetails>(`/campers/${camperId}`);

  return response.data;
}

export async function getCamperReviews(
  camperId: string
): Promise<CamperReview[]> {
  const response = await api.get<CamperReview[]>(`/campers/${camperId}/reviews`);

  return response.data;
}

export async function createBookingRequest(payload: BookingRequest) {
  const response = await api.post('/bookings', payload);

  return response.data;
}
