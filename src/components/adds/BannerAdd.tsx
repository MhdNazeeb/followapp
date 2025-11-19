import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-your-ad-unit-id';

export default function BannerAdd() {
  return (
    <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.BANNER}
      onAdLoaded={() => console.log('Banner loaded ✅')}
      onAdFailedToLoad={(error) => console.error('Ad failed to load:', error)}
    />
  );
}
