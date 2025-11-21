"use client";

type InputProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
};

export default function Input({ label, value, onChange, placeholder }: InputProps) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-bold">{label}</label>
      <input
        type="number"
        className="w-full border rounded p-2 mt-1"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}
