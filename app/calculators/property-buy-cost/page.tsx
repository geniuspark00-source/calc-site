import { generateCalculatorSEOTags } from "@/lib/seo";
import { default as CalculatorUI } from "./property-buy-costCalculatorUI";

export const metadata = generateCalculatorSEOTags("property-buy-cost");

export default function Page() {
  return <CalculatorUI />;
}
