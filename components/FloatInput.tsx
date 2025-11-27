"use client";

import { useState, useEffect } from "react";

interface FloatInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  description?: string;
  error?: string;
}

export default function FloatInput({
  label,
  value,
  onChange,
  placeholder,
  description,
  error,
}: FloatInputProps) {
  const [display, setDisplay] = useState("");

  // ★ number → 문자열 변환 시 콤마/소수점 그대로 살림
  useEffect(() => {
    if (value === 0) {
      setDisplay("");
    } else {
      setDisplay(formatNumber(value));
    }
  }, [value]);

  // ★ 콤마 + 소수점 표시 함수
  const formatNumber = (num: number | string) => {
    if (num === "" || num === null || num === undefined) return "";
    const parts = String(num).split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value;

    // ★ 숫자 + . 만 허용
    raw = raw.replace(/[^0-9.]/g, "");

    // ★ 소수점 1개만 허용
    const dotCount = (raw.match(/\./g) || []).length;
    if (dotCount > 1) return;

    // UI 표시: 콤마 붙여서 setDisplay
    setDisplay(formatNumber(raw));

    // 숫자 파싱
    const numeric = Number(raw.replace(/,/g, ""));
    if (isNaN(numeric)) onChange(0);
    else onChange(numeric);
  };

  return (
    <div className="space-y-1">
      <label className="text-sm font-bold text-gray-900">{label}</label>

      {description && (
        <p className="text-xs text-gray-500 -mt-1">{description}</p>
      )}

      <input
        type="text"
        className={`
          w-full border rounded p-2 mt-1
          text-gray-900 placeholder-gray-400
          transition-all outline-none
          ${error
            ? "border-red-400 focus:ring-2 ring-red-300"
            : "border-gray-300 focus:ring-2 ring-blue-300"}
        `}
        value={display}
        placeholder={placeholder}
        onChange={handleChange}
      />

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
