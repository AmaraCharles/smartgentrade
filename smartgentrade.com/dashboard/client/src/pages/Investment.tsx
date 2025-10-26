import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const activeTrades = [
  {
    id: '1',
    pair: 'EURUSD',
    type: 'BUY',
    amount: '$1,500.00',
    entryPrice: '1.16506',
    currentPrice: '1.16842',
    pnl: '+$43.20',
    status: 'active',
  },
  {
    id: '2',
    pair: 'BTCUSD',
    type: 'BUY',
    amount: '$5,000.00',
    entryPrice: '42,850.50',
    currentPrice: '43,250.50',
    pnl: '+$46.70',
    status: 'active',
  },
];

const copyTrades = [
  {
    id: '1',
    masterTrader: 'Ali G',
    amount: '$2,500.00',
    duration: '30 days',
    startDate: '2025-01-05',
    currentReturn: '+$185.50',
    status: 'active',
  },
];

export default function Investment() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Investment Portfolio</h1>
        <p className="text-muted-foreground">Track your active trades and copy trading positions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Total Balance</p>
          <p className="text-3xl font-bold tabular-nums" data-testid="text-total-balance">$8,500.00</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Active Trades</p>
          <p className="text-3xl font-bold tabular-nums" data-testid="text-active-trades">2</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Total P&L</p>
          <p className="text-3xl font-bold tabular-nums text-chart-2" data-testid="text-total-pnl">+$275.40</p>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Active Trades</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pair</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Entry Price</TableHead>
                <TableHead>Current Price</TableHead>
                <TableHead>P&L</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeTrades.map((trade) => (
                <TableRow key={trade.id} data-testid={`row-trade-${trade.id}`}>
                  <TableCell className="font-medium">{trade.pair}</TableCell>
                  <TableCell>
                    <Badge variant={trade.type === 'BUY' ? 'default' : 'destructive'}>
                      {trade.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="tabular-nums">{trade.amount}</TableCell>
                  <TableCell className="tabular-nums">{trade.entryPrice}</TableCell>
                  <TableCell className="tabular-nums">{trade.currentPrice}</TableCell>
                  <TableCell className="tabular-nums text-chart-2 font-medium">{trade.pnl}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{trade.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Copy Trading Positions</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Master Trader</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>Current Return</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {copyTrades.map((trade) => (
                <TableRow key={trade.id} data-testid={`row-copy-${trade.id}`}>
                  <TableCell className="font-medium">{trade.masterTrader}</TableCell>
                  <TableCell className="tabular-nums">{trade.amount}</TableCell>
                  <TableCell>{trade.duration}</TableCell>
                  <TableCell>{trade.startDate}</TableCell>
                  <TableCell className="tabular-nums text-chart-2 font-medium">{trade.currentReturn}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{trade.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
