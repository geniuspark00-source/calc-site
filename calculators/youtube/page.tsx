import { generateCalculatorSEOTags } from "@/lib/seo";
import { default as CalculatorUI } from "./youtubeCalculatorUI";

export const metadata = generateCalculatorSEOTags("youtube");

export default function Page() {
  return <CalculatorUI />;
}
