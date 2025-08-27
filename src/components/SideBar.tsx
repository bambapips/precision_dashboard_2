import React from 'react';
import NavLink from './NavLink';
import { menuItems, administrationItems } from '../data/navigation';
import { SignOutIcon } from '../assets/icons/Icon';

interface SidebarProps {
  isOpen: boolean;
  activePath: string;
  setPath: (path: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, activePath, setPath }) => {
  return (
    <aside className={`bg-[#1e293b] text-white w-[233px] lg:w-[280px] fixed lg:relative top-0 left-0 h-full z-20 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:w-64 flex-shrink-0 block flex flex-col`}>
      <div className="p-10 lg:px-3">
        <div className="hidden lg:flex items-center bg-[#344054] px-4 rounded-[5px] py-2">
            <img src="https://placehold.co/40x40/6366f1/ffffff?text=O" alt="User Avatar" className="w-10 h-10 rounded-full mr-3" />
            <div>
                <p className="font-semibold">Omozino</p>
                <p className="text-sm text-gray-400">zino@yudimy.com</p>
            </div>
        </div>
      </div>
      <nav className="flex flex-col justify-between h-full overflow-y-auto">
          <div>
              <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Menu</h3>
              <div className="mt-2 space-y-1">
                  {menuItems.map(item => <NavLink key={item.path} item={item} activePath={activePath} onClick={setPath} />)}
              </div>
          </div>
          <div>
              <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Administration</h3>
              <div className="mt-2. space-y-1">
                  {administrationItems.map(item => <NavLink key={item.path} item={item} activePath={activePath} onClick={setPath} />)}
              </div>
          </div>
      </nav>
       <div className="p-4 border-t border-gray-700">
            <a href="#" className="flex items-center p-3 rounded-lg text-red-400 hover:bg-gray-700">
                <SignOutIcon />
                <span className="ml-4">Sign Out</span>
            </a>
        </div>
    </aside>
  );
};

export default Sidebar;
