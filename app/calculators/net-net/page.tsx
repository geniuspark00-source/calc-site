import { generateSEOTags } from "@/lib/seo";
import NetNetCalculatorUI from "./netNetCalculatorUI";

export const metadata = generateSEOTags({
  title: "벤저민 그레이엄의 안전마진 계산기 | Calc Site",
  description: "유동자산, 총부채, 발행주식수로 절대적 안전마진(Net-Net)을 계산합니다.",
  url: "https://calc-site-delta.vercel.app/calculators/net-net",
});

export default function Page() {
  return <NetNetCalculatorUI />;
}
