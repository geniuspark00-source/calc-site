import { generateSEOTags } from "@/lib/seo";
import PetAgeCalculatorUI from "./PetAgeCalculatorUI";

export const metadata = generateSEOTags({
  title: "강아지·고양이 사람 나이 환산 계산기 | Calc Site",
  description:
    "강아지와 고양이의 실제 나이를 사람 나이로 자동 환산합니다. 1년차 15세, 2년차 24세, 이후 1년마다 +4세 공식 적용.",
  url: "https://calc-site-delta.vercel.app/calculators/pet-age",
});

export default function Page() {
  return <PetAgeCalculatorUI />;
}
