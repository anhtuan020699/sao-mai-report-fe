import { FloatingContactDock } from "@/components/client/FloatingContactDock";
import { Footer } from "@/components/client/Footer";
import { ResortModalsProvider } from "@/components/client/InteractiveModals";
import { Navbar } from "@/components/client/Navbar";
import { LanguageProvider } from "@/context/LanguageContext";
import {
  getEventHalls,
  getResortFacilities,
  getRoomCategories,
  getSiteSettings,
  getStayPolicy,
} from "@/services/resort-service";

export default async function ClientLayout({ children }: LayoutProps<"/">) {
  const [settings, rooms, halls, policy, facilities] = await Promise.all([
    getSiteSettings(),
    getRoomCategories(),
    getEventHalls(),
    getStayPolicy(),
    getResortFacilities(),
  ]);

  return (
    <LanguageProvider>
      <ResortModalsProvider rooms={rooms} halls={halls} settings={settings} policy={policy}>
        <Navbar settings={settings} facilities={facilities} />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} />
        <FloatingContactDock settings={settings} />
      </ResortModalsProvider>
    </LanguageProvider>
  );
}
