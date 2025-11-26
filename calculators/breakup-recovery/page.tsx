import { generateCalculatorSEOTags } from "@/lib/seo";
import { default as CalculatorUI } from "./breakup-recoveryCalculatorUI";

export const metadata = generateCalculatorSEOTags("breakup-recovery");

export default function Page() {
  return <CalculatorUI />;
}
