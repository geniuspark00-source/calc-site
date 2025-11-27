"use client";

import Link from "next/link";

export default function FundamentalCard() {
  return (
    <Link
      href="/calculators/fundamental"
      className="block p-4 border rounded-xl shadow hover:bg-gray-50 transition"
    >
      <h2 className="text-lg font-semibold">재무 펀더멘탈 계산기</h2>
      <p className="text-sm text-gray-600 mt-1">
        EPS, PER, BPS, PBR, ROE 기반으로 적정주가와 목표 시총을 계산합니다.
      </p>
    </Link>
  );
}
