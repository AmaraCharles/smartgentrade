import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Heart } from "lucide-react";

interface MasterTraderCardProps {
  name: string;
  profileLevel: string;
  rating: number;
  numberOfTrades: number;
  commission: number;
  profitAndLoss: string;
  imageUrl?: string;
  onMirrorTrade: () => void;
  onFavorite?: () => void;
  isFavorite?: boolean;
}

export default function MasterTraderCard({
  name,
  profileLevel,
  rating,
  numberOfTrades,
  commission,
  profitAndLoss,
  imageUrl,
  onMirrorTrade,
  onFavorite,
  isFavorite = false,
}: MasterTraderCardProps) {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card className="p-6 space-y-4" data-testid={`card-trader-${name.replace(/\s+/g, '-').toLowerCase()}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-16 w-16">
            <AvatarImage src={imageUrl} alt={name} />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h3 className="font-semibold" data-testid={`text-trader-name-${name.replace(/\s+/g, '-').toLowerCase()}`}>
              {name}
            </h3>
            <Badge variant="secondary" className="text-xs">
              {profileLevel}
            </Badge>
          </div>
        </div>
        {onFavorite && (
          <Button
            size="icon"
            variant="ghost"
            onClick={onFavorite}
            data-testid={`button-favorite-${name.replace(/\s+/g, '-').toLowerCase()}`}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-chart-3 text-chart-3' : ''}`} />
          </Button>
        )}
      </div>

      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-muted'}`}
          />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-muted-foreground">Number of trades</p>
          <p className="text-sm font-semibold" data-testid={`text-trades-${name.replace(/\s+/g, '-').toLowerCase()}`}>
            {numberOfTrades}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Commission</p>
          <p className="text-sm font-semibold">{commission}%</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold">P&L</span>
        <span className="text-lg font-bold text-chart-2" data-testid={`text-pnl-${name.replace(/\s+/g, '-').toLowerCase()}`}>
          {profitAndLoss}
        </span>
      </div>

      <Button
        className="w-full"
        onClick={onMirrorTrade}
        data-testid={`button-mirror-${name.replace(/\s+/g, '-').toLowerCase()}`}
      >
        Mirror Trade
      </Button>
    </Card>
  );
}
