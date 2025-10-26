import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface TradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  symbol: string;
  type: 'buy' | 'sell';
  currentPrice: string;
  onPlaceTrade: (amount: string) => void;
}

export default function TradeModal({
  isOpen,
  onClose,
  symbol,
  type,
  currentPrice,
  onPlaceTrade,
}: TradeModalProps) {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount) {
      onPlaceTrade(amount);
      setAmount('');
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" data-testid="modal-trade">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {type.toUpperCase()} {symbol}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Current Price</Label>
            <div className="text-2xl font-bold tabular-nums" data-testid="text-modal-price">
              {currentPrice}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              data-testid="input-trade-amount"
            />
          </div>

          <Button
            type="submit"
            className={`w-full ${type === 'buy' ? 'bg-chart-2 hover:bg-chart-2' : 'bg-chart-3 hover:bg-chart-3'} text-white`}
            data-testid="button-place-trade"
          >
            Place {type.toUpperCase()} Order
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
