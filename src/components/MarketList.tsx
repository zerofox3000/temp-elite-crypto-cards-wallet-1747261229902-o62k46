
import { useWallet } from "@/contexts/WalletContext";
import { formatCurrency } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const MarketItem = ({ item }: { item: any }) => {
  const isPositive = item.change24h >= 0;

  return (
    <div className="market-item flex items-center justify-between py-4 px-2 border-b border-white/5 transition-all">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center">
          <span className="text-sm font-bold">{item.symbol}</span>
        </div>
        <div>
          <h3 className="font-medium">{item.name}</h3>
          <p className="text-sm text-white/60">{item.symbol}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-medium">{formatCurrency(item.price)}</p>
        <p className={`text-sm flex items-center justify-end ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {isPositive ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
          {isPositive ? '+' : ''}{item.change24h}%
        </p>
      </div>
    </div>
  );
};

const MarketList = () => {
  const { wallet } = useWallet();
  
  return (
    <div className="mt-6 glass-card rounded-xl">
      <div className="flex justify-between items-center p-4">
        <h2 className="text-lg font-bold">Market</h2>
        <button className="text-sm text-primary font-medium">See all</button>
      </div>
      
      <div>
        {wallet.marketData.map((item) => (
          <MarketItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default MarketList;
