import React from 'react';
import { useLocation } from 'wouter';
import { useWallet } from '@/context/WalletContext';

interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showNavigation?: boolean;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  showHeader = true, 
  showNavigation = true,
  title = 'HathorChat'
}) => {
  const [location, setLocation] = useLocation();
  const { authenticated } = useWallet();

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto">
      {showHeader && (
        <header className="px-4 py-3 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-hathor-purple rounded-full flex items-center justify-center text-white mr-2">
                <i className="fas fa-wallet text-sm"></i>
              </div>
              <h1 className="font-semibold text-lg">{title}</h1>
            </div>
            <div className="flex items-center space-x-2">
              <button className="w-8 h-8 flex items-center justify-center rounded-full text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800">
                <i className="fas fa-bell"></i>
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800">
                <i className="fas fa-gear"></i>
              </button>
            </div>
          </div>
        </header>
      )}

      <main className="flex-1 overflow-y-auto" id="main-content">
        {children}
      </main>

      {showNavigation && authenticated && (
        <nav className="bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 py-2 px-6 sticky bottom-0">
          <div className="flex justify-between items-center">
            <button 
              className={`flex flex-col items-center space-y-1 w-16 ${location === '/home' ? 'text-hathor-purple dark:text-hathor-light' : 'text-neutral-500 dark:text-neutral-400'}`}
              onClick={() => setLocation('/home')}
            >
              <i className="fas fa-wallet"></i>
              <span className="text-xs">Wallet</span>
            </button>
            
            <button 
              className={`flex flex-col items-center space-y-1 w-16 ${location === '/tokens' ? 'text-hathor-purple dark:text-hathor-light' : 'text-neutral-500 dark:text-neutral-400'}`}
              onClick={() => setLocation('/tokens')}
            >
              <i className="fas fa-money-bill-transfer"></i>
              <span className="text-xs">Tokens</span>
            </button>
            
            <div className="flex-shrink-0 -mt-5 relative">
              <button 
                className="w-14 h-14 rounded-full bg-hathor-purple text-white flex items-center justify-center shadow-lg"
                onClick={() => setLocation('/create')}
              >
                <i className="fas fa-plus text-lg"></i>
              </button>
            </div>
            
            <button 
              className={`flex flex-col items-center space-y-1 w-16 ${location === '/rewards' ? 'text-hathor-purple dark:text-hathor-light' : 'text-neutral-500 dark:text-neutral-400'}`}
              onClick={() => setLocation('/rewards')}
            >
              <i className="fas fa-gift"></i>
              <span className="text-xs">Rewards</span>
            </button>
            
            <button 
              className={`flex flex-col items-center space-y-1 w-16 ${location === '/profile' ? 'text-hathor-purple dark:text-hathor-light' : 'text-neutral-500 dark:text-neutral-400'}`}
              onClick={() => setLocation('/profile')}
            >
              <i className="fas fa-user"></i>
              <span className="text-xs">Profile</span>
            </button>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Layout;
