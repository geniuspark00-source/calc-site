"use client";

import { useState, useEffect } from "react";

type InputProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
};

export default function Input({ label, value, onChange, placeholder }: InputProps) {
  const [display, setDisplay] = useState("");

  // 부모 value 값이 바뀌면 자동으로 display도 새로 formatting
  useEffect(() => {
    if (value === 0) {
      setDisplay("");
    } else {
      setDisplay(value.toLocaleString());
    }
  }, [value]);

  // 숫자만 남기기
  const normalizeNumber = (str: string) => {
    return str.replace(/,/g, "").replace(/\D/g, "");
  };

  // 천 단위 콤마 적용
  const formatNumber = (str: string) => {
    if (!str) return "";
    return Number(str).toLocaleString();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // 숫자만 추출한 raw number string
    const raw = normalizeNumber(inputValue);

    // 숫자 formatting UI 표시
    setDisplay(formatNumber(raw));

    // 부모에 number 전달
    const numericValue = raw === "" ? 0 : Number(raw);
    onChange(numericValue);
  };

  const handleFocus = () => {
    if (display === "0") {
      setDisplay("");
    }
  };

  return (
    <div className="space-y-1">
      <label className="text-sm font-bold text-gray-900">{label}</label>

      <input
        type="text"
        className="
          w-full border rounded p-2 mt-1
          text-gray-900
          placeholder-gray-400
        "
        value={display}
        placeholder={placeholder}
        onChange={handleChange}
        onFocus={handleFocus}
      />
    </div>
  );
}
