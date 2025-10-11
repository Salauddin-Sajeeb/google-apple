import { useState } from "react";
import PassForm from "@/components/PassForm";
import PassCard from "@/components/PassCard";
import WalletButtons from "@/components/WalletButtons";
import InfoCard from "@/components/InfoCard";
import ThemeToggle from "@/components/ThemeToggle";
import { type InsertPass } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const [generatedPass, setGeneratedPass] = useState<(InsertPass & { id: string }) | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (data: InsertPass) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const passId = `PASS-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    setGeneratedPass({ ...data, id: passId });
    setIsLoading(false);
  };

  const handleGoogleWallet = () => {
    console.log("Adding to Google Wallet:", generatedPass);
    // TODO: Implement Google Wallet integration
  };

  const handleAppleWallet = () => {
    console.log("Adding to Apple Wallet:", generatedPass);
    // TODO: Implement Apple Wallet integration
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with theme toggle */}
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-end">
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center bg-gradient-to-br from-primary via-chart-2 to-chart-2 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="relative text-center px-4 py-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Generate Your Digital Pass
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Create secure, wallet-ready passes in seconds
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 px-4">
        <div className="max-w-md mx-auto">
          <Card>
            <CardContent className="p-8">
              <PassForm onSubmit={handleFormSubmit} isLoading={isLoading} />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pass Preview Section */}
      {generatedPass && (
        <>
          <section className="py-8 px-4">
            <PassCard
              firstName={generatedPass.firstName}
              lastName={generatedPass.lastName}
              email={generatedPass.email}
              points={generatedPass.points}
              passId={generatedPass.id}
            />
          </section>

          {/* Wallet Buttons Section */}
          <section className="py-8 px-4">
            <WalletButtons
              onGoogleWallet={handleGoogleWallet}
              onAppleWallet={handleAppleWallet}
            />
          </section>

          {/* Info Section */}
          <section className="py-8 px-4 pb-16">
            <InfoCard />
          </section>
        </>
      )}
    </div>
  );
}
