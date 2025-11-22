"use client";

import { useState } from "react";

export default function RentCompareCalculatorUI() {
  // 전세 보증금
  const [jeonseDeposit, setJeonseDeposit] = useState(200_000_000);
  // 월세 보증금
  const [wolseDeposit, setWolseDeposit] = useState(50_000_000);
  // 월세
  const [monthlyRent, setMonthlyRent] = useState(800_000);
  // 연 이자율(기회비용, 예금/대출 기준)
  const [rate, setRate] = useState(3); // %
  // 비교 기간(년)
  const [years, setYears] = useState(2);

  const safeYears = Math.max(0, years);
  const r = Math.max(0, rate) / 100;

  // 전세 시나리오: 전세 보증금이 전부 묶인다고 보고, 그 돈의 이자(기회비용)를 비용으로 봄
  const jeonseOpportunity = jeonseDeposit * r * safeYears;
  const jeonseNetCost = jeonseOpportunity;

  // 월세 시나리오
  const wolseRentTotal = monthlyRent * 12 * safeYears;
  const wolseOpportunity = wolseDeposit * r * safeYears;

  // 전세 보증금 - 월세 보증금 차액을 투자한다고 가정 (월세 선택 시 남는 돈)
  const leftoverCapital = Math.max(0, jeonseDeposit - wolseDeposit);
  const leftoverInterest = leftoverCapital * r * safeYears;

  // 월세 시나리오 순비용 = 월세 총액 + 월세 보증금 기회비용 - 남는 돈에서 발생하는 이자
  const wolseNetCost = wolseRentTotal + wolseOpportunity - leftoverInterest;

  const diff = wolseNetCost - jeonseNetCost; // >0이면 전세가 더 유리, <0이면 월세가 더 유리

  const format = (n: number) =>
    isNaN(n)
      ? "-"
      : n.toLocaleString("ko-KR", {
          maximumFractionDigits: 0,
        });

  return (
    <div className="max-w-xl mx-auto p-4">
      {/* 돌아가기 */}
      <a href="/" className="text-blue-600 underline mb-4 inline-block">
        ← 계산기 목록으로 돌아가기
      </a>

      {/* 설명 */}
      <p className="text-gray-600 mb-6 leading-relaxed">
        단순화를 위해 전세는 보증금의 이자(기회비용)를 비용으로 보고,
        <br />
        월세는 월세 총액 + 보증금 이자에서 전세 대비 남는 목돈의 이자를 차감하여
        순비용을 계산합니다.
      </p>

      {/* 입력 영역 */}
      <div className="bg-white p-4 rounded-lg border shadow-sm space-y-4 mb-6">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">전세 보증금 (원)</label>
          <input
            type="number"
            className="border rounded-md px-3 py-2 text-sm"
            value={jeonseDeposit || ""}
            onChange={(e) =>
              setJeonseDeposit(Number(e.target.value.replace(/,/g, "")) || 0)
            }
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">월세 보증금 (원)</label>
          <input
            type="number"
            className="border rounded-md px-3 py-2 text-sm"
            value={wolseDeposit || ""}
            onChange={(e) =>
              setWolseDeposit(Number(e.target.value.replace(/,/g, "")) || 0)
            }
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">월세 (원)</label>
          <input
            type="number"
            className="border rounded-md px-3 py-2 text-sm"
            value={monthlyRent || ""}
            onChange={(e) =>
              setMonthlyRent(Number(e.target.value.replace(/,/g, "")) || 0)
            }
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">
            연 이자율 (%)
            <span className="text-[11px] text-gray-500 ml-1">
              (예금/대출, 기회비용 기준)
            </span>
          </label>
          <input
            type="number"
            step="0.1"
            className="border rounded-md px-3 py-2 text-sm"
            value={rate || ""}
            onChange={(e) => setRate(Number(e.target.value) || 0)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">비교 기간 (년)</label>
          <input
            type="number"
            className="border rounded-md px-3 py-2 text-sm"
            value={years || ""}
            onChange={(e) => setYears(Number(e.target.value) || 0)}
          />
        </div>
      </div>

      {/* 결과 영역 */}
      <div className="bg-white p-4 rounded-lg border shadow-sm space-y-3 mb-4">
        <h2 className="text-lg font-bold mb-2 text-blue-700">전세 시나리오</h2>
        <p>
          전세 보증금 기회비용(이자 손실):{" "}
          <strong>{format(Math.round(jeonseOpportunity))} 원</strong>
        </p>
        <p>
          전세 순비용(기회비용 기준):{" "}
          <strong>{format(Math.round(jeonseNetCost))} 원</strong>
        </p>
      </div>

      <div className="bg-white p-4 rounded-lg border shadow-sm space-y-3 mb-4">
        <h2 className="text-lg font-bold mb-2 text-red-700">월세 시나리오</h2>
        <p>
          월세 총액:{" "}
          <strong>{format(Math.round(wolseRentTotal))} 원</strong>
        </p>
        <p>
          월세 보증금 기회비용:{" "}
          <strong>{format(Math.round(wolseOpportunity))} 원</strong>
        </p>
        <p>
          전세 대비 남는 목돈(전세-월세 보증금):{" "}
          <strong>{format(Math.round(leftoverCapital))} 원</strong>
        </p>
        <p>
          남는 목돈 투자 시 예상 이자:{" "}
          <strong>{format(Math.round(leftoverInterest))} 원</strong>
        </p>
        <p className="text-lg font-bold text-green-700">
          월세 순비용(월세 + 보증금 이자 - 남는 목돈 이자):{" "}
          {format(Math.round(wolseNetCost))} 원
        </p>
      </div>

      {/* 비교 요약 */}
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-sm">
        {diff > 0 ? (
          <p>
            👉{" "}
            <strong className="text-blue-700">
              전세가 월세보다 약 {format(Math.round(diff))} 원
            </strong>{" "}
            만큼 유리합니다. (순비용 기준)
          </p>
        ) : diff < 0 ? (
          <p>
            👉{" "}
            <strong className="text-red-700">
              월세가 전세보다 약 {format(Math.round(Math.abs(diff)))} 원
            </strong>{" "}
            만큼 유리합니다. (순비용 기준)
          </p>
        ) : (
          <p>👉 전세와 월세의 순비용이 거의 동일한 수준입니다.</p>
        )}
      </div>

      <p className="text-[12px] text-gray-500 mt-4 leading-relaxed">
        ※ 단순 비교 모델이며, 실제 계약 시에는 중도해지, 이사비용, 세금,
        대출 조건, 전세 사기 리스크 등 다양한 요소를 추가로 고려해야 합니다.
      </p>
    </div>
  );
}
