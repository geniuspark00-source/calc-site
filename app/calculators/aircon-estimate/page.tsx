import { generateSEOTags } from "@/lib/seo";
import AirconEstimateCalculatorUI from "./AirconEstimateCalculatorUI";

export const metadata = generateSEOTags({
  title: "에어컨 설치비 견적 계산기 | Calc Site",
  description:
    "에어컨 종류별 설치비, 앵글 설치, 타공 추가, 진공작업 비용까지 자동 계산하는 설치비 견적 계산기입니다.",
  url: "https://calc-site-delta.vercel.app/calculators/aircon-estimate",
});

export default function Page() {
  return <AirconEstimateCalculatorUI />;
}
