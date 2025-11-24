"use client";

import { useState, useEffect, useRef } from "react";

type InputProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
};

export default function Input({ label, value, onChange, placeholder }: InputProps) {
  const [display, setDisplay] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // 부모 value 변화 시 display formatting
  useEffect(() => {
    if (value === 0) {
      setDisplay("");
    } else {
      setDisplay(value.toLocaleString());
    }
  }, [value]);

  // 숫자만 추출 (음수/문자 제거)
  const normalizeNumber = (str: string) => {
    return str.replace(/,/g, "").replace(/\D/g, ""); // 음수/문자 제거
  };

  // 천단위 콤마 formatting
  const formatNumber = (str: string) => {
    if (!str) return "";
    return Number(str).toLocaleString();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = normalizeNumber(e.target.value);

    // UI 표시
    setDisplay(formatNumber(raw));

    // 부모로 전달
    onChange(raw === "" ? 0 : Number(raw));
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    // 클릭 시 전체 선택 — 모바일 UX 증가
    e.target.select();

    // 0이면 비워주기
    if (display === "0") {
      setDisplay("");
    }
  };

  // 스크롤로 값 변경되는거 방지 (모바일/PC 둘 다)
  const blockWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    e.preventDefault();
    (e.target as HTMLInputElement).blur();
  };

  return (
    <div className="space-y-1">
      <label className="text-sm font-bold text-gray-900">{label}</label>

      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"       // 🔥 모바일 키패드 숫자 전용
        pattern="[0-9]*"          // 🔥 숫자만 허용
        className="
          w-full border rounded p-2 mt-1
          text-gray-900
          placeholder-gray-400
        "
        value={display}
        placeholder={placeholder}
        onChange={handleChange}
        onFocus={handleFocus}
        onWheel={blockWheel}      // 🔥 스크롤 값 변경 방지
      />
    </div>
  );
}
