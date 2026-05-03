import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Gift, Heart, Stamp } from "lucide-react";

interface PassCardProps {
  firstName: string;
  lastName: string;
  email: string;
  points: number;
  passId: string;
  passType?: "stamp" | "loyalty" | "membership";
  companyName?: string;
  primaryColor?: string;
  secondaryColor?: string;
}

export default function PassCard({
  firstName,
  lastName,
  email,
  points,
  passId,
  passType = "loyalty",
  companyName = "Company",
  primaryColor = "#1973E8",
  secondaryColor = "#7C3AED",
}: PassCardProps) {
  const getIconForType = () => {
    switch (passType) {
      case "stamp":
        return <Stamp className="h-6 w-6" />;
      case "membership":
        return <Heart className="h-6 w-6" />;
      case "loyalty":
      default:
        return <Gift className="h-6 w-6" />;
    }
  };

  const getTypeLabel = () => {
    switch (passType) {
      case "stamp":
        return "STAMP CARD";
      case "membership":
        return "MEMBERSHIP";
      case "loyalty":
      default:
        return "LOYALTY PASS";
    }
  };

  const gradientAngle = passType === "stamp" ? 45 : passType === "membership" ? 135 : 135;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full max-w-md mx-auto"
      data-testid="card-pass"
    >
      <div
        className="relative aspect-[1.586/1] rounded-2xl p-6 shadow-2xl overflow-hidden"
        style={{
          background: `linear-gradient(${gradientAngle}deg, ${primaryColor}, ${secondaryColor})`,
        }}
      >
        {/* Decorative mesh gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" />

        <div className="relative h-full flex flex-col justify-between text-white">
          {/* Top section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getIconForType()}
              <span className="font-semibold text-sm tracking-wide">{getTypeLabel()}</span>
            </div>
          </div>

          {/* Company Name */}
          <div className="absolute top-6 right-6 text-right">
            <p className="text-xs text-white/60 uppercase tracking-widest">Issued by</p>
            <h2 className="text-lg font-bold text-white/90 truncate">{companyName}</h2>
          </div>

          {/* Middle section - Name */}
          <div>
            <h3 className="text-3xl font-bold tracking-tight" data-testid="text-pass-name">
              {firstName} {lastName}
            </h3>
            <p className="text-white/70 text-sm mt-1" data-testid="text-pass-email">
              {email}
            </p>
          </div>

          {/* Bottom section */}
          <div className="flex items-end justify-between">
            <div className="font-mono text-xs text-white/60" data-testid="text-pass-id">
              ID: {passId}
            </div>
            <Badge
              className="bg-white/20 text-white border-white/30 backdrop-blur-sm hover:bg-white/30"
              data-testid="badge-points"
            >
              {points} {passType === "stamp" ? "Stamps" : "Points"}
            </Badge>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
