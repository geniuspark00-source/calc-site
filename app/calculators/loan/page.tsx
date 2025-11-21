import { generateSEOTags } from "@/lib/seo";
import LoanCalculatorUI from "./LoanCalculatorUI";

export const metadata = generateSEOTags({
  title: "대출 상환 계산기 | Calc Site",
  description:
    "원리금균등, 원금균등, 만기일시 중 선택하여 월 상환금과 총이자를 계산하는 대출 상환 계산기입니다.",
  url: "https://calc-site-delta.vercel.app/calculators/loan",
});

export default function Page() {
  return <LoanCalculatorUI />;
}
