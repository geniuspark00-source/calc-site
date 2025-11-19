"use client";
import { useState } from "react";

export default function LeaseToMonthly() {
  const [jeonse, setJeonse] = useState(0);
  const [expectedMonthly, setExpectedMonthly] = useState(0);
  const [loan, setLoan] = useState(0);
  const [rate, setRate] = useState(0);
  const [manage, setManage] = useState(0);
  const [expectedReturn, setExpectedReturn] = useState(3); // 전세금 운용 수익률(연%)

  // 월세 전환 시 순수익 계산
  const calcMonthlyIncome = () => {
    const loanInterest = loan * (rate / 100) / 12;
    return expectedMonthly - manage - loanInterest;
  };

  // 전세 유지 시 기대 수익 (전세금 운용 수익)
  const calcJeonseIncome = () => {
    return (jeonse * (expectedReturn / 100)) / 12;
  };

  const monthlyIncome = calcMonthlyIncome();
  const jeonseIncome = calcJeonseIncome();
  const diff = monthlyIncome - jeonseIncome;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-blue-700">
        전세 → 월세 전환 수익 계산기
      </h1>

      <p className="text-gray-600 mb-6">
        전세를 월세로 전환했을 때의 월순수익과 기존 전세금을 유지했을 때의
        수익을 비교합니다.
      </p>

      <div className="bg-white p-4 shadow-sm rounded-lg space-y-4 border">

        <Input label="전세금" value={jeonse} setValue={setJeonse} />
        <Input label="예상 월세" value={expectedMonthly} setValue={setExpectedMonthly} />
        <Input label="대출금" value={loan} setValue={setLoan} />
        <Input label="이자율(%)" value={rate} setValue={setRate} />
        <Input label="관리비" value={manage} setValue={setManage} />
        <Input
          label="전세금 운용 수익률(연 %)"
          value={expectedReturn}
          setValue={setExpectedReturn}
        />

      </div>

      <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
        <p className="font-bold text-lg text-blue-700">📌 계산 결과</p>

        <p>월세 전환 월 순수익:  
          <strong> {Math.round(monthlyIncome).toLocaleString()} 원</strong>
        </p>

        <p>전세 유지 월 기대수익: 
          <strong> {Math.round(jeonseIncome).toLocaleString()} 원</strong>
        </p>

        <p className="mt-2">
          월세 전환이  
          <strong className={diff >= 0 ? "text-green-700" : "text-red-700"}>
            {diff >= 0 ? ` +${Math.round(diff).toLocaleString()}원` : 
              ` ${Math.round(diff).toLocaleString()}원`}
          </strong>
          더 유리합니다.
        </p>
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  setValue,
}: {
  label: string;
  value: number;
  setValue: (v: number) => void;
}) {
  return (
    <div>
      <label className="text-sm font-bold">{label}</label>
      <input
        type="number"
        className="w-full border rounded p-2 mt-1"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />
    </div>
  );
}
<a
  href="/calculators/lease-to-monthly"
  className="block p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition"
>
  <h2 className="text-lg font-bold text-blue-600">전세 → 월세 전환 계산기 →</h2>
  <p className="text-gray-600 text-sm">
    전세 유지 대비 월세 전환 시 수익 비교 계산기.
  </p>
</a>
