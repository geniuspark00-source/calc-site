import { generateCalculatorSEOTags } from "@/lib/seo";
import { default as CalculatorUI } from "./rent-yieldCalculatorUI";

export const metadata = generateCalculatorSEOTags("rent-yield");

export default function Page() {
  return <CalculatorUI />;
}
