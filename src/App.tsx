import React, { useState } from 'react';
import Sidebar from './components/SideBar';
import Header from './components/Header';
import PromptsPage from './pages/Prompts';
import PlaceholderContent from './pages/PlaceholderContent';
import { menuItems, administrationItems } from './data/navigation';


const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePath, setActivePath] = useState('/settings/prompts');

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSetPath = (path: string) => {
    setActivePath(path);
    // Close sidebar on mobile when a link is clicked
    if (sidebarOpen) {
      closeSidebar();
    }
  };

  const getBreadcrumbs = (): string[] => {
      const pathParts = activePath.split('/').filter(p => p);
      if (pathParts.length === 0) return ['Dashboard'];

      const allItems = [...menuItems, ...administrationItems];
      const mainItem = allItems.find(i => activePath.startsWith(i.path));

      if (mainItem) {
          const childItem = mainItem.children?.find(c => c.path === activePath);
          if (childItem) return [mainItem.label, childItem.label];
          return [mainItem.label];
      }
      return ['Dashboard'];
  };
  
  const renderContent = () => {
    // This is a simple router. In a real app, you'd use a library like React Router.
    if (activePath.startsWith('/settings/prompts')) {
      return <PromptsPage />;
    }
    const title = getBreadcrumbs().join(' > ');
    return <PlaceholderContent title={title || 'Overview'} />;
  };

  return (
    <div className="h-screen w-full h-full relative lg:flex bg-gray-100">
      {/* Overlay for mobile to close sidebar on outside click */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-10 lg:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}
      
      <Sidebar isOpen={sidebarOpen} activePath={activePath} setPath={handleSetPath} />
      <div className="flex-1 w-full h-full flex flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar} 
        //breadcrumbs={getBreadcrumbs()}
         />
        <main className="flex-1 h-full overflow-x-hidden overflow-y-auto bg-white">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;