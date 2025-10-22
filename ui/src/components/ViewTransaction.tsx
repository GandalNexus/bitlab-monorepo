import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Search, Copy, ExternalLink } from "lucide-react";

export function ViewTransaction() {
  const [txInput, setTxInput] = useState("");
  const [txData, setTxData] = useState<any>(null);

  const viewTransaction = () => {
    // Mock transaction data
    const mockTxData = {
      txid: "3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b",
      version: 2,
      locktime: 0,
      size: 225,
      vsize: 144,
      weight: 573,
      inputs: [
        {
          txid: "1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b",
          vout: 0,
          scriptSig: "483045022100...",
          sequence: 4294967295,
          value: 0.5,
        },
      ],
      outputs: [
        {
          value: 0.3,
          n: 0,
          scriptPubKey: "76a914...",
          address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
        },
        {
          value: 0.1998,
          n: 1,
          scriptPubKey: "76a914...",
          address: "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2",
        },
      ],
      confirmations: 12,
      blockHash: "00000000000000000007878ec04bb2b2e12317804810f4c26033585b3f81ffaa",
      blockTime: 1729254000,
    };

    setTxData(mockTxData);
  };

  return (
    <div className="max-w-5xl space-y-6">
      <Card className="border-gray-200">
        <CardHeader className="bg-gray-50/50 border-b border-gray-200">
          <CardTitle className="text-gray-900">View Transaction</CardTitle>
          <CardDescription>
            Decode and view Bitcoin transaction details
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="raw" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="raw">Raw Transaction</TabsTrigger>
              <TabsTrigger value="txid">Transaction ID</TabsTrigger>
            </TabsList>

            <TabsContent value="raw" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="rawTx" className="text-gray-700">
                  Raw Transaction (Hex)
                </Label>
                <Textarea
                  id="rawTx"
                  placeholder="Enter raw transaction hex..."
                  value={txInput}
                  onChange={(e) => setTxInput(e.target.value)}
                  className="font-mono text-sm min-h-32 border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <Button
                onClick={viewTransaction}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
              >
                <Search className="w-4 h-4 mr-2" />
                Decode Transaction
              </Button>
            </TabsContent>

            <TabsContent value="txid" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="txid" className="text-gray-700">
                  Transaction ID
                </Label>
                <Input
                  id="txid"
                  placeholder="Enter transaction ID..."
                  value={txInput}
                  onChange={(e) => setTxInput(e.target.value)}
                  className="font-mono border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <Button
                onClick={viewTransaction}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
              >
                <Search className="w-4 h-4 mr-2" />
                Fetch Transaction
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {txData && (
        <>
          {/* Transaction Overview */}
          <Card className="border-gray-200">
            <CardHeader className="bg-gray-50/50 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <CardTitle className="text-gray-900">Transaction Overview</CardTitle>
                <Badge className="bg-green-100 text-green-700 border-green-200">
                  {txData.confirmations} confirmations
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Transaction ID</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-900 font-mono text-xs">{txData.txid.substring(0, 16)}...</span>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Block Hash</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-900 font-mono text-xs">{txData.blockHash.substring(0, 16)}...</span>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Size / Virtual Size</span>
                  <span className="text-gray-900 font-mono">{txData.size} / {txData.vsize} bytes</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Weight</span>
                  <span className="text-gray-900 font-mono">{txData.weight} WU</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Version</span>
                  <span className="text-gray-900 font-mono">{txData.version}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Locktime</span>
                  <span className="text-gray-900 font-mono">{txData.locktime}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Inputs */}
          <Card className="border-gray-200">
            <CardHeader className="bg-gray-50/50 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <CardTitle className="text-gray-900">Inputs</CardTitle>
                <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                  {txData.inputs.length}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {txData.inputs.map((input: any, index: number) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50/30">
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Previous Output</span>
                        <span className="text-gray-900 font-mono text-xs">
                          {input.txid.substring(0, 16)}...:{input.vout}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Value</span>
                        <span className="text-gray-900 font-mono">{input.value} BTC</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sequence</span>
                        <span className="text-gray-900 font-mono">{input.sequence}</span>
                      </div>
                      <div>
                        <span className="text-gray-600 block mb-1">ScriptSig</span>
                        <code className="text-xs bg-white p-2 rounded border border-gray-200 block break-all">
                          {input.scriptSig}
                        </code>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Outputs */}
          <Card className="border-gray-200">
            <CardHeader className="bg-gray-50/50 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <CardTitle className="text-gray-900">Outputs</CardTitle>
                <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                  {txData.outputs.length}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {txData.outputs.map((output: any, index: number) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50/30">
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Output Index</span>
                        <span className="text-gray-900 font-mono">{output.n}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Value</span>
                        <span className="text-gray-900 font-mono">{output.value} BTC</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Address</span>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-900 font-mono text-xs">{output.address}</span>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600 block mb-1">ScriptPubKey</span>
                        <code className="text-xs bg-white p-2 rounded border border-gray-200 block break-all">
                          {output.scriptPubKey}
                        </code>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Raw JSON */}
          <Card className="border-gray-200">
            <CardHeader className="bg-gray-50/50 border-b border-gray-200">
              <CardTitle className="text-gray-900">Raw JSON</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <Textarea
                value={JSON.stringify(txData, null, 2)}
                readOnly
                className="font-mono text-xs min-h-64 bg-gray-50 border-gray-300"
              />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
