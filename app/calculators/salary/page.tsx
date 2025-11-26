import { generateCalculatorSEOTags } from "@/lib/seo";
import { default as CalculatorUI } from "./salaryCalculatorUI";

export const metadata = generateCalculatorSEOTags("salary");

export default function Page() {
  return <CalculatorUI />;
}
