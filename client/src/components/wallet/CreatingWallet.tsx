import React from 'react';

const CreatingWallet: React.FC = () => {
  return (
    <div className="flex flex-col h-full items-center justify-center p-6">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="inline-block relative w-20 h-20">
            <div className="absolute inset-0 rounded-full border-4 border-hathor-purple opacity-25"></div>
            <div className="absolute inset-0 rounded-full border-t-4 border-hathor-purple animate-spin"></div>
          </div>
          <h1 className="text-xl font-bold mt-6 mb-2">Creating Your Wallet</h1>
          <p className="text-neutral-600 dark:text-neutral-400">This will just take a moment...</p>
        </div>
      </div>
    </div>
  );
};

export default CreatingWallet;
