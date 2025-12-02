interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  {
    label: 'income',
    href: '/income',
  },
  {
    label: 'orders',
    href: '/orders',
  },
  {
    label: 'products',
    href: '/products',
  },
  {
    label: 'users',
    href: '/users',
  },
  {
    label: 'settings',
    href: '/settings',
  },
];

export const MONTHS_LIST = [
  'ЯНВ',
  'ФЕВ',
  'МАР',
  'АПР',
  'МАЙ',
  'ИЮН',
  'ИЮЛ',
  'АВГ',
  'СЕН',
  'ОКТ',
  'НОЯ',
  'ДЕК',
];
