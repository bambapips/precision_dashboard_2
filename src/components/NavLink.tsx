// src/components/NavLink.tsx
import React, { useState, useEffect } from 'react';
import type { NavItem } from '../type/types';
import { ChevronDown } from 'lucide-react';

interface NavLinkProps {
  item: NavItem;
  activePath: string;
  onClick: (path: string) => void;
}

const NavLink: React.FC<NavLinkProps> = ({ item, activePath, onClick }) => {
  const [isOpen, setIsOpen] = useState(activePath.startsWith(item.path));
  const isActive = activePath.startsWith(item.path);

  useEffect(() => {
    setIsOpen(activePath.startsWith(item.path));
  }, [activePath, item.path]);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (item.children && isOpen == false) {
      setIsOpen(!isOpen);
    } else {
      onClick(item.path);
    }
  };

  const handleChildClick = (e: React.MouseEvent, path: string) => {
    e.stopPropagation();
    onClick(path);
  };

  return (
    <div
      className={`flex flex-col overflow-clip rounded-[12px]`}
    >
      <a
        onClick={handleToggle}
        className={`flex items-center justify-between p-3  text-gray-300 hover:bg-[#FFFFFF1A] ${isActive && isOpen ? 'text-[#012169] bg-white hover:bg-white' : ''}`}
      >
        <div className="flex items-center gap-2">
          <item.icon className={`w-5 h-5 ${isActive && isOpen ? 'text-[#012169]' : 'text-gray-400'}`} />
          <span className={`font-medium text-[14px] ${isActive && isOpen ? 'text-[#012169]' : 'text-gray-400'}`}>{item.label}</span>
        </div>
        {item.children && <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />}
      </a>
      {item.children && isOpen && (
        <div className="pl-8 flex rounded-b-[12px] flex-col gap-1 bg-[#FFFFFF1A]">
          {item.children.map(child => (
            <a
              key={child.path}
              href="#"
              onClick={(e) => handleChildClick(e, child.path)}
              className={`block py-2 px-3 text-sm rounded-md font-medium ${activePath === child.path ? 'text-white text-semibold' : 'text-gray-400 hover:text-white hover:bg-[#FFFFFF1A'}`}
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