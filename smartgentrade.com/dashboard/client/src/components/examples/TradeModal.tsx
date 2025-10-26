import { useState } from 'react';
import TradeModal from '../TradeModal';
import { Button } from '@/components/ui/button';

export default function TradeModalExample() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="p-4 bg-background">
      <Button onClick={() => setIsOpen(true)}>Open Trade Modal</Button>
      <TradeModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        symbol="EURUSD"
        type="buy"
        currentPrice="1.16506"
        onPlaceTrade={(amount) => console.log('Place trade:', amount)}
      />
    </div>
  );
}
