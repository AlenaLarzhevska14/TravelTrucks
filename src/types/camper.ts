export interface CamperFilters {
  location: string;
  form: string;
  engine: string;
  transmission: string;
}

export interface CamperBase {
  id: string;
  name: string;
  price: number;
  rating: number;
  totalReviews: number;
  location: string;
  description: string;
  form: string;
  transmission: string;
  engine: string;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  amenities: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Camper extends CamperBase {
  coverImage: string;
}

export interface CamperGalleryItem {
  id: string;
  camperId: string;
  thumb: string;
  original: string;
  order: number;
}

export interface CamperDetails extends CamperBase {
  gallery: CamperGalleryItem[];
}

export interface CamperReview {
  id: string;
  camperId: string;
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
  createdAt: string;
}

export interface CampersResponse {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  campers: Camper[];
}

export interface GetCampersParams extends Partial<CamperFilters> {
  page?: number;
  perPage?: number;
}

export interface BookingRequest {
  camperId: string;
  name: string;
  email: string;
  bookingDate: string;
  comment: string;
}
