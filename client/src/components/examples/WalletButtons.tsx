import WalletButtons from '../WalletButtons';

export default function WalletButtonsExample() {
  return (
    <WalletButtons 
      onGoogleWallet={() => console.log('Google Wallet clicked')}
      onAppleWallet={() => console.log('Apple Wallet clicked')}
    />
  );
}
