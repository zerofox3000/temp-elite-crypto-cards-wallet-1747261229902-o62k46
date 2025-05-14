
import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { toast } from 'sonner';

type Asset = {
  id: string;
  symbol: string;
  name: string;
  logo: string;
  balance: number;
  value: number;
  change24h: number;
};

type Card = {
  id: string;
  type: 'virtual' | 'physical';
  last4: string;
  expiryDate: string;
  status: 'active' | 'inactive' | 'frozen';
  asset: string;
  balance: number;
  limit: number;
};

type MarketData = {
  id: string;
  symbol: string;
  name: string;
  logo: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
};

type Transaction = {
  id: string;
  type: 'send' | 'receive' | 'swap' | 'card';
  amount: number;
  symbol: string;
  address: string;
  timestamp: number;
  status: 'completed' | 'pending' | 'failed';
};

type WalletState = {
  address: string;
  balance: number;
  assets: Asset[];
  transactions: Transaction[];
  cards: Card[];
  marketData: MarketData[];
  initialized: boolean;
};

type WalletContextType = {
  wallet: WalletState;
  createWallet: () => Promise<void>;
  importWallet: (seed: string) => Promise<void>;
  refreshBalance: () => Promise<void>;
  applyForCard: (type: 'virtual' | 'physical', asset: string) => Promise<void>;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  // Demo data for the wallet
  const [wallet, setWallet] = useState<WalletState>({
    address: '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7',
    balance: 28594.32,
    initialized: false,
    assets: [
      {
        id: '1',
        symbol: 'ETH',
        name: 'Ethereum',
        logo: '/ethereum-eth-logo.svg',
        balance: 5.8,
        value: 15640,
        change24h: 2.5,
      },
      {
        id: '2',
        symbol: 'BTC',
        name: 'Bitcoin',
        logo: '/bitcoin-btc-logo.svg',
        balance: 0.25,
        value: 10250,
        change24h: 1.2,
      },
      {
        id: '3',
        symbol: 'USDC',
        name: 'USD Coin',
        logo: '/usd-coin-usdc-logo.svg',
        balance: 2500,
        value: 2500,
        change24h: 0.01,
      },
      {
        id: '4',
        symbol: 'SOL',
        name: 'Solana',
        logo: '/solana-sol-logo.svg',
        balance: 25,
        value: 204.32,
        change24h: 5.6,
      }
    ],
    transactions: [
      {
        id: 't1',
        type: 'receive',
        amount: 2.5,
        symbol: 'ETH',
        address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        timestamp: Date.now() - 86400000, // 1 day ago
        status: 'completed',
      },
      {
        id: 't2',
        type: 'send',
        amount: 0.5,
        symbol: 'ETH',
        address: '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7',
        timestamp: Date.now() - 172800000, // 2 days ago
        status: 'completed',
      },
      {
        id: 't3',
        type: 'swap',
        amount: 1000,
        symbol: 'USDC',
        address: '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7',
        timestamp: Date.now() - 259200000, // 3 days ago
        status: 'completed',
      },
      {
        id: 't4',
        type: 'card',
        amount: 250,
        symbol: 'USDC',
        address: 'Coffee Shop',
        timestamp: Date.now() - 345600000, // 4 days ago
        status: 'completed',
      }
    ],
    cards: [
      {
        id: 'c1',
        type: 'virtual',
        last4: '4582',
        expiryDate: '05/27',
        status: 'active',
        asset: 'USDC',
        balance: 750,
        limit: 2000,
      }
    ],
    marketData: [
      {
        id: '1',
        symbol: 'ETH',
        name: 'Ethereum',
        logo: '/ethereum-eth-logo.svg',
        price: 2696.55,
        change24h: 2.5,
        marketCap: 324.5,
        volume24h: 15.2,
      },
      {
        id: '2',
        symbol: 'BTC',
        name: 'Bitcoin',
        logo: '/bitcoin-btc-logo.svg',
        price: 41000,
        change24h: 1.2,
        marketCap: 801.2,
        volume24h: 28.5,
      },
      {
        id: '3',
        symbol: 'SOL',
        name: 'Solana',
        logo: '/solana-sol-logo.svg',
        price: 82,
        change24h: 5.6,
        marketCap: 35.8,
        volume24h: 3.2,
      },
      {
        id: '4',
        symbol: 'USDC',
        name: 'USD Coin',
        logo: '/usd-coin-usdc-logo.svg',
        price: 1.00,
        change24h: 0.01,
        marketCap: 24.5,
        volume24h: 5.3,
      },
      {
        id: '5',
        symbol: 'MATIC',
        name: 'Polygon',
        logo: '/polygon-matic-logo.svg',
        price: 0.55,
        change24h: -2.3,
        marketCap: 5.5,
        volume24h: 0.8,
      }
    ],
  });

  useEffect(() => {
    // Simulate wallet initialization
    setTimeout(() => {
      setWallet(prev => ({ ...prev, initialized: true }));
    }, 1500);
  }, []);

  const createWallet = async () => {
    toast.success('Wallet created successfully!');
    // In a real app, this would generate a new wallet using ethers.js
  };

  const importWallet = async (seed: string) => {
    // In a real app, this would validate and import a wallet using ethers.js
    if (seed) {
      toast.success('Wallet imported successfully!');
    }
  };

  const refreshBalance = async () => {
    toast('Refreshing wallet balance...');
    // Simulate API call
    setTimeout(() => {
      toast.success('Wallet balance updated!');
    }, 1500);
  };

  const applyForCard = async (type: 'virtual' | 'physical', asset: string) => {
    toast.success(`Application for ${type} card submitted!`);
    // In a real app, this would submit the application to the API
  };

  const value = {
    wallet,
    createWallet,
    importWallet,
    refreshBalance,
    applyForCard
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
