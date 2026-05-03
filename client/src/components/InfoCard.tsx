import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

export default function InfoCard() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <ShieldCheck className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your pass is automatically encrypted and ready for digital wallets. 
              Add it to your preferred wallet app to access it anytime, anywhere.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
