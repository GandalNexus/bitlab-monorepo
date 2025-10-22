import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Alert, AlertDescription } from "./ui/alert";
import { Badge } from "./ui/badge";
import { Droplets, AlertCircle, CheckCircle2, Clock, ExternalLink } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface FaucetRequest {
  address: string;
  amount: number;
  txid: string;
  timestamp: number;
  status: "pending" | "confirmed";
}

export function Faucet() {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("0.1");
  const [recentRequests, setRecentRequests] = useState<FaucetRequest[]>([]);
  const [isRequesting, setIsRequesting] = useState(false);

  const requestFunds = async () => {
    if (!address.trim()) {
      toast.error("Please enter a Bitcoin address");
      return;
    }

    if (!address.startsWith("tb1") && !address.startsWith("m") && !address.startsWith("n")) {
      toast.error("Please enter a valid testnet address");
      return;
    }

    setIsRequesting(true);

    // Simulate API call
    setTimeout(() => {
      const mockTxid = Array.from({ length: 64 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join("");

      const newRequest: FaucetRequest = {
        address,
        amount: parseFloat(amount),
        txid: mockTxid,
        timestamp: Date.now(),
        status: "pending",
      };

      setRecentRequests([newRequest, ...recentRequests]);
      toast.success(`Successfully sent ${amount} tBTC to your address!`);
      setAddress("");
      setIsRequesting(false);

      // Simulate confirmation after 3 seconds
      setTimeout(() => {
        setRecentRequests((prev) =>
          prev.map((req) =>
            req.txid === mockTxid ? { ...req, status: "confirmed" } : req
          )
        );
      }, 3000);
    }, 2000);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h2 className="text-2xl text-gray-900">Testnet Faucet</h2>
        <p className="text-sm text-gray-600 mt-1">
          Get free testnet Bitcoin for development and testing
        </p>
      </div>

      {/* Faucet Card */}
      <Card className="border-gray-200">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-white border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
              <Droplets className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-gray-900">Request Testnet Bitcoin</CardTitle>
              <CardDescription>Receive up to 0.5 tBTC per request</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <Alert className="border-blue-200 bg-blue-50">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-900">
              Testnet Bitcoin has no monetary value and is only for testing purposes.
              Please use responsibly.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address" className="text-gray-700">
                Testnet Address
              </Label>
              <Input
                id="address"
                placeholder="tb1q... or m/n address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="font-mono border-gray-300 focus:ring-orange-500 focus:border-orange-500"
              />
              <p className="text-xs text-gray-500">
                Enter your testnet Bitcoin address to receive funds
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount" className="text-gray-700">
                Amount (tBTC)
              </Label>
              <div className="flex gap-2">
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0.01"
                  max="0.5"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                />
                <Button
                  variant="outline"
                  onClick={() => setAmount("0.1")}
                  className="border-gray-300"
                >
                  0.1
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setAmount("0.5")}
                  className="border-gray-300"
                >
                  0.5
                </Button>
              </div>
            </div>

            <Button
              onClick={requestFunds}
              disabled={isRequesting}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white h-12"
            >
              {isRequesting ? (
                <>
                  <Clock className="w-4 h-4 mr-2 animate-spin" />
                  Sending Funds...
                </>
              ) : (
                <>
                  <Droplets className="w-4 h-4 mr-2" />
                  Request Testnet Bitcoin
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Faucet Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="border-gray-200">
          <CardContent className="pt-6">
            <div className="text-sm text-gray-600 mb-1">Available Balance</div>
            <div className="text-2xl text-gray-900">1,234.5 tBTC</div>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="pt-6">
            <div className="text-sm text-gray-600 mb-1">Requests Today</div>
            <div className="text-2xl text-gray-900">47</div>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="pt-6">
            <div className="text-sm text-gray-600 mb-1">Average Wait Time</div>
            <div className="text-2xl text-gray-900">~2 min</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Requests */}
      {recentRequests.length > 0 && (
        <Card className="border-gray-200">
          <CardHeader className="bg-gray-50/50 border-b border-gray-200">
            <CardTitle className="text-gray-900">Recent Requests</CardTitle>
            <CardDescription>Your faucet transaction history</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {recentRequests.map((request) => (
                <div
                  key={request.txid}
                  className="p-4 border border-gray-200 rounded-lg bg-gray-50/30 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {request.status === "confirmed" ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      ) : (
                        <Clock className="w-5 h-5 text-orange-500 animate-pulse" />
                      )}
                      <Badge
                        variant="outline"
                        className={
                          request.status === "confirmed"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-orange-50 text-orange-700 border-orange-200"
                        }
                      >
                        {request.status === "confirmed" ? "Confirmed" : "Pending"}
                      </Badge>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(request.timestamp).toLocaleTimeString()}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount</span>
                      <span className="text-gray-900 font-mono">{request.amount} tBTC</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Address</span>
                      <span className="text-gray-900 font-mono text-xs">
                        {request.address.substring(0, 12)}...
                        {request.address.substring(request.address.length - 8)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Transaction ID</span>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-900 font-mono text-xs">
                          {request.txid.substring(0, 8)}...
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Info */}
      <Alert className="border-gray-200">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <p className="mb-2">
            <strong>Faucet Limits:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Maximum 0.5 tBTC per request</li>
            <li>One request per address every 24 hours</li>
            <li>Funds typically arrive within 10 minutes</li>
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  );
}
