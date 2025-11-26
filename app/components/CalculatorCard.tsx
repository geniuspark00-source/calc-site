"use client";

import Link from "next/link";
import { gtagEvent } from "@/lib/gtag";

interface Props {
  calc: {
    href: string;
    title: string;
    desc: string;
    color: string;
  };
}

export default function CalculatorCard({ calc }: Props) {
  const handleClick = () => {
    gtagEvent({
      action: "calculator_click",
      category: "calculator",
      label: calc.title,
      calculator_id: calc.href.replace("/calculators/", "")
    });
  };

  return (
    <Link
      href={calc.href}
      onClick={handleClick}
      className="block p-4 border rounded-lg shadow-sm hover:bg-gray-50 transition"
    >
      <h2 className={`font-semibold text-lg ${calc.color}`}>{calc.title}</h2>
      <p className="text-gray-600 mt-1">{calc.desc}</p>
    </Link>
  );
}
