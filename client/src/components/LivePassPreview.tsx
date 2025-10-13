import { type InsertPass } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { CreditCard, CheckCircle2, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import QRCode from "react-qr-code";
import { Button } from "@/components/ui/button";
import { SiGoogle, SiApple } from "react-icons/si";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface LivePassPreviewProps {
  formValues: Partial<InsertPass>;
  generatedPass: (InsertPass & { id: string }) | null;
  isGenerating?: boolean;
  error?: string | null;
  onGoogleWallet?: () => void;
  onAppleWallet?: () => void;
}

export default function LivePassPreview({ 
  formValues, 
  generatedPass, 
  isGenerating = false,
  error = null,
  onGoogleWallet,
  onAppleWallet
}: LivePassPreviewProps) {
  const displayData = generatedPass || formValues;
  const firstName = displayData.firstName || "First Name";
  const lastName = displayData.lastName || "Last Name";
  const email = displayData.email || "your.email@example.com";
  const points = displayData.points || 0;
  const passId = generatedPass?.id || "XXXX-XXXX";
  
  const hasData = formValues.firstName || formValues.lastName || formValues.email;
  
  const qrData = generatedPass 
    ? JSON.stringify({
        id: generatedPass.id,
        name: `${generatedPass.firstName} ${generatedPass.lastName}`,
        email: generatedPass.email,
        points: generatedPass.points,
        url: `${window.location.origin}/pass/${generatedPass.id}`
      })
    : hasData 
      ? JSON.stringify({
          draft: true,
          name: `${firstName} ${lastName}`,
          email: email
        })
      : "Waiting for data...";

  return (
    <div className="space-y-6">
      {/* Pass Card Preview */}
      <div className="relative">
        <div className="aspect-[1.586/1] rounded-2xl bg-gradient-to-br from-primary via-chart-2 to-chart-2 p-6 shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
          
          <div className="relative h-full flex flex-col justify-between text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                <span className="font-semibold text-xs tracking-wide">DIGITAL PASS</span>
              </div>
              {generatedPass && (
                <CheckCircle2 className="h-5 w-5 text-white" />
              )}
            </div>

            <div>
              <h3 className="text-2xl font-bold tracking-tight">
                {firstName} {lastName}
              </h3>
              <p className="text-white/70 text-sm mt-1">{email}</p>
            </div>

            <div className="flex items-end justify-between">
              <div className="font-mono text-xs text-white/60">
                ID: {passId}
              </div>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm hover:bg-white/30">
                {points} Points
              </Badge>
            </div>
          </div>
        </div>
        
        {!generatedPass && hasData && (
          <div className="absolute inset-0 bg-background/5 backdrop-blur-[2px] rounded-2xl flex items-center justify-center">
            <Badge variant="secondary" className="bg-background/90">
              Preview Mode
            </Badge>
          </div>
        )}
      </div>

      {/* QR Code Section - Only show for generated pass */}
      {generatedPass && (
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span>Scan to Access Pass</span>
            </div>
            
            <div className="flex justify-center bg-white p-4 rounded-lg">
              <QRCode
                value={qrData}
                size={180}
                level="H"
                data-testid="qr-code"
              />
            </div>
          </div>
        </Card>
      )}

      {/* Error State */}
      {error && (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertDescription>
            {error}
          </AlertDescription>
        </Alert>
      )}

      {/* Success State with Wallet Buttons */}
      {generatedPass && !error && (
        <div className="space-y-4">
          <Alert className="border-primary/20 bg-primary/5">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            <AlertDescription className="text-sm">
              Pass created successfully! Add it to your wallet.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <Button
              onClick={onGoogleWallet}
              className="w-full bg-black text-white gap-2"
              data-testid="button-google-wallet"
            >
              <SiGoogle className="h-5 w-5" />
              Add to Google Wallet
            </Button>
            
            <Button
              onClick={onAppleWallet}
              className="w-full bg-black text-white gap-2"
              data-testid="button-apple-wallet"
            >
              <SiApple className="h-5 w-5" />
              Add to Apple Wallet
            </Button>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isGenerating && (
        <div className="flex items-center justify-center py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            Generating pass...
          </div>
        </div>
      )}
    </div>
  );
}
