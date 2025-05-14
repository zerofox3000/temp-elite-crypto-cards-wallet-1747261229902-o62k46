
import { useWallet } from "@/contexts/WalletContext";
import { formatCurrency } from "@/lib/utils";
import { CreditCard, Copy, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

const CardItem = ({ card }: { card: any }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  
  const copyCardNumber = () => {
    // In a real app, this would copy the card number to clipboard
    toast.success('Card number copied to clipboard');
  };
  
  return (
    <div className="crypto-card mb-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs uppercase font-medium text-white/70">
            {card.type} Card
          </p>
          <h3 className="text-lg font-bold mt-1">
            {card.asset} Card
          </h3>
        </div>
        <div className="flex gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
            onClick={copyCardNumber}
          >
            <Copy size={16} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
          >
            <Settings size={16} />
          </Button>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-white/70" />
          <p className="font-mono font-medium">•••• •••• •••• {card.last4}</p>
        </div>
        
        <div className="flex justify-between mt-4">
          <div>
            <p className="text-xs text-white/70">BALANCE</p>
            <p className="font-medium">{formatCurrency(card.balance)}</p>
          </div>
          <div>
            <p className="text-xs text-white/70">EXPIRES</p>
            <p className="font-medium">{card.expiryDate}</p>
          </div>
          <div>
            <p className="text-xs text-white/70">STATUS</p>
            <p className="font-medium capitalize">{card.status}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CardApplication = () => {
  return (
    <div className="glass-card rounded-xl p-5 mb-6">
      <h3 className="text-lg font-bold mb-2">Apply for a Card</h3>
      <p className="text-sm text-white/70 mb-4">
        Get a crypto-backed card to spend your digital assets anywhere.
      </p>
      <div className="flex flex-col gap-3">
        <Button variant="outline" className="w-full justify-start">
          <CreditCard className="mr-2 h-4 w-4" />
          Apply for Virtual Card
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <CreditCard className="mr-2 h-4 w-4" />
          Apply for Physical Card
        </Button>
      </div>
    </div>
  );
};

const CardList = () => {
  const { wallet } = useWallet();
  
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-4">Your Cards</h2>
      
      {wallet.cards.map((card) => (
        <CardItem key={card.id} card={card} />
      ))}
      
      <CardApplication />
    </div>
  );
};

export default CardList;
