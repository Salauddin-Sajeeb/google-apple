import { Input } from "@/components/ui/input";
import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LivePassPreview from "./LivePassPreview";

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

interface AppSidebarProps {
  passData: PreviewPassData;
  generatedPass: GeneratedPass | null;
  isGenerating?: boolean;
  error?: string | null;
  onPassDataChange: <K extends keyof PreviewPassData>(
    key: K,
    value: PreviewPassData[K]
  ) => void;
  onGoogleWallet?: () => void;
  onAppleWallet?: () => void;
}

export default function AppSidebar({ 
  passData,
  generatedPass, 
  isGenerating = false,
  error = null,
  onPassDataChange,
  onGoogleWallet,
  onAppleWallet
}: AppSidebarProps) {
  return (
    <Sidebar side="right" className="border-l">
      <SidebarHeader className="border-b p-6">
        <h2 className="text-lg font-semibold">Pass Preview</h2>
        <p className="text-sm text-muted-foreground mt-1">
          {generatedPass 
            ? "Your digital pass is ready" 
            : "Fill the form to see your pass"}
        </p>

        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Card Type
            </p>
            <Tabs
              value={passData.passType}
              onValueChange={(value) => {
                if (!value) return;
                onPassDataChange("passType", value as CardType);
              }}
            >
              <TabsList className="grid w-full grid-cols-4 h-auto gap-1 bg-zinc-100/80 dark:bg-zinc-900/70 p-1 rounded-xl">
                <TabsTrigger value="loyalty" className="rounded-lg text-xs px-2 py-2">Loyalty</TabsTrigger>
                <TabsTrigger value="membership" className="rounded-lg text-xs px-2 py-2">Membership</TabsTrigger>
                <TabsTrigger value="stamp" className="rounded-lg text-xs px-2 py-2">Stamp</TabsTrigger>
                <TabsTrigger value="coupon" className="rounded-lg text-xs px-2 py-2">Coupon</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground" htmlFor="preview-company-name">
              Company Name
            </label>
            <Input
              id="preview-company-name"
              value={passData.companyName}
              onChange={(e) => onPassDataChange("companyName", e.target.value)}
              placeholder="Company"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground" htmlFor="preview-primary-color">
              Background Color
            </label>
            <div className="flex items-center gap-2">
              <input
                id="preview-primary-color"
                value={passData.primaryColor}
                onChange={(e) => onPassDataChange("primaryColor", e.target.value)}
                type="color"
                className="h-10 w-14 rounded border border-border bg-transparent cursor-pointer"
              />
              <Input
                value={passData.primaryColor}
                onChange={(e) => onPassDataChange("primaryColor", e.target.value)}
                placeholder="#1973E8"
                className="font-mono text-sm"
              />
            </div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-6">
        <LivePassPreview 
          passData={passData}
          generatedPass={generatedPass}
          isGenerating={isGenerating}
          error={error}
          onGoogleWallet={onGoogleWallet}
          onAppleWallet={onAppleWallet}
        />
      </SidebarContent>
    </Sidebar>
  );
}
