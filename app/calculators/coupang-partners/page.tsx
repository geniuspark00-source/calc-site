import { generateCalculatorSEOTags } from "@/lib/seo";
import { default as CalculatorUI } from "./coupang-partnersCalculatorUI";

export const metadata = generateCalculatorSEOTags("coupang-partners");

export default function Page() {
  return <CalculatorUI />;
}
