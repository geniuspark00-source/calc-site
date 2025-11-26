import { generateCalculatorSEOTags } from "@/lib/seo";
import { default as CalculatorUI } from "./marginCalculatorUI";

export const metadata = generateCalculatorSEOTags("margin");

export default function Page() {
  return <CalculatorUI />;
}
