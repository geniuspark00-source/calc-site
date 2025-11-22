import { generateSEOTags } from "@/lib/seo";
import CarDepreciationCalculatorUI from "./CarDepreciationCalculatorUI";

export const metadata = generateSEOTags({
  title: "자동차 감가상각 계산기 | Calc Site",
  description:
    "차량 감가율, 유류비, 보험료, 주행거리 등을 입력하면 자동차의 연간 실제 소유 비용을 계산합니다.",
  url: "https://calc-site-delta.vercel.app/calculators/car-depreciation",
});

export default function Page() {
  return <CarDepreciationCalculatorUI />;
}
