import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Alert, AlertDescription } from "./ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Key, CheckCircle2, AlertCircle } from "lucide-react";

export function SignTransaction() {
  const [rawTx, setRawTx] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [signedTx, setSignedTx] = useState("");
  const [error, setError] = useState("");

  const signTransaction = () => {
    if (!rawTx.trim()) {
      setError("Please enter a raw transaction");
      return;
    }
    if (!privateKey.trim()) {
      setError("Please enter a private key");
      return;
    }

    // Mock signing - in real app, this would use actual Bitcoin signing library
    const mockSignedTx = `01000000${rawTx.substring(0, 50)}...signed...`;
    setSignedTx(mockSignedTx);
    setError("");
  };

  return (
    <div className="max-w-5xl space-y-6">
      <Card className="border-gray-200">
        <CardHeader className="bg-gray-50/50 border-b border-gray-200">
          <CardTitle className="text-gray-900">Sign Transaction</CardTitle>
          <CardDescription>
            Sign a raw Bitcoin transaction with your private key
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="manual" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="manual">Manual Input</TabsTrigger>
              <TabsTrigger value="import">Import from File</TabsTrigger>
            </TabsList>
            
            <TabsContent value="manual" className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="rawTx" className="text-gray-700">
                  Raw Transaction (Hex)
                </Label>
                <Textarea
                  id="rawTx"
                  placeholder="Enter raw transaction hex..."
                  value={rawTx}
                  onChange={(e) => setRawTx(e.target.value)}
                  className="font-mono text-sm min-h-32 border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                />
                <p className="text-xs text-gray-500">
                  Unsigned transaction in hexadecimal format
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="privateKey" className="text-gray-700">
                  Private Key (WIF or Hex)
                </Label>
                <Input
                  id="privateKey"
                  type="password"
                  placeholder="Enter private key..."
                  value={privateKey}
                  onChange={(e) => setPrivateKey(e.target.value)}
                  className="font-mono border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                />
                <p className="text-xs text-gray-500">
                  Your private key will never leave this browser
                </p>
              </div>

              <div className="flex items-center gap-3 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0" />
                <p className="text-sm text-orange-900">
                  <span className="font-medium">Security Warning:</span> Only use test keys. Never enter mainnet private keys in a web application.
                </p>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                onClick={signTransaction}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
              >
                <Key className="w-4 h-4 mr-2" />
                Sign Transaction
              </Button>
            </TabsContent>

            <TabsContent value="import" className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                <Key className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Drop transaction file here</p>
                <p className="text-sm text-gray-500 mb-4">or click to browse</p>
                <Button variant="outline" className="border-gray-300">
                  Browse Files
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {signedTx && (
        <Card className="border-green-200 bg-green-50/50">
          <CardHeader className="bg-green-100/50 border-b border-green-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <CardTitle className="text-green-900">Signed Transaction</CardTitle>
            </div>
            <CardDescription className="text-green-700">
              Transaction successfully signed
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-gray-700">Signed Transaction (Hex)</Label>
                <Textarea
                  value={signedTx}
                  readOnly
                  className="font-mono text-sm min-h-32 bg-white border-gray-300"
                />
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => navigator.clipboard.writeText(signedTx)}
                  className="flex-1 border-gray-300"
                >
                  Copy to Clipboard
                </Button>
                <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white">
                  Broadcast Transaction
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Transaction Details */}
      <Card className="border-gray-200">
        <CardHeader className="bg-gray-50/50 border-b border-gray-200">
          <CardTitle className="text-gray-900">Signing Information</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Signature Algorithm</span>
              <span className="text-gray-900 font-mono">ECDSA (secp256k1)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Hash Type</span>
              <span className="text-gray-900 font-mono">SIGHASH_ALL</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Encoding</span>
              <span className="text-gray-900 font-mono">DER</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
