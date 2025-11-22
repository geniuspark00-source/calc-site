// app/calculators/aircon-electric/page.tsx
import { generateSEOTags } from "@/lib/seo";
import AirconElectricCalculatorUI from "./AirconElectricCalculatorUI";

export const metadata = generateSEOTags({
  title: "에어컨 전기요금 계산기 | Calc Site",
  description:
    "에어컨 소비전력, 하루 사용시간, 일수, kWh 단가를 입력하면 예상 전기요금과 사용량을 계산해줍니다.",
  url: "https://calc-site-delta.vercel.app/calculators/aircon-electric",
});

export default function AirconElectricCalculatorPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">에어컨 전기요금 계산기</h1>
      <p className="text-sm text-gray-600">
        에어컨 소비전력(W), 하루 사용 시간, 사용 일수, kWh 단가를 입력하면
        <br />
        예상 전기요금과 월 전력 사용량을 간단하게 계산해줍니다.
      </p>
      <AirconElectricCalculatorUI />
    </div>
  );
}
