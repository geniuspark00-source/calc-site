export default function ResultBox({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
      {title && (
        <p className="font-bold text-lg text-blue-700 mb-2">{title}</p>
      )}
      {children}
    </div>
  );
}
