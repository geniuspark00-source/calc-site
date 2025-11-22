export default function CalculatorsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full p-4 flex justify-center">

      {/* 🔵 왼쪽 광고 (PC 전용) */}
      <aside className="hidden md:flex flex-col mr-4 sticky top-4">
        <div className="w-[160px] h-[600px] bg-gray-200 border rounded-lg flex items-center justify-center text-gray-600">
          광고
        </div>
      </aside>

      {/* 🔹 계산기 본문 */}
      <section className="w-full max-w-2xl">{children}</section>

      {/* 🔵 오른쪽 광고 (PC 전용) */}
      <aside className="hidden md:flex flex-col ml-4 sticky top-4">
        <div className="w-[160px] h-[600px] bg-gray-200 border rounded-lg flex items-center justify-center text-gray-600">
          광고
        </div>
      </aside>

    </div>
  );
}
