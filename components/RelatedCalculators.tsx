"use client";

interface RelatedItem {
  title: string;
  url: string;
}

export default function RelatedCalculators({ items }: { items: RelatedItem[] }) {
  return (
    <div className="mt-12 p-4 border rounded-lg bg-white shadow-sm">
      <h2 className="text-lg font-bold mb-3 text-blue-700">📌 관련 계산기</h2>

      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index}>
            <a
              href={item.url}
              className="text-blue-600 hover:underline"
            >
              {item.title} →
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
