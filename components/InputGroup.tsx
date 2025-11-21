export default function InputGroup({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white p-4 shadow-sm rounded-lg space-y-4 border">
      {children}
    </div>
  );
}
