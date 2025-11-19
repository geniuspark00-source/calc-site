export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-blue-700">
        계산기 모음
      </h1>

      <p className="text-gray-600 mb-8">
        다양한 실생활 계산기를 제공합니다. 원하는 계산기를 아래에서 선택하세요.
      </p>

      <div className="grid grid-cols-1 gap-4">
        <a
          href="/calculators/rent-yield"
          className="block p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition"
        >
          <h2 className="text-lg font-bold text-blue-600">임대 수익률 계산기 →</h2>
          <p className="text-gray-600 text-sm">
            매입가, 보증금, 월세, 대출이자 등 입력하면 자동 계산됩니다.
          </p>
        </a>
      </div>
    </div>
  );
}
