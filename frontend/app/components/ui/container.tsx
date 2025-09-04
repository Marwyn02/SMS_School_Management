export default function Container({ children }: { children: any }) {
  return (
    <div className="container mx-auto px-4 pb-5 pt-28 space-y-4">
      {children}
    </div>
  );
}
