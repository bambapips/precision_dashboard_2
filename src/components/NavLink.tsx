import React, { useState } from 'react';
import type { NavItem } from '../type/types';
import { ChevronDownIcon } from '../assets/icons/Icon';


interface NavLinkProps {
  item: NavItem;
  activePath: string;
  onClick: (path: string) => void;
}

const NavLink: React.FC<NavLinkProps> = ({ item, activePath, onClick }) => {
  const [isOpen, setIsOpen] = useState(activePath.startsWith(item.path));
  const isActive = item.children ? activePath.startsWith(item.path) : activePath === item.path;

  const handleToggle = () => {
    if (item.children) {
      setIsOpen(!isOpen);
    }
    onClick(item.children ? (isOpen ? activePath : item.children[0].path) : item.path);
  };
  
  const handleChildClick = (e: React.MouseEvent, path: string) => {
      e.stopPropagation(); 
      onClick(path);
  };

  return (
    <div>
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); handleToggle(); }}
        className={`flex items-center justify-between p-3 text-gray-300 hover:bg-gray-700 ${isActive ? 'bg-gray-700 text-white border-l-3 border-white' : ''}`}
      >
        <div className="flex items-center">
          <item.icon />
          <span className="ml-4">{item.label}</span>
        </div>
        {item.children && <ChevronDownIcon className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />}
      </a>
      {item.children && isOpen && (
        <div className="mt-2 space-y-2">
          {item.children.map(child => (
            <a
              key={child.path}
              href="#"
              onClick={(e) => handleChildClick(e, child.path)}
              className={`block p-2 text-gray-400 hover:text-white hover:bg-gray-600 ${activePath === child.path ? 'text-white bg-gray-600' : ''}`}
            >
              {child.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavLink;
