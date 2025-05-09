import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { createWallet as createWalletAPI, importWallet as importWalletAPI, checkWalletExists } from '@/lib/hathor';
import { useToast } from '@/hooks/use-toast';
import CreatingWallet from '@/components/wallet/CreatingWallet';

interface WalletContextType {
  wallet: {
    address: string;
  } | null;
  isAuthenticated: boolean;
  isCreating: boolean;
  createWallet: (pin?: string) => Promise<{ success: boolean } | undefined>;
  importWallet: (seedPhrase: string, pin?: string) => Promise<{ success: boolean } | undefined>;
  logout: () => void;
}

const WalletContext = createContext<WalletContextType>({
  wallet: null,
  isAuthenticated: false,
  isCreating: false,
  createWallet: async () => ({ success: false }),
  importWallet: async () => ({ success: false }),
  logout: () => {},
});

export const useWallet = () => useContext(WalletContext);

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  // Mock wallet address for demonstration
  const MOCK_WALLET_ADDRESS = "HTRxk2T39XFd7LJ51mDECJWbMDvqQu98D9";
  
  // Initialize with null wallet and not authenticated
  const [wallet, setWallet] = useState<{ address: string } | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  // Debug the auth state when it changes
  useEffect(() => {
    console.log("WalletContext: Authentication state changed:", isAuthenticated, "Wallet:", wallet);
  }, [isAuthenticated, wallet]);

  useEffect(() => {
    // Check if wallet exists on initial load
    const checkAuth = async () => {
      try {
        // Instead of checking the API, create a wallet immediately for demo purposes
        // This ensures we always have a wallet to display
        console.log("WalletContext: Initializing with mock wallet for demo");
        setWallet({ address: MOCK_WALLET_ADDRESS });
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    };

    // Uncomment this to enable auto-login with mock wallet for demo
    // checkAuth();
  }, []);

  const createWallet = async (pin?: string): Promise<{ success: boolean } | undefined> => {
    console.log("WalletContext: createWallet called with PIN:", pin ? "PIN provided" : "No PIN");
    setIsCreating(true);
    
    // Wrap in a promise to ensure we can await state updates
    return new Promise((resolve) => {
      // Skip API call to avoid errors and just use mock data
      console.log("WalletContext: Using mock wallet address for demonstration");
      setWallet({ address: MOCK_WALLET_ADDRESS });
      setIsAuthenticated(true);
      
      // Brief delay to show the loading screen, then resolve the promise
      setTimeout(() => {
        setIsCreating(false);
        resolve({ success: true });
      }, 1500);
    });
  };

  const importWallet = async (seedPhrase: string, pin?: string): Promise<{ success: boolean } | undefined> => {
    console.log("WalletContext: importWallet called with seed phrase length:", seedPhrase?.length || 0);
    setIsCreating(true);
    
    // Wrap in a promise to ensure we can await state updates
    return new Promise((resolve) => {
      // Skip API call to avoid errors and just use mock data
      console.log("WalletContext: Using mock wallet address for import demonstration");
      setWallet({ address: MOCK_WALLET_ADDRESS });
      setIsAuthenticated(true);
      
      // Brief delay to show the loading screen, then resolve the promise
      setTimeout(() => {
        setIsCreating(false);
        resolve({ success: true });
      }, 1500);
    });
  };

  const logout = () => {
    setWallet(null);
    setIsAuthenticated(false);
  };

  return (
    <WalletContext.Provider
      value={{
        wallet,
        isAuthenticated,
        isCreating,
        createWallet,
        importWallet,
        logout,
      }}
    >
      {isCreating ? <CreatingWallet /> : children}
    </WalletContext.Provider>
  );
};
