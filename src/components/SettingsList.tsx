
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  ChevronRight, 
  Shield, 
  Key, 
  Globe, 
  Bell, 
  Wallet, 
  HelpCircle, 
  LogOut
} from "lucide-react";
import { toast } from "sonner";

interface SettingsItemProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  action?: "navigate" | "switch" | "button";
  value?: boolean;
  onClick?: () => void;
  onToggle?: (value: boolean) => void;
  color?: string;
}

const SettingsItem = ({ 
  icon, 
  title, 
  description, 
  action = "navigate", 
  value, 
  onClick, 
  onToggle,
  color
}: SettingsItemProps) => {
  return (
    <div 
      className="flex items-center justify-between py-4 px-1 border-b border-white/5 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className={`h-10 w-10 rounded-full ${color || 'bg-primary/20'} flex items-center justify-center`}>
          {icon}
        </div>
        <div>
          <h3 className="font-medium">{title}</h3>
          {description && <p className="text-sm text-white/60">{description}</p>}
        </div>
      </div>
      
      <div>
        {action === "navigate" && <ChevronRight size={20} className="text-white/60" />}
        {action === "switch" && (
          <Switch 
            checked={value}
            onCheckedChange={(checked) => onToggle && onToggle(checked)}
          />
        )}
        {action === "button" && (
          <Button variant="ghost" size="sm" className="text-white/80">
            View
          </Button>
        )}
      </div>
    </div>
  );
};

const SettingsList = () => {
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  
  const handleLogout = () => {
    toast.success("Logged out successfully");
  };
  
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-6">Settings</h2>
      
      <div className="glass-card rounded-xl overflow-hidden mb-6">
        <h3 className="font-medium px-4 py-3 border-b border-white/5">Security</h3>
        
        <SettingsItem 
          icon={<Shield size={20} className="text-primary" />}
          title="Security Settings" 
          description="Passwords, PIN, 2FA"
          color="bg-primary/20"
        />
        
        <SettingsItem 
          icon={<Key size={20} className="text-accent" />}
          title="Recovery Phrase" 
          description="Backup your wallet"
          action="button"
          color="bg-accent/20"
        />
        
        <SettingsItem 
          icon={<Shield size={20} className="text-secondary" />}
          title="Biometric Authentication" 
          action="switch"
          value={biometricsEnabled}
          onToggle={setBiometricsEnabled}
          color="bg-secondary/20"
        />
      </div>
      
      <div className="glass-card rounded-xl overflow-hidden mb-6">
        <h3 className="font-medium px-4 py-3 border-b border-white/5">Preferences</h3>
        
        <SettingsItem 
          icon={<Globe size={20} className="text-blue-400" />}
          title="Language" 
          description="English (US)"
          color="bg-blue-400/20"
        />
        
        <SettingsItem 
          icon={<Bell size={20} className="text-yellow-400" />}
          title="Notifications" 
          action="switch"
          value={notificationsEnabled}
          onToggle={setNotificationsEnabled}
          color="bg-yellow-400/20"
        />
        
        <SettingsItem 
          icon={<Wallet size={20} className="text-green-400" />}
          title="Default Currency" 
          description="USD ($)"
          color="bg-green-400/20"
        />
      </div>
      
      <div className="glass-card rounded-xl overflow-hidden mb-6">
        <SettingsItem 
          icon={<HelpCircle size={20} className="text-purple-400" />}
          title="Help & Support" 
          color="bg-purple-400/20"
        />
        
        <SettingsItem 
          icon={<LogOut size={20} className="text-red-400" />}
          title="Logout" 
          onClick={handleLogout}
          color="bg-red-400/20"
        />
      </div>
      
      <div className="text-center text-white/50 text-xs mt-8">
        <p>ELITE Wallet v1.0.0</p>
        <p className="mt-1">© 2025 ELITE Wallet</p>
      </div>
    </div>
  );
};

export default SettingsList;
