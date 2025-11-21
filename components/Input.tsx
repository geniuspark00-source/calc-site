"use client";

import { useState } from "react";

type InputProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
};

export default function Input({ label, value, onChange, placeholder }: InputProps) {
  const [display, setDisplay] = useState(value.toString());

  // 숫자만 남기기 + 콤마 제거
  const normalizeNumber = (str: string) => {
    const onlyNums = str.replace(/,/g, "").replace(/\D/g, "");
    return onlyNums;
  };

  // 천 단위 콤마 적용
  const formatNumber = (str: string) => {
    if (!str) return "";
    return Number(str).toLocaleString();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    // 숫자만 남기기
    const raw = normalizeNumber(inputValue);

    // 상태 업데이트
    setDisplay(formatNumber(raw));

    // 부모(계산기)에 숫자 전달
    const numericValue = raw === "" ? 0 : Number(raw);
    onChange(numericValue);
  };

  const handleFocus = () => {
    // 포커스 시 0은 제거
    if (display === "0") {
      setDisplay("");
    }
  };

  return (
    <div className="space-y-1">
      <label className="text-sm font-bold">{label}</label>
      <input
        type="text"
        className="w-full border rounded p-2 mt-1"
        value={display}
        placeholder={placeholder}
        onChange={handleChange}
        onFocus={handleFocus}
      />
    </div>
  );
}
