import { generateSEOTags } from "@/lib/seo";
import HealthInsuranceCalculatorUI from "./HealthInsuranceCalculatorUI";

export const metadata = generateSEOTags({
  title: "건강보험료 계산기 | Calc Site",
  description:
    "직장가입자·지역가입자 건강보험료를 급여, 소득, 재산 정보를 기반으로 자동 계산합니다.",
  url: "https://calc-site-delta.vercel.app/calculators/health-insurance",
});

export default function Page() {
  return <HealthInsuranceCalculatorUI />;
}
