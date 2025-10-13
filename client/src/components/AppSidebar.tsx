import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar";
import LivePassPreview from "./LivePassPreview";
import { type InsertPass } from "@shared/schema";

interface AppSidebarProps {
  formValues: Partial<InsertPass>;
  generatedPass: (InsertPass & { id: string }) | null;
  isGenerating?: boolean;
  error?: string | null;
  onGoogleWallet?: () => void;
  onAppleWallet?: () => void;
}

export default function AppSidebar({ 
  formValues, 
  generatedPass, 
  isGenerating = false,
  error = null,
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
      </SidebarHeader>
      <SidebarContent className="p-6">
        <LivePassPreview 
          formValues={formValues} 
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
