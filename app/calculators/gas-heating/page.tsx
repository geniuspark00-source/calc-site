import { generateSEOTags } from "@/lib/seo";
import GasHeatingCalculatorUI from "./GasHeatingCalculatorUI";

export const metadata = generateSEOTags({
  title: "도시가스 난방비 계산기 | Calc Site",
  description:
    "지역별 단가와 기본요금을 자동 반영하고, kWh 기반 도시가스 난방비를 정확하게 계산하는 실용적인 난방비 계산기입니다.",
  url: "https://calc-site-delta.vercel.app/calculators/gas-heating",
});

export default function GasHeatingPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">도시가스 난방비 계산기</h1>
      <p className="text-sm text-gray-600 leading-relaxed">
        지역별 단가와 기본요금을 자동 반영하며,
        <br />
        월 사용량(kWh) 기반으로 실제 난방비를 계산합니다.
      </p>
      <GasHeatingCalculatorUI />
    </div>
  );
}
