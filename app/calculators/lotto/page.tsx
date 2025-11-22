import { generateSEOTags } from "@/lib/seo";
import LottoCalculatorUI from "./LottoCalculatorUI";

export const metadata = generateSEOTags({
  title: "로또 실수령액 계산기 | Calc Site",
  description:
    "로또 1등 당첨금에서 세금을 제외한 실제 실수령액을 계산합니다. 5억 이하 22%, 초과분 33% 자동 적용.",
  url: "https://calc-site-delta.vercel.app/calculators/lotto",
});

export default function Page() {
  return <LottoCalculatorUI />;
}
