import { generateCalculatorSEOTags } from "@/lib/seo";
import { default as CalculatorUI } from "./gas-heatingCalculatorUI";

export const metadata = generateCalculatorSEOTags("gas-heating");

export default function Page() {
  return <CalculatorUI />;
}
