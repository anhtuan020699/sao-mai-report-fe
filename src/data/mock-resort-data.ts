import { l, la } from "@/lib/i18n";
import { unsplash } from "@/lib/utils";
import type {
  CorporatePartner,
  EventHall,
  HeroSlide,
  Landmark,
  PromotionPost,
  ResortImage,
  ResortService,
  ResortStat,
  RoomCategory,
  JobPosting,
  ResortFacility,
  SiteSettings,
  StayPolicy,
} from "@/types/resort";

const CREATED = "2025-01-01T00:00:00.000Z";
const UPDATED = "2025-10-01T00:00:00.000Z";

const PHOTO = {
  villaRedRoof: "1645740046976-b4ae5c61de0a",
  villaRowRedRoof: "1657302157898-eda546941dde",
  villaPoolPalms: "1564013799919-ab600027ffc6",
  villaLiving: "1560185007-cde436f6a4d0",
  bungalowGardenPool: "1582610116397-edb318620f90",
  lodgePool: "1566073771259-6a8506099945",
  lakeHouse: "1470770841072-f978cf4d019e",
  roomDeluxeA: "1590490360182-c33d57733427",
  roomDeluxeB: "1611892440504-42a792e24d32",
  roomDeluxeC: "1578683010236-d716f9a3f461",
  roomSuperiorA: "1618773928121-c32242e63f39",
  roomSuperiorB: "1631049307264-da0ec9d70304",
  roomSuperiorC: "1615874959474-d609969a20ed",
  roomStandardA: "1587985064135-0366536eab42",
  roomStandardB: "1582719478250-c89cae4dc85b",
  tropicalPool: "1520250497591-112f2f40a3f4",
  lushInfinityPool: "1540541338287-41700207dee6",
  poolNight: "1571896349842-33c89424de2d",
  poolPalms: "1600011689032-8b628b8a8747",
  forest: "1441974231531-c6227db76b6e",
  banquetHall: "1519167758481-83f550bb49b3",
  weddingWhiteHall: "1464366400600-7168b8af9bc3",
  weddingTable: "1511795409834-ef04bbd61622",
  weddingLongTable: "1519225421980-715cb0215aed",
  fairyLightHall: "1510076857177-7470076d4098",
  conferenceAudience: "1540575467063-178a50c2df87",
  conferenceScreen: "1505373877841-8d25f7d46678",
  galaCrowd: "1505236858219-8359eb29e329",
  restaurant: "1517248135467-4c7edcad34c4",
  fineDining: "1414235077428-338989a2e8c0",
  terraceDining: "1559339352-11d035aa65de",
  groupDining: "1528605248644-14dd04022da1",
  buffet: "1555244162-803834f70033",
  pickleballMatch: "1761644518970-2ed0ab543e1b",
  pickleballCourt: "1761644658016-324918bc373c",
  tennisPlayer: "1622279457486-62dcc4a431d6",
  tennisClay: "1554068865-24cecd4e34b8",
  gym: "1534438327276-14e5300c3a48",
  spa: "1544161515-4ab6ce6db874",
  spaStones: "1600334089648-b0d9d3028eb2",
  karaoke: "1516450360452-9312f5e86fc7",
  runner: "1476480862126-209bfaa8edc8",
  teamBuilding: "1529156069898-49953e39b3ac",
  golfSwing: "1535131749006-b7f58c99034b",
  golfIron: "1593111774240-d529f12cf4bb",
  bar: "1572116469696-31de0f17cc34",
  cocktail: "1514362545857-3bc16c4c7d1b",
} as const;

function img(photo: keyof typeof PHOTO, alt: ResortImage["alt"], width = 1600): ResortImage {
  return { url: unsplash(PHOTO[photo], width), alt };
}

function base(id: string, slug: string, sortOrder: number) {
  return { id, slug, sortOrder, isPublished: true, createdAt: CREATED, updatedAt: UPDATED };
}

/* ------------------------------------------------------------------ */
/* Site settings                                                       */
/* ------------------------------------------------------------------ */

export const siteSettings: SiteSettings = {
  name: "Sao Mai Phú Mỹ Resort",
  legalName: "Sao Mai Resort Phú Mỹ - Việt Nam",
  logoUrl: null,
  address: l(
    "143 – 145 Đường Hùng Vương, Phường Tân Phước, TP. Hồ Chí Minh (Khu vực Phú Mỹ - Bà Rịa Vũng Tàu)",
    "143 – 145 Hung Vuong Street, Tan Phuoc Ward, Ho Chi Minh City (Phu My – Ba Ria Vung Tau area)",
    "143 – 145 훙브엉 거리, 떤프억 동, 호찌민시 (푸미 – 바리아붕따우 지역)",
    "胡志明市新福坊雄王路143 – 145号（富美 – 巴地头顿地区）",
  ),
  hotline: "0929 569 979",
  zalo: "0929569979",
  phones: ["(0254) 3936 318", "(0254) 3895 356"],
  emails: {
    reception: "rctn@saomaiphumyresort.com",
    sales: "sale@saomaiphumyresort.com",
  },
  social: {
    facebook: "https://www.facebook.com/saomaiphumyresort",
    messenger: "https://m.me/saomaiphumyresort",
    zalo: "https://zalo.me/0929569979",
  },
  mapEmbedUrl:
    "https://www.google.com/maps?q=Sao+Mai+Ph%C3%BA+M%E1%BB%B9+Resort,+143+H%C3%B9ng+V%C6%B0%C6%A1ng,+Ph%C3%BA+M%E1%BB%B9&z=15&output=embed",
  mapLink: "https://www.google.com/maps/search/?api=1&query=Sao+Mai+Phu+My+Resort",
  foundedYear: 2005,
  milestoneYear: 2025,
  introVideo: {
    youtubeId: "mPZEAqHn3o4",
    title: l(
      "Video giới thiệu Sao Mai Phú Mỹ Resort",
      "Sao Mai Phu My Resort – intro film",
      "사오마이 푸미 리조트 소개 영상",
      "Sao Mai Phu My 度假村宣传片",
    ),
  },
};

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export const heroSlides: HeroSlide[] = [
  {
    ...base("hero_oasis", "green-oasis", 1),
    image: img("lushInfinityPool", l(
      "Hồ bơi giữa khu vườn nhiệt đới 10,5ha",
      "Pool amid a 10.5-hectare tropical garden",
      "10.5헥타르 열대 정원 속 수영장",
      "10.5公顷热带花园中的泳池",
    ), 2400),
    eyebrow: l("10,5 Hecta Xanh Mát", "10.5 Hectares of Greenery", "10.5헥타르의 푸른 자연", "10.5公顷绿意"),
    title: l(
      "Ốc đảo xanh giữa lòng đô thị cảng",
      "A green oasis in the heart of the port city",
      "항만 도시 한가운데의 초록빛 오아시스",
      "港口都市中心的绿色绿洲",
    ),
    subtitle: l(
      "Làng nghỉ dưỡng yên bình bên hồ, cạnh Quốc lộ 51 – nơi chuyên gia, doanh nghiệp và gia đình tìm lại nhịp sống thư thái.",
      "A tranquil lakeside village beside Highway 51 – where experts, companies and families rediscover an unhurried rhythm.",
      "51번 국도 옆 고요한 호숫가 마을 – 전문가, 기업, 가족 모두가 여유를 되찾는 곳.",
      "毗邻51号国道的宁静湖畔度假村——专家、企业与家庭重拾悠然节奏之地。",
    ),
  },
  {
    ...base("hero_villa", "french-villas", 2),
    image: img("villaRedRoof", l(
      "Biệt thự mái ngói đỏ phong cách Pháp",
      "Red-tiled French-style villa",
      "붉은 기와 지붕의 프렌치 빌라",
      "红瓦屋顶法式别墅",
    ), 2400),
    eyebrow: l("38 Biệt Thự Pháp 1930s", "38 French Villas · 1930s", "1930년대 프렌치 빌라 38채", "38栋1930年代法式别墅"),
    title: l(
      "Nét kiến trúc Pháp cổ điển dưới mái ngói đỏ",
      "Classic French architecture beneath red-tiled roofs",
      "붉은 기와 아래 클래식 프렌치 건축",
      "红瓦之下的经典法式建筑",
    ),
    subtitle: l(
      "Hiên gỗ, vườn riêng và nhịp sống chậm – không gian lưu trú dài ngày lý tưởng cho chuyên gia quốc tế.",
      "Wooden verandas, private gardens and slow living – the ideal long-stay home for international experts.",
      "나무 베란다와 프라이빗 정원, 느린 일상 – 해외 전문가를 위한 이상적인 장기 체류 공간.",
      "木质回廊、私家花园与慢生活——国际专家理想的长住之所。",
    ),
  },
  {
    ...base("hero_pool", "pool-lifestyle", 3),
    image: img("tropicalPool", l(
      "Hồ bơi ngoài trời rợp bóng dừa",
      "Outdoor pool shaded by palms",
      "야자수 그늘의 야외 수영장",
      "椰影环绕的户外泳池",
    ), 2400),
    eyebrow: l("Hồ Bơi · Pickleball · Tennis", "Pool · Pickleball · Tennis", "수영장 · 피클볼 · 테니스", "泳池 · 匹克球 · 网球"),
    title: l(
      "Năng lượng mới sau mỗi giờ làm việc",
      "Recharge after every working day",
      "하루 업무 후 채우는 새로운 에너지",
      "每个工作日后焕发新活力",
    ),
    subtitle: l(
      "Hồ bơi sinh thái, sân Pickleball mới, sân Tennis tiêu chuẩn và đường chạy bộ xuyên vườn xanh.",
      "Eco pool, brand-new Pickleball courts, standard Tennis courts and jogging trails through the gardens.",
      "에코 수영장, 신규 피클볼 코트, 표준 테니스 코트, 정원을 가로지르는 러닝 트레일.",
      "生态泳池、全新匹克球场、标准网球场及穿越花园的跑步道。",
    ),
  },
  {
    ...base("hero_wedding", "grand-wedding", 4),
    image: img("banquetHall", l(
      "Sảnh tiệc cưới Sao Mai Center",
      "Sao Mai Center wedding ballroom",
      "사오마이 센터 웨딩 연회장",
      "Sao Mai Center婚宴大厅",
    ), 2400),
    eyebrow: l("Sao Mai Center 1 & 2", "Sao Mai Center 1 & 2", "사오마이 센터 1 & 2", "Sao Mai Center 1 & 2"),
    title: l(
      "Nơi những khoảnh khắc trọng đại thăng hoa",
      "Where life's grandest moments shine",
      "인생의 가장 빛나는 순간을 위한 무대",
      "成就人生盛大时刻之地",
    ),
    subtitle: l(
      "Hai trung tâm tiệc cưới & hội nghị sức chứa hơn 1.200 khách, kiến trúc mái vòm hiện đại.",
      "Two wedding & convention centers for 1,200+ guests under modern dome architecture.",
      "모던 돔 건축의 웨딩·컨벤션 센터 2곳, 1,200명 이상 수용.",
      "两座现代穹顶婚宴与会议中心，可容纳1,200位以上宾客。",
    ),
  },
];

/* ------------------------------------------------------------------ */
/* Brand numbers & partners                                            */
/* ------------------------------------------------------------------ */

export const resortStats: ResortStat[] = [
  {
    id: "stat_area",
    value: "10.5 Ha",
    label: l("Không gian xanh", "Green landscape", "녹지 공간", "绿色空间"),
    description: l(
      "Vườn cây, mặt hồ và đường dạo bộ",
      "Gardens, lake and walking paths",
      "정원, 호수, 산책로",
      "花园、湖泊与步道",
    ),
  },
  {
    id: "stat_rooms",
    value: "147",
    label: l("Phòng & Biệt thự", "Rooms & Villas", "객실 & 빌라", "客房与别墅"),
    description: l(
      "7 hạng phòng, thuê theo giờ, đêm hoặc tháng",
      "7 room types – by the hour, night or month",
      "7개 객실 유형 – 대실·1박·월 단위",
      "7种房型，可按钟点、按晚或按月",
    ),
  },
  {
    id: "stat_villas",
    value: "38",
    label: l("Biệt thự Pháp 1930s", "1930s French Villas", "1930년대 프렌치 빌라", "1930年代法式别墅"),
    description: l(
      "Mái ngói đỏ, hiên gỗ cổ điển",
      "Red-tiled roofs, wooden verandas",
      "붉은 기와, 클래식 목조 베란다",
      "红瓦屋顶、古典木质回廊",
    ),
  },
  {
    id: "stat_capacity",
    value: "1.200+",
    label: l("Sức chứa sảnh tiệc", "Banquet capacity", "연회장 수용 인원", "宴会厅容量"),
    description: l(
      "Sao Mai Center 1 & 2",
      "Sao Mai Center 1 & 2",
      "사오마이 센터 1 & 2",
      "Sao Mai Center 1 & 2",
    ),
  },
];

export const corporatePartners: CorporatePartner[] = [
  { id: "p_samsung", name: "Samsung Engineering", countryCode: "KR", industry: l("Kỹ thuật & EPC", "Engineering & EPC", "엔지니어링 & EPC", "工程与EPC") },
  { id: "p_posco", name: "POSCO Steel", countryCode: "KR", industry: l("Thép", "Steel", "철강", "钢铁") },
  { id: "p_bluescope", name: "BlueScope Steel", countryCode: "AU", industry: l("Thép", "Steel", "철강", "钢铁") },
  { id: "p_penta", name: "Penta-Ocean", countryCode: "JP", industry: l("Xây dựng cảng biển", "Marine construction", "해양 건설", "港口建设") },
  { id: "p_pvfcco", name: "PVFCCo", countryCode: "VN", industry: l("Phân bón & Hóa chất", "Fertilizer & Chemicals", "비료 & 화학", "化肥与化工") },
  { id: "p_meinhardt", name: "Meinhardt", countryCode: "SG", industry: l("Tư vấn thiết kế", "Design consulting", "설계 컨설팅", "设计咨询") },
  { id: "p_portcoast", name: "Portcoast", countryCode: "VN", industry: l("Tư vấn cảng biển", "Port consulting", "항만 컨설팅", "港口咨询") },
  { id: "p_osc", name: "OSC Vietnam", countryCode: "VN", industry: l("Du lịch & Dịch vụ", "Travel & Services", "관광 & 서비스", "旅游与服务") },
];

