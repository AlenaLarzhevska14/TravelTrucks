import { CamperDetails, CamperFilters } from '@/types/camper';

export const initialCamperFilters: CamperFilters = {
  location: '',
  form: '',
  engine: '',
  transmission: '',
};

export const camperFormOptions = [
  { label: 'Alcove', value: 'alcove' },
  { label: 'Panel Van', value: 'panel_van' },
  { label: 'Integrated', value: 'integrated' },
  { label: 'Semi Integrated', value: 'semi_integrated' },
];

export const engineOptions = [
  { label: 'Diesel', value: 'diesel' },
  { label: 'Petrol', value: 'petrol' },
  { label: 'Hybrid', value: 'hybrid' },
  { label: 'Electric', value: 'electric' },
];

export const transmissionOptions = [
  { label: 'Automatic', value: 'automatic' },
  { label: 'Manual', value: 'manual' },
];

const labelMap: Record<string, string> = {
  ac: 'AC',
  bathroom: 'Bathroom',
  gas: 'Gas',
  integrated: 'Integrated',
  kitchen: 'Kitchen',
  microwave: 'Microwave',
  panel_van: 'Panel Van',
  radio: 'Radio',
  refrigerator: 'Refrigerator',
  semi_integrated: 'Semi Integrated',
  tv: 'TV',
  water: 'Water',
};

export function normalizeCamperFilters(filters: CamperFilters): CamperFilters {
  return {
    location: filters.location.trim(),
    form: filters.form,
    engine: filters.engine,
    transmission: filters.transmission,
  };
}

export function formatCamperLabel(value: string): string {
  return (
    labelMap[value] ??
    value
      .split('_')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ')
  );
}

export function getCamperFeatureEntries(camper: CamperDetails) {
  return [
    { label: 'Form', value: formatCamperLabel(camper.form) },
    { label: 'Engine', value: formatCamperLabel(camper.engine) },
    { label: 'Transmission', value: formatCamperLabel(camper.transmission) },
    { label: 'Length', value: camper.length },
    { label: 'Width', value: camper.width },
    { label: 'Height', value: camper.height },
    { label: 'Tank', value: camper.tank },
    { label: 'Consumption', value: camper.consumption },
  ];
}
