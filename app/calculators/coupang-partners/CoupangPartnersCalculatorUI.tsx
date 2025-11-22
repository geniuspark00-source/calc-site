"use client";

import { useState } from "react";

export default function CoupangPartnersCalculatorUI() {
  // 입력값 상태
  const [clicks, setClicks] = useState(5000); // 월 클릭 수
  const [conversionRate, setConversionRate] = useState(5); // 전환율(%)
  const [avgOrderAmount, setAvgOrderAmount] = useState(45000); // 1회 주문당 결제 금액
  const [commissionRate, setCommissionRate] = useState(3); // 수수료율(%)

  // 안전 값
  const safeClicks = Math.max(0, clicks);
  const cr = Math.max(0, conversionRate) / 100;
  const fee = Math.max(0, commissionRate) / 100;

  // 계산
  const orders = safeClicks * cr; // 월 예상 주문 건수
  const grossSales = orders * avgOrderAmount; // 월 예상 총 매출
  const revenue = grossSales * fee; // 월 예상 수익

  const rpm = safeClicks > 0 ? revenue / safeClicks : 0; // 클릭 1회당 수익
  const perThousand = rpm * 1000; // 1,000클릭당 수익

  const format = (n: number, digits = 0) =>
    isNaN(n)
      ? "-"
      : n.toLocaleString("ko-KR", {
          maximumFractionDigits: digits,
        });

  return (
    <div className="max-w-xl mx-auto p-4">

      {/* 돌아가기 링크 */}
      <a href="/" className="text-blue-600 underline mb-4 inline-block">
        ← 계산기 목록으로 돌아가기
      </a>

      {/* 설명 */}
      <p className="text-gray-600 mb-6 leading-relaxed">
        쿠팡 파트너스 링크에 들어온 월간 클릭 수와 전환율, 1회 주문당 결제 금액,
        수수료율을 기준으로
        <br />
        예상 매출과 예상 수익을 계산합니다.
      </p>

      {/* 입력 영역 */}
      <div className="bg-white p-4 rounded-lg border shadow-sm space-y-4 mb-6">

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">월 클릭 수 (회)</label>
          <input
            type="number"
            className="border rounded-md px-3 py-2 text-sm"
            value={clicks || ""}
            onChange={(e) => setClicks(Number(e.target.value) || 0)}
          />
          <p className="text-[11px] text-gray-500">
            블로그·유튜브 등에서 쿠팡 링크가 한 달에 몇 번 클릭되는지 입력하세요.
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">전환율 (%)</label>
          <input
            type="number"
            step="0.1"
            className="border rounded-md px-3 py-2 text-sm"
            value={conversionRate || ""}
            onChange={(e) => setConversionRate(Number(e.target.value) || 0)}
          />
          <p className="text-[11px] text-gray-500">
            클릭 대비 실제 구매로 이어지는 비율입니다. 예) 5%면 100클릭 중 5명이 구매.
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">
            1회 주문당 평균 결제 금액 (원)
          </label>
          <input
            type="number"
            className="border rounded-md px-3 py-2 text-sm"
            value={avgOrderAmount || ""}
            onChange={(e) =>
              setAvgOrderAmount(Number(e.target.value) || 0)
            }
          />
          <p className="text-[11px] text-gray-500">
            사람들이 한 번 주문할 때 평균적으로 결제하는 금액(장바구니 금액 기준)을 입력하세요.
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">수수료율 (%)</label>
          <input
            type="number"
            step="0.1"
            className="border rounded-md px-3 py-2 text-sm"
            value={commissionRate || ""}
            onChange={(e) => setCommissionRate(Number(e.target.value) || 0)}
          />
          <p className="text-[11px] text-gray-500">
            카테고리별 쿠팡 파트너스 수수료율(2~7% 등)을 입력하세요.
          </p>
        </div>
      </div>

      {/* 결과 영역 */}
      <div className="bg-white p-4 rounded-lg border shadow-sm space-y-3 mb-4">
        <h2 className="text-lg font-bold mb-2 text-blue-700">예상 지표</h2>

        <p>
          월 예상 주문 건수:{" "}
          <strong>{format(orders, 1)} 건</strong>
        </p>
        <p>
          월 예상 총 매출(구매 금액 합계):{" "}
          <strong>{format(Math.round(grossSales))} 원</strong>
        </p>

        <p className="mt-2">
          쿠팡 파트너스 예상 수익(월):{" "}
          <strong className="text-green-700 text-lg">
            {format(Math.round(revenue))} 원
          </strong>
        </p>

        <p className="mt-2 text-sm text-gray-700">
          클릭 1회당 수익:{" "}
          <strong>{format(rpm, 2)} 원</strong>{" "}
          / 1,000클릭당 수익:{" "}
          <strong>{format(Math.round(perThousand))} 원</strong>
        </p>
      </div>

      <p className="text-[12px] text-gray-500 mt-4 leading-relaxed">
        ※ 실제 수익은 상품 카테고리별 수수료율, 취소/반품, 프로모션, 부가세 등에 따라 달라질 수 있습니다.
        <br />
        ※ 이 계산기는 대략적인 예상치를 보는 용도이며, 정확한 금액은 쿠팡 파트너스 정산 내역을 기준으로 확인해야 합니다.
      </p>
    </div>
  );
}
