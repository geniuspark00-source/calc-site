import { generateCalculatorSEOTags } from "@/lib/seo";
import { default as CalculatorUI } from "./loanCalculatorUI";

export const metadata = generateCalculatorSEOTags("loan");

export default function Page() {
  return <CalculatorUI />;
}
