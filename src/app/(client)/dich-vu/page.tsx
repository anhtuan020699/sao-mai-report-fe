import type { Metadata } from "next";
import { ServicesView } from "@/components/client/pages/ServicesView";
import { getResortFacilities } from "@/services/resort-service";

export const metadata: Metadata = {
  title: "Dịch vụ & Tiện ích",
  description:
    "Nhà hàng & Bar, hồ bơi, Tennis & Pickleball và sân tập Golf tại Sao Mai Phú Mỹ Resort.",
};

export default async function ServicesPage() {
  const facilities = await getResortFacilities();
  return <ServicesView facilities={facilities} />;
}
