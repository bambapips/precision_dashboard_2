import type { NavItem } from '../type/types';
import {
  HomeIcon,
  TemplateIcon,
  UsersIcon,
  PaymentIcon,
  ReviewsIcon,
  IntegrationsIcon,
  SupportIcon,
  SettingsIcon,
} from '../assets/icons/Icon';


export const menuItems: NavItem[] = [
  { label: 'Overview', icon: HomeIcon, path: '/overview' },
  { label: 'Templates', icon: TemplateIcon, path: '/templates' },
  { label: 'Users', icon: UsersIcon, path: '/users', children: [
    //   { label: 'All Users', icon: UsersIcon, path: '/users/all' },
    //   { label: 'Add New', icon: UsersIcon, path: '/users/add' },
  ]},
  { label: 'Payment Information', icon: PaymentIcon, path: '/payment' },
  { label: 'Reviews', icon: ReviewsIcon, path: '/reviews' },
];

export const administrationItems: NavItem[] = [
  { label: 'Integrations', icon: IntegrationsIcon, path: '/integrations', children: [
    //   { label: 'Zapier', icon: IntegrationsIcon, path: '/integrations/zapier' },
    //   { label: 'Slack', icon: IntegrationsIcon, path: '/integrations/slack' },
  ]},
  { label: 'Support', icon: SupportIcon, path: '/support' },
  { label: 'Settings', icon: SettingsIcon, path: '/settings', children: [
    //   { label: 'Profile', icon: SettingsIcon, path: '/settings/profile' },
      { label: 'Prompts', icon: SettingsIcon, path: '/settings/prompts' },
//       { label: 'Billing', icon: SettingsIcon, path: '/settings/billing' },
  ]},
];
