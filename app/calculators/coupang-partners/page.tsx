// app/calculators/coupang-partners/page.tsx
import { generateSEOTags } from "@/lib/seo";
import CoupangPartnersCalculatorUI from "./CoupangPartnersCalculatorUI";

export const metadata = generateSEOTags({
  title: "쿠팡 파트너스 수익 계산기 | Calc Site",
  description:
    "월 클릭 수, 전환율, 평균 구매 금액, 수수료율을 기준으로 쿠팡 파트너스 예상 수익을 계산합니다.",
  url: "https://calc-site-delta.vercel.app/calculators/coupang-partners",
});

export default function CoupangPartnersCalculatorPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">쿠팡 파트너스 수익 계산기</h1>
      <p className="text-sm text-gray-600">
        월 클릭 수, 전환율(%), 1회 주문당 평균 결제 금액, 수수료율(%)을 입력하면
        <br />
        예상 매출과 쿠팡 파트너스 예상 수익을 간단히 계산해줍니다.
      </p>
      <CoupangPartnersCalculatorUI />
    </div>
  );
}
