// app/calculators/rent-compare/page.tsx
import { generateSEOTags } from "@/lib/seo";
import RentCompareCalculatorUI from "./RentCompareCalculatorUI";

export const metadata = generateSEOTags({
  title: "전월세 비교 계산기 | Calc Site",
  description:
    "전세 보증금, 월세 보증금, 월세, 이자율, 비교 기간을 입력하면 전세와 월세 중 어떤 선택이 더 유리한지 비교합니다.",
  url: "https://calc-site-delta.vercel.app/calculators/rent-compare",
});

export default function RentCompareCalculatorPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">전월세 비교 계산기</h1>
      <p className="text-sm text-gray-600">
        전세 보증금과 월세 보증금·월세, 연 이자율, 비교 기간을 기준으로
        <br />
        전세와 월세 중 어떤 선택이 더 유리한지 간단히 비교해줍니다.
      </p>
      <RentCompareCalculatorUI />
    </div>
  );
}