/* ------------------------------------------------------------------ */
/* Rooms                                                               */
/* ------------------------------------------------------------------ */

export const roomCategories: RoomCategory[] = [
  {
    ...base("room_suite_villa", "suite-villa", 1),
    type: "SUITE_VILLA",
    group: "VILLA",
    name: l("Suite Villa", "Suite Villa", "스위트 빌라", "套房别墅"),
    tagline: l(
      "Biệt thự Pháp mái ngói đỏ giữa vườn xanh",
      "Red-tiled French villa amid the gardens",
      "정원 속 붉은 기와 프렌치 빌라",
      "花园中的红瓦法式别墅",
    ),
    description: l(
      "36 căn Suite Villa mang nét kiến trúc Pháp cổ điển với mái ngói đỏ, hiên gỗ và cửa chớp, nằm rải rác giữa khuôn viên 10,5ha. Không gian 60m² riêng tư với giường King – lựa chọn được các chuyên gia quốc tế ưa chuộng cho kỳ lưu trú dài ngày, với giá thuê tháng ưu đãi.",
      "Thirty-six Suite Villas carry classic French architecture – red-tiled roofs, wooden verandas and shutters – scattered across our 10.5-hectare grounds. 60 m² of private space with a King bed, favoured by international experts on long assignments thanks to attractive monthly rates.",
      "36채의 스위트 빌라는 붉은 기와 지붕, 목조 베란다, 덧창 등 클래식 프렌치 건축을 간직한 채 10.5헥타르 부지 곳곳에 자리하고 있습니다. 킹 침대를 갖춘 60m²의 프라이빗 공간으로, 합리적인 월 단위 요금 덕분에 장기 체류 해외 전문가들이 선호합니다.",
      "36栋套房别墅保留经典法式建筑风貌——红瓦屋顶、木质回廊与百叶窗，散落于10.5公顷园区之中。60平方米私密空间配特大床，凭借优惠的包月价格深受长住国际专家青睐。",
    ),
    features: la(
      ["Diện tích 60m², tiêu chuẩn 2 khách", "Kiến trúc Pháp, hiên gỗ nhìn ra vườn", "Giường King 1,8m x 2m", "Giá thuê tháng cho chuyên gia"],
      ["60 m², 2 guests standard", "French architecture, garden-facing veranda", "King bed 1.8 m x 2 m", "Monthly rates for experts"],
      ["60m², 기준 2인", "프렌치 건축, 정원 전망 베란다", "킹 침대 1.8m x 2m", "전문가를 위한 월 단위 요금"],
      ["60平方米，标准2人", "法式建筑，面向花园的回廊", "特大床 1.8米 x 2米", "专家包月价格"],
    ),
    badgeText: l("Biểu tượng di sản", "Heritage icon", "헤리티지 아이콘", "传承地标"),
    bedType: l("Giường King 1,8m x 2m", "King bed 1.8 m x 2 m", "킹 침대 1.8m x 2m", "特大床 1.8米 x 2米"),
    sizeSqm: 60,
    viewType: "GARDEN",
    standardGuests: 2,
    totalUnits: 36,
    basePriceVnd: 1_350_000,
    hourlyPriceVnd: 850_000,
    monthlyPriceVnd: 33_750_000,
    coverImage: img("villaRedRoof", l("Suite Villa mái ngói đỏ", "Red-tiled Suite Villa", "붉은 기와 스위트 빌라", "红瓦套房别墅")),
    gallery: [
      img("villaRedRoof", l("Mặt tiền Suite Villa", "Suite Villa façade", "스위트 빌라 외관", "套房别墅外观")),
      img("villaRowRedRoof", l("Dãy biệt thự giữa vườn", "Villas among the gardens", "정원 속 빌라", "花园中的别墅群")),
      img("villaPoolPalms", l("Không gian hồ bơi gần biệt thự", "Pool near the villas", "빌라 인근 수영장", "别墅旁的泳池")),
    ],
    amenities: ["WIFI", "AIR_CONDITIONING", "SMART_TV", "VERANDA", "WORK_DESK", "COFFEE_MAKER", "BREAKFAST", "PARKING"],
  },
  {
    ...base("room_family_villa", "family-villa", 2),
    type: "FAMILY_VILLA",
    group: "VILLA",
    name: l("Family Villa", "Family Villa", "패밀리 빌라", "家庭别墅"),
    tagline: l(
      "130m² rộng rãi cho gia đình 4 người",
      "130 m² of space for a family of four",
      "4인 가족을 위한 130m² 공간",
      "130平方米，四口之家的宽敞空间",
    ),
    description: l(
      "Hạng biệt thự lớn nhất resort – chỉ có 2 căn. Không gian 130m² mang kiến trúc Pháp cổ điển giữa vườn xanh, tiêu chuẩn 4 khách, phù hợp gia đình nghỉ cuối tuần hoặc nhóm chuyên gia ở cùng nhau dài ngày.",
      "Our largest villa category – just two of them. 130 m² of classic French architecture amid the gardens for four guests, ideal for family weekends or expert teams staying together long-term.",
      "리조트에서 가장 큰 빌라로 단 2채뿐입니다. 정원 속 클래식 프렌치 건축의 130m² 공간은 기준 4인으로, 주말 가족 여행이나 함께 장기 체류하는 전문가 팀에 적합합니다.",
      "度假村面积最大的别墅房型，仅有2栋。130平方米经典法式建筑掩映于花园之中，标准入住4人，适合家庭周末度假或专家团队长期同住。",
    ),
    features: la(
      ["Diện tích 130m², tiêu chuẩn 4 khách", "Chỉ 2 căn – riêng tư tuyệt đối", "Giường King 1,8m x 2m", "Phù hợp nhóm chuyên gia ở dài hạn"],
      ["130 m², 4 guests standard", "Only 2 villas – complete privacy", "King bed 1.8 m x 2 m", "Great for expert teams on long stays"],
      ["130m², 기준 4인", "단 2채 – 완벽한 프라이버시", "킹 침대 1.8m x 2m", "장기 체류 전문가 팀에 적합"],
      ["130平方米，标准4人", "仅2栋，私密无扰", "特大床 1.8米 x 2米", "适合专家团队长住"],
    ),
    badgeText: l("Chỉ 2 căn", "Only 2 villas", "단 2채", "仅2栋"),
    bedType: l("Giường King 1,8m x 2m", "King bed 1.8 m x 2 m", "킹 침대 1.8m x 2m", "特大床 1.8米 x 2米"),
    sizeSqm: 130,
    viewType: "GARDEN",
    standardGuests: 4,
    totalUnits: 2,
    basePriceVnd: 2_310_000,
    hourlyPriceVnd: 1_650_000,
    monthlyPriceVnd: 57_750_000,
    coverImage: img("villaRowRedRoof", l("Family Villa giữa vườn", "Family Villa in the gardens", "정원 속 패밀리 빌라", "花园中的家庭别墅")),
    gallery: [
      img("villaRowRedRoof", l("Family Villa giữa vườn", "Family Villa in the gardens", "정원 속 패밀리 빌라", "花园中的家庭别墅")),
      img("villaLiving", l("Phòng khách biệt thự", "Villa living room", "빌라 거실", "别墅客厅")),
      img("villaRedRoof", l("Mái ngói đỏ phong cách Pháp", "French-style red-tiled roof", "프렌치 스타일 붉은 기와", "法式红瓦屋顶")),
    ],
    amenities: ["WIFI", "AIR_CONDITIONING", "SMART_TV", "VERANDA", "WORK_DESK", "COFFEE_MAKER", "BREAKFAST", "PARKING"],
  },
  {
    ...base("room_sweety", "sweety-room", 3),
    type: "SWEETY",
    group: "HOTEL",
    name: l("Sweety Room", "Sweety Room", "스위티 룸", "甜蜜客房"),
    tagline: l(
      "Phòng duy nhất với giường oval cho cặp đôi",
      "Our one-of-a-kind oval-bed room for couples",
      "커플을 위한 단 하나뿐인 오벌 침대 객실",
      "独一无二的椭圆床情侣房",
    ),
    description: l(
      "Căn phòng duy nhất tại resort được thiết kế riêng cho các cặp đôi: giường oval đặc trưng trong không gian 40m² ấm cúng – lựa chọn lãng mạn cho kỷ niệm ngày cưới, tuần trăng mật hay một kỳ nghỉ cuối tuần bên nhau.",
      "The only room of its kind at the resort, designed for couples: a signature oval bed in a cosy 40 m² space – a romantic choice for anniversaries, honeymoons or a weekend together.",
      "커플을 위해 디자인된 리조트 유일의 객실입니다. 아늑한 40m² 공간의 시그니처 오벌 침대로 결혼기념일, 허니문, 둘만의 주말에 어울리는 로맨틱한 선택입니다.",
      "度假村唯一专为情侣设计的客房：40平方米温馨空间配标志性椭圆床——纪念日、蜜月或二人周末的浪漫之选。",
    ),
    features: la(
      ["Giường oval đặc trưng", "Diện tích 40m², tiêu chuẩn 2 khách", "Chỉ có 1 phòng duy nhất", "Lý tưởng cho kỷ niệm & trăng mật"],
      ["Signature oval bed", "40 m², 2 guests standard", "Only one such room", "Perfect for anniversaries & honeymoons"],
      ["시그니처 오벌 침대", "40m², 기준 2인", "단 1실뿐", "기념일 & 허니문에 제격"],
      ["标志性椭圆床", "40平方米，标准2人", "仅此一间", "纪念日与蜜月之选"],
    ),
    badgeText: l("Dành cho cặp đôi", "For couples", "커플 전용", "情侣之选"),
    bedType: l("Giường tròn oval", "Oval bed", "오벌 침대", "椭圆形床"),
    sizeSqm: 40,
    viewType: "GARDEN",
    standardGuests: 2,
    totalUnits: 1,
    basePriceVnd: 1_150_000,
    hourlyPriceVnd: 800_000,
    monthlyPriceVnd: 28_750_000,
    coverImage: img("roomDeluxeC", l("Sweety Room", "Sweety Room", "스위티 룸", "甜蜜客房")),
    gallery: [
      img("roomDeluxeC", l("Không gian Sweety Room", "Sweety Room interior", "스위티 룸 내부", "甜蜜客房内景")),
      img("roomDeluxeB", l("Góc thư giãn", "Lounge corner", "라운지 코너", "休憩角落")),
    ],
    amenities: ["WIFI", "AIR_CONDITIONING", "SMART_TV", "COFFEE_MAKER", "BREAKFAST", "PARKING"],
  },
  {
    ...base("room_deluxe", "deluxe", 4),
    type: "DELUXE",
    group: "HOTEL",
    name: l("Phòng Deluxe", "Deluxe Room", "디럭스 룸", "豪华客房"),
    tagline: l(
      "Rộng rãi, ban công hướng vườn",
      "Spacious with a garden balcony",
      "정원 발코니가 있는 넓은 객실",
      "宽敞客房，配花园阳台",
    ),
    description: l(
      "Hạng phòng cao cấp trong khối khách sạn với ban công nhìn ra vườn và hồ bơi, bàn làm việc rộng, bồn tắm và hệ thống cách âm tốt – được các chuyên gia Hàn Quốc, Nhật Bản lựa chọn cho các dự án dài ngày.",
      "Our premium hotel-wing room with a balcony over the gardens and pool, a large work desk, bathtub and excellent soundproofing – a top choice of Korean and Japanese experts on long assignments.",
      "정원과 수영장이 내려다보이는 발코니, 넓은 업무용 책상, 욕조, 뛰어난 방음을 갖춘 호텔동 프리미엄 객실로 장기 프로젝트 중인 한국·일본 전문가들이 즐겨 찾습니다.",
      "酒店楼高级客房，阳台俯瞰花园与泳池，配有宽大办公桌、浴缸及优良隔音——深受韩国、日本长期驻场专家青睐。",
    ),
    features: la(
      ["Ban công hướng vườn/hồ bơi", "Bàn làm việc rộng", "Bồn tắm nằm", "Cách âm tốt"],
      ["Garden/pool-view balcony", "Large work desk", "Bathtub", "Excellent soundproofing"],
      ["정원/수영장 전망 발코니", "넓은 업무용 책상", "욕조", "우수한 방음"],
      ["花园/泳池景观阳台", "宽大办公桌", "浴缸", "优良隔音"],
    ),
    badgeText: l("Chuyên gia chọn", "Experts' choice", "전문가 추천", "专家之选"),
    bedType: l("Giường King 1,8m x 2m", "King bed 1.8 m x 2 m", "킹 침대 1.8m x 2m", "特大床 1.8米 x 2米"),
    sizeSqm: 35,
    viewType: "POOL",
    standardGuests: 2,
    totalUnits: 35,
    basePriceVnd: 1_050_000,
    hourlyPriceVnd: 700_000,
    monthlyPriceVnd: 25_000_000,
    coverImage: img("roomDeluxeA", l("Phòng Deluxe", "Deluxe Room", "디럭스 룸", "豪华客房")),
    gallery: [
      img("roomDeluxeA", l("Không gian phòng ngủ Deluxe", "Deluxe bedroom", "디럭스 침실", "豪华客房卧室")),
      img("roomDeluxeB", l("Góc thư giãn", "Lounge corner", "라운지 코너", "休憩角落")),
      img("roomDeluxeC", l("Nội thất hiện đại", "Modern interior", "모던 인테리어", "现代内饰")),
    ],
    amenities: ["WIFI", "AIR_CONDITIONING", "SMART_TV", "MINIBAR", "BATHTUB", "WORK_DESK", "COFFEE_MAKER", "SAFE_BOX", "BREAKFAST"],
  },
  {
    ...base("room_superior", "superior", 5),
    type: "SUPERIOR",
    group: "HOTEL",
    name: l("Phòng Superior", "Superior Room", "슈페리어 룸", "高级客房"),
    tagline: l(
      "Tiện nghi, thanh lịch cho chuyến công tác",
      "Comfort and elegance for business trips",
      "출장을 위한 편안함과 품격",
      "商务出行的舒适与雅致",
    ),
    description: l(
      "Phòng Superior hướng vườn với thiết kế tinh gọn, ánh sáng tự nhiên và đầy đủ tiện nghi cho chuyến công tác ngắn ngày tại khu công nghiệp Phú Mỹ – chỉ 3 phút di chuyển.",
      "A garden-view Superior room with a clean design, natural light and every essential for short business trips to the Phu My industrial parks – just 3 minutes away.",
      "깔끔한 디자인과 자연광, 모든 필수 편의시설을 갖춘 가든뷰 슈페리어 룸으로 단 3분 거리의 푸미 산업단지 단기 출장에 제격입니다.",
      "花园景观高级客房，设计简洁、采光充足，配套齐全，适合前往仅3分钟车程的富美工业区短期出差。",
    ),
    features: la(
      ["Hướng vườn xanh", "Ánh sáng tự nhiên", "Bàn làm việc", "Wi-Fi tốc độ cao"],
      ["Garden view", "Natural light", "Work desk", "High-speed Wi-Fi"],
      ["가든 뷰", "자연 채광", "업무용 책상", "초고속 Wi-Fi"],
      ["花园景观", "自然采光", "办公桌", "高速Wi-Fi"],
    ),
    badgeText: null,
    bedType: l("Giường King 1,8m x 2m", "King bed 1.8 m x 2 m", "킹 침대 1.8m x 2m", "特大床 1.8米 x 2米"),
    sizeSqm: 33,
    viewType: "GARDEN",
    standardGuests: 2,
    totalUnits: 31,
    basePriceVnd: 880_000,
    hourlyPriceVnd: 600_000,
    monthlyPriceVnd: 22_000_000,
    coverImage: img("roomSuperiorA", l("Phòng Superior", "Superior Room", "슈페리어 룸", "高级客房")),
    gallery: [
      img("roomSuperiorA", l("Phòng ngủ Superior", "Superior bedroom", "슈페리어 침실", "高级客房卧室")),
      img("roomSuperiorB", l("Không gian sáng", "Bright space", "밝은 공간", "明亮空间")),
      img("roomSuperiorC", l("Góc cửa sổ", "Window corner", "창가 코너", "窗边一角")),
    ],
    amenities: ["WIFI", "AIR_CONDITIONING", "SMART_TV", "MINIBAR", "WORK_DESK", "SAFE_BOX", "BREAKFAST"],
  },
  {
    ...base("room_standard_b", "standard-b", 6),
    type: "STANDARD_B",
    group: "HOTEL",
    name: l("Standard Room B", "Standard Room B", "스탠다드 룸 B", "标准客房B"),
    tagline: l(
      "Gọn gàng cho chuyến công tác một mình",
      "Neat and practical for solo business trips",
      "1인 출장에 알맞은 깔끔한 객실",
      "单人出差的简洁之选",
    ),
    description: l(
      "Phòng 20m² cho 1 khách với giường 1,4m x 2m, bàn làm việc và đầy đủ tiện nghi cơ bản. Giá đã gồm ăn sáng và quyền sử dụng miễn phí hồ bơi, phòng gym, sân tennis & pickleball – phù hợp kỹ sư, chuyên gia công tác tại các khu công nghiệp Phú Mỹ.",
      "A 20 m² single-occupancy room with a 1.4 m x 2 m bed, work desk and all the essentials. Breakfast plus free pool, gym, tennis & pickleball access included – suited to engineers and experts working in the Phu My industrial parks.",
      "1.4m x 2m 침대와 업무용 책상, 기본 편의시설을 갖춘 1인용 20m² 객실입니다. 조식과 수영장·헬스장·테니스·피클볼 무료 이용이 포함되어 푸미 산업단지에서 근무하는 엔지니어와 전문가에게 적합합니다.",
      "20平方米单人客房，配1.4米 x 2米床、办公桌及齐全的基础设施。含早餐，并可免费使用泳池、健身房、网球场与匹克球场——适合在富美工业区工作的工程师与专家。",
    ),
    features: la(
      ["Diện tích 20m², tiêu chuẩn 1 khách", "Giường 1,4m x 2m", "Bàn làm việc", "Miễn phí hồ bơi, gym, tennis & pickleball"],
      ["20 m², 1 guest standard", "1.4 m x 2 m bed", "Work desk", "Free pool, gym, tennis & pickleball"],
      ["20m², 기준 1인", "1.4m x 2m 침대", "업무용 책상", "수영장·헬스장·테니스·피클볼 무료"],
      ["20平方米，标准1人", "1.4米 x 2米床", "办公桌", "免费泳池、健身房、网球与匹克球"],
    ),
    badgeText: null,
    bedType: l("Giường đơn 1,4m x 2m", "Single bed 1.4 m x 2 m", "싱글 침대 1.4m x 2m", "单人床 1.4米 x 2米"),
    sizeSqm: 20,
    viewType: "GARDEN",
    standardGuests: 1,
    totalUnits: 12,
    basePriceVnd: 750_000,
    hourlyPriceVnd: 500_000,
    monthlyPriceVnd: 18_750_000,
    coverImage: img("roomStandardA", l("Standard Room B", "Standard Room B", "스탠다드 룸 B", "标准客房B")),
    gallery: [
      img("roomStandardA", l("Standard Room B", "Standard Room B", "스탠다드 룸 B", "标准客房B")),
      img("roomStandardB", l("Không gian ấm cúng", "Cosy space", "아늑한 공간", "温馨空间")),
    ],
    amenities: ["WIFI", "AIR_CONDITIONING", "SMART_TV", "WORK_DESK", "COFFEE_MAKER", "BREAKFAST", "PARKING"],
  },
  {
    ...base("room_standard_a", "standard-a", 7),
    type: "STANDARD_A",
    group: "HOTEL",
    name: l("Standard Room A", "Standard Room A", "스탠다드 룸 A", "标准客房A"),
    tagline: l(
      "Mức giá tốt nhất, trọn vẹn tiện ích resort",
      "Our best rate with full resort access",
      "최저가로 누리는 리조트 시설",
      "最优价格，尽享度假村设施",
    ),
    description: l(
      "Hạng phòng tiết kiệm nhất: 17m² cho 1 khách, giường 1,4m x 2m. Vẫn bao gồm ăn sáng, bãi đỗ xe và quyền sử dụng miễn phí hồ bơi, phòng gym, sân thể thao – lựa chọn hợp lý cho đoàn công tác và khách tham dự sự kiện.",
      "Our most economical room: 17 m² for one guest with a 1.4 m x 2 m bed. Breakfast, parking and free pool, gym and sports-court access are still included – a smart pick for business groups and event attendees.",
      "가장 합리적인 객실로 1.4m x 2m 침대를 갖춘 1인용 17m² 공간입니다. 조식, 주차, 수영장·헬스장·스포츠 코트 무료 이용이 모두 포함되어 출장 단체와 행사 참석객에게 알맞습니다.",
      "最经济的房型：17平方米单人客房，配1.4米 x 2米床。仍含早餐、停车及免费使用泳池、健身房与运动场——商务团队与活动嘉宾的明智之选。",
    ),
    features: la(
      ["Diện tích 17m², tiêu chuẩn 1 khách", "Giường 1,4m x 2m", "Bao gồm ăn sáng & đỗ xe", "Giá tốt nhất resort"],
      ["17 m², 1 guest standard", "1.4 m x 2 m bed", "Breakfast & parking included", "Best rate at the resort"],
      ["17m², 기준 1인", "1.4m x 2m 침대", "조식 & 주차 포함", "리조트 최저가"],
      ["17平方米，标准1人", "1.4米 x 2米床", "含早餐与停车", "度假村最优价格"],
    ),
    badgeText: l("Giá tốt nhất", "Best value", "최저가", "超值"),
    bedType: l("Giường đơn 1,4m x 2m", "Single bed 1.4 m x 2 m", "싱글 침대 1.4m x 2m", "单人床 1.4米 x 2米"),
    sizeSqm: 17,
    viewType: "GARDEN",
    standardGuests: 1,
    totalUnits: 30,
    basePriceVnd: 660_000,
    hourlyPriceVnd: 450_000,
    monthlyPriceVnd: 16_500_000,
    coverImage: img("roomStandardB", l("Standard Room A", "Standard Room A", "스탠다드 룸 A", "标准客房A")),
    gallery: [
      img("roomStandardB", l("Standard Room A", "Standard Room A", "스탠다드 룸 A", "标准客房A")),
      img("roomStandardA", l("Không gian gọn gàng", "Tidy space", "깔끔한 공간", "整洁空间")),
    ],
    amenities: ["WIFI", "AIR_CONDITIONING", "SMART_TV", "COFFEE_MAKER", "BREAKFAST", "PARKING"],
  },
];

