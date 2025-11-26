import { generateCalculatorSEOTags } from "@/lib/seo";
import { default as CalculatorUI } from "./rent-compareCalculatorUI";

export const metadata = generateCalculatorSEOTags("rent-compare");

export default function Page() {
  return <CalculatorUI />;
}
