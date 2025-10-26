import MasterTraderCard from '../MasterTraderCard';
import traderImage from '@assets/stock_images/professional_trader__f2c4df4c.jpg';

export default function MasterTraderCardExample() {
  return (
    <div className="p-4 bg-background">
      <MasterTraderCard
        name="Ali G"
        profileLevel="Guru"
        rating={4}
        numberOfTrades={51}
        commission={30}
        profitAndLoss="PNL +$89000.00"
        imageUrl={traderImage}
        onMirrorTrade={() => console.log('Mirror trade Ali G')}
        onFavorite={() => console.log('Favorite toggled')}
        isFavorite={false}
      />
    </div>
  );
}
