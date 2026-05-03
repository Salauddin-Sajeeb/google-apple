import AppSidebar from "@/components/AppSidebar";
import PassForm from "@/components/PassForm";
import ThemeToggle from "@/components/ThemeToggle";
import { Card, CardContent } from "@/components/ui/card";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertPassSchema, type InsertPass } from "@shared/schema";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

type CardType = "loyalty" | "membership" | "stamp" | "coupon";

type PreviewPassData = {
  firstName: string;
  lastName: string;
  email: string;
  points: number;
  passType: CardType;
  companyName: string;
  primaryColor: string;
  secondaryColor: string;
};

type GeneratedPass = PreviewPassData & {
  id: string;
  googleUrl?: string;
  appleUrl?: string;
};

const API_BASE =
  import.meta.env.VITE_API_BASE ??
  "https://google-aplplewallet-pass-1.onrender.com";

export default function Home() {
  const [generatedPass, setGeneratedPass] = useState<GeneratedPass | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [passData, setPassData] = useState<PreviewPassData>({
    firstName: "",
    lastName: "",
    email: "",
    points: 0,
    passType: "loyalty",
    companyName: "Company",
    primaryColor: "#1973E8",
    secondaryColor: "#7C3AED",
  });

  const form = useForm<InsertPass>({
    resolver: zodResolver(insertPassSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      points: 0,
      passType: "loyalty",
      companyName: "Company",
      primaryColor: "#1973E8",
      secondaryColor: "#7C3AED",
    },
    mode: "onChange",
  });

  const watchedFields = useWatch({
    control: form.control,
    name: ["firstName", "lastName", "email", "points"],
    defaultValue: ["", "", "", 0],
  });

  const [firstName = "", lastName = "", email = "", points = 0] = watchedFields;

  useEffect(() => {
    setPassData((prev) => ({
      ...prev,
      firstName,
      lastName,
      email,
      points: Number(points) || 0,
    }));
  }, [firstName, lastName, email, points]);

  const handlePassDataChange = <K extends keyof PreviewPassData>(
    key: K,
    value: PreviewPassData[K]
  ) => {
    setPassData((prev) => ({ ...prev, [key]: value }));
  };

  // ✅ FIXED: Apple API params now match backend
  const buildAppleUrl = (
    p: Pick<PreviewPassData, "firstName" | "lastName" | "email" | "points">
  ) => {
    const qs = new URLSearchParams({
      firstName: p.firstName,
      lastName: p.lastName,
      email: p.email,
      points: String(p.points ?? 0),
    });

    return `${API_BASE}/apple/generate-pass?${qs.toString()}`;
  };

  const handleFormSubmit = async (data: InsertPass) => {
    setIsLoading(true);
    setError(null);
    setGeneratedPass(null);

    try {
      // GOOGLE WALLET
      const res = await fetch(`${API_BASE}/google/generate-pass`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          points: data.points,
          company: passData.companyName,
          type: passData.passType,
          primaryColor: passData.primaryColor,
          secondaryColor: passData.secondaryColor,
        }),
      });

      const payload = await res.json();

      if (!res.ok) {
        throw new Error(payload?.error || "Failed to create Google pass");
      }

      const googleUrl =
        payload?.walletUrl || payload?.googleUrl || payload?.link;

      const appleUrl = buildAppleUrl(passData);

      const passId =
        payload?.id ||
        `PASS-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

      setGeneratedPass({
        ...passData,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        points: data.points,
        id: passId,
        googleUrl,
        appleUrl,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create pass");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleWallet = () => {
    if (generatedPass?.googleUrl) {
      window.location.href = generatedPass.googleUrl;
    }
  };

  const handleAppleWallet = () => {
    if (generatedPass?.appleUrl) {
      window.location.href = generatedPass.appleUrl;
    }
  };

  const sidebarStyle = {
    "--sidebar-width": "28rem",
    "--sidebar-width-icon": "3rem",
  } as React.CSSProperties;

  return (
    <SidebarProvider style={sidebarStyle}>
      <div className="flex h-screen w-full">
        <div className="flex flex-col flex-1 overflow-hidden">
          
          {/* HEADER */}
          <header className="border-b border-border flex-shrink-0">
            <div className="px-4 py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <SidebarTrigger />
                <h1 className="text-lg font-semibold">Pass Generator</h1>
              </div>
              <ThemeToggle />
            </div>
          </header>

          {/* MAIN */}
          <main className="flex-1 overflow-auto">
            <section className="text-center px-4 py-6">
              <h2 className="text-3xl font-bold">
                Generate Your Digital Pass
              </h2>
              <p className="text-base mt-2">
                Create secure wallet-ready passes in seconds
              </p>
            </section>

            <section className="py-5 px-4">
              <div className="max-w-md mx-auto">
                <Card>
                  <CardContent className="p-8">
                    <PassForm
                      form={form}
                      onSubmit={handleFormSubmit}
                      isLoading={isLoading}
                    />

                    {error && (
                      <p className="mt-4 text-sm text-red-500">{error}</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </section>
          </main>
        </div>

        {/* SIDEBAR */}
        <AppSidebar
          passData={passData}
          generatedPass={generatedPass}
          isGenerating={isLoading}
          error={error}
          onPassDataChange={handlePassDataChange}
          onGoogleWallet={handleGoogleWallet}
          onAppleWallet={handleAppleWallet}
        />
      </div>
    </SidebarProvider>
  );
}
