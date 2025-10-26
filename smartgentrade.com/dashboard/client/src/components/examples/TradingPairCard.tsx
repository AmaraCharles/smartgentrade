import TradingPairCard from '../TradingPairCard';

export default function TradingPairCardExample() {
  const mockChartData = [
    { value: 1.16200 },
    { value: 1.16350 },
    { value: 1.16180 },
    { value: 1.16420 },
    { value: 1.16506 },
  ];

  return (
    <div className="p-4 bg-background">
      <TradingPairCard
        symbol="EURUSD"
        name="EURO / U.S. DOLLAR"
        price="1.16506"
        changePercent={0.26}
        chartData={mockChartData}
        onBuy={() => console.log('Buy EURUSD')}
        onSell={() => console.log('Sell EURUSD')}
      />
    </div>
  );
}
