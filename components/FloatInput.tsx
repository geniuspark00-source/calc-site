"use client";

import { Dispatch, SetStateAction } from "react";

type FloatInputProps = {
  label: string;
  value: number;
  onChange: Dispatch<SetStateAction<number>>;
  step?: string;
  placeholder?: string;
};

export default function FloatInput({
  label,
  value,
  onChange,
  step = "any",
  placeholder = "",
}: FloatInputProps) {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-semibold">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        step={step}
        placeholder={placeholder}
        className="w-full p-2 border rounded-lg"
      />
    </div>
  );
}
