export interface NavItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  children?: NavItem[];
}

