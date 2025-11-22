// app/calculators/unemployment-benefit/page.tsx
import { generateSEOTags } from "@/lib/seo";
import UnemploymentBenefitCalculatorUI from "./UnemploymentBenefitCalculatorUI";

export const metadata = generateSEOTags({
  title: "실업급여 수령액 계산기 | Calc Site",
  description:
    "평균임금, 근속기간, 나이에 따라 실업급여 예상 지급액과 지급일수를 자동으로 계산합니다.",
  url: "https://calc-site-delta.vercel.app/calculators/unemployment-benefit",
});

export default function UnemploymentBenefitPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">실업급여 수령액 계산기</h1>
      <p className="text-sm text-gray-600">
        평균임금, 근속기간, 연령 등을 기준으로 실업급여 예상 지급 기간과
        <br />
        1일 지급액 및 총 수령액을 계산할 수 있습니다.
      </p>
      <UnemploymentBenefitCalculatorUI />
    </div>
  );
}
