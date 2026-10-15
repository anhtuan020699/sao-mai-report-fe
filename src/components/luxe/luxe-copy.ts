import { l } from "@/lib/i18n";
import type { Locale } from "@/types/resort";

export const LUXE_SECTIONS = {
  stay: "luu-tru",
  events: "su-kien",
  experiences: "trai-nghiem",
  journal: "tin-tuc",
  contact: "lien-he",
} as const;

export const luxe = {
  nav: {
    stay: l("Lưu trú", "Stay", "숙박", "住宿"),
    events: l("Tiệc & Sự kiện", "Celebrations", "웨딩 & 이벤트", "婚宴与活动"),
    experiences: l("Trải nghiệm", "Experiences", "경험", "体验"),
    journal: l("Tin tức", "Journal", "소식", "资讯"),
    careers: l("Tuyển dụng", "Careers", "채용", "招聘"),
    contact: l("Liên hệ", "Contact", "문의", "联系"),
    reserve: l("Đặt phòng", "Reserve", "예약", "预订"),
    menu: l("Menu", "Menu", "메뉴", "菜单"),
    close: l("Đóng", "Close", "닫기", "关闭"),
  },
  hero: {
    overline: l(
      "Phú Mỹ · Từ 2005",
      "Phu My · Since 2005",
      "푸미 · 2005년부터",
      "富美 · 始于2005",
    ),
    title: l(
      "Ốc đảo xanh giữa lòng đô thị cảng",
      "A green sanctuary in the heart of the port city",
      "항구 도시 한가운데의 초록 오아시스",
      "港城中心的绿色秘境",
    ),
    subtitle: l(
      "Biệt thự Pháp, vườn cổ thụ và mặt hồ tĩnh lặng trên 10,5 ha.",
      "French villas, old-growth gardens and a quiet lake across 10.5 hectares.",
      "10.5헥타르에 펼쳐진 프렌치 빌라, 고목 정원, 고요한 호수.",
      "10.5公顷的法式别墅、古树花园与静谧湖泊。",
    ),
    checkIn: l("Nhận phòng", "Arrival", "체크인", "入住"),
    checkOut: l("Trả phòng", "Departure", "체크아웃", "退房"),
    guests: l("Khách", "Guests", "인원", "人数"),
    guestsValue: l("{n} người lớn", "{n} adults", "성인 {n}명", "{n}位成人"),
    check: l(
      "Kiểm tra phòng trống",
      "Check availability",
      "예약 가능 확인",
      "查询空房",
    ),
    scroll: l("Khám phá", "Discover", "둘러보기", "探索"),
  },
  intro: {
    overline: l(
      "Chào mừng đến Sao Mai",
      "Welcome to Sao Mai",
      "사오마이에 오신 것을 환영합니다",
      "欢迎来到 Sao Mai",
    ),
    text: l(
      "Hai mươi năm qua, Sao Mai là nơi chuyên gia, doanh nghiệp và gia đình tìm về sự tĩnh tại – giữa tán cây xanh, ngay cạnh nhịp sống công nghiệp Phú Mỹ.",
      "For twenty years, Sao Mai has been where experts, companies and families come for stillness – beneath green canopies, right beside the industrial pulse of Phu My.",
      "지난 20년간 사오마이는 전문가, 기업, 가족이 고요함을 찾아오는 곳이었습니다 – 푸미 산업 단지 바로 옆, 초록 숲 아래에서.",
      "二十年来，Sao Mai 一直是专家、企业与家庭寻找宁静之所——绿荫之下，紧邻富美工业脉动。",
    ),
  },
  stay: {
    overline: l("Lưu trú", "Stay", "숙박", "住宿"),
    title: l(
      "Biệt thự Pháp và những căn phòng giữa vườn",
      "French villas and rooms among the gardens",
      "정원 속 프렌치 빌라와 객실",
      "花园中的法式别墅与客房",
    ),
    from: l(
      "Từ {price} / đêm",
      "From {price} / night",
      "1박 {price}부터",
      "每晚 {price} 起",
    ),
    guests: l("{n} khách", "{n} guests", "{n}인", "{n}位"),
    units: l("{n} căn", "{n} units", "{n}실", "{n}间"),
    discover: l("Khám phá", "Discover", "자세히 보기", "了解更多"),
    otherRooms: l("Khối khách sạn", "Hotel rooms", "호텔 객실", "酒店客房"),
    longStay: l(
      "Lưu trú dài hạn cho chuyên gia – giá theo tháng, đã gồm dọn phòng và tiện ích.",
      "Long stays for experts – monthly rates with housekeeping and utilities included.",
      "전문가 장기 숙박 – 하우스키핑과 공과금이 포함된 월 요금.",
      "专家长住——月租价格，含客房清洁与水电。",
    ),
    longStayCta: l(
      "Nhận báo giá dài hạn",
      "Request a long-stay rate",
      "장기 숙박 견적 요청",
      "获取长住报价",
    ),
  },
  video: {
    overline: l("Phim giới thiệu", "The film", "소개 영상", "宣传片"),
    title: l(
      "Sao Mai nhìn từ trên cao",
      "Sao Mai from above",
      "하늘에서 본 사오마이",
      "从空中看 Sao Mai",
    ),
    play: l("Phát phim", "Play film", "영상 재생", "播放影片"),
  },
  events: {
    overline: l(
      "Tiệc & Sự kiện",
      "Celebrations",
      "웨딩 & 이벤트",
      "婚宴与活动",
    ),
    title: l(
      "Sao Mai Center – nơi những dịp trọng đại được chăm chút",
      "Sao Mai Center – where great occasions are cared for",
      "사오마이 센터 – 특별한 날을 정성껏 준비하는 곳",
      "Sao Mai Center——精心成就每个重要时刻",
    ),
    facts: l(
      "Hai sảnh mái vòm · hơn 1.200 khách · hơn 20 năm tổ chức",
      "Two domed halls · 1,200+ guests · 20+ years of hosting",
      "돔형 연회장 2개 · 1,200명 이상 · 20년 이상의 경험",
      "两座穹顶宴会厅 · 1,200+宾客 · 20余年经验",
    ),
    weddingOverline: l("Tiệc cưới", "Weddings", "웨딩", "婚礼"),
    weddingTitle: l(
      "Ngày trọng đại, trọn vẹn từng chi tiết",
      "Your day, perfected in every detail",
      "모든 디테일이 완벽한 그날",
      "盛大之日，尽善尽美",
    ),
    corporateOverline: l(
      "Hội nghị & Doanh nghiệp",
      "Meetings & Corporate",
      "회의 & 기업 행사",
      "会议与企业活动",
    ),
    corporateTitle: l(
      "Hội nghị, gala và year-end party",
      "Conferences, galas and year-end parties",
      "컨퍼런스, 갈라, 연말 파티",
      "会议、晚宴与年终派对",
    ),
    enquire: l("Yêu cầu báo giá", "Enquire", "견적 문의", "咨询报价"),
  },
  experiences: {
    overline: l("Trải nghiệm", "Experiences", "경험", "体验"),
    title: l(
      "Những ngày chậm lại",
      "Days that slow down",
      "느리게 흐르는 하루",
      "放慢脚步的日子",
    ),
    all: l("Tất cả dịch vụ", "All experiences", "모든 서비스", "全部服务"),
  },
  heritage: {
    quote: l(
      "Không phải nơi xa hoa nhất – mà là nơi bạn muốn quay lại.",
      "Not the most lavish place – but the one you want to return to.",
      "가장 화려한 곳이 아니라, 다시 돌아오고 싶은 곳.",
      "不是最奢华的地方——而是让你想再回来的地方。",
    ),
    caption: l(
      "Sao Mai Phú Mỹ Resort, từ 2005",
      "Sao Mai Phu My Resort, since 2005",
      "사오마이 푸미 리조트, 2005년부터",
      "Sao Mai Phu My 度假村，始于2005",
    ),
  },
  journal: {
    overline: l(
      "Tin tức & Ưu đãi",
      "Journal & Offers",
      "소식 & 혜택",
      "资讯与优惠",
    ),
    title: l(
      "Câu chuyện mới từ Sao Mai",
      "Latest from Sao Mai",
      "사오마이의 새로운 소식",
      "Sao Mai 最新动态",
    ),
    all: l("Tất cả tin tức", "All stories", "모든 소식", "全部资讯"),
    read: l("Đọc tiếp", "Read", "읽기", "阅读"),
  },
  contact: {
    overline: l("Liên hệ", "Contact", "문의", "联系"),
    title: l(
      "Hẹn gặp bạn tại Sao Mai",
      "We look forward to welcoming you",
      "사오마이에서 뵙겠습니다",
      "期待在 Sao Mai 与您相见",
    ),
    address: l("Địa chỉ", "Address", "주소", "地址"),
    reservations: l(
      "Đặt phòng & Lễ tân",
      "Reservations",
      "예약 & 프런트",
      "预订与前台",
    ),
    events: l(
      "Sự kiện & Doanh nghiệp",
      "Events & Corporate",
      "이벤트 & 기업",
      "活动与企业",
    ),
    directions: l("Chỉ đường", "Get directions", "길찾기", "导航"),
    call: l("Gọi điện", "Call", "전화", "致电"),
    message: l("Nhắn tin", "Message", "메시지", "留言"),
  },
  footer: {
    tagline: l(
      "Ốc đảo xanh giữa lòng đô thị cảng",
      "A green sanctuary in the port city",
      "항구 도시의 초록 오아시스",
      "港城绿色秘境",
    ),
    rights: l(
      "Bảo lưu mọi quyền.",
      "All rights reserved.",
      "모든 권리 보유.",
      "版权所有。",
    ),
    classic: l(
      "Xem giao diện hiện tại",
      "View current design",
      "현재 디자인 보기",
      "查看当前设计",
    ),
  },
};

/** Compact rate, e.g. "1,35 triệu" / "VND 1.35M" / "135만 동" / "135万越南盾". */
export function formatCompactVnd(vnd: number, locale: Locale): string {
  if (locale === "ko" || locale === "zh") {
    const man = vnd / 10_000;
    const text = Number.isInteger(man) ? String(man) : man.toFixed(1);
    return locale === "ko" ? `${text}만 동` : `${text}万越南盾`;
  }
  const millions = (vnd / 1_000_000).toFixed(2).replace(/\.?0+$/, "");
  return locale === "vi"
    ? `${millions.replace(".", ",")} triệu`
    : `VND ${millions}M`;
}
