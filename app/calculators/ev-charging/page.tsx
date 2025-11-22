import { generateSEOTags } from "@/lib/seo";
import EvChargingCalculatorUI from "./EvChargingCalculatorUI";

export const metadata = generateSEOTags({
  title: "전기차 충전비 계산기 | Calc Site",
  description:
    "배터리 용량, 완속·급속 단가, 충전 효율을 입력하면 1회 완충 비용과 월/연 충전비를 자동 계산합니다.",
  url: "https://calc-site-delta.vercel.app/calculators/ev-charging",
});

export default function Page() {
  return <EvChargingCalculatorUI />;
}
