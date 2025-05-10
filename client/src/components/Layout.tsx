import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { useWallet } from '@/context/WalletContext';
import BottomNavigation from './BottomNavigation';
import ActionPanel from './ActionPanel';
import { useComingSoon } from '@/hooks/use-coming-soon';
import logo from '@/assets/logo.png';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  showHeader?: boolean;
  showNavigation?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title = 'HathorChat', 
  showHeader = true,
  showNavigation = true
}) => {
  const [location] = useLocation();
  const { isAuthenticated } = useWallet();
  const { notifyComingSoon } = useComingSoon();
  const [showActionPanel, setShowActionPanel] = useState(false);

  const getActiveTab = () => {
    if (location === "/home") return "home";
    if (location === "/wallet") return "wallet";
    if (location === "/rewards") return "rewards";
    if (location === "/profile") return "profile";
    return "home";
  };

  const handleCreateClick = () => {
    setShowActionPanel(true);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-white dark:bg-neutral-900">
      {showHeader && (
        <header className="px-6 py-3 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 sticky top-0 z-10">
          <div className="flex justify-between items-center max-w-md mx-auto w-full">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-hathor-purple/10 flex items-center justify-center">
                <img 
                  src={logo}
                  alt="Hathor Logo"
                  className="w-8 h-8"
                />
              </div>
              <h1 className="ml-2 font-semibold text-lg">{title}</h1>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => notifyComingSoon("Notifications")}
                className="w-8 h-8 flex items-center justify-center rounded-full text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <i className="fas fa-bell"></i>
              </button>
              <button
                onClick={() => notifyComingSoon("Settings")}
                className="w-8 h-8 flex items-center justify-center rounded-full text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <i className="fas fa-gear"></i>
              </button>
            </div>
          </div>
        </header>
      )}
      
      <main className="flex-1 overflow-y-auto pb-16" id="main-content">
        <div className="max-w-md mx-auto w-full">
          {children}
        </div>
      </main>
      
      {showNavigation && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
          <div className="max-w-md mx-auto w-full">
            <BottomNavigation 
              activeTab={getActiveTab()} 
              onCreateClick={handleCreateClick}
            />
          </div>
        </div>
      )}

      <ActionPanel 
        isVisible={showActionPanel}
        onClose={() => setShowActionPanel(false)}
      />
    </div>
  );
};

export default Layout;
