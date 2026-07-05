'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import css from './Header.module.css';

export default function Header() {
  const pathname = usePathname();

  const logo = pathname === '/' ? '/images/Logo.svg' : '/images/LogoGrey.svg';

  return (
    <header className={css.header}>
      <div className={css.container}>
        <Link href="/" className={css.logo}>
          <Image
            src={logo}
            alt="TravelTrucks"
            width={136}
            height={16}
            priority
          />
        </Link>

        <nav className={css.nav}>
          <Link href="/" className={css.link}>
            Home
          </Link>

          <Link href="/catalog" className={css.link}>
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
}
