import { Spinner } from "@/components/ui/spinner";

export function PageLoader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#0a0a0a] z-50">
      <div className="flex flex-col items-center gap-4">
        {/* Elegant blur glow behind the spinner */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-[#F97316]/20 blur-xl w-10 h-10 -translate-x-1 -translate-y-1" />
          <Spinner className="w-8 h-8 text-[#F97316] relative z-10 animate-spin" />
        </div>
        <p className="text-white/40 text-xs font-mono uppercase tracking-[0.25em]">VertX</p>
      </div>
    </div>
  );
}
