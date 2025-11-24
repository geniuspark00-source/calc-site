import Link from "next/link";

export default function WeddingCostCard() {
  return (
    <Link
      href="/calculators/wedding-cost"
      className="block rounded-lg shadow-sm hover:shadow-md p-4 bg-white"
    >
      <p className="font-bold text-lg mb-2">wedding-cost 계산기</p>
      <p className="text-gray-600">클릭하여 계산기로 이동</p>
    </Link>
  );
}
