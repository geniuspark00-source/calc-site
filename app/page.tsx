import { generateHomeSEOTags } from "@/lib/seo";
import Adsense from "@/components/Adsense";
import CalculatorCard from "@/app/components/CalculatorCard";

type CalculatorItem = {
  href: string;
  title: string;
  desc: string;
  color: string;
};

export const metadata = generateHomeSEOTags({
  title: "실생활 계산기 모음 | Calc Site",
  description:
    "전세·월세 · 임대수익률 · 대출 · 자동차비용 · 에어컨설치비 등 다양한 실생활 계산기를 제공합니다.",
  url: "https://calc-site-delta.vercel.app/",
});

// 🔥 계산기 목록
const calculators: CalculatorItem[] = [
  { href: "/calculators/rent-yield", title: "임대 수익률 계산기 →", desc: "매입가, 보증금, 월세, 대출이자를 기준으로 자동 계산합니다.", color: "text-blue-600" },
  { href: "/calculators/lease-to-monthly", title: "전세 → 월세 전환 계산기 →", desc: "전세 유지 대비 월세 전환 시 순이익을 비교합니다.", color: "text-green-700" },
  { href: "/calculators/property-tax", title: "취득세·보유세 계산기 →", desc: "취득세 + 연 보유세를 기반으로 실제 취득원가를 계산합니다.", color: "text-purple-700" },
  { href: "/calculators/loan", title: "대출 상환 계산기 →", desc: "원리금균등·원금균등·만기일시 방식 월 상환금 계산.", color: "text-orange-700" },
  { href: "/calculators/salary", title: "연봉 → 실수령액 계산기 →", desc: "4대보험·세금 포함 실제 월 실수령액 계산.", color: "text-red-700" },
  { href: "/calculators/margin", title: "마진율 / 판매가 계산기 →", desc: "원가·마진율 또는 판매가 기준 마진 분석.", color: "text-amber-700" },
  { href: "/calculators/youtube", title: "유튜브 수익 계산기 →", desc: "한국 기준 CPM·광고 시청률로 수익 자동 계산.", color: "text-red-700" },
  { href: "/calculators/aircon-electric", title: "에어컨 전기요금 계산기 →", desc: "소비전력·kWh 단가로 월 전기요금을 계산합니다.", color: "text-blue-600" },
  { href: "/calculators/aircon-mode", title: "에어컨 모드별 전기요금 비교 →", desc: "냉방·제습·절전 모드 간 전기요금 비교.", color: "text-blue-600" },
  { href: "/calculators/rent-compare", title: "전월세 비교 계산기 →", desc: "전세/월세 중 어떤 선택이 유리한지 비교합니다.", color: "text-amber-600" },
  { href: "/calculators/car-cost", title: "자동차 유지비 계산기 →", desc: "유류비·보험료·세금·정비비 기반 유지비 계산.", color: "text-green-700" },
  { href: "/calculators/coupang-partners", title: "쿠팡 파트너스 수익 계산기 →", desc: "클릭수·전환율·결제금액 기반 예상 수익 계산.", color: "text-indigo-600" },
  { href: "/calculators/unemployment-benefit", title: "실업급여 계산기 →", desc: "평균임금·근속기간 기반 예상 지급액 계산.", color: "text-purple-600" },
  { href: "/calculators/exchange-fee", title: "환전 수수료 계산기 →", desc: "스프레드 포함 실제 환전 금액 계산.", color: "text-indigo-600" },
  { href: "/calculators/gas-heating", title: "도시가스 난방비 계산기 →", desc: "지역별 요금·기본요금 기반 난방비 계산.", color: "text-orange-600" },
  { href: "/calculators/commute", title: "출퇴근 시간·비용 계산기 →", desc: "거리·속도·유류비 기반 출퇴근 시간·비용 계산.", color: "text-blue-600" },
  { href: "/calculators/health-insurance", title: "건강보험료 계산기 →", desc: "직장가입자·지역가입자 건강보험료를 자동 계산합니다.", color: "text-blue-600" },
  { href: "/calculators/ev-charging", title: "전기차 충전비 계산기 →", desc: "배터리 용량과 충전 단가로 충전 비용 계산.", color: "text-green-700" },
  { href: "/calculators/car-depreciation", title: "자동차 감가상각 계산기 →", desc: "연료비·보험료·정비비 포함 실제 소유비용 계산.", color: "text-red-700" },
  { href: "/calculators/lotto", title: "로또 실수령액 계산기 →", desc: "세후 실제 수령액을 계산합니다.", color: "text-yellow-600" },
  { href: "/calculators/pet-age", title: "강아지·고양이 사람 나이 환산기 →", desc: "반려동물 실제 나이를 사람 나이로 환산합니다.", color: "text-pink-600" },
  { href: "/calculators/breakup-recovery", title: "이별 복구 가능성 계산기 →", desc: "대화 톤·연락 빈도 기반 재회 확률 계산.", color: "text-pink-600" },
  { href: "/calculators/property-buy-cost", title: "부동산 총구매비용 계산기 →", desc: "취득세·중개수수료·등기비 포함 총비용 계산.", color: "text-blue-700" },
  { href: "/calculators/aircon-estimate", title: "에어컨 설치비 견적 계산기 →", desc: "벽걸이·스탠드·2in1 설치비 자동 계산.", color: "text-blue-600" },
  { href: "/calculators/wedding-cost", title: "결혼 비용 계산기 →", desc: "식대·스드메·대관료·허니문 포함 총 비용 계산", color: "text-pink-700" },
{ 
  href: "/calculators/fundamental", 
  title: "주식 적정주가 계산기 →", 
  desc: "EPS·PER·BPS·PBR·ROE 기반 펀더멘탈을 통해 적정주가를 계산합니다.", 
  color: "text-blue-700" 
},
{
  href: "/calculators/net-net",
  title: "벤저민 그레이엄의 안전마진 계산기 →",
  desc: "유동자산·총부채·주식수 기반 Net-Net 절대 안전마진 계산",
  color: "text-blue-700"
},
];

export default function Home() {
  return (
    <main className="w-full p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">계산기 모음</h1>

        <p className="text-gray-600 mb-8">
          다양한 실생활 계산기를 제공합니다. 원하는 계산기를 아래에서 선택하세요.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {calculators.map((calc) => (
            <CalculatorCard key={calc.href} calc={calc} />
          ))}
        </div>
      </div>
    </main>
  );
}
