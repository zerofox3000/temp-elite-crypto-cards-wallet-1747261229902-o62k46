
import { useWallet } from "@/contexts/WalletContext";
import { formatCurrency, formatTimeAgo } from "@/lib/utils";
import { ArrowUpRight, ArrowDownLeft, RefreshCw, CreditCard } from "lucide-react";

const getTransactionIcon = (type: string) => {
  switch (type) {
    case 'send':
      return <ArrowUpRight className="h-4 w-4" />;
    case 'receive':
      return <ArrowDownLeft className="h-4 w-4" />;
    case 'swap':
      return <RefreshCw className="h-4 w-4" />;
    case 'card':
      return <CreditCard className="h-4 w-4" />;
    default:
      return <ArrowUpRight className="h-4 w-4" />;
  }
};

const getTransactionColor = (type: string) => {
  switch (type) {
    case 'send':
      return 'bg-red-500/20 text-red-400';
    case 'receive':
      return 'bg-green-500/20 text-green-400';
    case 'swap':
      return 'bg-blue-500/20 text-blue-400';
    case 'card':
      return 'bg-purple-500/20 text-purple-400';
    default:
      return 'bg-gray-500/20 text-gray-400';
  }
};

const TransactionItem = ({ transaction }: { transaction: any }) => {
  return (
    <div className="flex items-center justify-between p-3 border-b border-white/5">
      <div className="flex items-center gap-3">
        <div className={`h-8 w-8 rounded-full ${getTransactionColor(transaction.type)} flex items-center justify-center`}>
          {getTransactionIcon(transaction.type)}
        </div>
        <div>
          <p className="font-medium capitalize">{transaction.type}</p>
          <p className="text-xs text-white/60">{formatTimeAgo(transaction.timestamp)}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-medium">
          {transaction.type === 'receive' ? '+' : transaction.type === 'send' ? '-' : ''}
          {transaction.amount} {transaction.symbol}
        </p>
        <p className="text-xs text-white/60">
          {transaction.type === 'card' ? transaction.address : ''}
        </p>
      </div>
    </div>
  );
};

const TransactionList = () => {
  const { wallet } = useWallet();
  
  return (
    <div className="mt-6 glass-card rounded-xl">
      <div className="flex justify-between items-center p-4">
        <h2 className="text-lg font-bold">Recent Transactions</h2>
        <button className="text-sm text-primary font-medium">See all</button>
      </div>
      
      <div className="max-h-[300px] overflow-y-auto">
        {wallet.transactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
