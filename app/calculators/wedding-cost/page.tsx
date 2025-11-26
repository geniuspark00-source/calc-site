import { generateCalculatorSEOTags } from "@/lib/seo";
import { default as CalculatorUI } from "./wedding-costCalculatorUI";

export const metadata = generateCalculatorSEOTags("wedding-cost");

export default function Page() {
  return <CalculatorUI />;
}
