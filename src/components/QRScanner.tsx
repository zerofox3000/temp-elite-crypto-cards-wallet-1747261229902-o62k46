
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Scan, Upload } from "lucide-react";

const QRScanner = () => {
  const [scanActive, setScanActive] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  
  const startScan = () => {
    setScanActive(true);
    // In a real implementation, this would activate the camera
    toast("QR Scanner activated");
    
    // Simulate scanning after a delay
    setTimeout(() => {
      const demoAddress = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";
      setScanResult(demoAddress);
      setScanActive(false);
      toast.success("QR Code scanned successfully");
    }, 3000);
  };
  
  const stopScan = () => {
    setScanActive(false);
    toast("QR Scanner deactivated");
  };
  
  const uploadQR = () => {
    // In a real app, this would open a file picker
    toast("Upload QR Code");
  };
  
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="glass-card rounded-xl w-full max-w-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 text-center">QR Scanner</h2>
        
        <Tabs defaultValue="scan" className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="scan" className="flex-1">Scan QR</TabsTrigger>
            <TabsTrigger value="upload" className="flex-1">Upload QR</TabsTrigger>
          </TabsList>
          
          <TabsContent value="scan">
            <div className="flex flex-col items-center">
              <div className="w-full aspect-square bg-black/30 rounded-xl mb-4 relative overflow-hidden">
                {scanActive ? (
                  <>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-48 w-48 border-2 border-primary relative">
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary"></div>
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary"></div>
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary"></div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary"></div>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/30"></div>
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-primary/50 animate-pulse-subtle"></div>
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Scan size={64} className="text-white/30" />
                  </div>
                )}
              </div>
              
              {scanResult ? (
                <div className="bg-card/80 p-3 rounded-lg w-full mb-4">
                  <p className="text-sm text-white/70 mb-1">Scanned Address:</p>
                  <p className="font-mono text-sm break-all">{scanResult}</p>
                </div>
              ) : null}
              
              <Button 
                className="w-full" 
                onClick={scanActive ? stopScan : startScan}
                variant={scanActive ? "destructive" : "default"}
              >
                {scanActive ? "Stop Scanning" : "Start Scanning"}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="upload">
            <div className="flex flex-col items-center">
              <div 
                className="w-full aspect-square bg-black/30 rounded-xl mb-4 flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-white/20 hover:border-white/40 transition-colors"
                onClick={uploadQR}
              >
                <Upload size={48} className="text-white/30 mb-4" />
                <p className="text-white/70 text-center">
                  Click to upload QR code<br />
                  <span className="text-xs">PNG, JPG or GIF</span>
                </p>
              </div>
              
              <Button className="w-full" onClick={uploadQR}>
                Upload QR Image
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="text-center text-white/50 text-sm">
        <p>Scan a QR code to send funds or<br />connect to a DApp</p>
      </div>
    </div>
  );
};

export default QRScanner;
