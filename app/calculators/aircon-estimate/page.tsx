import { generateSEOTags } from "@/lib/seo";
import AirconEstimateCalculatorUI from "./AirconEstimateCalculatorUI";

export const metadata = generateSEOTags({
  title: "에어컨 설치·청소 견적 계산기 | Calc Site",
  description:
    "에어컨 종류별 설치비와 청소비를 자동 계산하는 견적 계산기입니다.",
  url: "https://calc-site-delta.vercel.app/calculators/aircon-estimate",
});

export default function Page() {
  return <AirconEstimateCalculatorUI />;
}
