import { generateSEOTags } from "@/lib/seo";
import YouTubeRevenueCalculatorUI from "./YouTubeRevenueCalculatorUI";

export const metadata = generateSEOTags({
  title: "유튜브 조회수 → 수익 계산기 | Calc Site",
  description:
    "한국 기준 CPM·광고시청률·영상길이·쇼츠 여부를 반영하여 조회수로 예상 유튜브 수익을 계산합니다.",
  url: "https://calc-site-delta.vercel.app/calculators/youtube",
});

export default function Page() {
  return <YouTubeRevenueCalculatorUI />;
}
