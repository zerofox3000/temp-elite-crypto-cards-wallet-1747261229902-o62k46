
import { useWallet } from "@/contexts/WalletContext";
import { formatCurrency } from "@/lib/utils";
import { ArrowUp, ArrowDown, RefreshCw, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const WalletHeader = () => {
  const { wallet, refreshBalance } = useWallet();
  const [isBalanceHidden, setIsBalanceHidden] = useState(false);

  const toggleBalanceVisibility = () => {
    setIsBalanceHidden(!isBalanceHidden);
  };

  const handleRefresh = () => {
    refreshBalance();
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="wallet-card mb-6 animate-fade-in">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-sm font-bold text-white">EW</span>
          </div>
          <span className="text-sm font-medium text-white/70">
            {truncateAddress(wallet.address)}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
          onClick={toggleBalanceVisibility}
        >
          {isBalanceHidden ? <EyeOff size={16} /> : <Eye size={16} />}
        </Button>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-white/70">Total Balance</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-white/70 hover:text-white hover:bg-white/10"
            onClick={handleRefresh}
          >
            <RefreshCw size={14} />
          </Button>
        </div>
        <div className="flex items-end gap-2">
          <h1 className="text-3xl font-bold">
            {isBalanceHidden ? "••••••" : formatCurrency(wallet.balance)}
          </h1>
        </div>
      </div>

      <div className="flex gap-2 mt-6">
        <Button className="flex-1 bg-white/20 hover:bg-white/30">
          <ArrowDown className="mr-2 h-4 w-4" />
          Receive
        </Button>
        <Button className="flex-1 bg-white/20 hover:bg-white/30">
          <ArrowUp className="mr-2 h-4 w-4" />
          Send
        </Button>
      </div>
    </div>
  );
};

export default WalletHeader;
