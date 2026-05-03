import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Copy, XCircle } from "lucide-react";
import { useCallback, useMemo } from "react";
import { SiApple, SiGoogle } from "react-icons/si";
import QRCode from "react-qr-code";

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

type GeneratedPass = PreviewPassData & { id: string; googleUrl?: string; appleUrl?: string };

interface LivePassPreviewProps {
  passData: PreviewPassData;
  generatedPass: GeneratedPass | null;
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
  "https://google-aplplewallet-pass-1.onrender.com"; // adjust if yours differs

export default function LivePassPreview({
  passData,
  generatedPass,
  isGenerating = false,
  error = null,
  onGoogleWallet,
  onAppleWallet,
  googleUrl,
  appleUrl,
}: LivePassPreviewProps) {
  // ----- Display fields -----
  const displayData = generatedPass || passData;
  const firstName = (displayData.firstName || "").trim() || "First Name";
  const lastName = (displayData.lastName || "").trim() || "Last Name";
  const email = (displayData.email || "").trim() || "your.email@example.com";
  const points = Number.isFinite(displayData.points as number) ? Number(displayData.points) : 0;
  const passId = generatedPass?.id || "PASS-XXXX";
  const passType = displayData.passType || "loyalty";
  const companyName = (displayData.companyName || "").trim() || "Company";
  const primaryColor = displayData.primaryColor || "#1973E8";
  const secondaryColor = displayData.secondaryColor || "#7C3AED";
  const hasData = !!(displayData.firstName && displayData.lastName && displayData.email);

  const passTypeMeta: Record<CardType, { title: string; subtitle: string; chip: string }> = {
    loyalty: {
      title: "Loyalty",
      subtitle: "Earn points on every purchase",
      chip: "POINTS",
    },
    membership: {
      title: "Membership",
      subtitle: "Priority access and premium benefits",
      chip: "MEMBER",
    },
    stamp: {
      title: "Stamp",
      subtitle: "Collect stamps, unlock rewards",
      chip: "STAMP",
    },
    coupon: {
      title: "Coupon",
      subtitle: "Limited-time offer available now",
      chip: "COUPON",
    },
  };

  // ----- Build Apple fallback URL (GET) if needed -----
  const buildAppleUrl = useCallback(() => {
    const fn = passData.firstName || generatedPass?.firstName;
    const ln = passData.lastName || generatedPass?.lastName;
    const em = passData.email || generatedPass?.email;
    const pt = (passData.points ?? generatedPass?.points ?? 0) as number;

    if (!fn || !ln || !em) return null;

    const qs = new URLSearchParams({
      name: String(fn),
      surname: String(ln),
      email: String(em),
      points: String(pt),
    });
    return `${API_BASE}/apple/generate-pass?${qs.toString()}`;
  }, [passData.firstName, passData.lastName, passData.email, passData.points, generatedPass]);

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
      <div className="relative w-full max-w-[360px]">
        <div className="mx-auto w-full max-w-[320px] rounded-[2.6rem] border-[10px] border-zinc-900 bg-zinc-900 shadow-[0_26px_70px_-22px_rgba(9,9,11,0.7)]">
          <div className="relative mx-auto mt-2 h-6 w-32 rounded-full bg-zinc-800" />

          <div className="m-2 mt-3 rounded-[2rem] bg-gradient-to-b from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-800 p-4 sm:p-5">
            <div
              className="rounded-[1.4rem] border border-white/30 p-4 text-white shadow-2xl"
              style={{
                background: `linear-gradient(145deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] tracking-[0.18em] uppercase text-white/80">{companyName}</p>
                  <h3 className="mt-1 text-xl font-semibold leading-none">{passTypeMeta[passType as CardType].title} Pass</h3>
                  <p className="mt-2 text-xs text-white/85">{passTypeMeta[passType as CardType].subtitle}</p>
                </div>
                <span className="rounded-full border border-white/35 px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em]">
                  {passTypeMeta[passType as CardType].chip}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-[11px] text-white/85">
                <div>
                  <p className="uppercase tracking-wide">Holder</p>
                  <p className="mt-1 text-sm font-semibold text-white">{firstName} {lastName}</p>
                </div>
                <div>
                  <p className="uppercase tracking-wide">Points</p>
                  <p className="mt-1 text-sm font-semibold text-white">{points}</p>
                </div>
              </div>

              <div className="mt-4 rounded-xl bg-white p-3 grid place-items-center">
                <QRCode value={qrData} size={140} level="H" />
              </div>

              <div className="mt-3 flex items-center justify-between text-[11px] text-white/85">
                <span className="truncate pr-2">{email}</span>
                <span className="font-mono text-white">{passId}</span>
              </div>
            </div>
          </div>
          <div className="pb-4 flex justify-center">
            {generatedPass && (
              <button
                onClick={handleCopyId}
                className="inline-flex items-center justify-center rounded-full bg-zinc-800 text-zinc-100 hover:bg-zinc-700 transition h-8 w-8"
                title="Copy Pass ID"
                aria-label="Copy Pass ID"
                type="button"
              >
                <Copy className="h-3.5 w-3.5" />
              </button>
            )}
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
