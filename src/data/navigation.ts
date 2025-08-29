import type { NavItem } from '../type/types';
import {
  HomeIcon,
  UsersIcon,
  PaymentIcon,
  SupportIcon,
  SettingsIcon,
  HiringAssistantIcon,
  InterviewCentreIcon,
  PlansBillingIcon,
  ManageJobsIcon,
  Cube
} from '../assets/icons/Icon';


export const menuItems: NavItem[] = [
  { label: 'Hiring Assistant', icon: Cube, path: '/hiring-assistant' },
  { label: 'Manage Jobs', icon: PlansBillingIcon, path: '/manage-jobs' },
  {
    label: 'Talent Bank', icon: HiringAssistantIcon, path: '/talent-bank/my-talents', children: [
      { label: 'My Talents', icon: UsersIcon, path: '/talent-bank/my-talents' },
      { label: 'Precision Talents', icon: UsersIcon, path: '/talent-bank/precision-talents' },
    ]
  },
  { label: 'Interview Centre', icon: InterviewCentreIcon, path: '/interview-centre' },
  { label: 'Plans & Billing', icon: ManageJobsIcon, path: '/plans-billing' },
];

export const administrationItems: NavItem[] = [
  { label: 'Settings', icon: SettingsIcon, path: '/settings' },
  { label: 'Support/Knowledge base', icon: SupportIcon, path: '/support' },
];