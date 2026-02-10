interface ScrollRowProps {
  title: string;
  children: React.ReactNode;
}

export function ScrollRow({ title, children }: ScrollRowProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <h2 className="mb-4 text-2xl font-bold text-gray-900">{title}</h2>
      <div className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 scrollbar-hide">
        {children}
      </div>
    </section>
  );
}
