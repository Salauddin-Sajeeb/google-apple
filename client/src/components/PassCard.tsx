import { motion } from "framer-motion";
import { CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PassCardProps {
  firstName: string;
  lastName: string;
  email: string;
  points: number;
  passId: string;
}

export default function PassCard({ firstName, lastName, email, points, passId }: PassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full max-w-md mx-auto"
      data-testid="card-pass"
    >
      <div className="relative aspect-[1.586/1] rounded-2xl bg-gradient-to-br from-primary via-chart-2 to-chart-2 p-6 shadow-2xl overflow-hidden">
        {/* Decorative mesh gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
        
        <div className="relative h-full flex flex-col justify-between text-white">
          {/* Top section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard className="h-6 w-6" />
              <span className="font-semibold text-sm tracking-wide">DIGITAL PASS</span>
            </div>
          </div>

          {/* Middle section - Name */}
          <div>
            <h3 className="text-3xl font-bold tracking-tight" data-testid="text-pass-name">
              {firstName} {lastName}
            </h3>
            <p className="text-white/70 text-sm mt-1" data-testid="text-pass-email">{email}</p>
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
              {points} Points
            </Badge>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
