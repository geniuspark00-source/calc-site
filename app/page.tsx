import { generateSEOTags } from "@/lib/seo";

export const metadata = generateSEOTags({
  title: "실생활 계산기 모음 | Calc Site",
  description:
    "전세 → 월세 전환 계산기, 임대 수익률 계산기 등 다양한 생활 계산기를 제공합니다.",
  url: "https://calc-site-delta.vercel.app",
});

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

        {/* 기존 임대 수익률 계산기 */}
        <a
          href="/calculators/rent-yield"
          className="block p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition"
        >
          <h2 className="text-lg font-bold text-blue-600">
            임대 수익률 계산기 →
          </h2>
          <p className="text-gray-600 text-sm">
            매입가, 보증금, 월세, 대출이자 등 입력하면 자동 계산됩니다.
          </p>
        </a>

        {/* 전세 → 월세 전환 계산기 */}
        <a
          href="/calculators/lease-to-monthly"
          className="block p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition"
        >
          <h2 className="text-lg font-bold text-green-700">
            전세 → 월세 전환 계산기 →
          </h2>
          <p className="text-gray-600 text-sm">
            전세를 월세로 바꿀 때 월 순수익과 전세 유지 수익을 비교합니다.
          </p>
        </a>

        {/* 🔥 취득세·보유세 계산기 (여기 추가!) */}
        <a
          href="/calculators/property-tax"
          className="block p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition"
        >
          <h2 className="text-lg font-bold text-purple-700">
            취득세·보유세 계산기 →
          </h2>
          <p className="text-gray-600 text-sm">
            취득세와 연 보유세를 입력해서 총 세금과 실제 취득원가를 계산합니다.
          </p>
        </a>

{/* 대출 상환 계산기 */}
<a
  href="/calculators/loan"
  className="block p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition"
>
  <h2 className="text-lg font-bold text-orange-700">대출 상환 계산기 →</h2>
  <p className="text-gray-600 text-sm">
    원리금균등 · 원금균등 · 만기일시 방식 월 상환금과 총 이자를 자동 계산합니다.
  </p>
</a>

{/* 연봉 실수령액 계산기 */}
<a
  href="/calculators/salary"
  className="block p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition"
>
  <h2 className="text-lg font-bold text-red-700">연봉 → 실수령액 계산기 →</h2>
  <p className="text-gray-600 text-sm">
    연봉에서 실제 월 실수령액을 자동 계산합니다. (4대보험·세금 포함)
  </p>
</a>

      </div>
    </div>
  );
}
