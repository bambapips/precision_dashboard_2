// src/App.tsx
import React, { useState } from 'react';
import Sidebar from './components/SideBar';
import TopHeader from './components/TopHeader';
import TalentBankPage from './pages/TalentBankPage';
import PlaceholderContent from './pages/PlaceholderContent';
import { menuItems, administrationItems } from './data/navigation';
import CandidatesPage from './pages/CandidatesPage';


const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePath, setActivePath] = useState('/talent-bank/my-talents');

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSetPath = (path: string) => {
    setActivePath(path);
    if (sidebarOpen) {
      closeSidebar();
    }
  };

  const getPageTitle = (): string => {
    if (activePath.startsWith('/talent-bank/candidates')) {
      return 'My Talents';
    }
    const allNavItems = [...menuItems, ...administrationItems];
    const flattenedItems = allNavItems.flatMap(item =>
      item.children ? [item, ...item.children] : [item]
    );

    const activeItem = flattenedItems.find(item => item.path === activePath);
    return activeItem?.label || "Dashboard";
  };

  const renderContent = () => {
    if (activePath.startsWith('/talent-bank/candidates')) {
        return <CandidatesPage setPath={handleSetPath} />;
    }
    if (activePath.startsWith('/talent-bank')) {
      return <TalentBankPage setPath={handleSetPath} />;
    }
    const title = getPageTitle();
    return <PlaceholderContent title={title} />;
  };

  return (
    <div className="h-screen w-full relative flex bg-gray-100">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-10 lg:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}
      
      <Sidebar isOpen={sidebarOpen} activePath={activePath} setPath={handleSetPath} />
      <div className="flex-1 w-full h-full flex flex-col overflow-hidden">
        <TopHeader toggleSidebar={toggleSidebar} title={getPageTitle()} />
        <main className="flex-1 h-full overflow-x-hidden overflow-y-auto bg-white">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;