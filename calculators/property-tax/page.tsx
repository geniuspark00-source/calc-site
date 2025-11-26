import { generateCalculatorSEOTags } from "@/lib/seo";
import { default as CalculatorUI } from "./property-taxCalculatorUI";

export const metadata = generateCalculatorSEOTags("property-tax");

export default function Page() {
  return <CalculatorUI />;
}
