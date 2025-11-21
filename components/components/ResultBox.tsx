"use client";

export default function ResultBox({
  title = "📌 계산 결과",
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200 shadow-sm">
      <h2 className="font-bold text-lg text-blue-700 mb-2">{title}</h2>
      <div className="space-y-1 text-gray-900">{children}</div>
    </div>
  );
}
