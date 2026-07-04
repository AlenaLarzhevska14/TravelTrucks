import Link from 'next/link';
import css from './Button.module.css';

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  target?: '_blank' | '_self';
};

export default function Button({
  children,
  href,
  onClick,
  type = 'button',
  target = '_self',
}: ButtonProps) {
  if (href) {
    return (
      <Link href={href} target={target} className={css.button}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={css.button}>
      {children}
    </button>
  );
}
