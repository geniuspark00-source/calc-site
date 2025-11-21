import { generateSEOTags } from "@/lib/seo";
import PropertyTaxCalculatorUI from "./PropertyTaxCalculatorUI";

export const metadata = generateSEOTags({
  title: "취득세·보유세 계산기 | Calc Site",
  description:
    "부동산 취득가액과 세율, 보유 기간을 입력하면 취득세와 보유세, 총 세금 부담을 자동으로 계산합니다. (참고용 계산기입니다.)",
  url: "https://calc-site-delta.vercel.app/calculators/property-tax",
});

export default function Page() {
  return <PropertyTaxCalculatorUI />;
}
