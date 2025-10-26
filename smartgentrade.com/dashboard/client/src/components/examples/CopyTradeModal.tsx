import { useState } from 'react';
import CopyTradeModal from '../CopyTradeModal';
import { Button } from '@/components/ui/button';
import traderImage from '@assets/stock_images/professional_trader__f2c4df4c.jpg';

export default function CopyTradeModalExample() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="p-4 bg-background">
      <Button onClick={() => setIsOpen(true)}>Open Copy Trade Modal</Button>
      <CopyTradeModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        traderName="Ali G"
        traderImage={traderImage}
        profileLevel="Guru"
        tradingProfileId="79697172"
        accountLevel={5}
        followers={89}
        watchers={231}
        profitableTrade={70}
        onStartCopy={(amount, duration) => console.log('Start copy:', amount, duration)}
      />
    </div>
  );
}
