import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertPassSchema, type InsertPass } from "@shared/schema";
import PassForm from "@/components/PassForm";
import WalletButtons from "@/components/WalletButtons";
import InfoCard from "@/components/InfoCard";
import ThemeToggle from "@/components/ThemeToggle";
import AppSidebar from "@/components/AppSidebar";
import { Card, CardContent } from "@/components/ui/card";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Home() {
  const [generatedPass, setGeneratedPass] = useState<(InsertPass & { id: string }) | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<InsertPass>({
    resolver: zodResolver(insertPassSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      points: 0,
    },
  });

  const firstName = useWatch({ control: form.control, name: "firstName", defaultValue: "" });
  const lastName = useWatch({ control: form.control, name: "lastName", defaultValue: "" });
  const email = useWatch({ control: form.control, name: "email", defaultValue: "" });
  const points = useWatch({ control: form.control, name: "points", defaultValue: 0 });

  const formValues: Partial<InsertPass> = {
    firstName,
    lastName,
    email,
    points,
  };

  const handleFormSubmit = async (data: InsertPass) => {
    setIsLoading(true);
    
    // TODO: Replace with actual backend API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const passId = `PASS-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    setGeneratedPass({ ...data, id: passId });
    setIsLoading(false);
  };

  const handleGoogleWallet = () => {
    console.log("Adding to Google Wallet:", generatedPass);
    // TODO: Implement Google Wallet integration with backend
  };

  const handleAppleWallet = () => {
    console.log("Adding to Apple Wallet:", generatedPass);
    // TODO: Implement Apple Wallet integration with backend
  };

  const sidebarStyle = {
    "--sidebar-width": "28rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={sidebarStyle as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Header */}
          <header className="border-b border-border flex-shrink-0">
            <div className="px-4 py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <SidebarTrigger data-testid="button-sidebar-toggle" />
                <h1 className="text-lg font-semibold">Pass Generator</h1>
              </div>
              <ThemeToggle />
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            {/* Hero Section */}
            <section className="relative min-h-[35vh] flex items-center justify-center bg-gradient-to-br from-primary via-chart-2 to-chart-2 text-white overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.1),transparent_50%)]" />
              <div className="relative text-center px-4 py-12">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                  Generate Your Digital Pass
                </h2>
                <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto">
                  Create secure, wallet-ready passes in seconds
                </p>
              </div>
            </section>

            {/* Form Section */}
            <section className="py-12 px-4">
              <div className="max-w-md mx-auto">
                <Card>
                  <CardContent className="p-8">
                    <PassForm 
                      form={form}
                      onSubmit={handleFormSubmit} 
                      isLoading={isLoading}
                    />
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Wallet Buttons Section */}
            {generatedPass && (
              <>
                <section className="py-6 px-4">
                  <WalletButtons
                    onGoogleWallet={handleGoogleWallet}
                    onAppleWallet={handleAppleWallet}
                  />
                </section>

                <section className="py-6 px-4 pb-12">
                  <InfoCard />
                </section>
              </>
            )}
          </main>
        </div>

        {/* Sidebar with Live Preview */}
        <AppSidebar formValues={formValues} generatedPass={generatedPass} />
      </div>
    </SidebarProvider>
  );
}
