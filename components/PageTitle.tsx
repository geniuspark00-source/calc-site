export default function PageTitle({
  title,
  desc,
}: {
  title: string;
  desc?: string;
}) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-blue-700">{title}</h1>
      {desc && <p className="text-gray-700 mt-2">{desc}</p>}
    </div>
  );
}
