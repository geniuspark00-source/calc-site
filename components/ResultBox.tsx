export default function ResultBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
      <div className="text-gray-900 space-y-1">
        {children}
      </div>
    </div>
  );
}
