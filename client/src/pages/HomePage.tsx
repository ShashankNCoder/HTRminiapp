import React, { useEffect, useState } from 'react';
import { useWallet } from '@/context/WalletContext';
import Layout from '@/components/Layout';
import TokenCard from '@/components/wallet/TokenCard';
import NftBadgeCard from '@/components/wallet/NftBadge';
import TransactionItem from '@/components/wallet/TransactionItem';
import { TokenBalance, Transaction, NFTBadge, mockTokens, mockTransactions, mockNFTBadges } from '@/lib/hathor';
import { copyToClipboard } from '@/lib/telegram';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';

const HomePage: React.FC = () => {
  const { wallet, isAuthenticated } = useWallet();
  const { toast } = useToast();
  
  const [tokens, setTokens] = useState<TokenBalance[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [badges, setBadges] = useState<NFTBadge[]>([]);

  // Queries for wallet data
  const { data: balanceData, isLoading: isBalanceLoading } = useQuery({
    queryKey: ['/api/wallet/balance'],
    enabled: isAuthenticated,
  });

  const { data: transactionsData, isLoading: isTransactionsLoading } = useQuery({
    queryKey: ['/api/wallet/transactions'],
    enabled: isAuthenticated,
  });

  const { data: badgesData, isLoading: isBadgesLoading } = useQuery({
    queryKey: ['/api/wallet/nft-badges'],
    enabled: isAuthenticated,
  });

  // Always use mock data for this demo
  useEffect(() => {
    // Always set mock data for demo purposes, regardless of authentication state
    console.log("HomePage: Setting mock data for wallet display");
    
    // Use mock data directly without API calls
    setTokens(mockTokens);
    setTransactions(mockTransactions);
    setBadges(mockNFTBadges);
    
  }, []);

  // We're not processing query data for this demo, just using mock data

  const handleCopyAddress = () => {
    if (wallet?.address) {
      copyToClipboard(wallet.address, 'Wallet address copied to clipboard!');
    }
  };

  return (
    <Layout showHeader showNavigation>
      <div className="p-4">
        <div className="bg-gradient-primary rounded-xl p-5 text-white shadow-md">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-sm font-medium opacity-80">Total Balance</h2>
              <div className="flex items-baseline mt-1">
                <span className="text-2xl font-bold">
                  {tokens[0]?.balance.toLocaleString() || '0'}
                </span>
                <span className="ml-1 text-sm opacity-80">HTR</span>
              </div>
              <p className="text-xs opacity-70 mt-1">
                ≈ ${tokens[0]?.usdValue?.toLocaleString() || '0'} USD
              </p>
            </div>
            <button className="bg-white/20 rounded-lg p-2 hover:bg-white/30 transition-colors">
              <i className="fas fa-qrcode text-white"></i>
            </button>
          </div>
          <div className="flex space-x-3 mt-5">
            <button className="flex-1 bg-white/20 rounded-lg py-2 hover:bg-white/30 transition-colors flex items-center justify-center">
              <i className="fas fa-arrow-up mr-2"></i>
              <span>Send</span>
            </button>
            <button className="flex-1 bg-white/20 rounded-lg py-2 hover:bg-white/30 transition-colors flex items-center justify-center">
              <i className="fas fa-arrow-down mr-2"></i>
              <span>Receive</span>
            </button>
            <button className="flex-1 bg-white/20 rounded-lg py-2 hover:bg-white/30 transition-colors flex items-center justify-center">
              <i className="fas fa-exchange-alt mr-2"></i>
              <span>Swap</span>
            </button>
          </div>
        </div>
      </div>

      {/* Wallet Address (Copyable) */}
      <div className="px-4 mb-4">
        <div className="bg-white dark:bg-neutral-800 rounded-lg p-3 flex items-center justify-between shadow-sm border border-neutral-200 dark:border-neutral-700">
          <div className="truncate flex-1">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Wallet Address</p>
            <p className="text-sm font-mono truncate" id="wallet-address">
              {wallet?.address || "HTRxk2T39XFd7LJ51mDECJWbMDvqQu98D9"}
            </p>
          </div>
          <button
            className="ml-2 w-8 h-8 flex items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300"
            onClick={handleCopyAddress}
          >
            <i className="fas fa-copy"></i>
          </button>
        </div>
      </div>

      {/* My Tokens Section */}
      <div className="px-4 mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold">My Tokens</h2>
          <button className="text-sm text-hathor-purple dark:text-hathor-light">View All</button>
        </div>
        
        <div className="space-y-3">
          {isBalanceLoading ? (
            <div className="text-center py-4">
              <div className="w-6 h-6 border-t-2 border-b-2 border-hathor-purple rounded-full animate-spin mx-auto"></div>
              <p className="text-sm text-neutral-500 mt-2">Loading tokens...</p>
            </div>
          ) : tokens.length > 0 ? (
            tokens.map((token) => (
              <TokenCard key={token.id} token={token} />
            ))
          ) : (
            <div className="text-center py-4 text-neutral-500">
              <p>No tokens found</p>
            </div>
          )}
        </div>
      </div>

      {/* My NFT Badges */}
      <div className="px-4 mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold">My NFT Badges</h2>
          <button className="text-sm text-hathor-purple dark:text-hathor-light">View All</button>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          {isBadgesLoading ? (
            <div className="text-center py-4 col-span-3">
              <div className="w-6 h-6 border-t-2 border-b-2 border-hathor-purple rounded-full animate-spin mx-auto"></div>
              <p className="text-sm text-neutral-500 mt-2">Loading badges...</p>
            </div>
          ) : badges.length > 0 ? (
            badges.map((badge) => (
              <NftBadgeCard key={badge.id} badge={badge} />
            ))
          ) : (
            <div className="text-center py-4 col-span-3 text-neutral-500">
              <p>No badges found</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="px-4 mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold">Recent Activity</h2>
          <button className="text-sm text-hathor-purple dark:text-hathor-light">View All</button>
        </div>
        
        <div className="space-y-3">
          {isTransactionsLoading ? (
            <div className="text-center py-4">
              <div className="w-6 h-6 border-t-2 border-b-2 border-hathor-purple rounded-full animate-spin mx-auto"></div>
              <p className="text-sm text-neutral-500 mt-2">Loading transactions...</p>
            </div>
          ) : transactions.length > 0 ? (
            transactions.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))
          ) : (
            <div className="text-center py-4 text-neutral-500">
              <p>No recent activity</p>
            </div>
          )}
        </div>
      </div>

      {/* Content Teaser - Token-Gated Access */}
      <div className="px-4 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-5 text-white shadow-md">
          <div className="w-full h-32 bg-blue-400/30 rounded-lg mb-4 flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-16 h-16 text-white/80"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
              <path d="M8 10h8" />
              <path d="M12 14V6" />
            </svg>
          </div>
          
          <h3 className="font-bold text-lg mb-1">Exclusive Content Available</h3>
          <p className="text-sm opacity-90 mb-4">Access premium resources by holding 10+ BREW tokens in your wallet.</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-blue-500 mr-2">
                <i className="fas fa-lock-open text-xs"></i>
              </div>
              <span className="text-sm font-medium">You qualify!</span>
            </div>
            <button className="bg-white text-blue-500 rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-50">
              View Content
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
