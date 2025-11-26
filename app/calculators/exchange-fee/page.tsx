import { generateCalculatorSEOTags } from "@/lib/seo";
import { default as CalculatorUI } from "./exchange-feeCalculatorUI";

export const metadata = generateCalculatorSEOTags("exchange-fee");

export default function Page() {
  return <CalculatorUI />;
}
