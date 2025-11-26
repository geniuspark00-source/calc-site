import { generateCalculatorSEOTags } from "@/lib/seo";
import { default as CalculatorUI } from "./car-depreciationCalculatorUI";

export const metadata = generateCalculatorSEOTags("car-depreciation");

export default function Page() {
  return <CalculatorUI />;
}