const BREAKFAST_FOR_ONE = l(
  "Đã bao gồm ăn sáng cho 01 khách",
  "Breakfast for 1 guest included",
  "1인 조식 포함",
  "含1位客人早餐",
);

const SHARING_WITH_PARENTS = l(
  "Ngủ chung với bố mẹ, bao gồm ăn sáng",
  "Sharing parents' bed, breakfast included",
  "부모와 침대 공유, 조식 포함",
  "与父母同床，含早餐",
);

export const stayPolicy: StayPolicy = {
  effectiveFrom: "2026-07-01",
  checkInTime: "14:00",
  checkOutTime: "12:00",
  hourlyBlockHours: 4,
  inclusions: la(
    [
      "Giá đã bao gồm ăn sáng, phí phục vụ & thuế VAT",
      "Miễn phí bãi đỗ xe cho khách lưu trú",
      "Miễn phí sân tennis, pickleball, phòng gym, hồ bơi (08:00 – 17:00)",
      "Miễn phí 02 chai nước suối 350ml mỗi ngày/phòng",
      "Miễn phí trà, cà phê trong phòng",
    ],
    [
      "Rates include breakfast, service charge & VAT",
      "Free parking for staying guests",
      "Free tennis, pickleball, gym & pool (08:00 – 17:00)",
      "2 complimentary 350 ml bottles of water per room daily",
      "Complimentary in-room tea & coffee",
    ],
    [
      "요금에 조식, 봉사료 및 부가세 포함",
      "투숙객 무료 주차",
      "테니스·피클볼·헬스장·수영장 무료 (08:00 – 17:00)",
      "객실당 매일 생수 350ml 2병 무료",
      "객실 내 차·커피 무료",
    ],
    [
      "价格含早餐、服务费及增值税",
      "住客免费停车",
      "免费使用网球场、匹克球场、健身房及泳池（08:00 – 17:00）",
      "每房每日免费提供2瓶350毫升矿泉水",
      "客房内免费茶与咖啡",
    ],
  ),
  surcharges: [
    {
      id: "extra_bed",
      label: l("Kê thêm giường", "Extra bed", "엑스트라 베드", "加床"),
      priceVnd: 500_000,
      unit: l("/giường/đêm", "/bed/night", "/침대/박", "/床/晚"),
      note: BREAKFAST_FOR_ONE,
    },
    {
      id: "extra_mattress",
      label: l("Kê thêm nệm", "Extra mattress", "추가 매트리스", "加床垫"),
      priceVnd: 350_000,
      unit: l("/nệm/đêm", "/mattress/night", "/매트리스/박", "/床垫/晚"),
      note: BREAKFAST_FOR_ONE,
    },
    {
      id: "child_under_6",
      label: l("Trẻ em dưới 06 tuổi", "Children under 6", "6세 미만 어린이", "6岁以下儿童"),
      priceVnd: 0,
      unit: null,
      note: SHARING_WITH_PARENTS,
    },
    {
      id: "child_6_to_12",
      label: l("Trẻ em từ 06 đến dưới 12 tuổi", "Children 6 to under 12", "6세 이상 12세 미만 어린이", "6至12岁以下儿童"),
      priceVnd: 150_000,
      unit: l("/trẻ/đêm", "/child/night", "/어린이/박", "/儿童/晚"),
      note: SHARING_WITH_PARENTS,
    },
    {
      id: "guest_12_plus",
      label: l("Khách từ 12 tuổi trở lên", "Guests aged 12 and over", "12세 이상 투숙객", "12岁及以上宾客"),
      priceVnd: null,
      unit: null,
      note: l(
        "Tính như người lớn (áp dụng phụ thu nệm hoặc giường phụ)",
        "Charged as adults (extra mattress or bed surcharge applies)",
        "성인 요금 적용 (추가 매트리스 또는 침대 요금 부과)",
        "按成人计（收取加床垫或加床费用）",
      ),
    },
  ],
  timeRules: [
    { id: "early_05_10", kind: "EARLY_CHECKIN", from: "05:00", to: "10:00", surchargePercent: 30 },
    { id: "early_10_14", kind: "EARLY_CHECKIN", from: "10:00", to: "14:00", surchargePercent: 0 },
    { id: "late_12_14", kind: "LATE_CHECKOUT", from: "12:00", to: "14:00", surchargePercent: 0 },
    { id: "late_14_18", kind: "LATE_CHECKOUT", from: "14:00", to: "18:00", surchargePercent: 50 },
    { id: "late_after_18", kind: "LATE_CHECKOUT", from: "18:00", to: null, surchargePercent: 100 },
  ],
};

