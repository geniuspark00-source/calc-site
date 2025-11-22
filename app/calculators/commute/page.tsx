import { generateSEOTags } from "@/lib/seo";
import CommuteCalculatorUI from "./CommuteCalculatorUI";

export const metadata = generateSEOTags({
  title: "출퇴근 시간·비용 계산기 | Calc Site",
  description:
    "출근 거리, 속도, 유류비, 대중교통 비용 등을 입력하면 하루·월·연간 출퇴근 시간과 비용을 계산합니다.",
  url: "https://calc-site-delta.vercel.app/calculators/commute",
});

export default function Page() {
  return <CommuteCalculatorUI />;
}
