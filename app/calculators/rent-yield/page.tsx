import { generateSEOTags } from "@/lib/seo";
import RentYieldCalculatorUI from "./RentYieldCalculatorUI";

export const metadata = generateSEOTags({
  title: "임대 수익률 계산기 | Calc Site",
  description:
    "매입가, 보증금, 월세, 대출이자 등을 입력하면 자동으로 임대 수익률을 계산합니다.",
  url: "https://calc-site-delta.vercel.app/calculators/rent-yield",
});

export default function Page() {
  return <RentYieldCalculatorUI />;
}
