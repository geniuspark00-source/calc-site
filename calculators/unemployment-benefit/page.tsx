import { generateCalculatorSEOTags } from "@/lib/seo";
import { default as CalculatorUI } from "./unemployment-benefitCalculatorUI";

export const metadata = generateCalculatorSEOTags("unemployment-benefit");

export default function Page() {
  return <CalculatorUI />;
}
