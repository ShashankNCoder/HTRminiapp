import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useWallet } from '@/context/WalletContext';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'wouter';

interface ImportWalletProps {
  onBack: () => void;
}

const ImportWallet: React.FC<ImportWalletProps> = ({ onBack }) => {
  const [seedPhrase, setSeedPhrase] = useState('');
  const [pin, setPin] = useState('');
  const { importWallet } = useWallet();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handleImportWallet = async () => {
    console.log("Import wallet button clicked");
    
    if (!seedPhrase || seedPhrase.trim() === '') {
      console.log("No seed phrase provided");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter your seed phrase."
      });
      return;
    }

    // Just show brief loading then go directly to home page
    importWallet(seedPhrase, pin);
    
    // Display success message
    toast({
      title: "Success",
      description: "Wallet imported successfully!",
    });
    
    // Navigate to home page after a short delay
    setTimeout(() => {
      setLocation('/home');
    }, 1000);
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
            <path d="M13 7h-6v6h6z" />
            <path d="M13 7l4 4v6h-6v-6l-4-4" />
            <path d="M9 11V3h12v8" />
            <path d="M3 17v4h4" />
            <path d="m5 19 4-4" />
          </svg>
        </div>
        
        <h1 className="text-xl font-bold mb-4 text-center">Import Your Hathor Wallet</h1>
        <p className="text-center text-neutral-600 dark:text-neutral-400 mb-8">
          Paste your 24-word seed phrase to access your existing wallet.
        </p>
        
        <div className="w-full space-y-4">
          <div className="relative">
            <Textarea
              placeholder="Enter your seed phrase"
              value={seedPhrase}
              onChange={(e) => setSeedPhrase(e.target.value)}
              rows={4}
              className="w-full py-3 px-4 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl text-neutral-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-hathor-purple"
            />
            <p className="text-xs text-neutral-500 mt-1 ml-1">
              Separate each word with a space.
            </p>
          </div>
          
          <div className="relative">
            <Input
              type="password"
              placeholder="Set a PIN (optional)"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full py-3 px-4 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl text-neutral-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-hathor-purple"
            />
          </div>
          
          <Button
            onClick={handleImportWallet}
            className="w-full py-3 px-6 bg-hathor-purple hover:bg-hathor-light text-white rounded-xl font-medium transition-colors shadow-md"
          >
            Import Wallet
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

export default ImportWallet;
