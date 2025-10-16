import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertPassSchema, type InsertPass } from "@shared/schema";
import PassForm from "@/components/PassForm";
import ThemeToggle from "@/components/ThemeToggle";
import AppSidebar from "@/components/AppSidebar";
import { Card, CardContent } from "@/components/ui/card";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

type GeneratedPass = InsertPass & {
  id: string;
  googleUrl?: string;
  appleUrl?: string;
};

const API_BASE =
  import.meta.env.NEXT_PUBLIC_API_BASE ??
  "https://google-aplplewallet-pass.onrender.com"; 

export default function Home() {
  const [generatedPass, setGeneratedPass] = useState<GeneratedPass | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<InsertPass>({
    resolver: zodResolver(insertPassSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      points: 0,
    },
    mode: "onChange",
  });

  const firstName = useWatch({ control: form.control, name: "firstName", defaultValue: "" });
  const lastName  = useWatch({ control: form.control, name: "lastName", defaultValue: "" });
  const email     = useWatch({ control: form.control, name: "email", defaultValue: "" });
  const points    = useWatch({ control: form.control, name: "points", defaultValue: 0 });

  const formValues: Partial<InsertPass> = useMemo(
    () => ({ firstName, lastName, email, points }),
    [firstName, lastName, email, points]
  );

 
  const buildAppleUrl = (p: InsertPass) => {
    const qs = new URLSearchParams({
      name: p.firstName,   
      surname: p.lastName,
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
      // GOOGLE: POST like your Velo code
      const res = await fetch(`${API_BASE}/google/generate-pass`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.firstName,
          surname: data.lastName,
          email: data.email,
          points: data.points,
          firstName: data.firstName,
          lastName: data.lastName,
        }),
      });

      let payload: any = null;
      try { payload = await res.json(); } catch { /* ignore parse error */ }

      if (!res.ok) {
        const msg = payload?.message || payload?.error || "Failed to create pass";
        throw new Error(msg);
      }

      // normalize google url fields
      const googleUrl =
        payload?.walletUrl || payload?.googleUrl || payload?.saveUrl || payload?.link;
      const appleUrl = buildAppleUrl(data);

      const passId = payload?.id || `PASS-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

      setGeneratedPass({
        ...data,
        id: passId,
        googleUrl: googleUrl || undefined,
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
      return;
    }
  
    const data: InsertPass = {
      firstName: firstName || "",
      lastName: lastName || "",
      email: email || "",
      points: points ?? 0,
    };
    const url = buildAppleUrl(data);
    window.location.href = url;
  };

  const sidebarStyle = {
    "--sidebar-width": "28rem",
    "--sidebar-width-icon": "3rem",
  } as React.CSSProperties;

  return (
    <SidebarProvider style={sidebarStyle}>
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
            <section className="">
              
              <div className="relative text-center px-4 ">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight ">
                  Generate Your Digital Pass
                </h2>
                <p className="text-base md:text-lg  max-w-2xl mx-auto">
                  Create secure, wallet-ready passes in seconds
                </p>
              </div>
            </section>

            {/* Form Section */}
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
                      <p className="mt-4 text-sm text-red-500" role="alert">
                        {error}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </section>
          </main>
        </div>

        {/* Sidebar with Live Preview */}
        <AppSidebar
          formValues={formValues}
          generatedPass={generatedPass}
          isGenerating={isLoading}
          error={error}
          onGoogleWallet={handleGoogleWallet}
          onAppleWallet={handleAppleWallet}
        />
      </div>
    </SidebarProvider>
  );
}
