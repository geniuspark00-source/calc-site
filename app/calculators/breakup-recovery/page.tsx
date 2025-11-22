import { generateSEOTags } from "@/lib/seo";
import BreakupRecoveryCalculatorUI from "./BreakupRecoveryCalculatorUI";

export const metadata = generateSEOTags({
  title: "이별 복구 가능성 계산기 | Calc Site",
  description:
    "연락 빈도, 마지막 대화 분위기, 이별 사유 등을 분석해 재회 가능성을 AI 알고리즘 기반으로 계산합니다.",
  url: "https://calc-site-delta.vercel.app/calculators/breakup-recovery",
});

export default function Page() {
  return <BreakupRecoveryCalculatorUI />;
}
