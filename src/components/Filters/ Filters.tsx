import css from './Filters.module.css';
import { FiMapPin } from 'react-icons/fi';
import { IoCloseOutline } from 'react-icons/io5';
import { CamperFilters } from '@/types/camper';
import {
  camperFormOptions,
  engineOptions,
  transmissionOptions,
} from '@/utils/campers';

type FiltersProps = {
  filters: CamperFilters;
  isLoading: boolean;
  onFilterChange: <Key extends keyof CamperFilters>(
    key: Key,
    value: CamperFilters[Key]
  ) => void;
  onSearch: () => void;
  onClear: () => void;
};

export default function Filters({
  filters,
  isLoading,
  onFilterChange,
  onSearch,
  onClear,
}: FiltersProps) {
  return (
    <aside className={css.filters}>
      <div className={css.location}>
        <label className={css.label}>Location</label>

        <div className={css.inputWrapper}>
          <FiMapPin className={css.icon} />

          <input
            type="text"
            placeholder="City"
            className={css.input}
            value={filters.location}
            onChange={event => onFilterChange('location', event.target.value)}
          />
        </div>
      </div>

      <p className={css.filterTitle}>Filters</p>
      <div className={css.group}>
        <h3 className={css.groupTitle}>Camper form</h3>

        {camperFormOptions.map(item => (
          <label key={item.value} className={css.radio}>
            <input
              type="radio"
              name="vehicle"
              value={item.value}
              checked={filters.form === item.value}
              onChange={event => onFilterChange('form', event.target.value)}
            />
            {item.label}
          </label>
        ))}
      </div>

      <div className={css.group}>
        <h3 className={css.groupTitle}>Engine</h3>

        {engineOptions.map(item => (
          <label key={item.value} className={css.radio}>
            <input
              type="radio"
              name="engine"
              value={item.value}
              checked={filters.engine === item.value}
              onChange={event => onFilterChange('engine', event.target.value)}
            />
            {item.label}
          </label>
        ))}
      </div>

      <div className={css.group}>
        <h3 className={css.groupTitle}>Transmission</h3>

        {transmissionOptions.map(item => (
          <label key={item.value} className={css.radio}>
            <input
              type="radio"
              name="transmission"
              value={item.value}
              checked={filters.transmission === item.value}
              onChange={event =>
                onFilterChange('transmission', event.target.value)
              }
            />
            {item.label}
          </label>
        ))}
      </div>
      <div className={css.buttons}>
        <button
          type="button"
          className={css.searchBtn}
          onClick={onSearch}
          disabled={isLoading}
        >
          Search
        </button>
        <button type="button" className={css.clearBtn} onClick={onClear}>
          <IoCloseOutline className={css.clearIcon} />
          <span>Clear filters</span>
        </button>
      </div>
    </aside>
  );
}
