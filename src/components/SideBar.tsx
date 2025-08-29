import React from 'react';
import NavLink from './NavLink';
import { menuItems, administrationItems } from '../data/navigation';
import { SignOutIcon, PrecisionLogo } from '../assets/icons/Icon';

interface SidebarProps {
  isOpen: boolean;
  activePath: string;
  setPath: (path: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, activePath, setPath }) => {
  return (
    <aside className={`bg-[#012169] text-white w-[233px] pb-10 lg:w-[280px] fixed lg:relative top-0 left-0 h-full z-20 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:w-64 flex-shrink-0 block flex flex-col`}>
      <div className="flex items-center gap-1 p-6">
          <PrecisionLogo/>
          <h1 className="text-2xl font-bold text-white">Precision</h1>
      </div>
      <nav className="flex flex-col justify-between h-full overflow-y-auto px-4">
          <div>
              <div className="mt-2 space-y-1">
                  {menuItems.map(item => <NavLink key={item.path} item={item} activePath={activePath} onClick={setPath} />)}
              </div>
          </div>
          <div>
              <div className="mt-2 space-y-1">
                  {administrationItems.map(item => <NavLink key={item.path} item={item} activePath={activePath} onClick={setPath} />)}
              </div>
          </div>
      </nav>
    </aside>
  );
};

export default Sidebar;