import type { NavItem } from '../type/types';
import {
  HiringAssistantIcon,
  ManageJobsIcon,
  TalentBankIcon,
  InterviewCentreIcon,
  PlansBillingIcon,
  SettingsIcon,
  SupportIcon,
  Cube
} from '../assets/icons/Icon';


export const menuItems: NavItem[] = [
  { label: 'Hiring Assistant', icon: Cube , path: '/hiring-assistant' },
  { label: 'Manage Jobs', icon: ManageJobsIcon, path: '/manage-jobs' },
  {
    label: 'Talent Bank', icon: HiringAssistantIcon, path: '/talent-bank', children: [
      { label: 'My Talents', icon: TalentBankIcon, path: '/talent-bank/my-talents' },
      { label: 'Precision Talents', icon: TalentBankIcon, path: '/talent-bank/precision-talents' },
    ]
  },
  { label: 'Interview Centre', icon: InterviewCentreIcon, path: '/interview-centre' },
  { label: 'Plans & Billing', icon: PlansBillingIcon, path: '/plans-billing' },
];

export const administrationItems: NavItem[] = [
  { label: 'Settings', icon: SettingsIcon, path: '/settings' },
  { label: 'Support/Knowledge base', icon: SupportIcon, path: '/support' },
];