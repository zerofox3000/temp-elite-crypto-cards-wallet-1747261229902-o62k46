
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, CreditCard, BarChart2, Scan, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const AppTabs = ({ activeTab, onTabChange }: AppTabsProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-white/10 bg-[#16161A]/80 backdrop-blur-lg z-10">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="w-full h-16 bg-transparent">
          <TabsTrigger
            value="home"
            className={cn(
              "flex-1 flex flex-col items-center gap-1 h-full data-[state=active]:bg-transparent",
              activeTab === "home" ? "text-primary" : "text-white/60"
            )}
          >
            <Home size={20} />
            <span className="text-xs">Home</span>
          </TabsTrigger>
          
          <TabsTrigger
            value="cards"
            className={cn(
              "flex-1 flex flex-col items-center gap-1 h-full data-[state=active]:bg-transparent",
              activeTab === "cards" ? "text-primary" : "text-white/60"
            )}
          >
            <CreditCard size={20} />
            <span className="text-xs">Cards</span>
          </TabsTrigger>
          
          <TabsTrigger
            value="market"
            className={cn(
              "flex-1 flex flex-col items-center gap-1 h-full data-[state=active]:bg-transparent",
              activeTab === "market" ? "text-primary" : "text-white/60"
            )}
          >
            <BarChart2 size={20} />
            <span className="text-xs">Market</span>
          </TabsTrigger>
          
          <TabsTrigger
            value="scan"
            className={cn(
              "flex-1 flex flex-col items-center gap-1 h-full data-[state=active]:bg-transparent",
              activeTab === "scan" ? "text-primary" : "text-white/60"
            )}
          >
            <Scan size={20} />
            <span className="text-xs">Scan</span>
          </TabsTrigger>
          
          <TabsTrigger
            value="settings"
            className={cn(
              "flex-1 flex flex-col items-center gap-1 h-full data-[state=active]:bg-transparent",
              activeTab === "settings" ? "text-primary" : "text-white/60"
            )}
          >
            <Settings size={20} />
            <span className="text-xs">Settings</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default AppTabs;
