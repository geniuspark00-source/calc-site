import Link from "next/link";

export default function TestCalcCard() {
  return (
    <Link
      href="/calculators/test-calc"
      className="block rounded-lg shadow-sm hover:shadow-md p-4 bg-white"
    >
      <p className="font-bold text-lg mb-2">test calc 계산기</p>
      <p className="text-gray-600">클릭하여 계산기로 이동</p>
    </Link>
  );
}
