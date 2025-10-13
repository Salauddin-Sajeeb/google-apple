import { type InsertPass } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { CreditCard, User, Mail, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import QRCode from "react-qr-code";

interface LivePassPreviewProps {
  formValues: Partial<InsertPass>;
  generatedPass: (InsertPass & { id: string }) | null;
}

export default function LivePassPreview({ formValues, generatedPass }: LivePassPreviewProps) {
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
      <div className="relative aspect-[1.586/1] rounded-2xl bg-gradient-to-br from-primary via-chart-2 to-chart-2 p-6 shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
        
        <div className="relative h-full flex flex-col justify-between text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              <span className="font-semibold text-xs tracking-wide">DIGITAL PASS</span>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold tracking-tight opacity-90">
              {firstName} {lastName}
            </h3>
            <p className="text-white/60 text-sm mt-1">{email}</p>
          </div>

          <div className="flex items-end justify-between">
            <div className="font-mono text-xs text-white/50">
              ID: {passId}
            </div>
            <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm hover:bg-white/30">
              {points} Points
            </Badge>
          </div>
        </div>
      </div>

      {/* QR Code Section */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span>{generatedPass ? "Scan to Access" : "Preview QR Code"}</span>
          </div>
          
          <div className="flex justify-center bg-white p-4 rounded-lg">
            <QRCode
              value={qrData}
              size={180}
              level="H"
              data-testid="qr-code"
            />
          </div>

          {!generatedPass && (
            <p className="text-xs text-muted-foreground text-center">
              QR code will be generated after you submit the form
            </p>
          )}
        </div>
      </Card>

      {/* Info Section */}
      {hasData && (
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <User className="h-4 w-4" />
            <span>{firstName} {lastName}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span>{email}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Award className="h-4 w-4" />
            <span>{points} Points</span>
          </div>
        </div>
      )}
    </div>
  );
}
