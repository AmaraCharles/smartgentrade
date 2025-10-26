import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function FundAccount() {
  const [wallet, setWallet] = useState('');
  const [amount, setAmount] = useState('');
  const { toast } = useToast();

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wallet || !amount) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    console.log('Deposit:', wallet, amount);
    toast({
      title: "Deposit Requested",
      description: `Depositing $${amount} via ${wallet}`,
    });
    setAmount('');
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-gradient-to-r from-card via-card to-card border border-card-border p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"></div>
        <div className="relative">
          <h1 className="text-2xl font-bold">Fund Account 💰</h1>
        </div>
      </div>

      <Card className="p-6 max-w-2xl">
        <h2 className="text-xl font-semibold mb-6">Make Deposit</h2>
        <form onSubmit={handleDeposit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="wallet">Deposit Channel</Label>
            <Select value={wallet} onValueChange={setWallet}>
              <SelectTrigger id="wallet" data-testid="select-wallet">
                <SelectValue placeholder="Select a Wallet" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bitcoin">Bitcoin</SelectItem>
                <SelectItem value="ethereum">Ethereum</SelectItem>
                <SelectItem value="usdt">USDT (TRC20)</SelectItem>
                <SelectItem value="usdt-erc20">USDT (ERC20)</SelectItem>
                <SelectItem value="bank">Bank Transfer</SelectItem>
                <SelectItem value="card">Credit/Debit Card</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="Enter Amount ($)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              data-testid="input-deposit-amount"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            data-testid="button-deposit"
          >
            Deposit
          </Button>
        </form>
      </Card>

      <div className="text-center text-xs text-muted-foreground pt-8 border-t">
        COPYRIGHT ©2025 smartgentrade, All rights Reserved
      </div>
    </div>
  );
}
