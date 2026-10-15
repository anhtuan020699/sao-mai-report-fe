export function PageSkeleton() {
  return (
    <div aria-busy="true" className="animate-pulse">
      <div className="bg-forest-deep">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="h-3 w-40 rounded-full bg-white/15" />
          <div className="mt-6 h-10 w-3/4 max-w-2xl rounded-xl bg-white/15" />
          <div className="mt-4 h-4 w-1/2 max-w-md rounded-full bg-white/10" />
        </div>
      </div>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:px-8">
        <div className="space-y-4">
          <div className="aspect-[16/9] rounded-3xl bg-stone" />
          <div className="h-4 w-full rounded-full bg-stone" />
          <div className="h-4 w-5/6 rounded-full bg-stone" />
          <div className="h-4 w-2/3 rounded-full bg-stone" />
        </div>
        <div className="h-72 rounded-3xl bg-stone" />
      </div>
    </div>
  );
}
