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



export default function Investment() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Investment Portfolio</h1>
        <p className="text-muted-foreground">Track your deposits.</p>
      </div>

     
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Deposit History</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
               
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeTrades.map((trade) => (
                <TableRow key={trade.id} data-testid={`row-trade-${trade.id}`}>
                  
                  <TableCell className="tabular-nums">{trade.amount}</TableCell>
                  <TableCell className="tabular-nums">{trade.method}</TableCell>
                  <TableCell className="tabular-nums">{trade.status}</TableCell>
                  <TableCell className="tabular-nums text-chart-2 font-medium">{trade.date}</TableCell>
                
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* <Card className="p-6">
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
      </Card> */}
    </div>
  );
}
