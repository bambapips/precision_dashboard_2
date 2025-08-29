import React from 'react';
import { BellIcon, UserAvatarIcon } from '../assets/icons/Icon';
import { ChevronDown } from 'lucide-react';

interface TopHeaderProps {
  toggleSidebar: () => void;
  title: string;
}

const TopHeader: React.FC<TopHeaderProps> = ({ toggleSidebar, title }) => {
  return (
    <header className="bg-[#E8F3FF] text-[#012169] h-23 py-4 px-6 lg:px-8 flex items-center justify-between border-b border-gray-200 flex-shrink-0">
      <div className="flex items-center gap-4">
        {/* Hamburger Menu for Mobile */}
        <button onClick={toggleSidebar} className="text-gray-600 lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {/* Page Title */}
        <h1 className="text-2xl font-bold text-inherit hidden lg:flex">{title}</h1>
      </div>


      {/* Right side items */}
      <div className="flex items-center gap-3">
        <button className="text-gray-500 hover:text-gray-700 relative">
          <BellIcon className="h-6 w-6" />
        </button>
        <div className="flex items-center gap-2 cursor-pointer">
          <UserAvatarIcon className="h-6 w-6"/>
          <ChevronDown className="h-5 w-5 text-gray-500" />
        </div>
      </div>
    </header>
  );
};

export default TopHeader;