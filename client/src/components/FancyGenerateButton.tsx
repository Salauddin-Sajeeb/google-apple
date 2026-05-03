import * as React from "react";
import { cn } from "@/lib/utils"; // or replace cn(...) with string joins
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  label?: string;
  sublabel?: string;
};

export default function FancyGenerateButton({
  loading,
  label = "Generate Pass",
  sublabel = "Secure & wallet-ready",
  className,
  disabled,
  ...rest
}: Props) {
  const isDisabled = disabled || loading;

  return (
    <motion.button
      whileHover={!isDisabled ? { y: -2 } : undefined}
      whileTap={!isDisabled ? { y: 0 } : undefined}
      className={cn(
        "relative w-full overflow-hidden rounded-2xl px-5 py-4",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/60",
        "transition-all duration-300",
        isDisabled ? "opacity-70 cursor-not-allowed" : "cursor-pointer",
        className
      )}
      disabled={isDisabled}
      {...rest}
    >
      {/* Glow */}
      <div
        className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 opacity-80 blur"
        aria-hidden
      />
      {/* Card surface */}
      <div className="relative rounded-2xl bg-zinc-950 text-white">
        {/* animated border sweep */}
        <span
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            background:
              "conic-gradient(from 180deg at 50% 50%, rgba(255,255,255,0.18), rgba(255,255,255,0.04), rgba(255,255,255,0.18))",
            mask:
              "linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)",
            WebkitMask:
              "linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)",
            padding: 1,
          }}
          aria-hidden
        />
        {/* shine sweep */}
        {!isDisabled && (
          <span className="pointer-events-none absolute -left-1/3 -top-1/2 h-[200%] w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/15 to-transparent animate-[shine_2.4s_ease-in-out_infinite]" />
        )}

        {/* content */}
        <div className="relative flex items-center justify-between gap-3 px-5 py-4">
          <div className="text-left">
            <div className="text-base font-semibold tracking-tight">
              {label}
            </div>
            <div className="text-xs text-zinc-300">{sublabel}</div>
          </div>

          <div className="flex items-center gap-2">
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="text-sm">Generating…</span>
              </div>
            ) : (
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
        </div>
      </div>

      {/* keyframes */}
      <style>{`
        @keyframes shine {
          0% { transform: translateX(-60%) translateY(-30%) rotate(12deg); }
          100% { transform: translateX(180%) translateY(-30%) rotate(12deg); }
        }
      `}</style>
    </motion.button>
  );
}
