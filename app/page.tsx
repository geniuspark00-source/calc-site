import { generateSEOTags } from "@/lib/seo";

export const metadata = generateSEOTags({
  title: "실생활 계산기 모음 | Calc Site",
  description:
    "전세 → 월세 전환 계산기, 임대 수익률 계산기 등 다양한 생활 계산기를 제공합니다.",
  url: "https://calc-site-delta.vercel.app",
});

export default function Home() {
  return (
    <main className="w-full p-4">

      {/* ===================== */}
      {/* 🔵 상단 광고 */}
      {/* ===================== */}
      <div className="w-full mb-6">
        <div className="w-full h-[120px] bg-gray-100 border rounded-lg flex items-center justify-center text-gray-500">
          광고 자리 (상단)
        </div>
      </div>

      {/* ===================== */}
      {/* 🔹 콘텐츠 영역 */}
      {/* ===================== */}
      <div className="max-w-6xl mx-auto">

        <h1 className="text-2xl font-bold mb-4 text-blue-700">계산기 모음</h1>

        <p className="text-gray-600 mb-8">
          다양한 실생활 계산기를 제공합니다. 원하는 계산기를 아래에서 선택하세요.
        </p>

        {/* 🔵 모바일 중간 광고 */}
        <div className="block md:hidden mb-4">
          <div className="w-full h-[150px] bg-gray-100 border rounded-lg flex items-center justify-center text-gray-500">
            광고 자리 (중간)
          </div>
        </div>

        {/* ===================== */}
        {/* 🔥 계산기 2열 그리드 */}
        {/* ===================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* 🔽 기존 카드들 그대로 유지 🔽 */}

          <a
            href="/calculators/rent-yield"
            className="block p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition"
          >
            <h2 className="text-lg font-bold text-blue-600">임대 수익률 계산기 →</h2>
            <p className="text-gray-600 text-sm">
              매입가, 보증금, 월세, 대출이자를 기준으로 자동 계산합니다.
            </p>
          </a>

          <a
            href="/calculators/lease-to-monthly"
            className="block p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition"
          >
            <h2 className="text-lg font-bold text-green-700">전세 → 월세 전환 계산기 →</h2>
            <p className="text-gray-600 text-sm">
              전세 유지 대비 월세 전환 시 순이익을 비교합니다.
            </p>
          </a>

          <a
            href="/calculators/property-tax"
            className="block p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition"
          >
            <h2 className="text-lg font-bold text-purple-700">취득세·보유세 계산기 →</h2>
            <p className="text-gray-600 text-sm">
              취득세 + 연 보유세를 기반으로 실제 취득원가를 계산합니다.
            </p>
          </a>

          <a
            href="/calculators/loan"
            className="block p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition"
          >
            <h2 className="text-lg font-bold text-orange-700">대출 상환 계산기 →</h2>
            <p className="text-gray-600 text-sm">
              원리금균등·원금균등·만기일시 방식 월 상환금 계산.
            </p>
          </a>

          <a
            href="/calculators/salary"
            className="block p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition"
          >
            <h2 className="text-lg font-bold text-red-700">연봉 → 실수령액 계산기 →</h2>
            <p className="text-gray-600 text-sm">
              4대보험·세금 포함 실제 월 실수령액 계산.
            </p>
          </a>

          <a
            href="/calculators/margin"
            className="block p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition"
          >
            <h2 className="text-lg font-bold text-amber-700">마진율 / 판매가 계산기 →</h2>
            <p className="text-gray-600 text-sm">
              원가·마진율 또는 판매가 기준 마진 분석.
            </p>
          </a>

          <a
            href="/calculators/youtube"
            className="block p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition"
          >
            <h2 className="text-lg font-bold text-red-700">유튜브 수익 계산기 →</h2>
            <p className="text-gray-600 text-sm">
              한국 기준 CPM·광고 시청률로 수익 자동 계산.
            </p>
          </a>

          <a
            href="/calculators/aircon-electric"
            className="block p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition"
          >
            <h2 className="text-lg font-bold text-blue-600">에어컨 전기요금 계산기 →</h2>
            <p className="text-gray-600 text-sm">
              소비전력·kWh 단가로 월 전기요금을 계산합니다.
            </p>
          </a>

          <a
            href="/calculators/aircon-mode"
            className="block p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition"
          >
            <h2 className="text-lg font-bold text-blue-600">에어컨 모드별 전기요금 비교 →</h2>
            <p className="text-gray-600 text-sm">
              냉방·제습·절전 모드 간 전기요금 비교.
            </p>
          </a>

          <a
            href="/calculators/rent-compare"
            className="block p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition"
          >
            <h2 className="text-lg font-bold text-amber-600">전월세 비교 계산기 →</h2>
            <p className="text-gray-600 text-sm">
              전세/월세 중 어떤 선택이 유리한지 비교합니다.
            </p>
          </a>

          <a
            href="/calculators/car-cost"
            className="block p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition"
          >
            <h2 className="text-lg font-bold text-green-700">자동차 유지비 계산기 →</h2>
            <p className="text-gray-600 text-sm">
              유류비·보험료·세금·정비비 기반 유지비 계산.
            </p>
          </a>

          <a
            href="/calculators/coupang-partners"
            className="block p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition"
          >
            <h2 className="text-lg font-bold text-indigo-600">쿠팡 파트너스 수익 계산기 →</h2>
            <p className="text-gray-600 text-sm">
              클릭수·전환율·결제금액 기반 예상 수익 계산.
            </p>
          </a>

          <a
            href="/calculators/unemployment-benefit"
            className="block p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition"
          >
            <h2 className="text-lg font-bold text-purple-600">실업급여 계산기 →</h2>
            <p className="text-gray-600 text-sm">
              평균임금·근속기간 기반 예상 지급액 계산.
            </p>
          </a>

          <a
            href="/calculators/exchange-fee"
            className="block p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition"
          >
            <h2 className="text-lg font-bold text-indigo-600">환전 수수료 계산기 →</h2>
            <p className="text-gray-600 text-sm">
              스프레드 포함 실제 환전 금액 계산.
            </p>
          </a>

          <a
            href="/calculators/gas-heating"
            className="block p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition"
          >
            <h2 className="text-lg font-bold text-orange-600">도시가스 난방비 계산기 →</h2>
            <p className="text-gray-600 text-sm">
              지역별 요금·기본요금 기반 난방비 계산.
            </p>
          </a>

          <a
            href="/calculators/commute"
            className="block p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition"
          >
            <h2 className="text-lg font-bold text-blue-600">출퇴근 시간·비용 계산기 →</h2>
            <p className="text-gray-600 text-sm">
              거리·속도·유류비 기반 출퇴근 시간·비용 계산.
            </p>
          </a>

{/* 건강보험료 계산기 */}
<a
  href="/calculators/health-insurance"
  className="block p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition"
>
  <h2 className="text-lg font-bold text-blue-600">
    건강보험료 계산기 →
  </h2>
  <p className="text-gray-600 text-sm">
    직장가입자·지역가입자 건강보험료를 자동 계산합니다.
  </p>
</a>

{/* 전기차 충전비 계산기 */}
<a
  href="/calculators/ev-charging"
  className="block p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition"
>
  <h2 className="text-lg font-bold text-green-700">전기차 충전비 계산기 →</h2>
  <p className="text-gray-600 text-sm">
    배터리 용량과 충전 단가로 1회 충전비와 월·연 충전비를 계산합니다.
  </p>
</a>

{/* 자동차 감가상각 계산기 */}
<a
  href="/calculators/car-depreciation"
  className="block p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition"
>
  <h2 className="text-lg font-bold text-red-700">
    자동차 감가상각 계산기 →
  </h2>
  <p className="text-gray-600 text-sm">
    감가율, 연비, 보험료, 정비비를 반영하여 자동차의 실제 소유비용을 계산합니다.
  </p>
</a>

{/* 로또 실수령액 계산기 */}
<a
  href="/calculators/lotto"
  className="block p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition"
>
  <h2 className="text-lg font-bold text-yellow-600">
    로또 실수령액 계산기 →
  </h2>
  <p className="text-gray-600 text-sm">
    로또 당첨금에서 세금 제외 후 실제 수령액을 계산합니다.
  </p>
</a>

{/* 강아지·고양이 사람 나이 계산기 */}
<a
  href="/calculators/pet-age"
  className="block p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition"
>
  <h2 className="text-lg font-bold text-pink-600">
    강아지·고양이 사람 나이 환산기 →
  </h2>
  <p className="text-gray-600 text-sm">
    반려동물의 실제 나이를 사람 나이로 자동 계산합니다.
  </p>
</a>

{/* 이별 복구 가능성 계산기 */}
<a
  href="/calculators/breakup-recovery"
  className="block p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition"
>
  <h2 className="text-lg font-bold text-pink-600">
    이별 복구 가능성 계산기 →
  </h2>
  <p className="text-gray-600 text-sm">
    연락 빈도·대화 톤·이별 사유 기반 재회 확률을 분석합니다.
  </p>
</a>

{/* 부동산 총구매비용 계산기 */}
<a
  href="/calculators/property-buy-cost"
  className="block p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition"
>
  <h2 className="text-lg font-bold text-blue-700">
    부동산 총구매비용 계산기 →
  </h2>
  <p className="text-gray-600 text-sm">
    취득세·중개수수료·법무사비·등기비 등 부동산 구매 시 필요한 총비용을 자동 계산합니다.
  </p>
</a>

{/* 에어컨 설치비 견적 계산기 */}
<a
  href="/calculators/aircon-estimate"
  className="block p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition"
>
  <h2 className="text-lg font-bold text-blue-600">
    에어컨 설치비 견적 계산기 →
  </h2>
  <p className="text-gray-600 text-sm">
    벽걸이·스탠드·2in1 에어컨 설치비와 옵션 비용을 자동으로 계산합니다.
  </p>
</a>

        </div>

        {/* ===================== */}
        {/* 🔵 하단 광고 */}
        {/* ===================== */}
        <div className="w-full mt-8">
          <div className="w-full h-[120px] bg-gray-100 border rounded-lg flex items-center justify-center text-gray-500">
            광고 자리 (하단)
          </div>
        </div>

      </div>
    </main>
  );
}
