// app/calculators/aircon-mode/page.tsx
import { generateSEOTags } from "@/lib/seo";
import AirconModeCalculatorUI from "./AirconModeCalculatorUI";

export const metadata = generateSEOTags({
  title: "에어컨 모드별 전기요금 비교 계산기 | Calc Site",
  description:
    "냉방·제습·절전(ECO)·터보 모드에 따른 소비전력 차이를 기반으로 하루·월 예상 전기요금을 비교 계산합니다.",
  url: "https://calc-site-delta.vercel.app/calculators/aircon-mode",
});

export default function AirconModeCalculatorPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">에어컨 모드별 전기요금 비교 계산기</h1>
      <p className="text-sm text-gray-600">
        벽걸이/스탠드 에어컨의 냉방·제습·절전·터보 모드를 선택하면
        <br />
        소비전력 차이를 기반으로 하루·월 예상 전기요금을 비교해줍니다.
      </p>
      <AirconModeCalculatorUI />
    </div>
  );
}
