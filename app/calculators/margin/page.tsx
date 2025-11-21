import { generateSEOTags } from "@/lib/seo";
import MarginCalculatorUI from "./MarginCalculatorUI";

export const metadata = generateSEOTags({
  title: "마진율 / 판매가 계산기 | Calc Site",
  description:
    "원가와 목표 마진율로 판매가를 계산하거나, 원가와 판매가로 실제 마진액과 마진율을 계산합니다.",
  url: "https://calc-site-delta.vercel.app/calculators/margin",
});

export default function Page() {
  return <MarginCalculatorUI />;
}
