import { generateCalculatorSEOTags } from "@/lib/seo";
import { default as CalculatorUI } from "./car-costCalculatorUI";

export const metadata = generateCalculatorSEOTags("car-cost");

export default function Page() {
  return <CalculatorUI />;
}
