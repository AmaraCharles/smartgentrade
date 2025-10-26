import { useState } from "react";
import MasterTraderCard from "@/components/MasterTraderCard";
import CopyTradeModal from "@/components/CopyTradeModal";
import traderImage1 from '@assets/stock_images/professional_trader__f2c4df4c.jpg';
import traderImage2 from '@assets/stock_images/professional_trader__23a70e14.jpg';
import traderImage3 from '@assets/stock_images/professional_trader__17eadcb2.jpg';

const masterTraders = [
  {
    id: '1',
    name: "Ali G",
    profileLevel: "Guru",
    rating: 4,
    numberOfTrades: 51,
    commission: 30,
    profitAndLoss: "PNL +$89000.00",
    imageUrl: traderImage1,
    tradingProfileId: "79697172",
    accountLevel: 5,
    followers: 89,
    watchers: 231,
    profitableTrade: 70,
  },
  {
    id: '2',
    name: "Sarah Chen",
    profileLevel: "Expert",
    rating: 5,
    numberOfTrades: 128,
    commission: 25,
    profitAndLoss: "PNL +$142500.00",
    imageUrl: traderImage2,
    tradingProfileId: "84521963",
    accountLevel: 7,
    followers: 234,
    watchers: 512,
    profitableTrade: 85,
  },
  {
    id: '3',
    name: "Marcus Rivera",
    profileLevel: "Master",
    rating: 4,
    numberOfTrades: 89,
    commission: 28,
    profitAndLoss: "PNL +$98750.00",
    imageUrl: traderImage3,
    tradingProfileId: "73296847",
    accountLevel: 6,
    followers: 156,
    watchers: 387,
    profitableTrade: 78,
  },
];

export default function SocialTrading() {
  const [copyTradeModal, setCopyTradeModal] = useState<{
    isOpen: boolean;
    trader: typeof masterTraders[0] | null;
  }>({
    isOpen: false,
    trader: null,
  });

  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const handleMirrorTrade = (trader: typeof masterTraders[0]) => {
    setCopyTradeModal({
      isOpen: true,
      trader,
    });
  };

  const handleStartCopy = (amount: string, duration: string) => {
    console.log('Start copy trading:', copyTradeModal.trader?.name, amount, duration);
  };

  const toggleFavorite = (traderId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(traderId)) {
        newFavorites.delete(traderId);
      } else {
        newFavorites.add(traderId);
      }
      return newFavorites;
    });
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-gradient-to-r from-card via-card to-card border border-card-border p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"></div>
        <div className="relative">
          <h1 className="text-2xl font-bold mb-2">
            Welcome, <span className="text-primary">Garciaeric</span>!
          </h1>
          <p className="text-lg">Social Trading 🔥</p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Master Trader</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {masterTraders.map((trader) => (
            <MasterTraderCard
              key={trader.id}
              name={trader.name}
              profileLevel={trader.profileLevel}
              rating={trader.rating}
              numberOfTrades={trader.numberOfTrades}
              commission={trader.commission}
              profitAndLoss={trader.profitAndLoss}
              imageUrl={trader.imageUrl}
              onMirrorTrade={() => handleMirrorTrade(trader)}
              onFavorite={() => toggleFavorite(trader.id)}
              isFavorite={favorites.has(trader.id)}
            />
          ))}
        </div>
      </div>

      {copyTradeModal.trader && (
        <CopyTradeModal
          isOpen={copyTradeModal.isOpen}
          onClose={() => setCopyTradeModal({ isOpen: false, trader: null })}
          traderName={copyTradeModal.trader.name}
          traderImage={copyTradeModal.trader.imageUrl}
          profileLevel={copyTradeModal.trader.profileLevel}
          tradingProfileId={copyTradeModal.trader.tradingProfileId}
          accountLevel={copyTradeModal.trader.accountLevel}
          followers={copyTradeModal.trader.followers}
          watchers={copyTradeModal.trader.watchers}
          profitableTrade={copyTradeModal.trader.profitableTrade}
          onStartCopy={handleStartCopy}
        />
      )}
    </div>
  );
}
