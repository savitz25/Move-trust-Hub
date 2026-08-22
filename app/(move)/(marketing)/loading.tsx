export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="h-10 w-2/3 skeleton" />
        <div className="h-5 w-1/2 skeleton" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-52 rounded-xl border skeleton" />
          ))}
        </div>
      </div>
    </div>
  );
}
