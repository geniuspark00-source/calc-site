// app/calculators/gas-heating/page.tsx
import { generateSEOTags } from "@/lib/seo";
import GasHeatingCalculatorUI from "./GasHeatingCalculatorUI";

export const metadata = generateSEOTags({
  title: "도시가스 난방비 계산기 | Calc Site",
  description:
    "도시가스 사용량(㎥)과 단가, 기본요금을 입력하면 실제 예상 난방비를 손쉽게 계산할 수 있습니다.",
  url: "https://calc-site-delta.vercel.app/calculators/gas-heating",
});

export default function GasHeatingPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">도시가스 난방비 계산기</h1>
      <p className="text-sm text-gray-600 leading-relaxed">
        월 가스 사용량(㎥), 단가(원/㎥), 기본요금을 입력하면<br />
        실제 청구되는 도시가스 난방비를 간단하게 계산합니다.
      </p>
      <GasHeatingCalculatorUI />
    </div>
  );
}
