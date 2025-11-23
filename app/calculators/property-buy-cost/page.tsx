import { generateSEOTags } from "@/lib/seo";
import PropertyBuyCostCalculatorUI from "./PropertyBuyCostCalculatorUI";

export const metadata = generateSEOTags({
  title: "부동산 구매 총비용 계산기 | Calc Site",
  description:
    "취득세, 중개수수료, 법무사비, 등기비용까지 아파트·빌라·오피스텔 구매 시 들어가는 총 비용을 자동으로 계산합니다.",
  url: "https://calc-site-delta.vercel.app/calculators/property-buy-cost",
});

export default function Page() {
  return <PropertyBuyCostCalculatorUI />;
}
