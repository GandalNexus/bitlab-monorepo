import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { AlertCircle, Rocket } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

export function NetworkSelector() {
  const [selectedNetwork, setSelectedNetwork] = useState("testnet");
  const [showComingSoon, setShowComingSoon] = useState(false);
  const { t } = useLanguage();

  const handleNetworkChange = (value: string) => {
    if (value !== "testnet") {
      setShowComingSoon(true);
    } else {
      setSelectedNetwork(value);
    }
  };

  return (
    <>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">{t.network.title}:</span>
          <Select value={selectedNetwork} onValueChange={handleNetworkChange}>
            <SelectTrigger className="w-36 h-8 border-gray-300 focus:ring-orange-500 focus:border-orange-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mainnet">{t.network.mainnet}</SelectItem>
              <SelectItem value="testnet">{t.network.testnet}</SelectItem>
              <SelectItem value="regtest">{t.network.regtest}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 hidden sm:inline-flex">
          Connected
        </Badge>
      </div>

      <Dialog open={showComingSoon} onOpenChange={setShowComingSoon}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center">
                <Rocket className="w-8 h-8 text-white" />
              </div>
            </div>
            <DialogTitle className="text-center text-2xl">Coming Soon!</DialogTitle>
            <DialogDescription className="text-center pt-2">
              We're working hard to bring support for additional Bitcoin networks.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-start gap-3 text-left bg-orange-50 p-4 rounded-lg">
              <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-orange-900">
                  <strong>Currently in development:</strong>
                </p>
                <ul className="text-sm text-orange-800 mt-2 space-y-1">
                  <li>• Mainnet support (view-only mode)</li>
                  <li>• Regtest for local testing</li>
                  <li>• Signet for advanced testing</li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-gray-600 text-center">
              For now, please use <strong className="text-orange-600">Testnet</strong> for all your development needs.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
