import { ResortModalsProvider } from "@/components/client/InteractiveModals";
import { LuxeConcierge, LuxeFooter } from "@/components/luxe/LuxeFooter";
import { LuxeHeader } from "@/components/luxe/LuxeHeader";
import { LanguageProvider } from "@/context/LanguageContext";
import {
  getEventHalls,
  getRoomCategories,
  getSiteSettings,
  getStayPolicy,
} from "@/services/resort-service";

export default async function LuxeLayout({ children }: LayoutProps<"/luxe">) {
  const [settings, rooms, halls, policy] = await Promise.all([
    getSiteSettings(),
    getRoomCategories(),
    getEventHalls(),
    getStayPolicy(),
  ]);

  return (
    <LanguageProvider>
      <ResortModalsProvider
        rooms={rooms}
        halls={halls}
        settings={settings}
        policy={policy}
      >
        <div className="bg-ivory">
          <LuxeHeader />
          <main>{children}</main>
          <LuxeFooter settings={settings} />
          <LuxeConcierge settings={settings} />
        </div>
      </ResortModalsProvider>
    </LanguageProvider>
  );
}
