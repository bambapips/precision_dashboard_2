import React from 'react';
// import { menuItems, administrationItems } from '../data/navigation';
// import { SettingsIcon } from '../assets/icons/Icon';


interface HeaderProps {
  toggleSidebar: () => void;
//   breadcrumbs: string[];
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
    // const CurrentIcon = [...menuItems, ...administrationItems].find(item => item.label === breadcrumbs[0])?.icon || SettingsIcon;
    return (
        <header className="lg:bg-white bg-[#F5F9FF] shadow-sm py-4 px-6 flex items-center justify-between lg:hidden">
            <div className="flex items-center">
                 <button onClick={toggleSidebar} className="text-gray-500 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                {/* <div className="flex items-center text-sm text-gray-500">
                    <CurrentIcon className="w-5 h-5" />
                    <span className="mx-2 text-gray-300">/</span>
                    <span className="font-semibold text-gray-800">{breadcrumbs[breadcrumbs.length - 1]}</span>
                </div> */}
            </div>
            <div className="flex items-center">
                <p className="flex flex-col gap-[1px] text-right">
                    <span className="font-semibold text-sm">Omozino</span>
                    <span className="text-xs text-gray-500">zino@yudimy.com</span>
                </p>
                <img src="https://placehold.co/32x32/6366f1/ffffff?text=T" alt="User Avatar" className="w-full h-full rounded-full ml-3" />
            </div>
        </header>
    );
};

export default Header;