/* ------------------------------------------------------------------ */
/* Event halls                                                         */
/* ------------------------------------------------------------------ */

export const eventHalls: EventHall[] = [
  {
    ...base("hall_center_2", "sao-mai-center-2", 1),
    code: "SAO_MAI_CENTER_2",
    name: l("Sao Mai Center 2", "Sao Mai Center 2", "사오마이 센터 2", "Sao Mai Center 2"),
    tagline: l(
      "Sảnh mái vòm lớn nhất khu vực Phú Mỹ",
      "The largest dome hall in Phu My",
      "푸미 지역 최대 규모 돔 홀",
      "富美地区最大的穹顶宴会厅",
    ),
    description: l(
      "Không gian mái vòm hiện đại, không cột, màn hình LED khổ lớn và hệ thống âm thanh – ánh sáng tiêu chuẩn sân khấu. Đáp ứng tiệc cưới hơn 1.200 khách, hội nghị khách hàng và Year-end Party quy mô lớn.",
      "A column-free modern dome with a giant LED wall and stage-grade sound and lighting. Hosts weddings for 1,200+ guests, customer conferences and large year-end parties.",
      "기둥 없는 모던 돔 구조에 대형 LED 월과 무대급 음향·조명을 갖추었습니다. 1,200명 이상 웨딩, 고객 컨퍼런스, 대규모 연말 파티에 적합합니다.",
      "现代无柱穹顶空间，配备巨型LED屏与舞台级音响灯光，可承办1,200位以上宾客的婚宴、客户大会及大型年终晚会。",
    ),
    features: la(
      ["Mái vòm không cột", "LED khổ lớn 60m²", "Sân khấu & ánh sáng chuyên nghiệp", "Sảnh đón riêng"],
      ["Column-free dome", "60m² LED wall", "Professional stage & lighting", "Private foyer"],
      ["무기둥 돔", "60m² LED 월", "전문 무대 & 조명", "전용 로비"],
      ["无柱穹顶", "60平方米LED屏", "专业舞台与灯光", "独立迎宾厅"],
    ),
    badgeText: l("Sảnh chủ lực", "Flagship hall", "플래그십 홀", "旗舰宴会厅"),
    areaSqm: 1500,
    ceilingHeightM: 12,
    banquetTables: 120,
    capacity: { theater: 1200, banquet: 1200, classroom: 700, uShape: 150 },
    isFlagship: true,
    coverImage: img("banquetHall", l("Sao Mai Center 2", "Sao Mai Center 2", "사오마이 센터 2", "Sao Mai Center 2")),
    gallery: [
      img("banquetHall", l("Sảnh tiệc", "Banquet hall", "연회장", "宴会厅")),
      img("conferenceAudience", l("Hội nghị", "Conference", "컨퍼런스", "会议")),
    ],
  },
  {
    ...base("hall_center_1", "sao-mai-center-1", 2),
    code: "SAO_MAI_CENTER_1",
    name: l("Sao Mai Center 1", "Sao Mai Center 1", "사오마이 센터 1", "Sao Mai Center 1"),
    tagline: l(
      "Linh hoạt cho tiệc cưới & hội thảo",
      "Flexible for weddings and seminars",
      "웨딩 & 세미나에 유연한 공간",
      "婚宴与研讨会灵活之选",
    ),
    description: l(
      "Sảnh tiệc sang trọng với đèn chùm pha lê, có thể chia đôi bằng vách di động – phù hợp tiệc cưới ấm cúng, hội thảo chuyên đề và tiệc tri ân khách hàng.",
      "An elegant ballroom with crystal chandeliers that divides in two with movable walls – suited to intimate weddings, technical seminars and customer appreciation dinners.",
      "크리스털 샹들리에가 있는 우아한 연회장으로 이동식 벽으로 2개 공간 분할이 가능하며, 아담한 웨딩, 기술 세미나, 고객 감사 만찬에 적합합니다.",
      "水晶吊灯装点的雅致宴会厅，可通过移动隔断一分为二，适合温馨婚宴、专题研讨会及客户答谢宴。",
    ),
    features: la(
      ["Đèn chùm pha lê", "Vách ngăn di động", "Máy chiếu & LED", "Kết nối sân vườn"],
      ["Crystal chandeliers", "Movable partitions", "Projector & LED", "Garden access"],
      ["크리스털 샹들리에", "이동식 파티션", "프로젝터 & LED", "정원 연결"],
      ["水晶吊灯", "移动隔断", "投影与LED", "连通花园"],
    ),
    badgeText: null,
    areaSqm: 900,
    ceilingHeightM: 8,
    banquetTables: 60,
    capacity: { theater: 700, banquet: 600, classroom: 400, uShape: 100 },
    isFlagship: false,
    coverImage: img("weddingWhiteHall", l("Sao Mai Center 1", "Sao Mai Center 1", "사오마이 센터 1", "Sao Mai Center 1")),
    gallery: [img("weddingWhiteHall", l("Sảnh tiệc", "Ballroom", "연회장", "宴会厅"))],
  },
  {
    ...base("hall_vip_a", "vip-meeting-room-a", 3),
    code: "VIP_MEETING_A",
    name: l("Phòng họp VIP A", "VIP Meeting Room A", "VIP 회의실 A", "VIP会议室A"),
    tagline: l(
      "Riêng tư cho họp ban lãnh đạo",
      "Private boardroom for executives",
      "임원 회의를 위한 프라이빗 공간",
      "高管私密会议室",
    ),
    description: l(
      "Phòng họp cao cấp với màn hình tương tác, hệ thống hội nghị truyền hình và khu tea-break riêng – lý tưởng cho họp hội đồng quản trị, đàm phán và đào tạo nội bộ.",
      "A premium boardroom with an interactive display, video-conferencing and a private tea-break lounge – ideal for board meetings, negotiations and in-house training.",
      "인터랙티브 디스플레이, 화상회의 시스템, 전용 티브레이크 라운지를 갖춘 프리미엄 회의실로 이사회, 협상, 사내 교육에 이상적입니다.",
      "高端会议室，配备互动显示屏、视频会议系统与专属茶歇区，适合董事会、商务谈判及内部培训。",
    ),
    features: la(
      ["Màn hình tương tác", "Hội nghị truyền hình", "Khu tea-break riêng"],
      ["Interactive display", "Video conferencing", "Private tea-break lounge"],
      ["인터랙티브 디스플레이", "화상회의", "전용 티브레이크 라운지"],
      ["互动显示屏", "视频会议", "专属茶歇区"],
    ),
    badgeText: null,
    areaSqm: 120,
    ceilingHeightM: 4,
    banquetTables: 6,
    capacity: { theater: 80, banquet: 60, classroom: 50, uShape: 30 },
    isFlagship: false,
    coverImage: img("conferenceScreen", l("Phòng họp VIP", "VIP meeting room", "VIP 회의실", "VIP会议室")),
    gallery: [img("conferenceScreen", l("Phòng họp", "Meeting room", "회의실", "会议室"))],
  },
];

/* ------------------------------------------------------------------ */
/* Services (Bento grid)                                               */
/* ------------------------------------------------------------------ */

