import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TradingPairCard from "@/components/TradingPairCard";
import TradeModal from "@/components/TradeModal";

const categories = ["Forex", "CFD", "Crypto", "Stock", "Futures", "Options"];

const generateChartData = (basePrice: number) => {
  const data = [];
  let price = basePrice;
  for (let i = 0; i < 12; i++) {
    price += (Math.random() - 0.5) * basePrice * 0.002;
    data.push({ value: price });
  }
  return data;
};

const tradingPairs = [
  { symbol: "EURUSD", name: "EURO / U.S. DOLLAR", price: "1.16506", changePercent: 0.26, basePrice: 1.16506, category: "Forex" },
  { symbol: "GBPUSD", name: "BRITISH POUND / U.S. DOLLAR", price: "1.34239", changePercent: -0.15, basePrice: 1.34239, category: "Forex" },
  { symbol: "USDJPY", name: "U.S. DOLLAR / JAPANESE YEN", price: "150.616", changePercent: 0.42, basePrice: 150.616, category: "Forex" },
  { symbol: "AUDUSD", name: "AUSTRALIAN DOLLAR / U.S. DOLLAR", price: "0.64899", changePercent: -0.28, basePrice: 0.64899, category: "Forex" },
  { symbol: "USDCAD", name: "U.S. DOLLAR / CANADIAN DOLLAR", price: "1.38456", changePercent: 0.18, basePrice: 1.38456, category: "Forex" },
  { symbol: "USDCHF", name: "U.S. DOLLAR / SWISS FRANC", price: "0.89234", changePercent: -0.09, basePrice: 0.89234, category: "Forex" },
  { symbol: "BTCUSD", name: "BITCOIN / U.S. DOLLAR", price: "43250.50", changePercent: 2.45, basePrice: 43250.50, category: "Crypto" },
  { symbol: "ETHUSD", name: "ETHEREUM / U.S. DOLLAR", price: "2298.75", changePercent: 1.82, basePrice: 2298.75, category: "Crypto" },
  { symbol: "TSLA", name: "TESLA INC", price: "239.31", changePercent: 0.56, basePrice: 239.31, category: "Stock" },
  { symbol: "AAPL", name: "APPLE INC", price: "178.92", changePercent: -0.34, basePrice: 178.92, category: "Stock" },
];

export default function Market() {
  const [activeCategory, setActiveCategory] = useState("Forex");
  const [tradeModal, setTradeModal] = useState<{
    isOpen: boolean;
    symbol: string;
    type: 'buy' | 'sell';
    price: string;
  }>({
    isOpen: false,
    symbol: '',
    type: 'buy',
    price: '',
  });

  const filteredPairs = tradingPairs.filter(pair => pair.category === activeCategory);

  const handleTrade = (symbol: string, type: 'buy' | 'sell', price: string) => {
    setTradeModal({
      isOpen: true,
      symbol,
      type,
      price,
    });
  };

  const handlePlaceTrade = (amount: string) => {
    console.log('Placed trade:', tradeModal.type, tradeModal.symbol, amount);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Market</h1>
        <p className="text-muted-foreground">Trade forex, crypto, stocks, and more</p>
      </div>

      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="w-full justify-start flex-wrap h-auto gap-2 bg-transparent p-0">
          {categories.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              data-testid={`tab-${category.toLowerCase()}`}
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category} value={category} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredPairs.map((pair) => (
                <TradingPairCard
                  key={pair.symbol}
                  symbol={pair.symbol}
                  name={pair.name}
                  price={pair.price}
                  changePercent={pair.changePercent}
                  chartData={generateChartData(pair.basePrice)}
                  onBuy={() => handleTrade(pair.symbol, 'buy', pair.price)}
                  onSell={() => handleTrade(pair.symbol, 'sell', pair.price)}
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <TradeModal
        isOpen={tradeModal.isOpen}
        onClose={() => setTradeModal({ ...tradeModal, isOpen: false })}
        symbol={tradeModal.symbol}
        type={tradeModal.type}
        currentPrice={tradeModal.price}
        onPlaceTrade={handlePlaceTrade}
      />
    </div>
  );
}
