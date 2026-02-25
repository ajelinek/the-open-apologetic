import { baseUrl, routes } from './site';

export interface NavItem {
  href: string;
  label: string;
  hasDropdown?: boolean;
}

export interface NavSubItem {
  href: string;
  label: string;
}

export const navLinks: NavItem[] = [
  { href: routes.home(), label: 'Home' },
  { href: routes.evidence(), label: 'Evidence' },
  { href: routes.stories(), label: 'Stories', hasDropdown: true },
];

export const storiesSubNav: NavSubItem[] = [
  { href: routes.testimonies(), label: 'Testimonies' },
  { href: routes.miracles(), label: 'Miracles' },
];

export const footerLinks = [
  { href: routes.home(), label: 'Home' },
  { href: routes.evidence(), label: 'Evidence' },
  { href: routes.stories(), label: 'Stories' },
  { href: routes.testimonies(), label: 'Testimonies' },
  { href: routes.miracles(), label: 'Miracles' },
];
