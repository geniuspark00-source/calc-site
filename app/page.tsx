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

{/* 원가 → 판매가 / 마진율 계산기 */}
<a
  href="/calculators/margin"
  className="block p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition"
>
  <h2 className="text-lg font-bold text-amber-700">
    마진율 / 판매가 계산기 →
  </h2>
  <p className="text-gray-600 text-sm">
    원가와 목표 마진율로 판매가를 계산하거나, 실제 판매가 기준 마진율을 분석합니다.
  </p>
</a>

{/* 유튜브 수익 계산기 */}
<a
  href="/calculators/youtube"
  className="block p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition"
>
  <h2 className="text-lg font-bold text-red-700">
    유튜브 조회수 → 수익 계산기 →
  </h2>
  <p className="text-gray-600 text-sm">
    한국 기준 CPM·광고시청률을 반영하여 조회수로 수익을 자동 계산합니다.
  </p>
</a>

{/* 에어컨 전기요금 계산기 */}
<a
  href="/calculators/aircon-electric"
  className="block p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition"
>
  <h2 className="text-lg font-bold text-blue-600">
    에어컨 전기요금 계산기 →
  </h2>
  <p className="text-gray-600 text-sm">
    소비전력(W)·사용시간·kWh 단가로 월 전기요금을 자동 계산합니다.
  </p>
</a>

{/* 에어컨 모드별 전기요금 비교 계산기 */}
<a
  href="/calculators/aircon-mode"
  className="block p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition"
>
  <h2 className="text-lg font-bold text-blue-600">
    에어컨 모드별 전기요금 비교 계산기 →
  </h2>
  <p className="text-gray-600 text-sm">
    냉방·제습·절전·터보 모드 소비전력 기반 전기요금 비교 계산.
  </p>
</a>

{/* 전월세 비교 계산기 */}
<a
  href="/calculators/rent-compare"
  className="block p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition"
>
  <h2 className="text-lg font-bold text-amber-600">
    전월세 비교 계산기 →
  </h2>
  <p className="text-gray-600 text-sm">
    전세 보증금·월세·보증금 차액·이자율을 기준으로 전세와 월세 중 어떤 선택이 더 유리한지 비교합니다.
  </p>
</a>

{/* 자동차 유지비 계산기 */}
<a
  href="/calculators/car-cost"
  className="block p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition"
>
  <h2 className="text-lg font-bold text-green-700">
    자동차 유지비 계산기 →
  </h2>
  <p className="text-gray-600 text-sm">
    유류비·보험료·자동차세·정비비를 기반으로 월/연간 자동차 유지비를 계산합니다.
  </p>
</a>

{/* 쿠팡 파트너스 수익 계산기 */}
<a
  href="/calculators/coupang-partners"
  className="block p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition"
>
  <h2 className="text-lg font-bold text-indigo-600">
    쿠팡 파트너스 수익 계산기 →
  </h2>
  <p className="text-gray-600 text-sm">
    월 클릭 수·전환율·평균 결제 금액·수수료율로 쿠팡 파트너스 예상 수익을 계산합니다.
  </p>
</a>

{/* 실업급여 수령액 계산기 */}
<a
  href="/calculators/unemployment-benefit"
  className="block p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition"
>
  <h2 className="text-lg font-bold text-purple-600">
    실업급여 수령액 계산기 →
  </h2>
  <p className="text-gray-600 text-sm">
    평균임금·근속기간·나이를 기반으로 실업급여 예상 지급액과 지급일수를 계산합니다.
  </p>
</a>

      </div>
    </div>
  );
}
