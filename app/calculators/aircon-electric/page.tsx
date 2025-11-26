import { generateCalculatorSEOTags } from "@/lib/seo";
import { default as CalculatorUI } from "./aircon-electricCalculatorUI";

export const metadata = generateCalculatorSEOTags("aircon-electric");

export default function Page() {
  return <CalculatorUI />;
}
