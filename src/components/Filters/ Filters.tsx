import css from './Filters.module.css';
import { FiMapPin } from 'react-icons/fi';
import { IoCloseOutline } from 'react-icons/io5';

export default function Filters() {
  const vehicleTypes = ['Alcove', 'Panel Van', 'Integrated', 'Semi Integrated'];

  const engines = ['Diesel', 'Petrol', 'Hybrid', 'Electric'];

  const transmissions = ['Automatic', 'Manual'];

  return (
    <aside className={css.filters}>
      <div className={css.location}>
        <label className={css.label}>Location</label>

        <div className={css.inputWrapper}>
          <FiMapPin className={css.icon} />

          <input type="text" placeholder="City" className={css.input} />
        </div>
      </div>

      <p className={css.filterTitle}>Filters</p>
      <div className={css.group}>
        <h3 className={css.groupTitle}>Camper form</h3>

        {vehicleTypes.map(item => (
          <label key={item} className={css.radio}>
            <input type="radio" name="vehicle" />
            {item}
          </label>
        ))}
      </div>

      <div className={css.group}>
        <h3 className={css.groupTitle}>Engine</h3>

        {engines.map(item => (
          <label key={item} className={css.radio}>
            <input type="radio" name="engine" />
            {item}
          </label>
        ))}
      </div>

      <div className={css.group}>
        <h3 className={css.groupTitle}>Transmission</h3>

        {transmissions.map(item => (
          <label key={item} className={css.radio}>
            <input type="radio" name="transmission" />
            {item}
          </label>
        ))}
      </div>
      <div className={css.buttons}>
        <button type="submit" className={css.searchBtn}>
          Search
        </button>
        <button type="button" className={css.clearBtn}>
          <IoCloseOutline className={css.clearIcon} />
          <span>Clear filters</span>
        </button>
      </div>
    </aside>
  );
}
