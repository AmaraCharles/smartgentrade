import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface CopyTradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  traderName: string;
  traderImage?: string;
  profileLevel: string;
  tradingProfileId: string;
  accountLevel: number;
  followers: number;
  watchers: number;
  profitableTrade: number;
  onStartCopy: (amount: string, duration: string) => void;
}

export default function CopyTradeModal({
  isOpen,
  onClose,
  traderName,
  traderImage,
  profileLevel,
  tradingProfileId,
  accountLevel,
  followers,
  watchers,
  profitableTrade,
  onStartCopy,
}: CopyTradeModalProps) {
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount && duration) {
      onStartCopy(amount, duration);
      setAmount('');
      setDuration('');
      onClose();
    }
  };

  const initials = traderName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg" data-testid="modal-copy-trade">
        <DialogHeader>
          <DialogTitle>Mirror The Above Master</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center gap-4 p-4 bg-card rounded-lg border border-card-border">
            <Avatar className="h-16 w-16 ring-2 ring-primary">
              <AvatarImage src={traderImage} alt={traderName} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold" data-testid="text-copy-trader-name">
                    {traderName}
                  </h3>
                  <Badge variant="secondary" className="text-xs mt-1">
                    {profileLevel}
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Status</p>
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-chart-2"></div>
                    <span className="text-xs font-medium">online</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground text-xs">Real trading profile ID</p>
              <p className="font-semibold" data-testid="text-profile-id">{tradingProfileId}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Account Level</p>
              <p className="font-semibold">{accountLevel}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Followers</p>
              <p className="font-semibold">{followers}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Watchers</p>
              <p className="font-semibold">{watchers}</p>
            </div>
            <div className="col-span-2">
              <p className="text-muted-foreground text-xs">Profitable Trade</p>
              <p className="font-semibold">{profitableTrade}</p>
            </div>
          </div>

          <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
            <p className="text-sm text-center">
              <span className="text-primary font-medium">Add money</span> to your account in order to Mirror Trades.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="copy-amount">Enter Amount</Label>
              <Input
                id="copy-amount"
                type="number"
                step="0.01"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                data-testid="input-copy-amount"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Select Elapse Day</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger id="duration" data-testid="select-duration">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 Days</SelectItem>
                  <SelectItem value="14">14 Days</SelectItem>
                  <SelectItem value="30">30 Days</SelectItem>
                  <SelectItem value="60">60 Days</SelectItem>
                  <SelectItem value="90">90 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <p className="text-xs text-muted-foreground">
              Note: Copy Trading reward/profit depends on amount and its duration. Select a higher elapse to get the most out of copy trading.
            </p>

            <Button
              type="submit"
              className="w-full"
              data-testid="button-start-copy"
            >
              Start Copy Trading
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
