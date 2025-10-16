import React, { useMemo, useCallback } from "react";
import { type InsertPass } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { CreditCard, CheckCircle2, XCircle, Copy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import QRCode from "react-qr-code";
import { Button } from "@/components/ui/button";
import { SiGoogle, SiApple } from "react-icons/si";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface LivePassPreviewProps {
  formValues: Partial<InsertPass>;
  generatedPass: (InsertPass & { id: string; googleUrl?: string; appleUrl?: string }) | null;
  isGenerating?: boolean;
  error?: string | null;
  onGoogleWallet?: () => void;
  onAppleWallet?: () => void;

  /** Optional: explicit URLs from parent (if you store them outside generatedPass) */
  googleUrl?: string | null;
  appleUrl?: string | null;
}

const API_BASE =
  (import.meta.env.VITE_API_BASE as string) ||
  "https://google-applewallet-pass.onrender.com"; // adjust if yours differs

export default function LivePassPreview({
  formValues,
  generatedPass,
  isGenerating = false,
  error = null,
  onGoogleWallet,
  onAppleWallet,
  googleUrl,
  appleUrl,
}: LivePassPreviewProps) {
  // ----- Display fields -----
  const displayData = generatedPass || formValues;
  const firstName = (displayData.firstName || "").trim() || "First Name";
  const lastName = (displayData.lastName || "").trim() || "Last Name";
  const email = (displayData.email || "").trim() || "your.email@example.com";
  const points = Number.isFinite(displayData.points as number) ? Number(displayData.points) : 0;
  const passId = generatedPass?.id || "PASS-XXXX";
  const hasData = !!(formValues.firstName && formValues.lastName && formValues.email);

  // ----- Build Apple fallback URL (GET) if needed -----
  const buildAppleUrl = useCallback(() => {
    const fn = formValues.firstName || generatedPass?.firstName;
    const ln = formValues.lastName || generatedPass?.lastName;
    const em = formValues.email || generatedPass?.email;
    const pt = (formValues.points ?? generatedPass?.points ?? 0) as number;

    if (!fn || !ln || !em) return null;

    const qs = new URLSearchParams({
      name: String(fn),
      surname: String(ln),
      email: String(em),
      points: String(pt),
    });
    return `${API_BASE}/apple/generate-pass?${qs.toString()}`;
  }, [formValues.firstName, formValues.lastName, formValues.email, formValues.points, generatedPass]);

  // ----- Effective URLs (prop -> generatedPass -> fallback) -----
  const effectiveGoogleUrl =
    googleUrl ?? generatedPass?.googleUrl ?? null;

  const effectiveAppleUrl =
    appleUrl ?? generatedPass?.appleUrl ?? buildAppleUrl();

  const canGoogle = !!effectiveGoogleUrl;
  const canApple = !!effectiveAppleUrl;

  // ----- QR value -----
  const origin = typeof window !== "undefined" ? window.location.origin : "https://example.com";
  const qrData = useMemo(() => {
    if (generatedPass) {
      return JSON.stringify({
        id: generatedPass.id,
        name: `${generatedPass.firstName} ${generatedPass.lastName}`,
        email: generatedPass.email,
        points: generatedPass.points,
        url: `${origin}/pass/${generatedPass.id}`,
      });
    }
    if (hasData) {
      return JSON.stringify({ draft: true, name: `${firstName} ${lastName}`, email });
    }
    return "Waiting for data...";
  }, [generatedPass, hasData, firstName, lastName, email, origin]);

  // ----- Click fallbacks if handlers not provided -----
  const handleGoogleClick = () => {
    if (onGoogleWallet) return onGoogleWallet();
    if (effectiveGoogleUrl) window.location.href = effectiveGoogleUrl;
  };

  const handleAppleClick = () => {
    if (onAppleWallet) return onAppleWallet();
    if (effectiveAppleUrl) window.location.href = effectiveAppleUrl;
  };

  const handleCopyId = () => {
    if (!generatedPass) return;
    navigator.clipboard?.writeText(generatedPass.id).catch(() => {});
  };

  // ----- UI (Google Wallet–style pass) -----
  return (
    <div className="flex w-full justify-center">
      <div className="relative w-[340px] max-w-full">
        {/* Header status */}
        <div className=" flex items-center gap-2 text-sm text-zinc-600">
  
        </div>

        {/* Blue pass card */}
        <div className="rounded-2xl overflow-hidden shadow-xl border border-zinc-200 bg-[#1973E8]">
          {/* Header bar */}
          <div className="px-4 py-2 bg-[#1666cf] text-white flex items-center justify-between">
    
          </div>

          {/* Body */}
          <div className="px-4 py-4 text-white">
            <div className="mb-1">
              <div className="text-xs opacity-90">
                {new Date().toLocaleDateString(undefined, {
                  weekday: "long",
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-[13px]">
      
              <div className="space-y-1">
                <div className="opacity-90">Ticket holder</div>
                <div className="font-medium">{firstName} {lastName}</div>
              </div>
              <div className="space-y-1">
                <div className="opacity-90">Email</div>
                <div className="font-medium break-all">{email}</div>
              </div>
            </div>

            {/* White QR block */}
            <div className="mt-2 rounded-xl bg-white p-3 grid place-items-center">
              <QRCode value={qrData} size={160} level="H" />
            </div>

            {/* Footer info */}
            <div className="mt-3 flex items-center justify-between text-[12px]">
              <div className="opacity-90">Points</div>
              <div className="font-semibold">{points}</div>
            </div>
            <div className="mt-1 flex items-center justify-between text-[12px]">
              <div className="opacity-90">Ticket ID</div>
              <div className="font-mono flex items-center gap-1">
                {passId}
                {generatedPass && (
                  <button
                    onClick={handleCopyId}
                    className="ml-1 inline-flex items-center justify-center rounded-md bg-white/15 hover:bg-white/25 transition h-6 w-6"
                    title="Copy Pass ID"
                    aria-label="Copy Pass ID"
                    type="button"
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <Alert variant="destructive" className="mt-4">
            <XCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Actions */}
        <div className="mt-4 space-y-2">
          <Button
            onClick={handleGoogleClick}
            className="w-full bg-[#1a73e8] hover:bg-[#1666cf] text-white gap-2 disabled:opacity-50 disabled:pointer-events-none"
            disabled={!canGoogle || isGenerating}
            data-testid="button-google-wallet"
          >
            <SiGoogle className="h-5 w-5" />
            {isGenerating ? "Generating…" : "Save to Google Wallet"}
          </Button>

          <Button
            onClick={handleAppleClick}
            className="w-full bg-black text-white hover:bg-black/90 gap-2 disabled:opacity-50 disabled:pointer-events-none"
            disabled={!canApple || isGenerating}
            data-testid="button-apple-wallet"
          >
            <SiApple className="h-5 w-5" />
            {isGenerating ? "Generating…" : "Add to Apple Wallet"}
          </Button>
        </div>

        {/* Hint / loading */}
        {isGenerating && (
          <p className="mt-2 text-center text-xs text-zinc-500">Building your pass…</p>
        )}
        {!generatedPass && !error && (
          <p className="mt-2 text-center text-xs text-zinc-500">
            Fill the form to see your pass. Buttons enable when links are available.
          </p>
        )}
      </div>
    </div>
  );
}
