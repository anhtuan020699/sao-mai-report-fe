import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, Lora } from "next/font/google";
import "./globals.css";

const headingFont = Lora({
  variable: "--font-heading",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const bodyFont = Be_Vietnam_Pro({
  variable: "--font-body",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Sao Mai Phú Mỹ Resort | Ốc đảo xanh giữa lòng đô thị cảng",
    template: "%s | Sao Mai Phú Mỹ Resort",
  },
  description:
    "Sao Mai Phú Mỹ Resort – 10,5ha xanh mát, 147 phòng nghỉ, 38 biệt thự Pháp, trung tâm tiệc cưới & hội nghị Sao Mai Center 1.200+ khách, sân Pickleball & Tennis tại Phú Mỹ.",
  keywords: [
    "Sao Mai Phú Mỹ Resort",
    "resort Phú Mỹ",
    "tiệc cưới Phú Mỹ",
    "hội nghị Phú Mỹ",
    "biệt thự Pháp",
    "pickleball Phú Mỹ",
    "long stay expert Phu My",
  ],
};

export const viewport: Viewport = {
  themeColor: "#183A28",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className={`${headingFont.variable} ${bodyFont.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
