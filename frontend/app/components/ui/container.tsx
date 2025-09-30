export default function Container({
  children,
  className,
}: {
  children: any;
  className?: string;
}) {
  return (
    <div
      className={`container mx-auto px-4 pb-5 pt-28 space-y-4 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