export const resortServices: ResortService[] = [
  {
    ...base("svc_dining", "nha-hang-phong-vip", 1),
    category: "DINING",
    name: l(
      "Nhà hàng Á - Âu & Hệ thống Phòng VIP",
      "Asian - European Restaurant & VIP Rooms",
      "아시안·유러피안 레스토랑 & VIP 룸",
      "亚欧餐厅与VIP包间",
    ),
    tagline: l(
      "Tiếp đón đối tác chuẩn mực, riêng tư",
      "Host partners with discretion and style",
      "격조 있고 프라이빗한 비즈니스 접대",
      "得体私密的商务宴请",
    ),
    description: l(
      "Thực đơn Việt – Á – Âu do bếp trưởng nhiều năm kinh nghiệm phụ trách, cùng hệ thống phòng VIP riêng tư cho tiệc tiếp khách doanh nghiệp, ký kết hợp đồng và sinh nhật thân mật. Có thực đơn Hàn Quốc, Trung Hoa theo yêu cầu.",
      "Vietnamese, Asian and European menus by a seasoned head chef, plus private VIP rooms for corporate hosting, contract signings and intimate birthdays. Korean and Chinese menus on request.",
      "경험 많은 총주방장의 베트남·아시안·유러피안 메뉴와 기업 접대, 계약 체결, 생일 모임을 위한 프라이빗 VIP 룸을 갖추고 있습니다. 한식·중식 메뉴도 요청 시 준비됩니다.",
      "资深主厨主理越南、亚洲及欧陆菜单，并设私密VIP包间，适合企业宴请、签约仪式与亲密生日宴。可应要求提供韩式及中式菜单。",
    ),
    features: la(
      ["6 phòng VIP 8–30 khách", "Thực đơn Hàn, Trung theo yêu cầu", "Poolside Bar"],
      ["6 VIP rooms for 8–30 guests", "Korean & Chinese menus on request", "Poolside Bar"],
      ["8–30인 VIP 룸 6개", "한식·중식 메뉴 요청 가능", "풀사이드 바"],
      ["6间可容纳8–30人的VIP包间", "可定制韩式、中式菜单", "池畔酒吧"],
    ),
    badgeText: l("Tiếp khách doanh nghiệp", "Corporate hosting", "비즈니스 접대", "商务宴请"),
    openingHours: l("06:00 – 22:00 hằng ngày", "Daily 06:00 – 22:00", "매일 06:00 – 22:00", "每日 06:00 – 22:00"),
    ctaAction: "TABLE_BOOKING",
    coverImage: img("restaurant", l("Nhà hàng Sao Mai", "Sao Mai restaurant", "사오마이 레스토랑", "Sao Mai餐厅")),
    gallery: [
      img("fineDining", l("Ẩm thực tinh tế", "Fine dining", "파인 다이닝", "精致美食")),
      img("groupDining", l("Phòng VIP", "VIP room", "VIP 룸", "VIP包间")),
    ],
  },
  {
    ...base("svc_sports", "pickleball-tennis", 2),
    category: "SPORTS",
    name: l(
      "Tổ hợp Thể thao Năng động",
      "Active Sports Complex",
      "액티브 스포츠 콤플렉스",
      "活力运动中心",
    ),
    tagline: l(
      "Sân Pickleball mới & sân Tennis tiêu chuẩn",
      "Brand-new Pickleball & standard Tennis courts",
      "신규 피클볼 & 표준 테니스 코트",
      "全新匹克球场与标准网球场",
    ),
    description: l(
      "Cụm sân Pickleball mặt sân chuẩn thi đấu vừa đưa vào hoạt động, cùng sân Tennis từng đăng cai các giải đấu thường niên. Có cho thuê vợt, bóng, huấn luyện viên và chiếu sáng thi đấu buổi tối.",
      "Newly opened tournament-surface Pickleball courts alongside Tennis courts that host annual tournaments. Paddle and ball rental, coaching and evening floodlights available.",
      "새로 문을 연 대회 규격 피클볼 코트와 매년 대회가 열리는 테니스 코트를 갖추었습니다. 라켓·공 대여, 코칭, 야간 조명이 제공됩니다.",
      "新启用的赛事级匹克球场，以及举办年度赛事的网球场。提供球拍与球租赁、教练指导及夜间照明。",
    ),
    features: la(
      ["Mới: Sân Pickleball", "Sân Tennis giải đấu", "Đèn chiếu sáng tối", "Huấn luyện viên"],
      ["New: Pickleball courts", "Tournament Tennis courts", "Evening floodlights", "Coaching"],
      ["NEW: 피클볼 코트", "대회용 테니스 코트", "야간 조명", "코칭"],
      ["全新匹克球场", "赛事级网球场", "夜间照明", "教练指导"],
    ),
    badgeText: l("Mới khai trương", "Just opened", "신규 오픈", "全新开放"),
    openingHours: l("05:30 – 21:30 hằng ngày", "Daily 05:30 – 21:30", "매일 05:30 – 21:30", "每日 05:30 – 21:30"),
    ctaAction: "COURT_BOOKING",
    coverImage: img("pickleballMatch", l("Sân Pickleball", "Pickleball courts", "피클볼 코트", "匹克球场")),
    gallery: [
      img("pickleballCourt", l("Trận đấu Pickleball", "Pickleball match", "피클볼 경기", "匹克球比赛")),
      img("tennisPlayer", l("Sân Tennis", "Tennis court", "테니스 코트", "网球场")),
    ],
  },
  {
    ...base("svc_pool", "ho-boi-sinh-thai", 3),
    category: "POOL_NATURE",
    name: l(
      "Hồ bơi Sinh thái & Đường chạy bộ",
      "Eco Pool & Jogging Trails",
      "에코 수영장 & 러닝 트레일",
      "生态泳池与跑步道",
    ),
    tagline: l(
      "Chữa lành dưới tán cây xanh",
      "Healing under a green canopy",
      "푸른 나무 그늘 아래의 힐링",
      "绿荫下的身心疗愈",
    ),
    description: l(
      "Hồ bơi ngoài trời rộng lớn bao quanh bởi hàng dừa và cây cổ thụ, cùng đường chạy bộ buổi sáng vòng quanh hồ – nơi bắt đầu ngày mới đầy năng lượng.",
      "A large outdoor pool framed by palms and ancient trees, with a morning jogging loop around the lake – the perfect start to an energised day.",
      "야자수와 고목으로 둘러싸인 넓은 야외 수영장과 호수를 도는 아침 러닝 코스 – 활기찬 하루의 시작.",
      "被椰树与古树环抱的大型户外泳池，以及环湖晨跑步道——活力满满一天的完美开端。",
    ),
    features: la(
      ["Hồ bơi người lớn & trẻ em", "Đường chạy 1,8 km", "Cứu hộ túc trực"],
      ["Adult & kids pools", "1.8 km running loop", "Lifeguard on duty"],
      ["성인 & 어린이 풀", "1.8km 러닝 코스", "안전요원 상주"],
      ["成人与儿童泳池", "1.8公里跑步环线", "救生员值守"],
    ),
    badgeText: null,
    openingHours: l("06:00 – 20:00 hằng ngày", "Daily 06:00 – 20:00", "매일 06:00 – 20:00", "每日 06:00 – 20:00"),
    ctaAction: "STAY_BOOKING",
    coverImage: img("tropicalPool", l("Hồ bơi sinh thái", "Eco pool", "에코 수영장", "生态泳池")),
    gallery: [img("runner", l("Đường chạy bộ", "Jogging trail", "러닝 트레일", "跑步道"))],
  },
  {
    ...base("svc_wellness", "wellness-gym-karaoke", 4),
    category: "WELLNESS_ENTERTAINMENT",
    name: l(
      "Wellness, Gym & Karaoke",
      "Wellness, Gym & Karaoke",
      "웰니스, 피트니스 & 노래방",
      "康体、健身与KTV",
    ),
    tagline: l(
      "Thư giãn trọn vẹn sau giờ làm",
      "Complete relaxation after work",
      "퇴근 후 완벽한 휴식",
      "下班后的全然放松",
    ),
    description: l(
      "Phòng gym trang bị máy tập hiện đại, khu spa & massage trị liệu, cùng hệ thống phòng karaoke cách âm cho nhóm bạn và đồng nghiệp.",
      "A modern gym, spa and therapeutic massage zone, plus soundproof karaoke rooms for friends and colleagues.",
      "최신 기구를 갖춘 피트니스, 스파 & 테라피 마사지, 친구·동료를 위한 방음 노래방을 운영합니다.",
      "现代化健身房、水疗与理疗按摩区，以及适合朋友同事欢聚的隔音KTV包间。",
    ),
    features: la(
      ["Gym hiện đại", "Spa & massage", "Karaoke cách âm"],
      ["Modern gym", "Spa & massage", "Soundproof karaoke"],
      ["최신 피트니스", "스파 & 마사지", "방음 노래방"],
      ["现代健身房", "水疗与按摩", "隔音KTV"],
    ),
    badgeText: null,
    openingHours: l("06:00 – 23:00 hằng ngày", "Daily 06:00 – 23:00", "매일 06:00 – 23:00", "每日 06:00 – 23:00"),
    ctaAction: "NONE",
    coverImage: img("spa", l("Wellness & Spa", "Wellness & Spa", "웰니스 & 스파", "康体与水疗")),
    gallery: [
      img("gym", l("Phòng gym", "Gym", "피트니스", "健身房")),
      img("karaoke", l("Karaoke", "Karaoke", "노래방", "KTV")),
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Facilities (/dich-vu)                                               */
/* ------------------------------------------------------------------ */

export const resortFacilities: ResortFacility[] = [
  {
    ...base("fac_restaurant", "nha-hang-bar", 1),
    kind: "RESTAURANT_BAR",
    name: l("Nhà hàng & Bar", "Restaurant & Bar", "레스토랑 & 바", "餐厅与酒吧"),
    tagline: l(
      "Đặc sản Việt – Á – Âu và hệ thống phòng VIP",
      "Vietnamese, Asian & European specialties with VIP rooms",
      "베트남·아시안·유러피안 요리와 VIP 룸",
      "越南、亚洲及欧陆美食与VIP包间",
    ),
    description: l(
      "Nhà hàng phục vụ thực đơn Việt – Á – Âu suốt cả ngày, cùng 6 phòng VIP riêng tư cho tiệc tiếp khách doanh nghiệp, ký kết hợp đồng và sinh nhật thân mật. Poolside Bar bên hồ bơi phục vụ cocktail, bia lạnh và đồ uống nhẹ – điểm hẹn quen thuộc của các chuyên gia sau giờ làm.",
      "The restaurant serves Vietnamese, Asian and European menus all day, with six private VIP rooms for corporate hosting, contract signings and intimate birthdays. The Poolside Bar pours cocktails, cold beer and light drinks – a favourite after-work meeting spot for resident experts.",
      "레스토랑은 하루 종일 베트남·아시안·유러피안 메뉴를 제공하며, 기업 접대와 계약 체결, 생일 모임을 위한 프라이빗 VIP 룸 6개를 갖추고 있습니다. 풀사이드 바에서는 칵테일과 시원한 맥주를 즐길 수 있어 퇴근 후 전문가들의 단골 모임 장소입니다.",
      "餐厅全天供应越南、亚洲及欧陆菜单，设有6间私密VIP包间，适合企业宴请、签约仪式与生日聚会。池畔酒吧供应鸡尾酒、冰镇啤酒与轻饮，是专家们下班后的常聚之地。",
    ),
    features: la(
      ["6 phòng VIP 8–30 khách", "Thực đơn Hàn, Trung theo yêu cầu", "Poolside Bar", "Set lunch doanh nghiệp"],
      ["6 VIP rooms for 8–30 guests", "Korean & Chinese menus on request", "Poolside Bar", "Corporate set lunch"],
      ["8–30인 VIP 룸 6개", "한식·중식 메뉴 요청 가능", "풀사이드 바", "기업 세트 런치"],
      ["6间可容纳8–30人的VIP包间", "可定制韩式、中式菜单", "池畔酒吧", "企业套餐午宴"],
    ),
    badgeText: l("Tiếp khách doanh nghiệp", "Corporate hosting", "비즈니스 접대", "商务宴请"),
    openingHours: l("06:00 – 22:00 hằng ngày", "Daily 06:00 – 22:00", "매일 06:00 – 22:00", "每日 06:00 – 22:00"),
    ctaAction: "TABLE_BOOKING",
    coverImage: img("restaurant", l("Nhà hàng Sao Mai", "Sao Mai restaurant", "사오마이 레스토랑", "Sao Mai餐厅")),
    gallery: [
      img("bar", l("Quầy bar", "The bar", "바", "酒吧"), 900),
      img("groupDining", l("Phòng VIP", "VIP room", "VIP 룸", "VIP包间"), 900),
      img("cocktail", l("Cocktail tại Poolside Bar", "Poolside Bar cocktail", "풀사이드 바 칵테일", "池畔酒吧鸡尾酒"), 900),
    ],
  },
  {
    ...base("fac_pool", "ho-boi", 2),
    kind: "POOL",
    name: l("Hồ bơi & Đường chạy bộ", "Pool & Jogging Trails", "수영장 & 러닝 트레일", "泳池与跑步道"),
    tagline: l("Bơi giữa tán dừa xanh", "Swim beneath the palms", "야자수 아래에서의 수영", "椰影下畅游"),
    description: l(
      "Hồ bơi ngoài trời rộng lớn với khu riêng cho trẻ em, bao quanh bởi hàng dừa và cây cổ thụ. Đường chạy bộ 1,8 km vòng quanh hồ nước là lựa chọn lý tưởng cho buổi sáng đầy năng lượng. Khách lưu trú được sử dụng miễn phí từ 08:00 đến 17:00.",
      "A large outdoor pool with a dedicated kids' area, framed by palms and ancient trees. A 1.8 km jogging loop around the lake makes for an energising morning. Free for staying guests from 08:00 to 17:00.",
      "야자수와 고목으로 둘러싸인 넓은 야외 수영장에는 어린이 전용 구역이 있습니다. 호수를 도는 1.8km 러닝 코스로 활기찬 아침을 시작하세요. 투숙객은 08:00–17:00 무료로 이용할 수 있습니다.",
      "大型户外泳池设有儿童专区，四周椰树与古树环绕。环湖1.8公里跑步道让清晨充满活力。住客08:00–17:00免费使用。",
    ),
    features: la(
      ["Hồ bơi người lớn & trẻ em", "Đường chạy 1,8 km", "Cứu hộ túc trực", "Miễn phí cho khách lưu trú"],
      ["Adult & kids pools", "1.8 km running loop", "Lifeguard on duty", "Free for staying guests"],
      ["성인 & 어린이 풀", "1.8km 러닝 코스", "안전요원 상주", "투숙객 무료"],
      ["成人与儿童泳池", "1.8公里跑步环线", "救生员值守", "住客免费"],
    ),
    badgeText: null,
    openingHours: l("06:00 – 20:00 hằng ngày", "Daily 06:00 – 20:00", "매일 06:00 – 20:00", "每日 06:00 – 20:00"),
    ctaAction: "STAY_BOOKING",
    coverImage: img("tropicalPool", l("Hồ bơi Sao Mai", "Sao Mai pool", "사오마이 수영장", "Sao Mai泳池")),
    gallery: [
      img("poolPalms", l("Hồ bơi rợp bóng dừa", "Palm-lined pool", "야자수 수영장", "椰林泳池"), 900),
      img("runner", l("Đường chạy bộ", "Jogging trail", "러닝 트레일", "跑步道"), 900),
    ],
  },
  {
    ...base("fac_tennis", "tennis-pickleball", 3),
    kind: "TENNIS_PICKLEBALL",
    name: l("Tennis & Pickleball", "Tennis & Pickleball", "테니스 & 피클볼", "网球与匹克球"),
    tagline: l(
      "Sân Pickleball mới & sân Tennis tiêu chuẩn",
      "Brand-new Pickleball & standard Tennis courts",
      "신규 피클볼 & 표준 테니스 코트",
      "全新匹克球场与标准网球场",
    ),
    description: l(
      "Cụm sân Pickleball mặt sân chuẩn thi đấu vừa đưa vào hoạt động, cùng sân Tennis từng đăng cai các giải đấu thường niên. Có cho thuê vợt, bóng, huấn luyện viên và hệ thống đèn cho buổi tối. Khách lưu trú chơi miễn phí từ 08:00 đến 17:00.",
      "Newly opened tournament-surface Pickleball courts alongside Tennis courts that host annual tournaments. Paddle and ball rental, coaching and evening floodlights available. Free for staying guests from 08:00 to 17:00.",
      "새로 문을 연 대회 규격 피클볼 코트와 매년 대회가 열리는 테니스 코트입니다. 라켓·공 대여, 코칭, 야간 조명을 제공하며 투숙객은 08:00–17:00 무료로 이용할 수 있습니다.",
      "新启用的赛事级匹克球场与举办年度赛事的网球场，提供球拍与球租赁、教练指导及夜间照明。住客08:00–17:00免费使用。",
    ),
    features: la(
      ["Mới: Sân Pickleball", "Sân Tennis giải đấu", "Đèn chiếu sáng tối", "Huấn luyện viên"],
      ["New: Pickleball courts", "Tournament Tennis courts", "Evening floodlights", "Coaching"],
      ["NEW: 피클볼 코트", "대회용 테니스 코트", "야간 조명", "코칭"],
      ["全新匹克球场", "赛事级网球场", "夜间照明", "教练指导"],
    ),
    badgeText: l("Mới khai trương", "Just opened", "신규 오픈", "全新开放"),
    openingHours: l("05:30 – 21:30 hằng ngày", "Daily 05:30 – 21:30", "매일 05:30 – 21:30", "每日 05:30 – 21:30"),
    ctaAction: "COURT_BOOKING",
    coverImage: img("pickleballMatch", l("Sân Pickleball", "Pickleball courts", "피클볼 코트", "匹克球场")),
    gallery: [
      img("pickleballCourt", l("Trận đấu Pickleball", "Pickleball match", "피클볼 경기", "匹克球比赛"), 900),
      img("tennisPlayer", l("Sân Tennis", "Tennis court", "테니스 코트", "网球场"), 900),
    ],
  },
  {
    ...base("fac_golf", "golf", 4),
    kind: "GOLF",
    name: l("Sân tập Golf", "Golf Practice Range", "골프 연습장", "高尔夫练习场"),
    tagline: l(
      "Rèn cú swing giữa không gian xanh",
      "Perfect your swing amid the greenery",
      "푸른 자연 속에서 스윙 연습",
      "在绿意中精进挥杆",
    ),
    description: l(
      "Khu tập golf trong khuôn viên resort với thảm cỏ xanh và không gian thoáng đãng – nơi các chuyên gia và doanh nhân luyện cú swing trước giờ làm hoặc thư giãn cuối tuần. Có cho thuê gậy, bóng và hướng dẫn cho người mới bắt đầu.",
      "An on-site practice range with lush turf and open skies – where experts and executives sharpen their swing before work or unwind at weekends. Club and ball rental plus beginner coaching available.",
      "푸른 잔디와 탁 트인 공간의 리조트 내 골프 연습장으로, 전문가와 비즈니스 고객이 출근 전 스윙을 다듬거나 주말을 즐기는 곳입니다. 클럽·공 대여와 초보자 레슨을 제공합니다.",
      "园区内的高尔夫练习场草坪葱郁、视野开阔——专家与商务人士上班前练习挥杆或周末放松的好去处。提供球杆与球租赁及初学者指导。",
    ),
    features: la(
      ["Thảm cỏ luyện tập", "Cho thuê gậy & bóng", "Hướng dẫn cho người mới", "Gần khu biệt thự"],
      ["Practice turf", "Club & ball rental", "Beginner coaching", "Next to the villas"],
      ["연습용 잔디", "클럽 & 공 대여", "초보자 레슨", "빌라 인근"],
      ["练习草坪", "球杆与球租赁", "初学者指导", "毗邻别墅区"],
    ),
    badgeText: null,
    openingHours: l("06:00 – 18:00 hằng ngày", "Daily 06:00 – 18:00", "매일 06:00 – 18:00", "每日 06:00 – 18:00"),
    ctaAction: "COURT_BOOKING",
    coverImage: img("golfSwing", l("Sân tập Golf Sao Mai", "Sao Mai golf range", "사오마이 골프 연습장", "Sao Mai高尔夫练习场")),
    gallery: [img("golfIron", l("Luyện tập golf", "Golf practice", "골프 연습", "高尔夫练习"), 900)],
  },
  {
    ...base("fac_karaoke", "karaoke", 5),
    kind: "KARAOKE",
    name: l("Karaoke", "Karaoke", "노래방", "KTV"),
    tagline: l(
      "Phòng hát cách âm cho nhóm bạn & đồng nghiệp",
      "Soundproof rooms for friends & colleagues",
      "친구·동료를 위한 방음 노래방",
      "适合朋友同事的隔音包间",
    ),
    description: l(
      "Hệ thống phòng karaoke cách âm với dàn âm thanh chất lượng, kho bài hát Việt – Hàn – Trung – Anh cập nhật thường xuyên. Phù hợp tiệc sinh nhật, liên hoan công ty và giao lưu sau hội nghị, có phục vụ đồ ăn nhẹ và đồ uống tại phòng.",
      "Soundproof karaoke rooms with quality sound systems and a regularly updated Vietnamese, Korean, Chinese and English song library. Ideal for birthdays, company parties and post-conference socials, with snacks and drinks served in-room.",
      "고품질 음향 시스템을 갖춘 방음 노래방으로 베트남·한국·중국·영어 노래가 정기적으로 업데이트됩니다. 생일 파티, 회식, 컨퍼런스 후 친목 모임에 적합하며 객실 내 간식과 음료를 제공합니다.",
      "隔音KTV包间配备优质音响，越、韩、中、英文曲库定期更新。适合生日派对、公司聚会及会后联谊，可在包间内享用小食与饮品。",
    ),
    features: la(
      ["Phòng cách âm", "Bài hát Việt – Hàn – Trung – Anh", "Phục vụ đồ ăn & đồ uống", "Phù hợp liên hoan công ty"],
      ["Soundproof rooms", "Vietnamese, Korean, Chinese & English songs", "Food & drinks served", "Great for company parties"],
      ["방음 룸", "베트남·한국·중국·영어 노래", "음식 & 음료 제공", "회식에 적합"],
      ["隔音包间", "越韩中英文曲库", "提供餐饮", "适合公司聚会"],
    ),
    badgeText: null,
    openingHours: l("14:00 – 23:00 hằng ngày", "Daily 14:00 – 23:00", "매일 14:00 – 23:00", "每日 14:00 – 23:00"),
    ctaAction: "TABLE_BOOKING",
    coverImage: img("karaoke", l("Phòng karaoke", "Karaoke room", "노래방", "KTV包间")),
    gallery: [],
  },
  {
    ...base("fac_gym_spa", "gym-spa", 6),
    kind: "GYM_SPA",
    name: l("Gym & Spa", "Gym & Spa", "피트니스 & 스파", "健身与水疗"),
    tagline: l("Khỏe mạnh và thư giãn trọn vẹn", "Stay fit, fully unwind", "건강하고 완벽한 휴식", "强健身心，彻底放松"),
    description: l(
      "Phòng gym trang bị máy tập hiện đại cho khách lưu trú dài ngày duy trì thói quen tập luyện, miễn phí từ 08:00 đến 17:00. Khu spa & massage trị liệu giúp phục hồi năng lượng sau những ngày làm việc căng thẳng.",
      "A modern gym so long-stay guests can keep their routine, free from 08:00 to 17:00. The spa and therapeutic massage zone helps you recharge after demanding workdays.",
      "최신 기구를 갖춘 피트니스 센터에서 장기 투숙객도 운동 습관을 유지할 수 있으며 08:00–17:00 무료입니다. 스파 & 테라피 마사지로 바쁜 업무 후 에너지를 회복하세요.",
      "现代化健身房助长住宾客保持锻炼习惯，08:00–17:00免费开放。水疗与理疗按摩区助您在繁忙工作后恢复活力。",
    ),
    features: la(
      ["Máy tập hiện đại", "Miễn phí 08:00 – 17:00", "Massage trị liệu", "Xông hơi"],
      ["Modern equipment", "Free 08:00 – 17:00", "Therapeutic massage", "Sauna"],
      ["최신 운동 기구", "08:00–17:00 무료", "테라피 마사지", "사우나"],
      ["现代健身器材", "08:00–17:00免费", "理疗按摩", "桑拿"],
    ),
    badgeText: null,
    openingHours: l("06:00 – 22:00 hằng ngày", "Daily 06:00 – 22:00", "매일 06:00 – 22:00", "每日 06:00 – 22:00"),
    ctaAction: "STAY_BOOKING",
    coverImage: img("gym", l("Phòng gym", "Gym", "피트니스", "健身房")),
    gallery: [
      img("spa", l("Khu spa", "Spa", "스파", "水疗"), 900),
      img("spaStones", l("Massage đá nóng", "Hot stone massage", "핫스톤 마사지", "热石按摩"), 900),
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Promotions & news                                                   */
/* ------------------------------------------------------------------ */

export const promotionPosts: PromotionPost[] = [
  {
    ...base("post_wedding", "tron-goi-tiec-cuoi-trong-mo", 1),
    category: "WEDDING",
    title: l(
      "Trọn gói Tiệc cưới Trong mơ tại Sao Mai Center",
      "All-inclusive Dream Wedding packages at Sao Mai Center",
      "사오마이 센터 올인클루시브 드림 웨딩 패키지",
      "Sao Mai Center梦想婚礼全包套餐",
    ),
    excerpt: l(
      "Tặng trang trí cổng hoa, tháp ly champagne và đêm tân hôn tại Biệt thự Pháp cho tiệc từ 40 bàn.",
      "Complimentary floral arch, champagne tower and a wedding night in a French Villa for receptions of 40+ tables.",
      "40테이블 이상 예식 시 플라워 아치, 샴페인 타워, 프렌치 빌라 첫날밤 숙박을 무료로 드립니다.",
      "40桌以上婚宴赠送花门布置、香槟塔及法式别墅新婚之夜。",
    ),
    body: la(
      [
        "Mùa cưới 2026, Sao Mai Center mang đến các gói tiệc cưới trọn gói với không gian sảnh mái vòm hiện đại, sức chứa đến hơn 1.200 khách, cùng đội ngũ tổ chức tiệc giàu kinh nghiệm suốt 20 năm.",
        "Với tiệc từ 40 bàn, cô dâu chú rể được tặng trang trí cổng hoa tươi, tháp ly champagne, bánh cưới mô hình và một đêm tân hôn tại Biệt thự Pháp trong khuôn viên resort.",
        "Thực đơn được thiết kế theo nhiều phân khúc, có thể tùy chỉnh theo khẩu vị gia đình. Khách đặt tiệc được thử món miễn phí trước ngày cưới.",
        "Ưu đãi áp dụng cho tiệc tổ chức đến hết 31/12/2026. Liên hệ bộ phận Sự kiện để nhận thực đơn mẫu và báo giá chi tiết.",
      ],
      [
        "For the 2026 wedding season, Sao Mai Center offers all-inclusive wedding packages in modern domed ballrooms for over 1,200 guests, delivered by an events team with 20 years of experience.",
        "Receptions of 40 tables or more receive a complimentary fresh-flower arch, champagne tower, display wedding cake and a wedding night in one of our French Villas.",
        "Menus come in several tiers and can be tailored to your family's taste, with a complimentary tasting before the big day.",
        "Valid for receptions held until 31 December 2026. Contact our Events team for sample menus and a detailed quotation.",
      ],
      [
        "2026 웨딩 시즌, 사오마이 센터는 1,200명 이상 수용 가능한 모던 돔 연회장과 20년 경력의 웨딩 팀이 함께하는 올인클루시브 패키지를 선보입니다.",
        "40테이블 이상 예식 시 생화 아치, 샴페인 타워, 디스플레이 웨딩 케이크와 프렌치 빌라 첫날밤 숙박을 무료로 제공합니다.",
        "메뉴는 여러 등급으로 구성되며 가족의 취향에 맞게 조정할 수 있고, 예식 전 무료 시식이 제공됩니다.",
        "2026년 12월 31일까지 진행되는 예식에 적용됩니다. 샘플 메뉴와 상세 견적은 이벤트 팀에 문의하세요.",
      ],
      [
        "2026婚礼季，Sao Mai Center推出婚宴全包套餐：现代穹顶宴会厅可容纳1,200位以上宾客，由拥有20年经验的团队倾力打造。",
        "40桌以上婚宴赠送鲜花拱门、香槟塔、展示婚礼蛋糕及法式别墅新婚之夜。",
        "菜单分多个档次，可按家庭口味定制，婚礼前提供免费试菜。",
        "适用于2026年12月31日前举办的婚宴。欢迎联系活动部获取样本菜单与详细报价。",
      ],
    ),
    badgeText: l("Mùa cưới 2026", "2026 wedding season", "2026 웨딩 시즌", "2026婚礼季"),
    coverImage: img("weddingLongTable", l("Tiệc cưới Sao Mai", "Sao Mai wedding", "사오마이 웨딩", "Sao Mai婚礼"), 1200),
    publishedAt: "2026-09-12T00:00:00.000Z",
    validUntil: "2026-12-31T00:00:00.000Z",
  },
  {
    ...base("post_mice", "giai-phap-hoi-nghi-tron-goi", 2),
    category: "MICE",
    title: l(
      "Giải pháp Hội nghị Doanh nghiệp Trọn gói từ A-Z tại Phú Mỹ",
      "End-to-end Corporate Conference solutions in Phu My",
      "푸미에서 A부터 Z까지 기업 컨퍼런스 토털 솔루션",
      "富美一站式企业会议解决方案",
    ),
    excerpt: l(
      "Sảnh hội nghị, LED, tea-break 2 buổi, set lunch doanh nghiệp và phòng nghỉ cho đoàn – báo giá trọn gói trong 2 giờ.",
      "Hall, LED, two tea-breaks, corporate set lunch and group rooms – a complete quotation within 2 hours.",
      "회의장, LED, 티브레이크 2회, 기업 세트 런치, 단체 객실까지 – 2시간 내 통합 견적 제공.",
      "会议厅、LED屏、两次茶歇、企业套餐午宴及团队住宿——2小时内提供全包报价。",
    ),
    body: la(
      [
        "Nằm cạnh Quốc lộ 51 và chỉ cách các KCN Phú Mỹ 3 phút, Sao Mai là địa điểm quen thuộc cho hội nghị khách hàng, đại hội cổ đông, hội thảo đào tạo và tiệc tất niên của nhiều doanh nghiệp trong khu vực.",
        "Gói hội nghị trọn gói gồm sảnh theo sức chứa, màn hình LED, âm thanh – ánh sáng, 2 buổi tea-break, set lunch doanh nghiệp và phòng nghỉ cho đoàn với giá ưu đãi.",
        "Đội ngũ MICE hỗ trợ từ khâu lên kịch bản, MC, trang trí đến team building ngoài trời trong khuôn viên 10,5ha.",
        "Gửi yêu cầu để nhận báo giá trọn gói trong vòng 2 giờ làm việc.",
      ],
      [
        "Right on Highway 51 and just 3 minutes from the Phu My industrial parks, Sao Mai is a go-to venue for customer conferences, shareholder meetings, training seminars and year-end parties.",
        "The all-in package covers a hall sized to your group, LED screen, sound and lighting, two tea-breaks, a corporate set lunch and discounted group rooms.",
        "Our MICE team supports you from run-sheet and MC to décor and outdoor team building across our 10.5-hectare grounds.",
        "Send a request to receive a complete quotation within 2 working hours.",
      ],
      [
        "51번 국도 옆, 푸미 산업단지에서 단 3분 거리의 사오마이는 고객 컨퍼런스, 주주총회, 교육 세미나, 송년회 장소로 사랑받고 있습니다.",
        "패키지에는 인원에 맞는 회의장, LED 스크린, 음향·조명, 티브레이크 2회, 기업 세트 런치, 단체 객실 할인이 포함됩니다.",
        "MICE 팀이 진행 시나리오, MC, 장식부터 10.5헥타르 부지에서의 야외 팀빌딩까지 지원합니다.",
        "요청을 보내주시면 영업시간 기준 2시간 내 통합 견적을 드립니다.",
      ],
      [
        "Sao Mai毗邻51号国道，距富美工业区仅3分钟，是客户大会、股东大会、培训研讨与年终晚宴的理想场地。",
        "全包套餐含合适规模的会议厅、LED屏、音响灯光、两次茶歇、企业套餐午宴及优惠团队住宿。",
        "MICE团队从流程策划、主持、布置到10.5公顷园区内的户外团建全程支持。",
        "提交需求后，2个工作小时内即可获得全包报价。",
      ],
    ),
    badgeText: l("MICE trọn gói", "MICE package", "MICE 패키지", "MICE套餐"),
    coverImage: img("conferenceAudience", l("Hội nghị doanh nghiệp", "Corporate conference", "기업 컨퍼런스", "企业会议"), 1200),
    publishedAt: "2026-08-28T00:00:00.000Z",
    validUntil: null,
  },
  {
    ...base("post_pickleball", "san-pickleball-tennis-sao-mai", 3),
    category: "SPORTS",
    title: l(
      "Nạp đầy năng lượng ngày mới cùng Sân Pickleball & Tennis Sao Mai",
      "Recharge every morning at Sao Mai Pickleball & Tennis courts",
      "사오마이 피클볼 & 테니스 코트에서 매일 아침 에너지 충전",
      "在Sao Mai匹克球与网球场开启活力新一天",
    ),
    excerpt: l(
      "Gói hội viên tháng cho chuyên gia lưu trú và doanh nghiệp: miễn phí thuê vợt, giảm 20% giờ vàng buổi sáng.",
      "Monthly memberships for resident experts and companies: free paddle rental and 20% off early-morning slots.",
      "장기 투숙 전문가와 기업을 위한 월 회원권: 라켓 무료 대여, 이른 아침 시간 20% 할인.",
      "面向长住专家与企业的月度会员：免费租借球拍，清晨时段八折。",
    ),
    body: la(
      [
        "Cụm sân Pickleball mới tại Sao Mai đã chính thức đi vào hoạt động với mặt sân chuẩn thi đấu và hệ thống đèn cho buổi tối, bên cạnh sân Tennis quen thuộc của resort.",
        "Khách lưu trú được chơi miễn phí từ 08:00 đến 17:00. Gói hội viên tháng dành cho chuyên gia và doanh nghiệp được miễn phí thuê vợt và giảm 20% khung giờ vàng buổi sáng.",
        "Resort có huấn luyện viên hướng dẫn cho người mới bắt đầu và nhận tổ chức giải giao hữu nội bộ cho doanh nghiệp.",
      ],
      [
        "Sao Mai's new Pickleball courts are now open, with tournament-grade surfaces and evening floodlights alongside the resort's well-loved Tennis courts.",
        "Staying guests play free from 08:00 to 17:00. Monthly memberships for experts and companies include free paddle rental and 20% off early-morning slots.",
        "Coaches are on hand for beginners, and we host friendly in-house tournaments for companies.",
      ],
      [
        "사오마이의 신규 피클볼 코트가 대회 규격 바닥과 야간 조명을 갖추고 기존 테니스 코트 옆에 정식 오픈했습니다.",
        "투숙객은 08:00–17:00 무료로 이용할 수 있으며, 전문가·기업 월 회원권은 라켓 무료 대여와 이른 아침 시간 20% 할인 혜택이 있습니다.",
        "초보자를 위한 코치가 상주하며 기업 친선 대회도 개최해 드립니다.",
      ],
      [
        "Sao Mai全新匹克球场正式开放，配备赛事级场地与夜间照明，与度假村网球场相邻。",
        "住客08:00–17:00免费使用。专家与企业月度会员可免费租借球拍，清晨时段享八折。",
        "现场有教练指导初学者，并可为企业举办内部友谊赛。",
      ],
    ),
    badgeText: l("Mới", "New", "NEW", "新"),
    coverImage: img("pickleballCourt", l("Sân Pickleball Sao Mai", "Sao Mai Pickleball", "사오마이 피클볼", "Sao Mai匹克球场"), 1200),
    publishedAt: "2026-10-02T00:00:00.000Z",
    validUntil: null,
  },
  {
    ...base("post_rates_2026", "bang-gia-phong-moi-01-07-2026", 4),
    category: "NEWS",
    title: l(
      "Công bố bảng giá phòng mới áp dụng từ 01/07/2026",
      "New room rates effective 1 July 2026",
      "2026년 7월 1일부터 적용되는 새 객실 요금 안내",
      "2026年7月1日起执行新房价",
    ),
    excerpt: l(
      "7 hạng phòng từ 660.000đ/đêm, đã gồm ăn sáng, phí phục vụ & VAT. Bổ sung giá thuê theo giờ và theo tháng.",
      "Seven room types from 660,000 VND/night including breakfast, service charge & VAT – now with day-use and monthly rates.",
      "조식·봉사료·부가세 포함 1박 660,000동부터, 7개 객실 유형. 대실 및 월 단위 요금 추가.",
      "7种房型每晚660,000越南盾起，含早餐、服务费及增值税，新增钟点房与包月价格。",
    ),
    body: la(
      [
        "Sao Mai Phú Mỹ Resort công bố bảng giá phòng mới áp dụng từ ngày 01/07/2026 cho 7 hạng phòng: Family Villa, Suite Villa, Sweety Room, Deluxe, Superior, Standard B và Standard A.",
        "Giá niêm yết từ 660.000đ đến 2.310.000đ mỗi đêm, đã bao gồm ăn sáng, phí phục vụ và thuế VAT. Lần đầu tiên resort áp dụng giá thuê theo giờ (4 giờ) và giá thuê theo tháng cho mọi hạng phòng.",
        "Khách lưu trú được miễn phí bãi đỗ xe, sân tennis, pickleball, phòng gym, hồ bơi (08:00 – 17:00), nước suối và trà, cà phê trong phòng. Giờ nhận phòng 14:00, trả phòng 12:00.",
        "Xem chi tiết từng hạng phòng và chính sách phụ thu tại mục Lưu trú, hoặc liên hệ lễ tân qua hotline 0929 569 979.",
      ],
      [
        "Sao Mai Phu My Resort announces new room rates from 1 July 2026 across seven room types: Family Villa, Suite Villa, Sweety Room, Deluxe, Superior, Standard B and Standard A.",
        "Published rates range from 660,000 to 2,310,000 VND per night, including breakfast, service charge and VAT. For the first time, every room type also has a 4-hour day-use rate and a monthly rate.",
        "Staying guests enjoy free parking, tennis, pickleball, gym and pool (08:00 – 17:00), bottled water and in-room tea & coffee. Check-in 14:00, check-out 12:00.",
        "See each room type and surcharge policy in the Stay section, or call the front desk on 0929 569 979.",
      ],
      [
        "사오마이 푸미 리조트는 2026년 7월 1일부터 패밀리 빌라, 스위트 빌라, 스위티 룸, 디럭스, 슈페리어, 스탠다드 B, 스탠다드 A 등 7개 객실 유형에 새 요금을 적용합니다.",
        "공시 요금은 1박 660,000동~2,310,000동이며 조식, 봉사료, 부가세가 포함됩니다. 모든 객실에 4시간 대실 요금과 월 단위 요금이 처음으로 도입됩니다.",
        "투숙객은 주차, 테니스, 피클볼, 헬스장, 수영장(08:00–17:00), 생수, 객실 내 차·커피를 무료로 이용할 수 있습니다. 체크인 14:00, 체크아웃 12:00.",
        "객실별 상세 정보와 추가 요금 정책은 숙박 섹션에서 확인하시거나 프런트(0929 569 979)로 문의하세요.",
      ],
      [
        "Sao Mai富美度假村宣布自2026年7月1日起，家庭别墅、套房别墅、甜蜜客房、豪华、高级、标准B及标准A共7种房型执行新房价。",
        "挂牌价每晚660,000至2,310,000越南盾，含早餐、服务费及增值税。所有房型首次推出4小时钟点房价与包月价。",
        "住客可免费停车，免费使用网球场、匹克球场、健身房及泳池（08:00–17:00），并享免费矿泉水及客房茶与咖啡。入住14:00，退房12:00。",
        "各房型详情与附加费政策请见住宿栏目，或致电前台0929 569 979。",
      ],
    ),
    badgeText: l("Bảng giá mới", "New rates", "새 요금", "新房价"),
    coverImage: img("villaRedRoof", l("Suite Villa Sao Mai", "Sao Mai Suite Villa", "사오마이 스위트 빌라", "Sao Mai套房别墅"), 1200),
    publishedAt: "2026-06-20T00:00:00.000Z",
    validUntil: null,
  },
  {
    ...base("post_long_stay", "luu-tru-dai-han-cho-chuyen-gia", 5),
    category: "STAY",
    title: l(
      "Lưu trú dài hạn cho chuyên gia: như ở nhà, ngay cạnh KCN Phú Mỹ",
      "Long stays for experts: a home next to the Phu My industrial parks",
      "전문가 장기 체류: 푸미 산업단지 옆 내 집 같은 공간",
      "专家长住：毗邻富美工业区的家",
    ),
    excerpt: l(
      "Giá thuê tháng từ 16.500.000đ, đã gồm ăn sáng, dọn phòng và tiện ích thể thao – hợp đồng linh hoạt cho doanh nghiệp.",
      "Monthly rates from 16,500,000 VND with breakfast, housekeeping and sports facilities – flexible corporate contracts.",
      "조식·청소·스포츠 시설 포함 월 16,500,000동부터 – 기업을 위한 유연한 계약.",
      "包月价16,500,000越南盾起，含早餐、客房清洁与运动设施——企业合约灵活。",
    ),
    body: la(
      [
        "Hơn 20 năm qua, Sao Mai là nơi lưu trú quen thuộc của chuyên gia từ Samsung Engineering, POSCO, Penta-Ocean, BlueScope và nhiều doanh nghiệp quốc tế làm việc tại Phú Mỹ.",
        "Mọi hạng phòng đều có giá thuê tháng, từ 16.500.000đ (Standard A) đến 57.750.000đ (Family Villa), đã gồm ăn sáng, dọn phòng, bãi đỗ xe và quyền sử dụng hồ bơi, phòng gym, sân tennis & pickleball.",
        "Doanh nghiệp được xuất hóa đơn VAT, ký hợp đồng khung và hỗ trợ đưa đón sân bay theo yêu cầu. Lễ tân phục vụ bằng tiếng Anh, Hàn và Trung.",
      ],
      [
        "For over 20 years Sao Mai has been home to experts from Samsung Engineering, POSCO, Penta-Ocean, BlueScope and many international companies working in Phu My.",
        "Every room type has a monthly rate – from 16,500,000 VND (Standard A) to 57,750,000 VND (Family Villa) – including breakfast, housekeeping, parking and access to the pool, gym, tennis & pickleball courts.",
        "Companies receive VAT invoices, framework contracts and airport transfers on request. Our front desk speaks English, Korean and Chinese.",
      ],
      [
        "지난 20여 년간 사오마이는 삼성엔지니어링, 포스코, 펜타오션, 블루스코프 등 푸미에서 근무하는 많은 해외 기업 전문가들의 보금자리였습니다.",
        "모든 객실에 월 단위 요금이 있으며 16,500,000동(스탠다드 A)부터 57,750,000동(패밀리 빌라)까지, 조식·청소·주차와 수영장·헬스장·테니스·피클볼 이용이 포함됩니다.",
        "기업 고객은 부가세 계산서 발행, 기본 계약, 공항 픽업(요청 시)을 지원받을 수 있으며 프런트는 영어·한국어·중국어로 응대합니다.",
      ],
      [
        "20余年来，Sao Mai一直是三星工程、浦项、五洋建设、蓝思科普等在富美工作的众多国际企业专家的居所。",
        "所有房型均有包月价，从16,500,000越南盾（标准A）至57,750,000越南盾（家庭别墅），含早餐、客房清洁、停车及泳池、健身房、网球与匹克球场使用。",
        "企业客户可开具增值税发票、签订框架合同，并可按需安排机场接送。前台提供英、韩、中文服务。",
      ],
    ),
    badgeText: l("Chuyên gia", "Experts", "전문가", "专家"),
    coverImage: img("roomDeluxeA", l("Phòng Deluxe", "Deluxe Room", "디럭스 룸", "豪华客房"), 1200),
    publishedAt: "2026-07-15T00:00:00.000Z",
    validUntil: null,
  },
];

/* ------------------------------------------------------------------ */
/* Careers                                                             */
/* ------------------------------------------------------------------ */

export const jobPostings: JobPosting[] = [
  {
    ...base("job_receptionist", "le-tan-tieng-han", 1),
    title: l(
      "Nhân viên Lễ tân (tiếng Hàn hoặc tiếng Anh)",
      "Front Desk Agent (Korean or English)",
      "프런트 직원 (한국어 또는 영어)",
      "前台接待（韩语或英语）",
    ),
    department: l("Lễ tân", "Front Office", "프런트", "前厅部"),
    employmentType: "FULL_TIME",
    headcount: 2,
    salary: l("8 – 12 triệu + phụ cấp ngoại ngữ", "8 – 12 million VND + language allowance", "800만~1,200만 동 + 어학 수당", "800万–1200万越南盾 + 外语津贴"),
    summary: l(
      "Đón tiếp, làm thủ tục nhận – trả phòng cho khách lưu trú, đặc biệt là chuyên gia Hàn Quốc và quốc tế.",
      "Welcome guests and handle check-in/out, especially for Korean and international experts.",
      "투숙객, 특히 한국 및 해외 전문가의 체크인·체크아웃을 담당합니다.",
      "接待住客并办理入住与退房，主要服务韩国及国际专家。",
    ),
    responsibilities: la(
      ["Làm thủ tục nhận – trả phòng, thu ngân", "Tiếp nhận đặt phòng qua điện thoại, email, Zalo, KakaoTalk", "Hỗ trợ khách lưu trú dài hạn các yêu cầu hằng ngày", "Phối hợp buồng phòng, nhà hàng xử lý yêu cầu của khách"],
      ["Check-in, check-out and cashiering", "Handle bookings by phone, email, Zalo and KakaoTalk", "Support long-stay guests with daily requests", "Coordinate with housekeeping and F&B on guest needs"],
      ["체크인·체크아웃 및 수납", "전화·이메일·Zalo·카카오톡 예약 접수", "장기 투숙객 일상 요청 지원", "객실·식음료 부서와 협업"],
      ["办理入住、退房及收银", "通过电话、邮件、Zalo、KakaoTalk受理预订", "协助长住宾客日常需求", "协调客房与餐饮部门处理宾客需求"],
    ),
    requirements: la(
      ["Giao tiếp tốt tiếng Hàn hoặc tiếng Anh", "Ưu tiên có kinh nghiệm lễ tân khách sạn", "Ngoại hình sáng, thái độ niềm nở", "Làm việc theo ca, kể cả cuối tuần"],
      ["Good spoken Korean or English", "Hotel front desk experience preferred", "Presentable with a warm attitude", "Shift work including weekends"],
      ["한국어 또는 영어 회화 가능", "호텔 프런트 경력자 우대", "단정한 용모와 친절한 태도", "주말 포함 교대 근무"],
      ["韩语或英语沟通良好", "有酒店前台经验者优先", "形象端庄、态度热情", "需轮班，含周末"],
    ),
    benefits: la(
      ["Phụ cấp ngoại ngữ, phí phục vụ hằng tháng", "Bao ăn ca, đồng phục", "BHXH, BHYT đầy đủ", "Thưởng lễ, Tết, tháng 13"],
      ["Language allowance and monthly service charge", "Shift meals and uniforms", "Full social & health insurance", "Holiday, Tet and 13th-month bonuses"],
      ["어학 수당, 월 봉사료", "식사 & 유니폼 제공", "사회·건강보험 완비", "명절·뗏·13월차 보너스"],
      ["外语津贴与每月服务费", "提供工作餐与制服", "完整社保与医保", "节假日、春节及第13个月奖金"],
    ),
    publishedAt: "2026-10-01T00:00:00.000Z",
    deadline: "2026-11-15T00:00:00.000Z",
  },
  {
    ...base("job_fnb_server", "nhan-vien-phuc-vu-nha-hang", 2),
    title: l("Nhân viên Phục vụ Nhà hàng & Tiệc", "Restaurant & Banquet Server", "레스토랑 & 연회 서버", "餐厅与宴会服务员"),
    department: l("Ẩm thực (F&B)", "Food & Beverage", "식음료", "餐饮部"),
    employmentType: "FULL_TIME",
    headcount: 6,
    salary: l("6 – 8 triệu + phí phục vụ", "6 – 8 million VND + service charge", "600만~800만 동 + 봉사료", "600万–800万越南盾 + 服务费"),
    summary: l(
      "Phục vụ khách tại nhà hàng, phòng VIP và các tiệc cưới, hội nghị tại Sao Mai Center.",
      "Serve guests in the restaurant, VIP rooms and at weddings and conferences in Sao Mai Center.",
      "레스토랑, VIP 룸, 사오마이 센터 웨딩·컨퍼런스 행사에서 고객을 응대합니다.",
      "在餐厅、VIP包间及Sao Mai Center婚宴与会议中提供服务。",
    ),
    responsibilities: la(
      ["Set-up bàn tiệc theo tiêu chuẩn", "Phục vụ món, đồ uống cho khách", "Hỗ trợ tiệc cưới, hội nghị quy mô lớn", "Giữ gìn vệ sinh khu vực phục vụ"],
      ["Set up tables to standard", "Serve food and drinks", "Support large weddings and conferences", "Keep service areas clean"],
      ["기준에 맞춘 테이블 세팅", "음식·음료 서빙", "대규모 웨딩·컨퍼런스 지원", "서비스 구역 청결 유지"],
      ["按标准摆台", "为宾客上菜与饮品", "协助大型婚宴与会议", "保持服务区域整洁"],
    ),
    requirements: la(
      ["Nam/Nữ từ 18 tuổi", "Không yêu cầu kinh nghiệm, được đào tạo", "Nhanh nhẹn, chịu khó", "Có thể làm tối và cuối tuần"],
      ["Aged 18+", "No experience needed – training provided", "Quick and hard-working", "Available evenings and weekends"],
      ["만 18세 이상", "경력 무관, 교육 제공", "민첩하고 성실한 분", "저녁·주말 근무 가능"],
      ["18岁以上", "无需经验，提供培训", "手脚麻利、吃苦耐劳", "可上晚班及周末班"],
    ),
    benefits: la(
      ["Phí phục vụ & tiền tip", "Bao ăn ca, đồng phục", "BHXH, BHYT đầy đủ", "Lộ trình lên Trưởng ca"],
      ["Service charge & tips", "Shift meals and uniforms", "Full social & health insurance", "Path to shift leader"],
      ["봉사료 & 팁", "식사 & 유니폼 제공", "사회·건강보험 완비", "조장 승진 기회"],
      ["服务费与小费", "提供工作餐与制服", "完整社保与医保", "晋升领班通道"],
    ),
    publishedAt: "2026-09-25T00:00:00.000Z",
    deadline: "2026-11-30T00:00:00.000Z",
  },
  {
    ...base("job_sales_mice", "nhan-vien-kinh-doanh-mice", 3),
    title: l("Nhân viên Kinh doanh Sự kiện (MICE & Tiệc cưới)", "Sales Executive (MICE & Weddings)", "세일즈 담당 (MICE & 웨딩)", "销售专员（会议与婚宴）"),
    department: l("Kinh doanh", "Sales & Marketing", "세일즈 & 마케팅", "销售市场部"),
    employmentType: "FULL_TIME",
    headcount: 1,
    salary: l("10 – 15 triệu + hoa hồng", "10 – 15 million VND + commission", "1,000만~1,500만 동 + 커미션", "1000万–1500万越南盾 + 提成"),
    summary: l(
      "Tìm kiếm và chăm sóc khách hàng doanh nghiệp, cặp đôi có nhu cầu tổ chức hội nghị, tiệc cưới tại Sao Mai Center.",
      "Win and look after corporate clients and couples planning conferences and weddings at Sao Mai Center.",
      "사오마이 센터에서 컨퍼런스·웨딩을 계획하는 기업 고객과 커플을 발굴·관리합니다.",
      "开拓并维护计划在Sao Mai Center举办会议与婚宴的企业客户及新人。",
    ),
    responsibilities: la(
      ["Tư vấn, báo giá gói hội nghị, tiệc cưới", "Chăm sóc khách hàng doanh nghiệp trong các KCN", "Phối hợp vận hành tổ chức sự kiện", "Báo cáo doanh số hằng tháng"],
      ["Advise and quote conference and wedding packages", "Manage corporate accounts in the industrial parks", "Coordinate event operations", "Monthly sales reporting"],
      ["컨퍼런스·웨딩 패키지 상담 및 견적", "산업단지 기업 고객 관리", "행사 운영 협업", "월간 매출 보고"],
      ["咨询并报价会议与婚宴套餐", "维护工业区企业客户", "协调活动执行", "每月销售汇报"],
    ),
    requirements: la(
      ["Tốt nghiệp Cao đẳng trở lên", "Tối thiểu 1 năm kinh nghiệm sales khách sạn/sự kiện", "Giao tiếp, đàm phán tốt", "Ưu tiên biết tiếng Anh hoặc tiếng Hàn"],
      ["College degree or higher", "1+ year in hotel or event sales", "Strong communication and negotiation", "English or Korean is a plus"],
      ["전문대 졸업 이상", "호텔·행사 영업 경력 1년 이상", "뛰어난 커뮤니케이션·협상 능력", "영어 또는 한국어 가능자 우대"],
      ["大专及以上学历", "1年以上酒店或活动销售经验", "沟通谈判能力强", "懂英语或韩语者优先"],
    ),
    benefits: la(
      ["Hoa hồng theo doanh số", "Phụ cấp điện thoại, xăng xe", "BHXH, BHYT đầy đủ", "Thưởng tháng 13"],
      ["Sales commission", "Phone and fuel allowance", "Full social & health insurance", "13th-month bonus"],
      ["매출 커미션", "통신비·유류비 지원", "사회·건강보험 완비", "13월차 보너스"],
      ["销售提成", "话费与交通补贴", "完整社保与医保", "第13个月奖金"],
    ),
    publishedAt: "2026-09-18T00:00:00.000Z",
    deadline: "2026-11-10T00:00:00.000Z",
  },
  {
    ...base("job_maintenance", "ky-thuat-bao-tri", 4),
    title: l("Kỹ thuật viên Bảo trì (Điện – Nước)", "Maintenance Technician (Electrical & Plumbing)", "시설 유지보수 기술자 (전기·배관)", "维修技师（水电）"),
    department: l("Kỹ thuật", "Engineering", "시설관리", "工程部"),
    employmentType: "FULL_TIME",
    headcount: 2,
    salary: l("8 – 10 triệu", "8 – 10 million VND", "800만~1,000만 동", "800万–1000万越南盾"),
    summary: l(
      "Bảo trì hệ thống điện, nước, điều hòa cho khu phòng, biệt thự và Sao Mai Center.",
      "Maintain electrical, plumbing and air-conditioning systems across rooms, villas and Sao Mai Center.",
      "객실, 빌라, 사오마이 센터의 전기·배관·에어컨 시스템을 유지보수합니다.",
      "负责客房、别墅及Sao Mai Center的水电与空调系统维护。",
    ),
    responsibilities: la(
      ["Bảo trì định kỳ điện, nước, điều hòa", "Xử lý sự cố phòng khách nhanh chóng", "Hỗ trợ kỹ thuật âm thanh, ánh sáng cho sự kiện", "Ghi chép nhật ký bảo trì"],
      ["Scheduled electrical, plumbing and A/C maintenance", "Fix guest-room issues quickly", "Support event sound and lighting", "Keep maintenance logs"],
      ["전기·배관·에어컨 정기 점검", "객실 문제 신속 처리", "행사 음향·조명 기술 지원", "유지보수 일지 작성"],
      ["定期维护水电与空调", "快速处理客房故障", "协助活动音响灯光", "记录维修日志"],
    ),
    requirements: la(
      ["Trung cấp điện, điện lạnh trở lên", "Ưu tiên có kinh nghiệm khách sạn/resort", "Trung thực, cẩn thận", "Có thể trực ca đêm"],
      ["Vocational qualification in electrical/HVAC", "Hotel or resort experience preferred", "Honest and careful", "Able to cover night shifts"],
      ["전기·냉동 관련 자격 이상", "호텔·리조트 경력자 우대", "정직하고 꼼꼼한 분", "야간 근무 가능"],
      ["中专以上电气或制冷专业", "有酒店度假村经验者优先", "诚实细心", "可值夜班"],
    ),
    benefits: la(
      ["Phụ cấp ca đêm", "Bao ăn ca, đồng phục", "BHXH, BHYT đầy đủ", "Thưởng lễ, Tết"],
      ["Night-shift allowance", "Shift meals and uniforms", "Full social & health insurance", "Holiday and Tet bonuses"],
      ["야간 수당", "식사 & 유니폼 제공", "사회·건강보험 완비", "명절·뗏 보너스"],
      ["夜班津贴", "提供工作餐与制服", "完整社保与医保", "节假日与春节奖金"],
    ),
    publishedAt: "2026-09-10T00:00:00.000Z",
    deadline: "2026-10-31T00:00:00.000Z",
  },
];

/* ------------------------------------------------------------------ */
/* Connectivity                                                        */
/* ------------------------------------------------------------------ */

export const landmarks: Landmark[] = [
  { id: "lm_kcn", kind: "INDUSTRIAL", value: 3, unit: "MIN", name: l("KCN Phú Mỹ", "Phu My Industrial Parks", "푸미 산업단지", "富美工业区") },
  { id: "lm_pagoda", kind: "PAGODA", value: 5, unit: "MIN", name: l("Chùa Đại Tòng Lâm", "Dai Tong Lam Pagoda", "다이똥럼 사원", "大丛林寺") },
  { id: "lm_port", kind: "PORT", value: 10, unit: "MIN", name: l("Cảng Quốc tế Cái Mép - Thị Vải", "Cai Mep - Thi Vai Int'l Port", "까이멥-티바이 국제항", "盖梅-氏围国际港") },
  { id: "lm_longhai", kind: "BEACH", value: 25, unit: "KM", name: l("Biển Long Hải", "Long Hai Beach", "롱하이 해변", "龙海海滩") },
  { id: "lm_vungtau", kind: "BEACH", value: 40, unit: "KM", name: l("TP. Vũng Tàu", "Vung Tau City", "붕따우시", "头顿市") },
  { id: "lm_hcmc", kind: "CITY", value: 70, unit: "KM", name: l("Trung tâm TP.HCM", "Ho Chi Minh City center", "호찌민시 중심", "胡志明市中心") },
];

/* ------------------------------------------------------------------ */
/* Collage imagery                                                     */
/* ------------------------------------------------------------------ */

export const storyImages: ResortImage[] = [
  img("villaRowRedRoof", l("Biệt thự giữa vườn xanh", "Villas in the gardens", "정원 속 빌라", "花园中的别墅"), 1200),
  img("lakeHouse", l("Hồ nước yên bình", "Tranquil lake", "고요한 호수", "宁静湖泊"), 1000),
  img("forest", l("Tán cây cổ thụ", "Ancient tree canopy", "고목 숲", "古树林荫"), 1000),
];

export const careersHeroImage: ResortImage = img(
  "teamBuilding",
  l("Đội ngũ Sao Mai Phú Mỹ", "The Sao Mai Phu My team", "사오마이 푸미 팀", "Sao Mai Phu My 团队"),
  1600,
);

export const miceShowcaseImages = {
  wedding: [
    img("banquetHall", l("Sảnh tiệc cưới", "Wedding ballroom", "웨딩 연회장", "婚宴大厅"), 1400),
    img("weddingTable", l("Bàn tiệc hoa tươi", "Floral banquet table", "플라워 연회 테이블", "鲜花宴桌"), 900),
    img("fairyLightHall", l("Không gian ánh đèn lung linh", "Twinkling lights", "반짝이는 조명", "璀璨灯光"), 900),
  ],
  mice: [
    img("conferenceAudience", l("Hội nghị khách hàng", "Customer conference", "고객 컨퍼런스", "客户大会"), 1400),
    img("galaCrowd", l("Gala Dinner", "Gala dinner", "갈라 디너", "晚宴"), 900),
    img("teamBuilding", l("Team building ngoài trời", "Outdoor team building", "야외 팀빌딩", "户外团建"), 900),
  ],
};