import { generateCalculatorSEOTags } from "@/lib/seo";
import { default as CalculatorUI } from "./ev-chargingCalculatorUI";

export const metadata = generateCalculatorSEOTags("ev-charging");

export default function Page() {
  return <CalculatorUI />;
}
