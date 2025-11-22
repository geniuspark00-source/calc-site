// app/calculators/car-cost/page.tsx
import { generateSEOTags } from "@/lib/seo";
import CarCostCalculatorUI from "./CarCostCalculatorUI";

export const metadata = generateSEOTags({
  title: "자동차 유지비 계산기 | Calc Site",
  description:
    "유류비, 자동차세, 보험료, 주행거리, 연비를 기준으로 월간·연간 자동차 유지비를 계산합니다.",
  url: "https://calc-site-delta.vercel.app/calculators/car-cost",
});

export default function CarCostCalculatorPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">자동차 유지비 계산기</h1>
      <p className="text-sm text-gray-600">
        유류비, 보험료, 자동차세, 주행거리, 연비를 입력하면
        <br />
        월간·연간 자동차 유지 비용을 상세하게 계산해줍니다.
      </p>
      <CarCostCalculatorUI />
    </div>
  );
}
