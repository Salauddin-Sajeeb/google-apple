import { Button } from "@/components/ui/button";
import { SiGoogle, SiApple } from "react-icons/si";

interface WalletButtonsProps {
  onGoogleWallet: () => void;
  onAppleWallet: () => void;
}

export default function WalletButtons({ onGoogleWallet, onAppleWallet }: WalletButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto">
      <Button
        onClick={onGoogleWallet}
        className="flex-1 bg-black hover:bg-black/90 text-white gap-2"
        data-testid="button-google-wallet"
      >
        <SiGoogle className="h-5 w-5" />
        Add to Google Wallet
      </Button>
      
      <Button
        onClick={onAppleWallet}
        className="flex-1 bg-black hover:bg-black/90 text-white gap-2"
        data-testid="button-apple-wallet"
      >
        <SiApple className="h-5 w-5" />
        Add to Apple Wallet
      </Button>
    </div>
  );
}
