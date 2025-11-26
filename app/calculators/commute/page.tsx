import { generateCalculatorSEOTags } from "@/lib/seo";
import { default as CalculatorUI } from "./commuteCalculatorUI";

export const metadata = generateCalculatorSEOTags("commute");

export default function Page() {
  return <CalculatorUI />;
}
