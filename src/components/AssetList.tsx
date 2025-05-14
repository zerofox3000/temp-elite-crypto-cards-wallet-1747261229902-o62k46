
import { useWallet } from "@/contexts/WalletContext";
import { formatCurrency } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const AssetCard = ({ asset }: { asset: any }) => {
  const isPositive = asset.change24h >= 0;

  return (
    <div className="asset-card flex items-center justify-between mb-3 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center">
          <span className="text-sm font-bold">{asset.symbol}</span>
        </div>
        <div>
          <h3 className="font-medium">{asset.name}</h3>
          <p className="text-sm text-white/60">{asset.balance} {asset.symbol}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-medium">{formatCurrency(asset.value)}</p>
        <p className={`text-sm flex items-center justify-end ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {isPositive ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
          {isPositive ? '+' : ''}{asset.change24h}%
        </p>
      </div>
    </div>
  );
};

const AssetList = () => {
  const { wallet } = useWallet();
  
  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Assets</h2>
        <button className="text-sm text-primary font-medium">See all</button>
      </div>
      
      {wallet.assets.map((asset) => (
        <AssetCard key={asset.id} asset={asset} />
      ))}
    </div>
  );
};

export default AssetList;
