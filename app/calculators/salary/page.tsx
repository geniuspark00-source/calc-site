import { generateSEOTags } from "@/lib/seo";
import SalaryCalculatorUI from "./SalaryCalculatorUI";

export const metadata = generateSEOTags({
  title: "연봉 → 실수령액 계산기 | Calc Site",
  description:
    "연봉을 입력하면 국민연금·건강보험·고용보험·소득세를 자동 계산하여 실제 월 실수령액을 보여주는 계산기입니다.",
  url: "https://calc-site-delta.vercel.app/calculators/salary",
});

export default function Page() {
  return <SalaryCalculatorUI />;
}
