import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useWallet } from '@/context/WalletContext';
import { useToast } from '@/hooks/use-toast';

interface CreateWalletProps {
  onBack: () => void;
}

const CreateWallet: React.FC<CreateWalletProps> = ({ onBack }) => {
  const [pin, setPin] = useState('');
  const { createWallet } = useWallet();
  const { toast } = useToast();

  const handleCreateWallet = async () => {
    try {
      await createWallet(pin);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create wallet. Please try again."
      });
    }
  };

  return (
    <div className="flex flex-col h-full items-center justify-center p-6">
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-xs">
        <div className="w-48 h-48 mb-6 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-full h-full text-hathor-purple"
          >
            <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
            <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
            <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
          </svg>
        </div>
        
        <h1 className="text-xl font-bold mb-4 text-center">Create Your Hathor Wallet</h1>
        <p className="text-center text-neutral-600 dark:text-neutral-400 mb-8">
          We'll generate a secure wallet linked to your Telegram account.
        </p>
        
        <div className="w-full space-y-4">
          <div className="relative">
            <Input
              type="password"
              placeholder="Set a PIN (optional)"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full py-3 px-4 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl text-neutral-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-hathor-purple"
            />
            <p className="text-xs text-neutral-500 mt-1 ml-1">
              This PIN adds extra security to your wallet.
            </p>
          </div>
          
          <Button
            onClick={handleCreateWallet}
            className="w-full py-3 px-6 bg-hathor-purple hover:bg-hathor-light text-white rounded-xl font-medium transition-colors shadow-md"
          >
            Create My Wallet
          </Button>
          
          <Button
            variant="ghost"
            onClick={onBack}
            className="w-full py-2 text-neutral-600 dark:text-neutral-400 hover:text-hathor-purple dark:hover:text-hathor-light"
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateWallet;
