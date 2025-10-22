import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Plus, Wallet, Copy, Trash2, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface WalletData {
  id: string;
  name: string;
  address: string;
  privateKey: string;
  publicKey: string;
  createdAt: number;
}

export function WalletManager() {
  const [wallets, setWallets] = useState<WalletData[]>([]);
  const [showPrivateKey, setShowPrivateKey] = useState<{ [key: string]: boolean }>({});
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newWalletName, setNewWalletName] = useState("");

  // Load wallets from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("bitcoin-lab-wallets");
    if (stored) {
      try {
        setWallets(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse wallets:", e);
      }
    }
  }, []);

  // Save wallets to localStorage whenever they change
  useEffect(() => {
    if (wallets.length > 0) {
      localStorage.setItem("bitcoin-lab-wallets", JSON.stringify(wallets));
    }
  }, [wallets]);

  const generateMockWallet = (name: string): WalletData => {
    // Mock wallet generation - in production, use proper Bitcoin libraries
    const randomHex = (length: number) =>
      Array.from({ length }, () => Math.floor(Math.random() * 16).toString(16)).join("");
    
    return {
      id: Date.now().toString(),
      name,
      address: `tb1q${randomHex(38)}`,
      privateKey: randomHex(64),
      publicKey: `02${randomHex(64)}`,
      createdAt: Date.now(),
    };
  };

  const createWallet = () => {
    if (!newWalletName.trim()) {
      toast.error("Please enter a wallet name");
      return;
    }

    const newWallet = generateMockWallet(newWalletName);
    setWallets([...wallets, newWallet]);
    setNewWalletName("");
    setIsCreateDialogOpen(false);
    toast.success(`Wallet "${newWalletName}" created successfully!`);
  };

  const deleteWallet = (id: string) => {
    const wallet = wallets.find((w) => w.id === id);
    if (wallet && confirm(`Are you sure you want to delete wallet "${wallet.name}"?`)) {
      setWallets(wallets.filter((w) => w.id !== id));
      toast.success("Wallet deleted");
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const togglePrivateKey = (id: string) => {
    setShowPrivateKey((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-gray-900">Wallet Manager</h2>
          <p className="text-sm text-gray-600 mt-1">
            Manage your test wallets for Bitcoin development
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create Wallet
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Wallet</DialogTitle>
              <DialogDescription>
                Generate a new testnet wallet for development
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="walletName">Wallet Name</Label>
                <Input
                  id="walletName"
                  placeholder="e.g., Testing Wallet 1"
                  value={newWalletName}
                  onChange={(e) => setNewWalletName(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && createWallet()}
                  className="border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsCreateDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={createWallet}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                Create Wallet
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Alert className="border-orange-200 bg-orange-50">
        <CheckCircle2 className="h-4 w-4 text-orange-600" />
        <AlertDescription className="text-orange-900">
          All wallets are stored locally in your browser. Your private keys never leave your device.
        </AlertDescription>
      </Alert>

      {wallets.length === 0 ? (
        <Card className="border-gray-200">
          <CardContent className="py-16 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wallet className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg text-gray-900 mb-2">No Wallets Yet</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Create your first test wallet to start building and testing Bitcoin applications
            </p>
            <Button
              onClick={() => setIsCreateDialogOpen(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Wallet
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {wallets.map((wallet) => (
            <Card key={wallet.id} className="border-gray-200 hover:border-orange-200 transition-colors">
              <CardHeader className="bg-gray-50/50 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-lg flex items-center justify-center">
                      <Wallet className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-gray-900">{wallet.name}</CardTitle>
                      <CardDescription className="text-xs">
                        Created {new Date(wallet.createdAt).toLocaleDateString()}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Active
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                {/* Address */}
                <div className="space-y-2">
                  <Label className="text-xs text-gray-600">Address</Label>
                  <div className="flex gap-2">
                    <Input
                      value={wallet.address}
                      readOnly
                      className="font-mono text-sm bg-gray-50 border-gray-300"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(wallet.address, "Address")}
                      className="px-3 border-gray-300"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Public Key */}
                <div className="space-y-2">
                  <Label className="text-xs text-gray-600">Public Key</Label>
                  <div className="flex gap-2">
                    <Input
                      value={wallet.publicKey}
                      readOnly
                      className="font-mono text-sm bg-gray-50 border-gray-300"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(wallet.publicKey, "Public key")}
                      className="px-3 border-gray-300"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Private Key */}
                <div className="space-y-2">
                  <Label className="text-xs text-gray-600">Private Key</Label>
                  <div className="flex gap-2">
                    <Input
                      type={showPrivateKey[wallet.id] ? "text" : "password"}
                      value={wallet.privateKey}
                      readOnly
                      className="font-mono text-sm bg-gray-50 border-gray-300"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => togglePrivateKey(wallet.id)}
                      className="px-3 border-gray-300"
                    >
                      {showPrivateKey[wallet.id] ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(wallet.privateKey, "Private key")}
                      className="px-3 border-gray-300"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2 border-t border-gray-100">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-gray-300"
                  >
                    Export Wallet
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteWallet(wallet.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 border-gray-300"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
