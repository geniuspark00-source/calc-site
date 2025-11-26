import { generateCalculatorSEOTags } from "@/lib/seo";
import { default as CalculatorUI } from "./aircon-estimateCalculatorUI";

export const metadata = generateCalculatorSEOTags("aircon-estimate");

export default function Page() {
  return <CalculatorUI />;
}
