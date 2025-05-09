import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useWallet } from '@/context/WalletContext';
import CreateWallet from '@/components/wallet/CreateWallet';
import ImportWallet from '@/components/wallet/ImportWallet';
import CreatingWallet from '@/components/wallet/CreatingWallet';
import { checkWalletExists } from '@/lib/hathor';

enum WelcomeScreenState {
  START,
  CREATE,
  IMPORT,
  CREATING
}

const WelcomePage: React.FC = () => {
  const [screenState, setScreenState] = useState<WelcomeScreenState>(WelcomeScreenState.START);
  const { isAuthenticated } = useWallet();
  const [, setLocation] = useLocation();

  useEffect(() => {
    // If already authenticated, redirect to home page
    if (isAuthenticated) {
      setLocation('/home');
    }
    
    // Don't check for existing wallet anymore - let user choose to create/import
    // This ensures they can always see the welcome page first
  }, [isAuthenticated, setLocation]);

  const renderScreen = () => {
    switch (screenState) {
      case WelcomeScreenState.CREATE:
        return <CreateWallet onBack={() => setScreenState(WelcomeScreenState.START)} />;
      case WelcomeScreenState.IMPORT:
        return <ImportWallet onBack={() => setScreenState(WelcomeScreenState.START)} />;
      case WelcomeScreenState.CREATING:
        return <CreatingWallet />;
      case WelcomeScreenState.START:
      default:
        return (
          <div className="flex flex-col h-full items-center justify-center p-6">
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="w-40 h-40 rounded-full overflow-hidden mb-8 bg-hathor-purple/10 flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-24 h-24 text-hathor-purple"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                  <path d="M12 18V6" />
                </svg>
              </div>
              
              <h1 className="text-2xl font-bold mb-2 text-center">Welcome to HathorChat</h1>
              <p className="text-center text-neutral-600 dark:text-neutral-400 mb-10">Tokenized Communities in Telegram</p>
              
              <div className="w-full space-y-4 max-w-xs">
                <button 
                  onClick={() => setScreenState(WelcomeScreenState.CREATE)}
                  className="w-full py-3 px-6 bg-hathor-purple hover:bg-hathor-light text-white rounded-xl font-medium transition-colors shadow-md"
                >
                  Create New Wallet
                </button>
                <button 
                  onClick={() => setScreenState(WelcomeScreenState.IMPORT)}
                  className="w-full py-3 px-6 bg-white dark:bg-neutral-800 border border-hathor-purple dark:border-hathor-light text-hathor-purple dark:text-hathor-light rounded-xl font-medium transition-colors shadow-sm hover:bg-neutral-100 dark:hover:bg-neutral-700"
                >
                  Import Existing Wallet
                </button>
              </div>
            </div>
            
            <div className="mt-8 text-center text-sm text-neutral-500 dark:text-neutral-400">
              <p>Your wallet is securely tied to your Telegram account.</p>
              <p className="mt-1">No seed phrases to remember!</p>
            </div>
          </div>
        );
    }
  };

  return renderScreen();
};

export default WelcomePage;
