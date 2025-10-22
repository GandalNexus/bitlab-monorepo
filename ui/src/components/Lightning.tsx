import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { Zap, AlertCircle, ArrowRight, Network, Wallet } from "lucide-react";

export function Lightning() {
  const [invoice, setInvoice] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h2 className="text-2xl text-gray-900">Lightning Network</h2>
        <p className="text-sm text-gray-600 mt-1">
          Test Lightning Network payments and channels
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="border-gray-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Active Channels</div>
                <div className="text-xl text-gray-900">0</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Wallet className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Balance</div>
                <div className="text-xl text-gray-900">0.0000 BTC</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Network className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Capacity</div>
                <div className="text-xl text-gray-900">0.0000 BTC</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Interface */}
      <Card className="border-gray-200">
        <CardHeader className="bg-gray-50/50 border-b border-gray-200">
          <CardTitle className="text-gray-900">Lightning Operations</CardTitle>
          <CardDescription>Send and receive Lightning payments</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="send" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="send">Send Payment</TabsTrigger>
              <TabsTrigger value="receive">Receive Payment</TabsTrigger>
              <TabsTrigger value="channels">Channels</TabsTrigger>
            </TabsList>

            {/* Send Payment */}
            <TabsContent value="send" className="space-y-4">
              <Alert className="border-blue-200 bg-blue-50">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-900">
                  Paste a Lightning invoice to send an instant payment
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="invoice" className="text-gray-700">
                    Lightning Invoice
                  </Label>
                  <Input
                    id="invoice"
                    placeholder="lnbc..."
                    value={invoice}
                    onChange={(e) => setInvoice(e.target.value)}
                    className="font-mono text-sm border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount</span>
                    <span className="text-gray-900 font-mono">--- BTC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Description</span>
                    <span className="text-gray-900">---</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Destination</span>
                    <span className="text-gray-900 font-mono text-xs">---</span>
                  </div>
                </div>

                <Button
                  disabled
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Send Payment
                </Button>
              </div>
            </TabsContent>

            {/* Receive Payment */}
            <TabsContent value="receive" className="space-y-4">
              <Alert className="border-blue-200 bg-blue-50">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-900">
                  Create a Lightning invoice to receive instant payments
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-gray-700">
                    Amount (BTC)
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.00001"
                    placeholder="0.00001"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-gray-700">
                    Description (Optional)
                  </Label>
                  <Input
                    id="description"
                    placeholder="Payment for..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <Button
                  disabled
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Create Invoice
                </Button>
              </div>
            </TabsContent>

            {/* Channels */}
            <TabsContent value="channels" className="space-y-4">
              <Alert className="border-blue-200 bg-blue-50">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-900">
                  Open payment channels to enable Lightning transactions
                </AlertDescription>
              </Alert>

              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Network className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg text-gray-900 mb-2">No Active Channels</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Open your first Lightning channel to start making instant payments
                </p>
                <Button
                  disabled
                  variant="outline"
                  className="border-gray-300"
                >
                  <Network className="w-4 h-4 mr-2" />
                  Open Channel
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Feature Info */}
      <Card className="border-orange-200 bg-orange-50/50">
        <CardHeader className="bg-orange-100/50 border-b border-orange-200">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-orange-600" />
            <CardTitle className="text-orange-900">Lightning Network Features</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <ArrowRight className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-gray-900 mb-1">Instant Payments</h4>
                <p className="text-sm text-gray-700">
                  Send and receive Bitcoin in milliseconds with minimal fees
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ArrowRight className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-gray-900 mb-1">Payment Channels</h4>
                <p className="text-sm text-gray-700">
                  Open bidirectional payment channels for unlimited transactions
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ArrowRight className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-gray-900 mb-1">Invoice Generation</h4>
                <p className="text-sm text-gray-700">
                  Create Lightning invoices with QR codes for easy payments
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ArrowRight className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-gray-900 mb-1">Network Routing</h4>
                <p className="text-sm text-gray-700">
                  Automatically find optimal payment routes across the Lightning Network
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Info Alert */}
      <Alert className="border-gray-200">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Getting Started:</strong> To use Lightning Network features, you'll need to 
          fund a Lightning wallet and open at least one payment channel. Visit our documentation 
          to learn more about setting up Lightning Network for testing.
        </AlertDescription>
      </Alert>
    </div>
  );
}
