import { generateCalculatorSEOTags } from "@/lib/seo";
import { default as CalculatorUI } from "./pet-ageCalculatorUI";

export const metadata = generateCalculatorSEOTags("pet-age");

export default function Page() {
  return <CalculatorUI />;
}
