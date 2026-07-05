import css from './Loader.module.css';

type LoaderProps = {
  label?: string;
  centered?: boolean;
  size?: 'sm' | 'md';
};

export default function Loader({
  label,
  centered = false,
  size = 'md',
}: LoaderProps) {
  return (
    <div
      className={[
        css.wrapper,
        centered ? css.centered : '',
        size === 'sm' ? css.small : '',
      ]
        .filter(Boolean)
        .join(' ')}
      role="status"
      aria-live="polite"
    >
      <span className={css.spinner} aria-hidden="true" />
      {label ? <span className={css.label}>{label}</span> : null}
    </div>
  );
}
