import { generateCalculatorSEOTags } from "@/lib/seo";
import { default as CalculatorUI } from "./health-insuranceCalculatorUI";

export const metadata = generateCalculatorSEOTags("health-insurance");

export default function Page() {
  return <CalculatorUI />;
}
