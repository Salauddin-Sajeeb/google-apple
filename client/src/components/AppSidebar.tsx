import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar";
import LivePassPreview from "./LivePassPreview";
import { type InsertPass } from "@shared/schema";

interface AppSidebarProps {
  formValues: Partial<InsertPass>;
  generatedPass: (InsertPass & { id: string }) | null;
}

export default function AppSidebar({ formValues, generatedPass }: AppSidebarProps) {
  return (
    <Sidebar side="right" className="border-l">
      <SidebarHeader className="border-b p-6">
        <h2 className="text-lg font-semibold">Pass Preview</h2>
        <p className="text-sm text-muted-foreground mt-1">
          See your pass update in real-time
        </p>
      </SidebarHeader>
      <SidebarContent className="p-6">
        <LivePassPreview formValues={formValues} generatedPass={generatedPass} />
      </SidebarContent>
    </Sidebar>
  );
}
