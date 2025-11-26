"use client";

import Link from "next/link";

interface CalculatorCardProps {
  calc: {
    href: string;
    title: string;
    desc: string;
    color: string;
  };
  onClick?: () => void;
}

export default function CalculatorCard({ calc, onClick }: CalculatorCardProps) {
  return (
    <Link
      href={calc.href}
      onClick={onClick}
      className="block p-4 border rounded-lg shadow-sm hover:bg-gray-50 transition"
    >
      <h2 className={`font-semibold text-lg ${calc.color}`}>
        {calc.title}
      </h2>
      <p className="text-gray-600 mt-1">{calc.desc}</p>
    </Link>
  );
}
