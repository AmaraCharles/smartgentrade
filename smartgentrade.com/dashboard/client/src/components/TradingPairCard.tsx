import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

interface TradingPairCardProps {
  symbol: string;
  name: string;
  price: string;
  changePercent: number;
  chartData: { value: number }[];
  onBuy: () => void;
  onSell: () => void;
}

export default function TradingPairCard({
  symbol,
  name,
  price,
  changePercent,
  chartData,
  onBuy,
  onSell,
}: TradingPairCardProps) {
  const isPositive = changePercent >= 0;

  return (
    <Card className="p-4 space-y-3" data-testid={`card-pair-${symbol}`}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-sm" data-testid={`text-symbol-${symbol}`}>
              {symbol}
            </h3>
          </div>
          <p className="text-xs text-muted-foreground">{name}</p>
        </div>
        <div className={`flex items-center gap-1 text-xs font-medium ${isPositive ? 'text-chart-2' : 'text-chart-3'}`}>
          {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {isPositive ? '+' : ''}{changePercent.toFixed(2)}%
        </div>
      </div>

      <div className="text-2xl font-semibold tabular-nums" data-testid={`text-price-${symbol}`}>
        {price}
      </div>

      <div className="h-12 -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id={`gradient-${symbol}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={isPositive ? 'hsl(var(--chart-2))' : 'hsl(var(--chart-3))'} stopOpacity={0.3} />
                <stop offset="100%" stopColor={isPositive ? 'hsl(var(--chart-2))' : 'hsl(var(--chart-3))'} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke={isPositive ? 'hsl(var(--chart-2))' : 'hsl(var(--chart-3))'}
              fill={`url(#gradient-${symbol})`}
              strokeWidth={1.5}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button
          size="sm"
          className="bg-chart-2 hover:bg-chart-2 text-white font-medium"
          onClick={onBuy}
          data-testid={`button-buy-${symbol}`}
        >
          BUY
        </Button>
        <Button
          size="sm"
          className="bg-chart-3 hover:bg-chart-3 text-white font-medium"
          onClick={onSell}
          data-testid={`button-sell-${symbol}`}
        >
          SELL
        </Button>
      </div>
    </Card>
  );
}
