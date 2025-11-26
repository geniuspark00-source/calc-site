import { generateCalculatorSEOTags } from "@/lib/seo";
import { default as CalculatorUI } from "./lease-to-monthlyCalculatorUI";

export const metadata = generateCalculatorSEOTags("lease-to-monthly");

export default function Page() {
  return <CalculatorUI />;
}
