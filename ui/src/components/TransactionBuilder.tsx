import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Plus, Trash2, ArrowRight } from "lucide-react";
import { Badge } from "./ui/badge";

interface TxInput {
  id: string;
  txid: string;
  vout: number;
  sequence: number;
}

interface TxOutput {
  id: string;
  address: string;
  amount: string;
}

export function TransactionBuilder() {
  const [inputs, setInputs] = useState<TxInput[]>([
    { id: "1", txid: "", vout: 0, sequence: 0xffffffff },
  ]);
  const [outputs, setOutputs] = useState<TxOutput[]>([
    { id: "1", address: "", amount: "" },
  ]);
  const [locktime, setLocktime] = useState("0");
  const [version, setVersion] = useState("2");

  const addInput = () => {
    setInputs([...inputs, { id: Date.now().toString(), txid: "", vout: 0, sequence: 0xffffffff }]);
  };

  const removeInput = (id: string) => {
    if (inputs.length > 1) {
      setInputs(inputs.filter(input => input.id !== id));
    }
  };

  const addOutput = () => {
    setOutputs([...outputs, { id: Date.now().toString(), address: "", amount: "" }]);
  };

  const removeOutput = (id: string) => {
    if (outputs.length > 1) {
      setOutputs(outputs.filter(output => output.id !== id));
    }
  };

  const buildTransaction = () => {
    const tx = {
      version: parseInt(version),
      locktime: parseInt(locktime),
      inputs: inputs.map(input => ({
        txid: input.txid,
        vout: input.vout,
        sequence: input.sequence,
      })),
      outputs: outputs.map(output => ({
        address: output.address,
        amount: parseFloat(output.amount),
      })),
    };
    console.log("Built transaction:", tx);
    alert("Transaction built! Check console for details.");
  };

  return (
    <div className="max-w-5xl space-y-6">
      {/* Transaction Parameters */}
      <Card className="border-gray-200">
        <CardHeader className="bg-gray-50/50 border-b border-gray-200">
          <CardTitle className="text-gray-900">Transaction Parameters</CardTitle>
          <CardDescription>Configure basic transaction settings</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="version" className="text-gray-700">Version</Label>
              <Input
                id="version"
                type="number"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                className="border-gray-300 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="locktime" className="text-gray-700">Locktime</Label>
              <Input
                id="locktime"
                type="number"
                value={locktime}
                onChange={(e) => setLocktime(e.target.value)}
                className="border-gray-300 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inputs */}
      <Card className="border-gray-200">
        <CardHeader className="bg-gray-50/50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-gray-900">Inputs</CardTitle>
              <CardDescription>Define transaction inputs (UTXOs)</CardDescription>
            </div>
            <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
              {inputs.length} input{inputs.length !== 1 ? 's' : ''}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {inputs.map((input, index) => (
              <div key={input.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50/30">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600">Input #{index + 1}</span>
                  {inputs.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeInput(input.id)}
                      className="h-7 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div className="grid gap-3">
                  <div className="space-y-2">
                    <Label className="text-xs text-gray-600">Transaction ID (txid)</Label>
                    <Input
                      placeholder="64-character hex string"
                      value={input.txid}
                      onChange={(e) => {
                        const newInputs = [...inputs];
                        newInputs[index].txid = e.target.value;
                        setInputs(newInputs);
                      }}
                      className="font-mono text-sm border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label className="text-xs text-gray-600">Output Index (vout)</Label>
                      <Input
                        type="number"
                        value={input.vout}
                        onChange={(e) => {
                          const newInputs = [...inputs];
                          newInputs[index].vout = parseInt(e.target.value) || 0;
                          setInputs(newInputs);
                        }}
                        className="border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs text-gray-600">Sequence</Label>
                      <Input
                        type="number"
                        value={input.sequence}
                        onChange={(e) => {
                          const newInputs = [...inputs];
                          newInputs[index].sequence = parseInt(e.target.value) || 0;
                          setInputs(newInputs);
                        }}
                        className="border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={addInput}
              className="w-full border-dashed border-gray-300 text-orange-600 hover:bg-orange-50 hover:text-orange-700 hover:border-orange-300"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Input
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Outputs */}
      <Card className="border-gray-200">
        <CardHeader className="bg-gray-50/50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-gray-900">Outputs</CardTitle>
              <CardDescription>Define transaction outputs</CardDescription>
            </div>
            <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
              {outputs.length} output{outputs.length !== 1 ? 's' : ''}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {outputs.map((output, index) => (
              <div key={output.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50/30">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600">Output #{index + 1}</span>
                  {outputs.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeOutput(output.id)}
                      className="h-7 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div className="grid gap-3">
                  <div className="space-y-2">
                    <Label className="text-xs text-gray-600">Address</Label>
                    <Input
                      placeholder="Bitcoin address"
                      value={output.address}
                      onChange={(e) => {
                        const newOutputs = [...outputs];
                        newOutputs[index].address = e.target.value;
                        setOutputs(newOutputs);
                      }}
                      className="font-mono text-sm border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-gray-600">Amount (BTC)</Label>
                    <Input
                      type="number"
                      step="0.00000001"
                      placeholder="0.00000000"
                      value={output.amount}
                      onChange={(e) => {
                        const newOutputs = [...outputs];
                        newOutputs[index].amount = e.target.value;
                        setOutputs(newOutputs);
                      }}
                      className="border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={addOutput}
              className="w-full border-dashed border-gray-300 text-orange-600 hover:bg-orange-50 hover:text-orange-700 hover:border-orange-300"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Output
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" className="border-gray-300">
          Reset
        </Button>
        <Button 
          onClick={buildTransaction}
          className="bg-orange-500 hover:bg-orange-600 text-white"
        >
          Build Transaction
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
