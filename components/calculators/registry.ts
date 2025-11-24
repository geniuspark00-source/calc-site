import type React from "react";
import WeddingCostCard from "@/components/cards/wedding-costCard";

export type CalculatorCardItem = {
  slug: string;
  name: string;
  Card: React.ComponentType<any>;
};

export const calculatorCards: CalculatorCardItem[] = [
  { slug: "wedding-cost", name: "wedding-cost 계산기", Card: WeddingCostCard },
];
