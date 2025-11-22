// app/calculators/exchange-fee/page.tsx
import { generateSEOTags } from "@/lib/seo";
import ExchangeCalculatorUI from "./ExchangeCalculatorUI";

export const metadata = generateSEOTags({
  title: "환전 수수료 포함 환율 계산기 | Calc Site",
  description:
    "실시간 환율, 은행 환전 수수료, 스프레드 등을 반영하여 원화 ↔ 외화 환전 금액을 정확하게 계산합니다.",
  url: "https://calc-site-delta.vercel.app/calculators/exchange-fee",
});

export default function ExchangeFeePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">환전 수수료 포함 환율 계산기</h1>
      <p className="text-sm text-gray-600 leading-relaxed">
        원화를 외화로 환전할 때 적용되는 은행 환전 수수료(스프레드)를 반영하여
        실제 받는 금액을 계산합니다.<br />
        달러, 엔화, 유로 등 통화 선택도 가능합니다.
      </p>
      <ExchangeCalculatorUI />
    </div>
  );
}
