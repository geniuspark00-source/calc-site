"use client";

import Link from "next/link";

export default function CalculatorCard({ calc, onClick }) {
  return (
    <Link
      href={calc.href}
      onClick={onClick}
      className="block p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition"
    >
      <h2 className={`text-lg font-bold ${calc.color}`}>{calc.title}</h2>
      <p className="text-gray-600 text-sm">{calc.desc}</p>
    </Link>
  );
}
