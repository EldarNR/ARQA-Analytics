'use client';
// libraries
import { useTranslation } from 'react-i18next';
// config
import { NAV_ITEMS } from '@/components/SideBar/config';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();
  const { t } = useTranslation('common');

  return (
    <aside className="w-64 h-screen border-r p-4 bg-white dark:bg-gray-900 dark:border-gray-800 transition-colors">
      <nav className="space-y-2">
        {NAV_ITEMS.map((item) => (
          <Link
            className={`block px-3 py-2 rounded transition-colors ${
              pathname === item.href
                ? 'bg-blue-500 text-white'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200'
            }`}
            href={item.href}
            key={item.href}
          >
            {t(item.labelKey)}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
