
import { useState, useEffect, useRef } from "react";
import { WalletProvider } from "@/contexts/WalletContext";
import WalletHeader from "@/components/WalletHeader";
import AssetList from "@/components/AssetList";
import TransactionList from "@/components/TransactionList";
import CardList from "@/components/CardList";
import MarketList from "@/components/MarketList";
import PriceChart from "@/components/PriceChart";
import QRScanner from "@/components/QRScanner";
import SettingsList from "@/components/SettingsList";
import AppTabs from "@/components/AppTabs";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setScrollY(containerRef.current.scrollTop);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <>
            <WalletHeader />
            <AssetList />
            <TransactionList />
          </>
        );
      case "cards":
        return <CardList />;
      case "market":
        return (
          <>
            <PriceChart symbol="ETH" />
            <MarketList />
          </>
        );
      case "scan":
        return <QRScanner />;
      case "settings":
        return <SettingsList />;
      default:
        return <WalletHeader />;
    }
  };

  const parallaxStyle = {
    transform: `translateY(${scrollY * 0.3}px)`,
    transition: "transform 0.1s ease-out"
  };

  return (
    <WalletProvider>
      <div className="min-h-screen bg-[#16161A] text-[#FFFFFE] relative overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/lovable-uploads/556f1244-4ff8-4158-99c0-d689c44ec04b.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            ...parallaxStyle
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-0" style={parallaxStyle}></div>
        <div 
          ref={containerRef}
          className="max-w-md mx-auto p-4 pb-20 relative z-10 h-screen overflow-y-auto"
        >
          {renderTabContent()}
        </div>
        <AppTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </WalletProvider>
  );
};

export default Index;
